import mongoose, { Schema, Document as MongoDocument, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define TypeScript interfaces for the models
export interface IUser extends MongoDocument {
  _id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDocument extends MongoDocument {
  _id: string;
  fileName: string;
  fileType?: string;
  fileSize?: number;
  status: 'PENDING' | 'PENDING_CHUNKS' | 'PROCESSING' | 'PROCESSED' | 'FAILED';
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDocumentChunk extends MongoDocument {
  _id: string;
  documentId: string;
  text: string;
  embedding: number[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the mongoose schemas
const userSchema = new Schema<IUser>(
  {
    _id: { type: String, default: () => uuidv4() },
    email: { type: String, required: true, unique: true },
    name: { type: String },
  },
  { 
    timestamps: true,
    versionKey: false,
  }
);

const documentSchema = new Schema<IDocument>(
  {
    _id: { type: String, default: () => uuidv4() },
    fileName: { type: String, required: true },
    fileType: { type: String },
    fileSize: { type: Number },
    status: { 
      type: String, 
      enum: ['PENDING', 'PENDING_CHUNKS', 'PROCESSING', 'PROCESSED', 'FAILED'],
      default: 'PENDING'
    },
    userId: { type: String, ref: 'User' },
  },
  { 
    timestamps: true,
    versionKey: false,
  }
);

const documentChunkSchema = new Schema<IDocumentChunk>(
  {
    _id: { type: String, default: () => uuidv4() },
    documentId: { type: String, ref: 'Document', required: true },
    text: { type: String, required: true },
    embedding: { type: [Number], required: true },
  },
  { 
    timestamps: true,
    versionKey: false,
  }
);

// Create indices
documentChunkSchema.index({ documentId: 1 });
// For vector search when you set up Atlas Search
// documentChunkSchema.index({ embedding: '2dsphere' }); // This is not for vector search, remove or comment out

// Initialize the models
export const User = mongoose.models?.User || mongoose.model<IUser>('User', userSchema);
export const DocumentModel = mongoose.models?.Document || mongoose.model<IDocument>('Document', documentSchema);
export const DocumentChunk = mongoose.models?.DocumentChunk || mongoose.model<IDocumentChunk>('DocumentChunk', documentChunkSchema); 