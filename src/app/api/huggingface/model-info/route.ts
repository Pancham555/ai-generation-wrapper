import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const model = url.searchParams.get("model");

    if (!model) {
      return NextResponse.json(
        { error: "Model parameter is required" },
        { status: 400 }
      );
    }

    // In a real application, you would call the Hugging Face API to get model info
    // For this example, we'll return mock data
    const mockDescriptions: Record<string, string> = {
      "stabilityai/stable-diffusion-3.5-large":
        "A powerful text-to-image model with high-quality output and fast inference.",
      "stabilityai/stable-diffusion-xl-base-1.0":
        "An advanced version of Stable Diffusion with improved image quality and more diverse outputs.",
      "runwayml/stable-diffusion-v1-5":
        "A popular text-to-image model known for its versatility and good performance.",
      "prompthero/openjourney":
        "A fine-tuned Stable Diffusion model that produces images in a style similar to Midjourney.",
      "dreamlike-art/dreamlike-diffusion-1.0":
        "A Stable Diffusion model fine-tuned to produce dreamlike and surreal images.",
    };

    const description =
      mockDescriptions[model] || "No description available for this model.";

    return NextResponse.json({ description });
  } catch (error) {
    console.error("Error fetching model info:", error);
    return NextResponse.json(
      { error: "Failed to fetch model information" },
      { status: 500 }
    );
  }
}
