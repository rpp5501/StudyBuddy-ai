import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { DocxLoader } from '@langchain/community/document_loaders/fs/docx';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document as LangchainDocument } from '@langchain/core/documents';
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";

/**
 * Initialize the embedding model - using HF transformers
 * Based on Xenova's transformers.js
 */
const embeddingModel = new HuggingFaceTransformersEmbeddings({
  modelName: "Xenova/all-MiniLM-L6-v2",
});

/**
 * Load document from file path
 */
export async function loadDocument(filePath: string, fileType: string): Promise<LangchainDocument[]> {
  console.log(`Loading document: ${filePath}, type: ${fileType}`);
  try {
    let loader;
    if (fileType.includes('pdf')) {
      loader = new PDFLoader(filePath);
    } else if (fileType.includes('document') || fileType.includes('docx')) {
      loader = new DocxLoader(filePath);
    } else if (fileType.includes('text')) {
      loader = new TextLoader(filePath);
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }
    return loader.load();
  } catch (error) {
    console.error(`Error loading document: ${error}`);
    throw error;
  }
}

/**
 * Split documents into chunks suitable for embedding
 */
export async function splitDocumentsIntoChunks(documents: LangchainDocument[]): Promise<LangchainDocument[]> {
  console.log(`Splitting ${documents.length} documents into chunks`);
  
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,       // Each chunk will be ~1000 characters
    chunkOverlap: 100,     // With 100 characters of overlap between chunks
    separators: ["\n\n", "\n", ". ", " ", ""],  // Prefer splitting on paragraph/sentences
  });
  
  const chunks = await splitter.splitDocuments(documents);
  console.log(`Created ${chunks.length} chunks`);
  return chunks;
}

/**
 * Generate embedding for a single text string
 * Useful for search queries
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  // Use the embedding model to embed the text
  const embeddingResult = await embeddingModel.embedQuery(text);
  return embeddingResult as number[];
}

/**
 * Generate embeddings for text chunks
 */
export async function generateChunkEmbeddings(chunks: LangchainDocument[]): Promise<{ text: string; embedding: number[] }[]> {
  console.log(`Generating embeddings for ${chunks.length} chunks...`);
  
  const chunksWithEmbeddings = [];
  
  // Process in batches to avoid overloading
  const batchSize = 10;
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    
    // Process each document in the batch
    const batchPromises = batch.map(async (chunk) => {
      const embedding = await generateEmbedding(chunk.pageContent);
      return {
        text: chunk.pageContent,
        embedding
      };
    });
    
    const batchResults = await Promise.all(batchPromises);
    chunksWithEmbeddings.push(...batchResults);
    
    // Log progress
    console.log(`Completed embeddings for chunks ${i + 1} to ${Math.min(i + batchSize, chunks.length)}`);
  }
  
  return chunksWithEmbeddings;
} 