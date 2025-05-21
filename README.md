# StudyBuddy AI

StudyBuddy AI is a Next.js application that helps students study more efficiently by processing documents (PDFs, DOCX, TXT) and creating flashcards, quizzes, and concept summaries using RAG (Retrieval Augmented Generation).

## Features

- 📄 Upload and process academic documents
- 🔍 Extract key concepts and information
- 🧠 Generate flashcards for effective studying
- 📝 Create quizzes to test understanding
- 📊 Track progress and identify areas for improvement

## MongoDB Migration

This project now uses MongoDB (instead of PostgreSQL) for data storage, providing:

- 🚀 Simpler setup and maintenance
- 🔄 Flexible schema for evolving data models 
- 🔍 Built-in vector search capabilities (via MongoDB Atlas)
- 🔗 Native integration with Node.js applications

## Setup & Configuration

### Prerequisites

- Node.js (v16+)
- MongoDB Atlas account (free tier is sufficient)
- npm or yarn package manager

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/StudyBuddy-ai.git
   cd StudyBuddy-ai
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure MongoDB**
   
   Follow the instructions in [MONGODB_SETUP.md](./MONGODB_SETUP.md) to set up your MongoDB Atlas database with vector search capabilities.

4. **Environment Variables**

   Create a `.env.local` file in the project root with:
   ```
   DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"
   ```
   
   Replace the placeholders with your actual MongoDB connection details.

5. **Run the application**
   ```bash
   npm run dev
   ```
   
   Access the application at [http://localhost:3000](http://localhost:3000)

## Document Processing Flow

1. User uploads a document through the UI
2. Backend processes the document:
   - Saves file temporarily
   - Loads and parses content
   - Splits content into manageable chunks
   - Generates embeddings for each chunk
   - Stores document metadata and chunks in MongoDB
3. The stored documents are available for search and used to generate flashcards, quizzes, and concept summaries

## Testing the API Endpoint

To test the document processing API:

1. Use Postman or a similar tool to send a POST request to `/api/process-document`
2. Set the request body to `form-data` format
3. Add a key `file` with a file as the value (PDF, DOCX, or TXT)
4. Optionally add a `userId` key if you have authentication set up
5. Send the request and check the response

Example response:
```json
{
  "success": true,
  "message": "Document processed and ingested successfully.",
  "documentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "fileName": "your-document.pdf",
  "flashcards": [...],
  "quizzes": [...]
}
```

## License

[MIT License](LICENSE)

## Acknowledgements

- Next.js
- MongoDB Atlas
- LangChain
- HuggingFace Transformers