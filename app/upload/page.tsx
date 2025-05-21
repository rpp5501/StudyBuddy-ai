"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, Upload, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
    }
  }
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    // Reset states
    setError(null)
    setIsUploading(true)
    setUploadProgress(0)

    // Create FormData and append the file
    const formData = new FormData()
    formData.append("file", file)
    
    try {
      // Start upload progress simulation
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 5, 95)) // Cap at 95% until complete
      }, 200)
      
      // Make the actual API call
      const response = await fetch("/api/process-document", {
        method: "POST",
        body: formData,
      })
      
      clearInterval(progressInterval)
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to upload document")
      }
      
      const data = await response.json()
      console.log("Upload successful:", data)
      
      setUploadProgress(100)
      setIsUploading(false)
      setIsProcessing(false)
      setIsComplete(true)
    } catch (err: any) {
      console.error("Upload error:", err)
      setError(err.message || "Failed to upload document")
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setIsUploading(false)
    setUploadProgress(0)
    setIsProcessing(false)
    setIsComplete(false)
    setError(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Document</h1>
          <p className="text-muted-foreground">Upload your study materials to generate flashcards and quizzes</p>
        </header>

        <Tabs defaultValue="upload" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="url">Import from URL</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Document</CardTitle>
                <CardDescription>Upload a PDF, DOCX, or TXT file to generate study materials</CardDescription>
              </CardHeader>
              <CardContent>
                {!isComplete ? (
                  <div className="space-y-6">
                    <div className="grid w-full gap-2">
                      <Label htmlFor="file">Document</Label>
                      <div
                        className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => document.getElementById("file")?.click()}
                      >
                        <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                        <div className="text-center">
                          <p className="text-sm font-medium">{file ? file.name : "Drag and drop or click to upload"}</p>
                          <p className="text-xs text-muted-foreground mt-1">Supports PDF, DOCX, and TXT (max 50MB)</p>
                        </div>
                        <Input
                          id="file"
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx,.txt"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}

                    {isProcessing && (
                      <div className="flex items-center justify-center p-4">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="text-sm font-medium">Processing document with AI...</p>
                          <p className="text-xs text-muted-foreground">This may take a minute</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="rounded-full bg-green-100 p-3 mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Document Processed Successfully!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your document has been analyzed and study materials have been generated.
                    </p>
                    <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                      <Link href="/flashcards">
                        <Button variant="outline" className="w-full">
                          Flashcards
                        </Button>
                      </Link>
                      <Link href="/quizzes">
                        <Button className="w-full">Quizzes</Button>
                      </Link>
                      <Link href="/concepts">
                        <Button variant="outline" className="w-full">
                          Concepts
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
              {!isComplete && (
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" onClick={resetUpload} disabled={isUploading || isProcessing}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpload} disabled={!file || isUploading || isProcessing}>
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </>
                    )}
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
          <TabsContent value="url">
            <Card>
              <CardHeader>
                <CardTitle>Import from URL</CardTitle>
                <CardDescription>Enter a URL to a document or webpage to generate study materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="url">Document URL</Label>
                    <Input id="url" placeholder="https://example.com/document.pdf" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recently Uploaded</h2>
          <div className="grid gap-4">
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-base">Introduction to Psychology.pdf</CardTitle>
                      <CardDescription>Uploaded 2 days ago</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/flashcards">
                      <Button variant="outline" size="sm">
                        Flashcards
                      </Button>
                    </Link>
                    <Link href="/quizzes">
                      <Button size="sm">Quizzes</Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-base">World History Notes.docx</CardTitle>
                      <CardDescription>Uploaded 5 days ago</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/flashcards">
                      <Button variant="outline" size="sm">
                        Flashcards
                      </Button>
                    </Link>
                    <Link href="/quizzes">
                      <Button size="sm">Quizzes</Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
