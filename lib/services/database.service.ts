import { connectToDatabase } from '@/lib/db/mongoose';
import { DocumentModel, DocumentChunk, IDocument } from '@/lib/db/models';

interface ChunkData {
  text: string;
  embedding: number[];
}

// Refined to use MongoDB
export async function storeDocumentAndChunks(
  documentId: string, // Expecting a pre-generated UUID
  fileName: string,
  fileType: string,
  fileSize: number,
  userId: string | null, // Make userId optional or handle appropriately
  chunksWithEmbeddings: ChunkData[]
): Promise<IDocument> {
  try {
    // Ensure the database connection is established
    await connectToDatabase();

    // Create the document
    const newDocument = new DocumentModel({
      _id: documentId,
      fileName,
      fileType,
      fileSize,
      status: 'PENDING_CHUNKS', // Initial status
      userId: userId || undefined, // Pass undefined if null
    });

    // Save the document first
    await newDocument.save();

    // Prepare chunk data for creation
    const chunksToInsert = chunksWithEmbeddings.map(chunk => ({
      _id: undefined, // let MongoDB assign a unique ID
      documentId: documentId,
      text: chunk.text,
      embedding: chunk.embedding,
    }));

    // Insert all chunks
    await DocumentChunk.insertMany(chunksToInsert);

    // Update document status after chunks are processed
    newDocument.status = 'PROCESSED';
    await newDocument.save();

    console.log(`Document and ${chunksWithEmbeddings.length} chunks stored successfully for ID: ${documentId}`);
    return newDocument;
  } catch (error) {
    console.error("Error storing document and chunks:", error);
    // Clean up if document was created but chunks failed
    try {
      await DocumentModel.findByIdAndDelete(documentId);
      await DocumentChunk.deleteMany({ documentId });
    } catch (cleanupError) {
      console.error("Error during cleanup after failure:", cleanupError);
    }
    throw error; // Re-throw to be caught by the API route
  }
}

// Utility function to search for documents and chunks
export async function findDocumentById(documentId: string): Promise<IDocument | null> {
  await connectToDatabase();
  return DocumentModel.findById(documentId);
}

// Utility function to retrieve document chunks with semantic search
export async function findSimilarChunks(query: string, documentId?: string, limit: number = 5) {
  await connectToDatabase();
  
  // Note: This is a placeholder. For actual vector search, 
  // you'll need to set up MongoDB Atlas Search with vector search
  // and use the $vectorSearch operator
  
  // For now, return basic text search
  const filter = documentId ? { documentId } : {};
  return DocumentChunk.find({
    ...filter,
    $text: { $search: query }
  }).limit(limit);
}

// Export MongoDB helpers - you can use these in your other services if needed
export { connectToDatabase } from '@/lib/db/mongoose';
export { DocumentModel, DocumentChunk, User } from '@/lib/db/models'; 