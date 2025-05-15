import { NextResponse } from "next/server"

// Mock concept data for the chat API
const conceptData = {
  c1: {
    title: "Classical Conditioning",
    details:
      "Classical conditioning is a learning procedure in which a biologically potent stimulus (e.g. food) is paired with a previously neutral stimulus (e.g. a bell). The neutral stimulus comes to elicit a response (e.g. salivation) that is usually similar to the one elicited by the potent stimulus.",
    examples: [
      "Pavlov's dogs salivating at the sound of a bell",
      "A child developing a fear of dogs after being bitten",
      "Developing positive associations with a song that was playing during a happy moment",
    ],
    relatedConcepts: ["Operant Conditioning", "Behaviorism", "Stimulus-Response Theory"],
  },
  c2: {
    title: "Operant Conditioning",
    details:
      "Operant conditioning is a method of learning that occurs through rewards and punishments for behavior. Through operant conditioning, an individual makes an association between a particular behavior and a consequence.",
    examples: [
      "A child receiving a star for good behavior",
      "A dog sitting to receive a treat",
      "A student studying harder after receiving good grades",
    ],
    relatedConcepts: ["Classical Conditioning", "Reinforcement", "Punishment", "Behaviorism"],
  },
}

export async function POST(request: Request) {
  try {
    const { message, conceptId } = await request.json()

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let response = "I'm not sure about that. Could you select a specific concept first?"

    if (conceptId && conceptData[conceptId as keyof typeof conceptData]) {
      const concept = conceptData[conceptId as keyof typeof conceptData]

      if (message.toLowerCase().includes("example")) {
        response = `Here are some examples of ${concept.title}:\n\n${concept.examples.map((ex: string) => `• ${ex}`).join("\n")}`
      } else if (message.toLowerCase().includes("related")) {
        response = `Concepts related to ${concept.title} include: ${concept.relatedConcepts.join(", ")}.`
      } else {
        response = `${concept.details}\n\nWould you like to know more about specific examples or related concepts?`
      }
    }

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
