import { connectToDatabase } from './mongoose';
import { DocumentChunk } from './models';

/**
 * Perform vector search in MongoDB Atlas using the $vectorSearch aggregation stage
 * Note: This requires a properly configured vector search index in MongoDB Atlas
 * 
 * @param queryEmbedding - Embedding vector of the search query
 * @param documentId - Optional filter by document ID
 * @param limit - Maximum number of results to return
 * @param minScore - Minimum similarity score (0-1)
 * @returns Array of document chunks sorted by similarity
 */
export async function vectorSearch(
  queryEmbedding: number[],
  documentId?: string,
  limit: number = 5,
  minScore: number = 0.7
) {
  await connectToDatabase();
  
  // Base pipeline for the aggregation
  const pipeline: any[] = [
    {
      $vectorSearch: {
        index: "vector_index", // This should match your Atlas Search index name
        queryVector: queryEmbedding,
        path: "embedding",
        numCandidates: limit * 10, // Atlas recommends searching more candidates than results
        limit: limit,
      }
    },
    // Include the similarity score in the results
    {
      $project: {
        _id: 1,
        documentId: 1,
        text: 1,
        similarity: { $meta: "vectorSearchScore" }
      }
    },
    // Only return results above the minimum similarity threshold
    {
      $match: {
        similarity: { $gte: minScore }
      }
    },
    // Sort by similarity score (highest first)
    {
      $sort: { similarity: -1 }
    }
  ];
  
  // If a documentId is provided, filter to only that document
  if (documentId) {
    pipeline.unshift({
      $match: { documentId }
    });
  }
  
  try {
    return await DocumentChunk.aggregate(pipeline);
  } catch (error) {
    console.error("Vector search error:", error);
    // Fallback to basic text search if vector search fails
    // This could happen if the vector index is not yet ready
    const filter = documentId ? { documentId } : {};
    return DocumentChunk.find({
      ...filter,
      // Basic text matching as fallback
    }).limit(limit);
  }
}

/**
 * Helper function to convert a natural language query to vector embedding
 * and perform vector search
 * 
 * @param query - Natural language query
 * @param documentId - Optional filter by document ID
 * @param limit - Maximum number of results
 * @returns Search results
 */
export async function semanticSearch(
  query: string,
  documentId?: string,
  limit: number = 5
) {
  // Import the embedding generation function
  const { generateEmbedding } = await import('../services/document-processor.service');
  
  // Convert the query to an embedding
  const queryEmbedding = await generateEmbedding(query);
  
  // Perform the vector search with the embedding
  return vectorSearch(queryEmbedding, documentId, limit);
} 