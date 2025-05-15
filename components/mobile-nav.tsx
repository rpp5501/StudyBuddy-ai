"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, Menu, Home, Upload, BarChart3, BrainCircuit, Lightbulb } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <BookOpen className="h-6 w-6" />
            <span className="font-bold">StudyAI</span>
          </Link>
        </div>
        <div className="flex flex-col gap-3 mt-8">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 px-7 py-2 text-base hover:bg-muted/50 transition-colors",
              pathname === "/" ? "bg-muted font-medium" : "",
            )}
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 px-7 py-2 text-base hover:bg-muted/50 transition-colors",
              pathname?.startsWith("/dashboard") ? "bg-muted font-medium" : "",
            )}
          >
            <BarChart3 className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/upload"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 px-7 py-2 text-base hover:bg-muted/50 transition-colors",
              pathname?.startsWith("/upload") ? "bg-muted font-medium" : "",
            )}
          >
            <Upload className="h-5 w-5" />
            Upload
          </Link>
          <Link
            href="/flashcards"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 px-7 py-2 text-base hover:bg-muted/50 transition-colors",
              pathname?.startsWith("/flashcards") ? "bg-muted font-medium" : "",
            )}
          >
            <BookOpen className="h-5 w-5" />
            Flashcards
          </Link>
          <Link
            href="/quizzes"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 px-7 py-2 text-base hover:bg-muted/50 transition-colors",
              pathname?.startsWith("/quizzes") ? "bg-muted font-medium" : "",
            )}
          >
            <BrainCircuit className="h-5 w-5" />
            Quizzes
          </Link>
          <Link
            href="/concepts"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 px-7 py-2 text-base hover:bg-muted/50 transition-colors",
              pathname?.startsWith("/concepts") ? "bg-muted font-medium" : "",
            )}
          >
            <Lightbulb className="h-5 w-5" />
            Concepts
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
