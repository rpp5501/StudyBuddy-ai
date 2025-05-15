"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, RotateCcw, Settings, BookOpen, CheckCircle, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock flashcard data
const mockFlashcards = [
  {
    id: 1,
    front: "What is the central dogma of molecular biology?",
    back: "The central dogma of molecular biology describes the flow of genetic information from DNA to RNA to protein. It states that DNA is transcribed to RNA, which is then translated to proteins.",
  },
  {
    id: 2,
    front: "Define operant conditioning",
    back: "Operant conditioning is a type of learning where behavior is controlled by consequences. Behaviors followed by reinforcement will increase, while behaviors followed by punishment will decrease.",
  },
  {
    id: 3,
    front: "What is the law of supply and demand?",
    back: "The law of supply and demand is an economic principle that describes how the price of a good or service is determined by the interaction between the availability of the good (supply) and the desire for it (demand).",
  },
  {
    id: 4,
    front: "What are the three branches of the U.S. government?",
    back: "The three branches of the U.S. government are the Executive (President), Legislative (Congress), and Judicial (Supreme Court and federal courts).",
  },
  {
    id: 5,
    front: "What is photosynthesis?",
    back: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water, generating oxygen as a byproduct.",
  },
]

export default function FlashcardsPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState<number[]>([])

  const totalCards = mockFlashcards.length
  const currentCard = mockFlashcards[currentCardIndex]

  const nextCard = () => {
    setIsFlipped(false)
    setCurrentCardIndex((prev) => (prev + 1) % totalCards)
  }

  const prevCard = () => {
    setIsFlipped(false)
    setCurrentCardIndex((prev) => (prev - 1 + totalCards) % totalCards)
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const markAsKnown = () => {
    if (!knownCards.includes(currentCard.id)) {
      setKnownCards([...knownCards, currentCard.id])
    }
    nextCard()
  }

  const markAsUnknown = () => {
    setKnownCards(knownCards.filter((id) => id !== currentCard.id))
    nextCard()
  }

  const resetProgress = () => {
    setKnownCards([])
    setCurrentCardIndex(0)
    setIsFlipped(false)
  }

  const isCurrentCardKnown = knownCards.includes(currentCard.id)
  const progressPercentage = (knownCards.length / totalCards) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Flashcards</h1>
            <p className="text-muted-foreground">Review key concepts from your document</p>
          </div>
          <div className="flex gap-2">
            <Link href="/upload">
              <Button variant="outline">Upload New Document</Button>
            </Link>
            <Link href="/quizzes">
              <Button>Take Quiz</Button>
            </Link>
          </div>
        </header>

        <div className="mb-8">
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All Cards ({totalCards})</TabsTrigger>
                <TabsTrigger value="known">Known ({knownCards.length})</TabsTrigger>
                <TabsTrigger value="unknown">Unknown ({totalCards - knownCards.length})</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={resetProgress} title="Reset Progress">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" title="Settings">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Flashcard Settings</SheetTitle>
                      <SheetDescription>Customize your flashcard study experience</SheetDescription>
                    </SheetHeader>
                    <div className="py-4 space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Card Display</h3>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-flip">Auto-flip cards</Label>
                          <Switch id="auto-flip" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="shuffle">Shuffle cards</Label>
                          <Switch id="shuffle" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Study Focus</h3>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="focus-unknown">Focus on unknown cards</Label>
                          <Switch id="focus-unknown" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Text Size</h3>
                        <Slider defaultValue={[50]} max={100} step={10} />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="flex flex-col items-center">
                <div className="w-full mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>
                      {knownCards.length} of {totalCards} cards ({Math.round(progressPercentage)}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                </div>

                <div
                  className="relative w-full max-w-2xl aspect-[3/2] perspective-1000 mb-8 cursor-pointer"
                  onClick={flipCard}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
                  >
                    <Card className="absolute w-full h-full backface-hidden flex items-center justify-center p-8 text-center">
                      <CardContent className="p-0 flex flex-col items-center justify-center h-full">
                        <p className="text-xl font-medium">{currentCard.front}</p>
                        <div className="absolute bottom-4 right-4 text-muted-foreground">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        {isCurrentCardKnown && (
                          <div className="absolute top-4 right-4 text-green-500">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <Card className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-8 text-center">
                      <CardContent className="p-0 flex flex-col items-center justify-center h-full">
                        <p>{currentCard.back}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <Button variant="outline" size="icon" onClick={prevCard}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Card {currentCardIndex + 1} of {totalCards}
                  </span>
                  <Button variant="outline" size="icon" onClick={nextCard}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="gap-2" onClick={markAsUnknown}>
                    <X className="h-4 w-4" />
                    Don't Know
                  </Button>
                  <Button className="gap-2" onClick={markAsKnown}>
                    <CheckCircle className="h-4 w-4" />
                    Know It
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="known" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {mockFlashcards
                  .filter((card) => knownCards.includes(card.id))
                  .map((card) => (
                    <Card key={card.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4 border-b bg-muted/50">
                          <p className="font-medium">{card.front}</p>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground">{card.back}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {knownCards.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-muted-foreground">No known cards yet. Start studying to mark cards as known.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="unknown" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {mockFlashcards
                  .filter((card) => !knownCards.includes(card.id))
                  .map((card) => (
                    <Card key={card.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4 border-b bg-muted/50">
                          <p className="font-medium">{card.front}</p>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground">{card.back}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {knownCards.length === totalCards && (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-muted-foreground">Great job! You've marked all cards as known.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
