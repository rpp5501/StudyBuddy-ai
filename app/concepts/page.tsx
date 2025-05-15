"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, FileText, Network, AlignLeft, Lightbulb, ChevronRight, ChevronDown, Search, Send } from "lucide-react"

// Mock data for concepts
const mockConcepts = [
  {
    id: "c1",
    title: "Classical Conditioning",
    description:
      "A learning process that occurs through associations between environmental stimuli and naturally occurring stimuli.",
    details:
      "Classical conditioning (also known as Pavlovian conditioning) is a learning procedure in which a biologically potent stimulus (e.g. food) is paired with a previously neutral stimulus (e.g. a bell). The neutral stimulus comes to elicit a response (e.g. salivation) that is usually similar to the one elicited by the potent stimulus.",
    relatedConcepts: ["Operant Conditioning", "Behaviorism", "Stimulus-Response Theory"],
    examples: [
      "Pavlov's dogs salivating at the sound of a bell",
      "A child developing a fear of dogs after being bitten",
      "Developing positive associations with a song that was playing during a happy moment",
    ],
  },
  {
    id: "c2",
    title: "Operant Conditioning",
    description: "A method of learning that employs rewards and punishments for behavior.",
    details:
      "Operant conditioning is a method of learning that occurs through rewards and punishments for behavior. Through operant conditioning, an individual makes an association between a particular behavior and a consequence. B.F. Skinner is regarded as the father of operant conditioning.",
    relatedConcepts: ["Classical Conditioning", "Reinforcement", "Punishment", "Behaviorism"],
    examples: [
      "A child receiving a star for good behavior",
      "A dog sitting to receive a treat",
      "A student studying harder after receiving good grades",
    ],
  },
  {
    id: "c3",
    title: "Cognitive Dissonance",
    description: "Mental discomfort that results from holding conflicting beliefs, values, or attitudes.",
    details:
      "Cognitive dissonance refers to a situation involving conflicting attitudes, beliefs or behaviors. This produces a feeling of mental discomfort leading to an alteration in one of the attitudes, beliefs or behaviors to reduce the discomfort and restore balance.",
    relatedConcepts: ["Attitude Change", "Self-Perception Theory", "Confirmation Bias"],
    examples: [
      "Continuing to smoke despite knowing it causes cancer",
      "Justifying an expensive purchase that you can't really afford",
      "Changing your opinion to match those of your friends",
    ],
  },
  {
    id: "c4",
    title: "Maslow's Hierarchy of Needs",
    description: "A theory of psychological health predicated on fulfilling innate human needs in priority.",
    details:
      "Maslow's hierarchy of needs is a motivational theory in psychology comprising a five-tier model of human needs, often depicted as hierarchical levels within a pyramid. From the bottom of the hierarchy upwards, the needs are: physiological (food and clothing), safety (job security), love and belonging needs (friendship), esteem, and self-actualization.",
    relatedConcepts: ["Self-Actualization", "Humanistic Psychology", "Motivation Theory"],
    examples: [
      "Focusing on finding food and shelter before pursuing education",
      "Seeking relationships after establishing financial security",
      "Pursuing creative fulfillment after achieving recognition in your field",
    ],
  },
  {
    id: "c5",
    title: "Confirmation Bias",
    description:
      "The tendency to search for, interpret, favor, and recall information in a way that confirms one's preexisting beliefs.",
    details:
      "Confirmation bias is the tendency to search for, interpret, favor, and recall information in a way that confirms or supports one's prior beliefs or values. People display this bias when they select information that supports their views, ignoring contrary information, or when they interpret ambiguous evidence as supporting their existing attitudes.",
    relatedConcepts: ["Cognitive Bias", "Selective Perception", "Belief Perseverance"],
    examples: [
      "Only reading news sources that align with your political views",
      "Remembering the hits and forgetting the misses when evaluating a prediction",
      "Interpreting ambiguous symptoms as confirming a suspected illness",
    ],
  },
]

// Mock chat messages
const initialMessages = [
  {
    role: "system",
    content: "Welcome to the AI Study Assistant! Ask me anything about the concepts in your document.",
  },
]

// Mind map node type
type MindMapNode = {
  id: string
  label: string
  children?: MindMapNode[]
}

// Create mind map data from concepts
const mindMapData: MindMapNode = {
  id: "root",
  label: "Psychology Concepts",
  children: mockConcepts.map((concept) => ({
    id: concept.id,
    label: concept.title,
    children: concept.relatedConcepts.map((related, index) => ({
      id: `${concept.id}-${index}`,
      label: related,
    })),
  })),
}

export default function ConceptsPage() {
  const [expandedConcepts, setExpandedConcepts] = useState<string[]>([])
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [messages, setMessages] = useState(initialMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const toggleConcept = (conceptId: string) => {
    setExpandedConcepts((prev) =>
      prev.includes(conceptId) ? prev.filter((id) => id !== conceptId) : [...prev, conceptId],
    )
  }

  const selectConcept = (conceptId: string) => {
    setSelectedConcept(conceptId)
    // Add a system message about the selected concept
    const concept = mockConcepts.find((c) => c.id === conceptId)
    if (concept) {
      setMessages([
        ...initialMessages,
        {
          role: "system",
          content: `You're now viewing the concept: ${concept.title}. Ask me anything about it!`,
        },
      ])
    }
  }

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    const newMessages = [...messages, { role: "user", content: inputMessage }]
    setMessages(newMessages)
    setInputMessage("")

    // Simulate AI response
    setTimeout(() => {
      const concept = selectedConcept ? mockConcepts.find((c) => c.id === selectedConcept) : null

      let responseContent = "I'm not sure about that. Could you select a specific concept first?"

      if (concept) {
        if (inputMessage.toLowerCase().includes("example")) {
          responseContent = `Here are some examples of ${concept.title}:\n\n${concept.examples.map((ex) => `• ${ex}`).join("\n")}`
        } else if (inputMessage.toLowerCase().includes("related")) {
          responseContent = `Concepts related to ${concept.title} include: ${concept.relatedConcepts.join(", ")}.`
        } else {
          responseContent = `${concept.details}\n\nWould you like to know more about specific examples or related concepts?`
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: responseContent }])
    }, 1000)
  }

  const filteredConcepts = searchQuery
    ? mockConcepts.filter(
        (concept) =>
          concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          concept.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : mockConcepts

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Concept Explorer</h1>
            <p className="text-muted-foreground">Explore key concepts from your documents</p>
          </div>
          <div className="flex gap-2">
            <Link href="/upload">
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload New
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Document selector */}
          <Card className="w-full lg:w-64 h-fit">
            <CardHeader>
              <CardTitle className="text-lg">Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="text-sm font-medium">Introduction to Psychology.pdf</div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md">
                  <FileText className="h-5 w-5" />
                  <div className="text-sm">World History Notes.docx</div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md">
                  <FileText className="h-5 w-5" />
                  <div className="text-sm">Calculus Formulas.pdf</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main content area */}
          <div className="flex-1">
            <Tabs defaultValue="concepts" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="concepts" className="gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Concepts
                </TabsTrigger>
                <TabsTrigger value="mindmap" className="gap-2">
                  <Network className="h-4 w-4" />
                  Mind Map
                </TabsTrigger>
                <TabsTrigger value="summary" className="gap-2">
                  <AlignLeft className="h-4 w-4" />
                  Summary
                </TabsTrigger>
              </TabsList>

              {/* Concepts Tab */}
              <TabsContent value="concepts" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Concept List */}
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">Key Concepts</CardTitle>
                      <CardDescription>Explore the main concepts from your document</CardDescription>
                      <div className="relative mt-2">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search concepts..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-2">
                          {filteredConcepts.map((concept) => (
                            <div key={concept.id} className="space-y-2">
                              <div
                                className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-muted/50 ${selectedConcept === concept.id ? "bg-muted" : ""}`}
                                onClick={() => selectConcept(concept.id)}
                              >
                                <div className="flex-1">
                                  <h3 className="font-medium">{concept.title}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-1">{concept.description}</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleConcept(concept.id)
                                  }}
                                >
                                  {expandedConcepts.includes(concept.id) ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>

                              {expandedConcepts.includes(concept.id) && (
                                <div className="pl-3 pr-1 pb-2 text-sm">
                                  <p>{concept.details}</p>
                                  <div className="mt-2">
                                    <h4 className="font-medium text-xs uppercase text-muted-foreground tracking-wider mb-1">
                                      Related Concepts
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                      {concept.relatedConcepts.map((related, index) => (
                                        <div key={index} className="bg-muted px-2 py-1 rounded-md text-xs">
                                          {related}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Concept Details and Chat */}
                  <Card className="lg:col-span-2">
                    <Tabs defaultValue="details" className="w-full">
                      <TabsList className="grid grid-cols-2 w-full">
                        <TabsTrigger value="details">Concept Details</TabsTrigger>
                        <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
                      </TabsList>

                      {/* Concept Details Tab */}
                      <TabsContent value="details" className="mt-0">
                        {selectedConcept ? (
                          <div className="p-6">
                            {mockConcepts
                              .filter((c) => c.id === selectedConcept)
                              .map((concept) => (
                                <div key={concept.id} className="space-y-6">
                                  <div>
                                    <h2 className="text-2xl font-bold mb-2">{concept.title}</h2>
                                    <p className="text-muted-foreground">{concept.description}</p>
                                  </div>

                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">Detailed Explanation</h3>
                                    <p>{concept.details}</p>
                                  </div>

                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">Examples</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                      {concept.examples.map((example, index) => (
                                        <li key={index}>{example}</li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">Related Concepts</h3>
                                    <div className="flex flex-wrap gap-2">
                                      {concept.relatedConcepts.map((related, index) => (
                                        <div
                                          key={index}
                                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                                        >
                                          {related}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-12 text-center">
                            <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">Select a concept</h3>
                            <p className="text-sm text-muted-foreground max-w-md">
                              Choose a concept from the list to view detailed information and explanations.
                            </p>
                          </div>
                        )}
                      </TabsContent>

                      {/* Chat Assistant Tab */}
                      <TabsContent value="chat" className="mt-0 flex flex-col h-[600px]">
                        <div className="flex-1 overflow-y-auto p-4">
                          {messages.map((message, index) => (
                            <div
                              key={index}
                              className={`mb-4 ${
                                message.role === "user"
                                  ? "flex justify-end"
                                  : message.role === "system"
                                    ? "flex justify-center"
                                    : "flex justify-start"
                              }`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                  message.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : message.role === "system"
                                      ? "bg-muted text-muted-foreground text-sm"
                                      : "bg-muted"
                                }`}
                              >
                                <p className="whitespace-pre-line">{message.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t p-4">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Ask about this concept..."
                              value={inputMessage}
                              onChange={(e) => setInputMessage(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  sendMessage()
                                }
                              }}
                            />
                            <Button size="icon" onClick={sendMessage}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </Card>
                </div>
              </TabsContent>

              {/* Mind Map Tab */}
              <TabsContent value="mindmap" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Concept Mind Map</CardTitle>
                    <CardDescription>Visual representation of concepts and their relationships</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="h-[600px] w-full bg-muted/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <MindMapVisualization data={mindMapData} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Summary Tab */}
              <TabsContent value="summary" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Summary</CardTitle>
                    <CardDescription>AI-generated summary of key points from your document</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Introduction to Psychology</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Document uploaded on May 10, 2023 • 42 pages • 15,230 words
                        </p>
                        <Separator className="my-4" />
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Executive Summary</h4>
                        <p>
                          This document provides a comprehensive introduction to the field of psychology, covering the
                          major theoretical frameworks, research methods, and key concepts. The text explores the
                          biological basis of behavior, cognitive processes, learning theories, personality development,
                          and social influences on human behavior.
                        </p>

                        <h4 className="font-medium mt-6">Key Themes</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <span className="font-medium">Behavioral Psychology:</span> Focuses on observable behaviors
                            and how they are shaped by environmental stimuli, including classical and operant
                            conditioning.
                          </li>
                          <li>
                            <span className="font-medium">Cognitive Psychology:</span> Examines internal mental
                            processes such as problem-solving, memory, and language.
                          </li>
                          <li>
                            <span className="font-medium">Developmental Psychology:</span> Studies how people grow and
                            change throughout the lifespan, with emphasis on childhood development.
                          </li>
                          <li>
                            <span className="font-medium">Social Psychology:</span> Investigates how people's thoughts,
                            feelings, and behaviors are influenced by others.
                          </li>
                          <li>
                            <span className="font-medium">Biological Psychology:</span> Explores the role of biological
                            processes in behavior and mental processes.
                          </li>
                        </ul>

                        <h4 className="font-medium mt-6">Main Arguments</h4>
                        <p>
                          The document argues that human behavior is complex and influenced by multiple factors,
                          including biological predispositions, environmental conditions, cognitive processes, and
                          social interactions. It emphasizes the importance of scientific methods in studying
                          psychological phenomena and the practical applications of psychological principles in various
                          fields such as education, healthcare, and business.
                        </p>

                        <h4 className="font-medium mt-6">Conclusions</h4>
                        <p>
                          The field of psychology continues to evolve, with new research methods and theoretical
                          perspectives emerging. Understanding the fundamental concepts in psychology provides a
                          foundation for exploring more specialized areas and applying psychological principles to
                          real-world problems. The document concludes that an interdisciplinary approach, drawing from
                          biology, sociology, and other fields, offers the most comprehensive understanding of human
                          behavior.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mind Map Visualization Component
function MindMapVisualization({ data }: { data: MindMapNode }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Central node */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg z-10">
          {data.label}
        </div>

        {/* First level nodes */}
        {data.children?.map((child, index) => {
          const angle = index * (360 / (data.children?.length || 1)) * (Math.PI / 180)
          const radius = 180
          const x = Math.cos(angle) * radius + 50 // 50% + offset
          const y = Math.sin(angle) * radius + 50 // 50% + offset

          return (
            <div key={child.id}>
              {/* Connection line */}
              <div
                className="absolute bg-muted-foreground/30 h-px transform origin-left"
                style={{
                  top: `calc(50% + ${Math.sin(angle) * (radius / 2)}%)`,
                  left: `calc(50% + ${Math.cos(angle) * (radius / 2)}%)`,
                  width: `${radius / 2}%`,
                  transform: `rotate(${angle * (180 / Math.PI)}deg)`,
                }}
              />

              {/* Node */}
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-card border border-border px-3 py-1.5 rounded-full shadow-md z-10 cursor-pointer hover:bg-muted transition-colors"
                style={{
                  top: `${y}%`,
                  left: `${x}%`,
                  maxWidth: "150px",
                }}
              >
                <p className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">{child.label}</p>
              </div>

              {/* Second level nodes */}
              {child.children?.map((grandchild, gIndex) => {
                const childrenCount = child.children?.length || 1
                const spreadAngle = 40 * (Math.PI / 180) // 40 degrees in radians
                const subAngle = angle + (gIndex - (childrenCount - 1) / 2) * (spreadAngle / childrenCount)
                const subRadius = 100
                const subX = Math.cos(subAngle) * subRadius
                const subY = Math.sin(subAngle) * subRadius

                return (
                  <div key={grandchild.id}>
                    {/* Connection line */}
                    <div
                      className="absolute bg-muted-foreground/20 h-px transform origin-left"
                      style={{
                        top: `calc(${y}% + ${Math.sin(subAngle) * 10}px)`,
                        left: `calc(${x}% + ${Math.cos(subAngle) * 10}px)`,
                        width: `${subRadius / 3}%`,
                        transform: `rotate(${subAngle * (180 / Math.PI)}deg)`,
                      }}
                    />

                    {/* Node */}
                    <div
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-muted/70 px-2 py-1 rounded-full shadow-sm z-5 text-xs"
                      style={{
                        top: `calc(${y}% + ${subY / 2}%)`,
                        left: `calc(${x}% + ${subX / 2}%)`,
                        maxWidth: "120px",
                      }}
                    >
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis">{grandchild.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
