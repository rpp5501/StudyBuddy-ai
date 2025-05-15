import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BookOpen, FileText, Upload, Calendar, BrainCircuit, Lightbulb, Trophy } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Track your study progress and manage your documents</p>
          </div>
          <div className="flex gap-2">
            <Link href="/upload">
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </Link>
            <Link href="/quizzes">
              <Button className="gap-2">
                <BrainCircuit className="h-4 w-4" />
                Take Quiz
              </Button>
            </Link>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 uploaded this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Flashcards Mastered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Quiz Score Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76%</div>
              <p className="text-xs text-muted-foreground">8 quizzes completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader>
              <CardTitle>Study Progress</CardTitle>
              <CardDescription>Your learning activity over the past 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end gap-2">
                <div className="flex-1 bg-muted/30 rounded-t-md h-[30%] relative">
                  <div className="absolute -top-6 w-full text-center text-xs">Mon</div>
                </div>
                <div className="flex-1 bg-muted/30 rounded-t-md h-[60%] relative">
                  <div className="absolute -top-6 w-full text-center text-xs">Tue</div>
                </div>
                <div className="flex-1 bg-muted/30 rounded-t-md h-[45%] relative">
                  <div className="absolute -top-6 w-full text-center text-xs">Wed</div>
                </div>
                <div className="flex-1 bg-muted/30 rounded-t-md h-[80%] relative">
                  <div className="absolute -top-6 w-full text-center text-xs">Thu</div>
                </div>
                <div className="flex-1 bg-muted/30 rounded-t-md h-[65%] relative">
                  <div className="absolute -top-6 w-full text-center text-xs">Fri</div>
                </div>
                <div className="flex-1 bg-primary rounded-t-md h-[90%] relative">
                  <div className="absolute -top-6 w-full text-center text-xs">Sat</div>
                </div>
                <div className="flex-1 bg-muted/30 rounded-t-md h-[40%] relative">
                  <div className="absolute -top-6 w-full text-center text-xs">Sun</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Study Streak</CardTitle>
              <CardDescription>Keep your learning momentum going</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="10"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-primary stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    strokeDasharray="251.2"
                    strokeDashoffset="75.36"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">5</span>
                  <span className="text-sm text-muted-foreground">days</span>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                You're on a 5-day study streak! Keep it up!
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="recent" className="mb-8">
          <TabsList>
            <TabsTrigger value="recent">Recent Documents</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="mt-6">
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
                      <Link href="/concepts">
                        <Button variant="outline" size="sm">
                          Concepts
                        </Button>
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
                      <Link href="/concepts">
                        <Button variant="outline" size="sm">
                          Concepts
                        </Button>
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
                        <CardTitle className="text-base">Calculus Formulas.pdf</CardTitle>
                        <CardDescription>Uploaded 1 week ago</CardDescription>
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
                      <Link href="/concepts">
                        <Button variant="outline" size="sm">
                          Concepts
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="flashcards" className="mt-6">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-base">Psychology Concepts</CardTitle>
                        <CardDescription>42 flashcards</CardDescription>
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-sm font-medium">Progress</div>
                      <div className="text-xs text-muted-foreground">28/42 mastered</div>
                      <Progress value={66} className="h-2 w-32" />
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <Link href="/flashcards" className="w-full">
                    <Button variant="outline" className="w-full">
                      Continue Studying
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-base">World History Dates</CardTitle>
                        <CardDescription>36 flashcards</CardDescription>
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-sm font-medium">Progress</div>
                      <div className="text-xs text-muted-foreground">12/36 mastered</div>
                      <Progress value={33} className="h-2 w-32" />
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <Link href="/flashcards" className="w-full">
                    <Button variant="outline" className="w-full">
                      Continue Studying
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="quizzes" className="mt-6">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BrainCircuit className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-base">Psychology Fundamentals</CardTitle>
                        <CardDescription>Completed 2 days ago</CardDescription>
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-sm font-medium">Score</div>
                      <div className="text-xs text-muted-foreground">8/10 correct</div>
                      <Progress value={80} className="h-2 w-32" />
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="w-full">
                      View Results
                    </Button>
                    <Link href="/quizzes" className="w-full">
                      <Button className="w-full">Retry Quiz</Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BrainCircuit className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-base">Ancient Civilizations</CardTitle>
                        <CardDescription>Completed 1 week ago</CardDescription>
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-sm font-medium">Score</div>
                      <div className="text-xs text-muted-foreground">7/10 correct</div>
                      <Progress value={70} className="h-2 w-32" />
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="w-full">
                      View Results
                    </Button>
                    <Link href="/quizzes" className="w-full">
                      <Button className="w-full">Retry Quiz</Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Study Tips</CardTitle>
              <CardDescription>AI-powered recommendations to improve your learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-primary/10 rounded-full p-2 h-fit">
                    <Lightbulb className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Focus on Psychology Terminology</h3>
                    <p className="text-sm text-muted-foreground">
                      Your quiz results show you need more practice with technical terms. Try creating custom flashcards
                      for these concepts.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary/10 rounded-full p-2 h-fit">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Schedule Regular Review Sessions</h3>
                    <p className="text-sm text-muted-foreground">
                      Set aside 15-20 minutes daily to review your World History flashcards to improve retention.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary/10 rounded-full p-2 h-fit">
                    <Trophy className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Challenge Yourself</h3>
                    <p className="text-sm text-muted-foreground">
                      Try taking quizzes at a higher difficulty level to deepen your understanding of the material.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Study Goals</CardTitle>
              <CardDescription>Track your learning objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Checkbox id="goal-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="goal-1" className="text-sm font-medium">
                      Complete Psychology Flashcards
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Master all 42 psychology concept flashcards by Friday
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="goal-2" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="goal-2" className="text-sm font-medium">
                      Take World History Quiz
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Complete the Ancient Civilizations quiz with at least 80% score
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="goal-3" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="goal-3" className="text-sm font-medium">
                      Upload Calculus Notes
                    </Label>
                    <p className="text-xs text-muted-foreground">Process Chapter 5 notes on differential equations</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="goal-4" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="goal-4" className="text-sm font-medium">
                      Create Custom Quiz
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Generate a practice quiz focusing on psychology research methods
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add New Goal
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
