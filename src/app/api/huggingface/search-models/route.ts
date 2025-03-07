import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");
    // const task = url.searchParams.get("task") || "text-to-image";

    if (!query) {
      return NextResponse.json({ models: [] });
    }

    // This is a simplified implementation
    // In a real app, you would call the Hugging Face API to search for models
    // For now, we'll return some mock data based on the query
    const mockModels = [
      {
        id: "stabilityai/stable-diffusion-3.5-large",
        name: "Stable Diffusion 3.5 Large",
      },
      {
        id: "stabilityai/stable-diffusion-xl-base-1.0",
        name: "Stable Diffusion XL",
      },
      { id: "runwayml/stable-diffusion-v1-5", name: "Stable Diffusion v1.5" },
      { id: "prompthero/openjourney", name: "Midjourney Style (OpenJourney)" },
      {
        id: "dreamlike-art/dreamlike-diffusion-1.0",
        name: "Dreamlike Diffusion",
      },
      { id: "lykon/dreamshaper-xl-1-0", name: "Dreamshaper XL" },
      { id: "CompVis/stable-diffusion-v1-4", name: "Stable Diffusion v1.4" },
      { id: "andite/anything-v4.0", name: "Anything v4.0" },
      { id: "nitrosocke/Ghibli-Diffusion", name: "Ghibli Diffusion" },
      { id: "nitrosocke/mo-di-diffusion", name: "Modern Disney Diffusion" },
    ];

    // Filter models based on query
    const filteredModels = mockModels.filter(
      (model) =>
        model.id.toLowerCase().includes(query.toLowerCase()) ||
        model.name.toLowerCase().includes(query.toLowerCase())
    );

    return NextResponse.json([...filteredModels]);
    // return NextResponse.json({ models: filteredModels });
  } catch (error) {
    console.error("Error searching models:", error);
    return NextResponse.json(
      { error: "Failed to search models" },
      { status: 500 }
    );
  }
}
