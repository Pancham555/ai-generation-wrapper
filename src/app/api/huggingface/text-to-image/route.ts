import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, model, apiKey } = await req.json();

    if (!prompt || !model || !apiKey) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Hugging Face API error:", error);
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: response.status }
      );
    }

    // Get the image data
    const imageData = await response.arrayBuffer();

    // Return the image
    return new NextResponse(imageData, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error("Error in text-to-image API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
