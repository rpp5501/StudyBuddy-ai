// lib/services/file.service.ts
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';

interface TemporaryFile {
  filePath: string;
  fileName: string;
  uniqueFileName: string;
  fileType: string;
  fileSize: number;
}

export async function saveUploadedFileTemporarily(file: File): Promise<TemporaryFile> {
  try {
    const originalFileName = file.name;
    const fileType = file.type;
    const fileSize = file.size;

    const uniqueFileName = `${uuidv4()}-${originalFileName}`;
    const tempDir = os.tmpdir();
    
    console.log(`Using temp directory: ${tempDir}`);
    
    // Ensure the temp directory exists
    try {
      await fs.mkdir(tempDir, { recursive: true });
      console.log(`Confirmed temp directory exists: ${tempDir}`);
    } catch (mkdirError) {
      console.warn(`Warning: Could not create temp directory: ${mkdirError}`);
      // Continue anyway as the directory might already exist
    }
    
    const tempFilePath = path.join(tempDir, uniqueFileName);
    console.log(`Attempting to write file to: ${tempFilePath}`);

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(tempFilePath, fileBuffer);

    console.log(`File temporarily saved to ${tempFilePath} (size: ${fileBuffer.length} bytes)`);
    return { filePath: tempFilePath, fileName: originalFileName, uniqueFileName, fileType, fileSize };
  } catch (error) {
    console.error(`Error in saveUploadedFileTemporarily:`, error);
    
    // More diagnostics
    const tempDir = os.tmpdir();
    try {
      const stats = await fs.stat(tempDir);
      console.log(`Temp directory stats:`, {
        exists: true,
        isDirectory: stats.isDirectory(),
        permissions: stats.mode,
        size: stats.size,
      });
    } catch (statError) {
      console.error(`Could not stat temp directory: ${tempDir}`, statError);
    }
    
    throw error;
  }
}

export async function deleteTemporaryFile(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath);
    console.log(`Temporary file ${filePath} deleted`);
  } catch (error) {
    console.error(`Failed to delete temporary file ${filePath}:`, error);
    // Just log the error but don't throw
  }
} 