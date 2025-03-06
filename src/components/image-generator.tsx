"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Download,
  RefreshCw,
  Send,
  Upload,
  Wand2,
  Sparkles,
  Camera,
  Palette,
  Layers,
  Pencil,
  Droplets,
  Grid,
  PaintBucket,
  Wand,
  ChevronDown,
  ChevronUp,
  Key,
  Search,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

// Define image style presets with logos
const stylePresets = [
  {
    id: "realistic",
    name: "Realistic",
    description: "Photorealistic style",
    icon: Camera,
  },
  {
    id: "anime",
    name: "Anime",
    description: "Japanese anime style",
    icon: Palette,
  },
  {
    id: "3d",
    name: "3D Render",
    description: "3D rendered style",
    icon: Layers,
  },
  {
    id: "watercolor",
    name: "Watercolor",
    description: "Watercolor painting style",
    icon: Droplets,
  },
  {
    id: "sketch",
    name: "Sketch",
    description: "Hand-drawn sketch style",
    icon: Pencil,
  },
  {
    id: "pixel",
    name: "Pixel Art",
    description: "Retro pixel art style",
    icon: Grid,
  },
  {
    id: "oil",
    name: "Oil Painting",
    description: "Classical oil painting style",
    icon: PaintBucket,
  },
  {
    id: "fantasy",
    name: "Fantasy",
    description: "Fantasy art style",
    icon: Wand,
  },
];

// Define AI models with descriptions and example outputs
const aiModels = [
  {
    id: "stabilityai/stable-diffusion-3.5-large",
    name: "stabilityai/stable-diffusion-3.5-large",
    description:
      "Latest version of Stable Diffusion with improved quality and detail",
    example: "A hyper-realistic portrait of a cyberpunk character",
  },
  {
    id: "runwayml/stable-diffusion-v1-5",
    name: "Stable Diffusion 1.5",
    description: "Versatile text-to-image model with good general performance",
    example: "A serene landscape with a mountain lake at sunset",
  },
  {
    id: "CompVis/stable-diffusion-v1-4",
    name: "Stable Diffusion 1.4",
    description: "Earlier version of Stable Diffusion, good for various styles",
    example: "A futuristic cityscape with flying cars and neon lights",
  },
  {
    id: "prompthero/openjourney",
    name: "Openjourney",
    description:
      "Fine-tuned Stable Diffusion model for creative and artistic outputs",
    example: "A magical forest with glowing mushrooms and fairy creatures",
  },
];

// Chat message type
type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: string;
  attachedImage?: string;
};

export function ImageGenerator() {
  const [prompt, setPrompt] = React.useState("");
  const [negativePrompt, setNegativePrompt] = React.useState("");
  const [showNegativePrompt, setShowNegativePrompt] = React.useState(false);
  const [selectedStyle, setSelectedStyle] = React.useState("realistic");
  const [selectedModel, setSelectedModel] = React.useState(
    "stabilityai/stable-diffusion-3.5-large"
  );
  const [generatedImage, setGeneratedImage] = React.useState<string | null>(
    null
  );
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your AI assistant. Describe what image you'd like to create, or upload a reference image to get started.",
      sender: "assistant",
      timestamp: "Just now",
    },
  ]);
  const [chatInput, setChatInput] = React.useState("");
  const chatEndRef = React.useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = React.useState("");
  const [showApiKeyModal, setShowApiKeyModal] = React.useState(true);
  const [modelSearch, setModelSearch] = React.useState("");
  const [showChat, setShowChat] = React.useState(false);

  // Scroll to bottom of chat when messages change
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle image generation
  const generateImage = async () => {
    if (!prompt.trim() || !apiKey || !selectedModel) return;

    setIsGenerating(true);

    // Create the full prompt with style explicitly appended
    let fullPrompt = prompt.trim();

    // Explicitly append the appropriate style based on selection
    if (selectedStyle === "realistic") {
      fullPrompt += ", realistic style";
    } else if (selectedStyle === "anime") {
      fullPrompt += ", anime style";
    } else if (selectedStyle === "3d") {
      fullPrompt += ", 3D render style";
    } else if (selectedStyle === "watercolor") {
      fullPrompt += ", watercolor style";
    } else if (selectedStyle === "sketch") {
      fullPrompt += ", sketch style";
    } else if (selectedStyle === "pixel") {
      fullPrompt += ", pixel art style";
    } else if (selectedStyle === "oil") {
      fullPrompt += ", oil painting style";
    } else if (selectedStyle === "fantasy") {
      fullPrompt += ", fantasy style";
    }

    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${selectedModel}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: fullPrompt,
            negative_prompt: negativePrompt,
          }),
        }
      );

      if (!response.ok) throw new Error("Image generation failed");

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);

      addMessage({
        id: Date.now().toString(),
        content: `I've generated an image based on your prompt: "${fullPrompt}"${
          negativePrompt ? ` with negative prompt: "${negativePrompt}"` : ""
        } using ${aiModels.find((m) => m.id === selectedModel)?.name} model.`,
        sender: "assistant",
        timestamp: "Just now",
      });

      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  // Add a message to the chat
  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  // Handle sending a chat message
  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    // Add user message
    addMessage({
      id: Date.now().toString(),
      content: chatInput,
      sender: "user",
      timestamp: "Just now",
    });

    // Update prompt with chat input
    setPrompt((prev) => `${prev} ${chatInput}`.trim());

    // Clear input
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        content:
          "I've updated your prompt with the additional details. Would you like to generate a new image?",
        sender: "assistant",
        timestamp: "Just now",
      });
    }, 1000);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;

      addMessage({
        id: Date.now().toString(),
        content:
          "I've uploaded a reference image to help guide the generation.",
        sender: "user",
        timestamp: "Just now",
        attachedImage: imageUrl,
      });

      setTimeout(() => {
        addMessage({
          id: (Date.now() + 1).toString(),
          content:
            "Thanks for the reference image! I'll use this to better understand your vision. Would you like to adjust your prompt or generate now?",
          sender: "assistant",
          timestamp: "Just now",
        });
      }, 1000);
    };
    reader.readAsDataURL(file);

    // Reset the input
    e.target.value = "";
  };

  // Handle image download
  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded successfully!");
    }
  };

  // Filter models based on search
  const filteredModels = aiModels.filter(
    (model) =>
      model.name.toLowerCase().includes(modelSearch.toLowerCase()) ||
      model.description.toLowerCase().includes(modelSearch.toLowerCase())
  );

  return (
    <>
      <Dialog open={showApiKeyModal} onOpenChange={setShowApiKeyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Hugging Face API Key</DialogTitle>
            <DialogDescription>
              Please enter your Hugging Face API key to use the image generation
              service.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="password"
            placeholder="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <DialogFooter>
            <Button
              onClick={() => setShowApiKeyModal(false)}
              disabled={!apiKey.trim()}
            >
              Save API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex h-screen bg-background">
        <Sidebar collapsible="icon" className="flex-shrink-0 border-r">
          <SidebarHeader className="flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2">
              <Wand2 className="h-6 w-6" />
              <h1 className="text-xl font-bold">AI Image Generator</h1>
            </div>
            <Separator />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Style Presets</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {stylePresets.map((style) => (
                    <SidebarMenuItem key={style.id}>
                      <SidebarMenuButton
                        isActive={selectedStyle === style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        tooltip={style.description}
                      >
                        <style.icon className="mr-2 h-4 w-4" />
                        <span>{style.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <Button
              variant="outline"
              className="w-full"
              size="sm"
              onClick={() => setShowApiKeyModal(true)}
            >
              <Key className="mr-2 h-4 w-4" />
              <span>Change API Key</span>
            </Button>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px]">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">Image Generation</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChat(!showChat)}
              >
                {showChat ? "Hide Chat" : "Show Chat"}
              </Button>
              <TooltipProvider>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select AI Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Models</SelectLabel>
                      <div className="flex items-center px-2 pb-2">
                        <Search className="mr-2 h-4 w-4 opacity-50" />
                        <Input
                          placeholder="Search models..."
                          value={modelSearch}
                          onChange={(e) => setModelSearch(e.target.value)}
                          className="h-8"
                        />
                      </div>
                      {filteredModels.map((model) => (
                        <Tooltip key={model.id}>
                          <TooltipTrigger asChild>
                            <SelectItem value={model.id}>
                              {model.name}
                            </SelectItem>
                          </TooltipTrigger>
                          <TooltipContent
                            side="left"
                            align="start"
                            className="max-w-[300px]"
                          >
                            <p>{model.description}</p>
                            <p className="mt-2 font-semibold">
                              Example: {model.example}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TooltipProvider>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* Main Content Area - Now using flex to divide space */}
            <div
              className={`flex-1 overflow-hidden ${
                showChat ? "w-2/3" : "w-full"
              }`}
            >
              <ScrollArea className="h-full p-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="prompt">Prompt</Label>
                      <Textarea
                        id="prompt"
                        placeholder="Describe the image you want to generate..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[150px] resize-none w-full"
                      />
                    </div>

                    <div>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setShowNegativePrompt(!showNegativePrompt)
                        }
                        className="w-full justify-between"
                      >
                        {showNegativePrompt ? "Hide" : "Show"} Negative Prompt
                        {showNegativePrompt ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {showNegativePrompt && (
                      <div className="space-y-2">
                        <Label htmlFor="negative-prompt">Negative Prompt</Label>
                        <Textarea
                          id="negative-prompt"
                          placeholder="Elements to avoid in the generated image..."
                          value={negativePrompt}
                          onChange={(e) => setNegativePrompt(e.target.value)}
                          className="min-h-[80px] resize-none w-full"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Style</Label>
                      <div className="flex flex-wrap gap-2">
                        {stylePresets.map((style) => (
                          <Badge
                            key={style.id}
                            variant={
                              selectedStyle === style.id ? "default" : "outline"
                            }
                            className="cursor-pointer"
                            onClick={() => setSelectedStyle(style.id)}
                          >
                            <style.icon className="mr-1 h-3 w-3" />
                            {style.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={generateImage}
                      disabled={
                        !prompt.trim() ||
                        isGenerating ||
                        !apiKey ||
                        !selectedModel
                      }
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Image
                        </>
                      )}
                    </Button>
                  </div>

                  {generatedImage && (
                    <div className="space-y-4">
                      <div className="relative aspect-square overflow-hidden rounded-lg border">
                        <img
                          src={generatedImage || "/placeholder.svg"}
                          alt="Generated image"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={handleDownload}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={generateImage}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Section - Conditionally rendered */}
            {showChat && (
              <div className="w-1/3 border-l flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-4">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p>{message.content}</p>
                            {message.attachedImage && (
                              <div className="mt-2">
                                <img
                                  src={message.attachedImage}
                                  alt="Attached image"
                                  className="max-h-40 rounded-md"
                                />
                              </div>
                            )}
                            <div className="mt-1 text-xs opacity-70">
                              {message.timestamp}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                  </ScrollArea>
                </div>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border">
                        <Upload className="h-5 w-5" />
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileUpload}
                      />
                    </label>
                    <Input
                      placeholder="Type a message..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendChatMessage();
                        }
                      }}
                    />
                    <Button size="icon" onClick={sendChatMessage}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
