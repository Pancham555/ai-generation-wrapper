import {
  // type NextRequest,
  NextResponse,
} from "next/server";

export async function POST() {
  // req: NextRequest
  try {
    // const { messages } = await req.json();

    // In a real application, you would call the Hugging Face API here
    // For this example, we'll return a mock response
    const mockResponses = [
      "That's an interesting question! Let me think about it.",
      "Based on the information provided, I would suggest...",
      "I'm not entirely sure, but here's what I think:",
      "That's a complex topic. Here's a simplified explanation:",
      "Great question! Here's what I know about that:",
    ];

    const randomResponse =
      mockResponses[Math.floor(Math.random() * mockResponses.length)];

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ response: randomResponse });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
