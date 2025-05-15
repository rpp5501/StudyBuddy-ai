"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, BarChart3, Clock, BookOpen } from "lucide-react"

// Mock quiz data
const mockQuiz = {
  title: "Introduction to Psychology",
  description: "Test your knowledge of basic psychological concepts",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "Which of the following is NOT one of the main perspectives in psychology?",
      options: [
        "Behavioral perspective",
        "Cognitive perspective",
        "Mechanical perspective",
        "Psychodynamic perspective",
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      type: "true-false",
      question:
        "The cerebellum is primarily responsible for higher cognitive functions like reasoning and problem-solving.",
      correctAnswer: false,
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "Which psychologist is associated with classical conditioning?",
      options: ["B.F. Skinner", "Ivan Pavlov", "Sigmund Freud", "Jean Piaget"],
      correctAnswer: 1,
    },
    {
      id: 4,
      type: "multiple-choice",
      question: "Which of the following is a neurotransmitter?",
      options: ["Dopamine", "Insulin", "Estrogen", "Hemoglobin"],
      correctAnswer: 0,
    },
    {
      id: 5,
      type: "true-false",
      question: "Short-term memory has a virtually unlimited capacity.",
      correctAnswer: false,
    },
  ],
}

export default function QuizzesPage() {
  const [activeTab, setActiveTab] = useState("available")
  const [currentQuiz, setCurrentQuiz] = useState<typeof mockQuiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | boolean | null)[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const startQuiz = () => {
    setCurrentQuiz(mockQuiz)
    setCurrentQuestionIndex(0)
    setSelectedAnswers(Array(mockQuiz.questions.length).fill(null))
    setQuizCompleted(false)
    setShowResults(false)
  }

  const handleAnswerSelect = (answer: number | boolean) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answer
    setSelectedAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < (currentQuiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const calculateScore = () => {
    if (!currentQuiz) return 0

    let correctCount = 0
    currentQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++
      }
    })

    return {
      score: correctCount,
      total: currentQuiz.questions.length,
      percentage: Math.round((correctCount / currentQuiz.questions.length) * 100),
    }
  }

  const viewResults = () => {
    setShowResults(true)
  }

  const returnToQuizzes = () => {
    setCurrentQuiz(null)
    setActiveTab("available")
  }

  // If a quiz is active, show the quiz interface
  if (currentQuiz) {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex]
    const isAnswered = selectedAnswers[currentQuestionIndex] !== null
    const scoreData = calculateScore()

    // Show results screen
    if (showResults) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Quiz Results</h1>
              <p className="text-muted-foreground">{currentQuiz.title}</p>
            </header>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Your Score</CardTitle>
                <CardDescription>
                  You scored {scoreData.score} out of {scoreData.total} ({scoreData.percentage}%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score</span>
                      <span>{scoreData.percentage}%</span>
                    </div>
                    <Progress value={scoreData.percentage} className="h-2" />
                  </div>

                  <div className="grid gap-4">
                    {currentQuiz.questions.map((question, index) => {
                      const isCorrect = selectedAnswers[index] === question.correctAnswer

                      return (
                        <Card
                          key={question.id}
                          className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">
                                {isCorrect ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                              <div className="space-y-2">
                                <p className="font-medium">{question.question}</p>

                                {question.type === "multiple-choice" && (
                                  <div className="grid gap-1.5 text-sm">
                                    {question.options.map((option, optionIndex) => {
                                      const isSelected = selectedAnswers[index] === optionIndex
                                      const isCorrectOption = question.correctAnswer === optionIndex

                                      return (
                                        <div
                                          key={optionIndex}
                                          className={`px-3 py-2 rounded-md ${
                                            isCorrectOption
                                              ? "bg-green-100 text-green-800"
                                              : isSelected
                                                ? "bg-red-100 text-red-800"
                                                : ""
                                          }`}
                                        >
                                          {option}
                                          {isCorrectOption && (
                                            <span className="ml-2 text-green-600">✓ Correct answer</span>
                                          )}
                                          {isSelected && !isCorrectOption && (
                                            <span className="ml-2 text-red-600">✗ Your answer</span>
                                          )}
                                        </div>
                                      )
                                    })}
                                  </div>
                                )}

                                {question.type === "true-false" && (
                                  <div className="grid gap-1.5 text-sm">
                                    <div
                                      className={`px-3 py-2 rounded-md ${
                                        question.correctAnswer === true
                                          ? "bg-green-100 text-green-800"
                                          : selectedAnswers[index] === true
                                            ? "bg-red-100 text-red-800"
                                            : ""
                                      }`}
                                    >
                                      True
                                      {question.correctAnswer === true && (
                                        <span className="ml-2 text-green-600">✓ Correct answer</span>
                                      )}
                                      {selectedAnswers[index] === true && question.correctAnswer !== true && (
                                        <span className="ml-2 text-red-600">✗ Your answer</span>
                                      )}
                                    </div>
                                    <div
                                      className={`px-3 py-2 rounded-md ${
                                        question.correctAnswer === false
                                          ? "bg-green-100 text-green-800"
                                          : selectedAnswers[index] === false
                                            ? "bg-red-100 text-red-800"
                                            : ""
                                      }`}
                                    >
                                      False
                                      {question.correctAnswer === false && (
                                        <span className="ml-2 text-green-600">✓ Correct answer</span>
                                      )}
                                      {selectedAnswers[index] === false && question.correctAnswer !== false && (
                                        <span className="ml-2 text-red-600">✗ Your answer</span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={startQuiz}>
                  Retry Quiz
                </Button>
                <Button onClick={returnToQuizzes}>Back to Quizzes</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )
    }

    // Show quiz completion screen
    if (quizCompleted) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                <CardDescription>You've completed the {currentQuiz.title} quiz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="inline-flex rounded-full bg-green-100 p-6">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold mb-2">
                    {scoreData.score} / {scoreData.total}
                  </p>
                  <p className="text-muted-foreground">Correct answers</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Button variant="outline" onClick={startQuiz}>
                  Retry Quiz
                </Button>
                <Button onClick={viewResults}>View Results</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )
    }

    // Show active quiz question
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">{currentQuiz.title}</h1>
              <Button variant="ghost" size="sm" onClick={returnToQuizzes}>
                Exit Quiz
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                </span>
                <span>{Math.round(((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100)}%</span>
              </div>
              <Progress value={((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100} className="h-2" />
            </div>
          </header>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h2 className="text-xl font-medium">{currentQuestion.question}</h2>

                {currentQuestion.type === "multiple-choice" && (
                  <RadioGroup
                    value={selectedAnswers[currentQuestionIndex]?.toString()}
                    onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
                  >
                    <div className="grid gap-3">
                      {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label
                            htmlFor={`option-${index}`}
                            className="flex-grow p-3 rounded-md hover:bg-muted cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {currentQuestion.type === "true-false" && (
                  <RadioGroup
                    value={selectedAnswers[currentQuestionIndex]?.toString()}
                    onValueChange={(value) => handleAnswerSelect(value === "true")}
                  >
                    <div className="grid gap-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="true" />
                        <Label htmlFor="true" className="flex-grow p-3 rounded-md hover:bg-muted cursor-pointer">
                          True
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="false" />
                        <Label htmlFor="false" className="flex-grow p-3 rounded-md hover:bg-muted cursor-pointer">
                          False
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                {currentQuestion.type === "multiple-choice" ? "Select one option" : "Select true or false"}
              </div>
              <Button onClick={nextQuestion} disabled={!isAnswered}>
                {currentQuestionIndex < currentQuiz.questions.length - 1 ? (
                  <>
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  "Finish Quiz"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  // Show quiz selection screen
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Quizzes</h1>
            <p className="text-muted-foreground">Test your knowledge with AI-generated quizzes</p>
          </div>
          <div className="flex gap-2">
            <Link href="/upload">
              <Button variant="outline">Upload New Document</Button>
            </Link>
            <Link href="/flashcards">
              <Button variant="outline">View Flashcards</Button>
            </Link>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>Introduction to Psychology</CardTitle>
                      <CardDescription>Test your knowledge of basic psychological concepts</CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>5 min</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>5 questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>Multiple choice, True/False</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                  <Button size="sm" onClick={startQuiz}>
                    Start Quiz
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>World History: Ancient Civilizations</CardTitle>
                      <CardDescription>Test your knowledge of ancient world history</CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>10 min</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>10 questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>Multiple choice, Fill in the blank</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                  <Button size="sm">Start Quiz</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>Basic Mathematics</CardTitle>
                      <CardDescription>Algebra and geometry fundamentals</CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <BarChart3 className="h-4 w-4" />
                      <span>80% score</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score</span>
                      <span>8/10 correct</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Results
                  </Button>
                  <Button size="sm">Retry Quiz</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Custom Quiz</CardTitle>
                <CardDescription>Customize a quiz based on your specific learning needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="document">Select Document</Label>
                    <select
                      id="document"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="psychology">Introduction to Psychology.pdf</option>
                      <option value="history">World History Notes.docx</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Question Types</Label>
                    <div className="grid gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="multiple-choice" defaultChecked />
                        <Label htmlFor="multiple-choice">Multiple Choice</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="true-false" defaultChecked />
                        <Label htmlFor="true-false">True/False</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="fill-blank" />
                        <Label htmlFor="fill-blank">Fill in the Blank</Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <select
                      id="difficulty"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="questions">Number of Questions</Label>
                    <select
                      id="questions"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="5">5 questions</option>
                      <option value="10">10 questions</option>
                      <option value="15">15 questions</option>
                      <option value="20">20 questions</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate Custom Quiz</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
