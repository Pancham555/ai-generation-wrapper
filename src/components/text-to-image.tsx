"use client";

import * as React from "react";
import { Download, Loader2, Send, Info } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

// Style buttons for quick prompt modification
const STYLE_BUTTONS = [
  { name: "Anime Style", value: "anime style" },
  { name: "Pixelated Style", value: "pixelated style" },
  { name: "Realistic", value: "realistic style, highly detailed" },
  { name: "Watercolor", value: "watercolor painting style" },
  { name: "3D Render", value: "3D render, octane render" },
];

// Default model
const DEFAULT_MODEL = "stabilityai/stable-diffusion-3.5-large";

// Popular models for quick selection
const POPULAR_MODELS = [
  {
    name: "Stable Diffusion 3.5 Large",
    id: "stabilityai/stable-diffusion-3.5-large",
  },
  {
    name: "Stable Diffusion XL",
    id: "stabilityai/stable-diffusion-xl-base-1.0",
  },
  { name: "Midjourney Style", id: "prompthero/openjourney" },
  { name: "Dreamshaper", id: "lykon/dreamshaper-xl-1-0" },
];

export function TextToImage() {
  const [apiKey, setApiKey] = React.useState<string>("");
  const [showApiKeyModal, setShowApiKeyModal] = React.useState(true);
  const [prompt, setPrompt] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState(DEFAULT_MODEL);
  const [modelSearch, setModelSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<
    { id: string; name: string }[]
  >([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedImage, setGeneratedImage] = React.useState<string | null>(
    null
  );

  const router = useRouter();

  // Add a new state for model descriptions
  const [modelDescriptions, setModelDescriptions] = React.useState<
    Record<string, string>
  >({});

  // Save API key to localStorage
  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast("API Key Required", {
        description: "Please enter your Hugging Face API key to continue.",
      });
      return;
    }

    localStorage.setItem("hf_api_key", apiKey);
    setShowApiKeyModal(false);
    toast("API Key Saved", {
      description: "Your Hugging Face API key has been saved.",
    });
  };

  // Load API key from localStorage on component mount
  React.useEffect(() => {
    const savedApiKey = localStorage.getItem("hf_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyModal(false);
    }
  }, []);

  // Modify the searchModels function to fetch descriptions
  const searchModels = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/huggingface/search-models?query=${encodeURIComponent(
          query
        )}&task=text-to-image`
      );
      const data = await response.json();
      setSearchResults(data.models || []);

      // Fetch descriptions for each model
      const descriptions: Record<string, string> = {};
      for (const model of data.models) {
        const descResponse = await fetch(
          `/api/huggingface/model-info?model=${encodeURIComponent(model.id)}`
        );
        const descData = await descResponse.json();
        descriptions[model.id] =
          descData.description || "No description available.";
      }
      setModelDescriptions(descriptions);
    } catch (error) {
      console.error("Error searching models:", error);
      toast("Search Failed", {
        description: "Failed to search for models. Please try again.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (modelSearch) {
        searchModels(modelSearch);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [modelSearch]);

  // Add style to prompt
  const addStyle = (style: string) => {
    setPrompt((prev) => {
      const basePrompt = prev.trim();
      return basePrompt ? `${basePrompt}, ${style}` : style;
    });
  };

  // Generate image
  const generateImage = async () => {
    if (!prompt.trim()) {
      toast("Prompt Required", {
        description: "Please enter a prompt to generate an image.",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/huggingface/text-to-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          model: selectedModel,
          apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      toast("Generation Failed", {
        description:
          "Failed to generate image. Please check your API key and try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Download generated image
  const downloadImage = () => {
    if (!generatedImage) return;

    const a = document.createElement("a");
    a.href = generatedImage;
    a.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex h-full flex-col">
      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              Enter Hugging Face API Key
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              You need a Hugging Face API key to use the text-to-image feature.
              Get your key from{" "}
              <a
                href="https://huggingface.co/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                huggingface.co/settings/tokens
              </a>
            </p>
            <Input
              type="password"
              placeholder="hf_..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>
              <Button onClick={saveApiKey}>Save API Key</Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Input
                placeholder="Search for models..."
                value={modelSearch}
                onChange={(e) => setModelSearch(e.target.value)}
                className="w-full"
              />
              {isSearching && (
                <Loader2 className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin" />
              )}
            </div>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-2 text-xs font-medium text-muted-foreground">
                    Popular Models
                  </div>
                  {POPULAR_MODELS.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2">
                              {model.name}
                              <Info className="h-4 w-4" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              {modelDescriptions[model.id] ||
                                "Loading description..."}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </SelectItem>
                  ))}

                  {searchResults.length > 0 && (
                    <>
                      <div className="p-2 text-xs font-medium text-muted-foreground">
                        Search Results
                      </div>
                      {searchResults.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-2">
                                  {model.name || model.id}
                                  <Info className="h-4 w-4" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  {modelDescriptions[model.id] ||
                                    "Loading description..."}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </SelectItem>
                      ))}
                    </>
                  )}
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            {STYLE_BUTTONS.map((style) => (
              <Button
                key={style.name}
                variant="outline"
                size="sm"
                onClick={() => addStyle(style.value)}
                className="text-xs"
              >
                {style.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          {generatedImage && (
            <Card className="overflow-hidden">
              <CardContent className="p-2">
                <div className="relative aspect-square w-full overflow-hidden rounded-md">
                  <Image
                    width={6000}
                    height={6000}
                    src={generatedImage || "/placeholder.svg"}
                    alt="Generated image"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-2 right-2"
                    onClick={downloadImage}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-auto flex flex-col sm:flex-row gap-2">
            <Textarea
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[80px] flex-1 resize-none"
            />
            <Button
              className="self-end"
              disabled={isGenerating || !prompt.trim()}
              onClick={generateImage}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Generate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
