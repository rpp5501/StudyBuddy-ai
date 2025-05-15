import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Upload, BrainCircuit, Lightbulb } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">StudyAI</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload documents, generate flashcards, and create quizzes powered by AI
        </p>
      </header>

      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Transform Your Study Experience</h2>
            <p className="text-muted-foreground mb-6">
              Our AI-powered platform analyzes your documents and automatically creates study materials tailored to your
              content.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/upload">
                <Button size="lg" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Document
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Study application interface preview"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card>
            <CardHeader className="space-y-1">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>Upload PDFs, text files, or other documents you want to study</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our AI processes your documents to extract key information and concepts for learning.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Review Flashcards</CardTitle>
              <CardDescription>Study with automatically generated flashcards</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Flashcards are created based on important concepts, definitions, and facts from your documents.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <BrainCircuit className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Take Quizzes</CardTitle>
              <CardDescription>Test your knowledge with AI-generated quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Multiple question formats help reinforce your learning and identify areas for improvement.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Explore Concepts</CardTitle>
              <CardDescription>Visualize and understand key concepts with mind maps</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Interactive concept breakdowns and AI chat help you gain deeper understanding of complex topics.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                AI-powered content extraction from various document formats
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Smart Flashcards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Automatically generated flashcards focusing on key concepts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Custom Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Multiple question formats with adjustable difficulty levels
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Monitor your learning progress and identify areas for improvement
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-xl">Ready to transform your study experience?</CardTitle>
            <CardDescription>Upload your first document and see the power of AI-assisted learning</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/upload">
              <Button size="lg" className="gap-2">
                <Upload className="h-4 w-4" />
                Get Started
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}
