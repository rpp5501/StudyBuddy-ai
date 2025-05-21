import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import {
  saveUploadedFileTemporarily,
  deleteTemporaryFile,
} from "@/lib/services/file.service"
import {
  loadDocument,
  splitDocumentsIntoChunks,
  generateChunkEmbeddings,
} from "@/lib/services/document-processor.service"
import { storeDocumentAndChunks, connectToDatabase } from "@/lib/services/database.service"

export async function POST(request: Request) {
  let tempFilePath: string | undefined

  try {
    // Ensure MongoDB is connected
    await connectToDatabase();
    
    const formData = await request.formData()
    const file = formData.get("file") as File
    const userId = formData.get("userId") as string | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const {
      filePath,
      fileName,
      fileType,
      fileSize,
    } = await saveUploadedFileTemporarily(file)
    tempFilePath = filePath

    const loadedDocs = await loadDocument(tempFilePath, fileType)
    const chunks = await splitDocumentsIntoChunks(loadedDocs)
    const chunksWithEmbeddings = await generateChunkEmbeddings(chunks)

    const documentId = uuidv4() // Generate a unique ID for the document

    const storedDocument = await storeDocumentAndChunks(
      documentId,
      fileName,
      fileType,
      fileSize,
      userId, // Pass userId to the storage function
      chunksWithEmbeddings
    )

    await deleteTemporaryFile(tempFilePath) // Clean up after successful processing
    tempFilePath = undefined // Reset path after deletion

    // Mock data for flashcards/quizzes - to be replaced with LLM calls
    const mockFlashcards = [
      { id: 1, front: "Example front", back: "Example back" },
    ]
    const mockQuizzes = [
      { id: 1, title: "Example Quiz", questionCount: 0 },
    ]

    return NextResponse.json({
      success: true,
      message: "Document processed and ingested successfully.",
      documentId: storedDocument._id, // Note: MongoDB uses _id instead of id
      fileName: storedDocument.fileName,
      flashcards: mockFlashcards, // Replace with actual generated data
      quizzes: mockQuizzes,       // Replace with actual generated data
    })

  } catch (error: any) {
    console.error("API Error - process-document:", error)
    if (tempFilePath) {
      // Attempt to clean up temp file even if an error occurred
      await deleteTemporaryFile(tempFilePath)
    }
    return NextResponse.json(
      { error: `Failed to process document: ${error.message || "Unknown error"}` },
      { status: 500 }
    )
  }
}
