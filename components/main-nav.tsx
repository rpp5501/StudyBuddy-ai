"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, Upload, BarChart3, BrainCircuit, Lightbulb } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <BookOpen className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">StudyAI</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60",
          )}
        >
          <Button variant="ghost" className="gap-2">
            <Home className="h-4 w-4" />
            Home
          </Button>
        </Link>
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/dashboard") ? "text-foreground" : "text-foreground/60",
          )}
        >
          <Button variant="ghost" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link
          href="/upload"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/upload") ? "text-foreground" : "text-foreground/60",
          )}
        >
          <Button variant="ghost" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </Link>
        <Link
          href="/flashcards"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/flashcards") ? "text-foreground" : "text-foreground/60",
          )}
        >
          <Button variant="ghost" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Flashcards
          </Button>
        </Link>
        <Link
          href="/quizzes"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/quizzes") ? "text-foreground" : "text-foreground/60",
          )}
        >
          <Button variant="ghost" className="gap-2">
            <BrainCircuit className="h-4 w-4" />
            Quizzes
          </Button>
        </Link>
        <Link
          href="/concepts"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/concepts") ? "text-foreground" : "text-foreground/60",
          )}
        >
          <Button variant="ghost" className="gap-2">
            <Lightbulb className="h-4 w-4" />
            Concepts
          </Button>
        </Link>
      </nav>
    </div>
  )
}
