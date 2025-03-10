"use client";

import * as React from "react";
import { FileText, Loader2, Send, Upload, X, Info } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// PDF processing models
const PDF_MODELS = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description:
      "OpenAI's most advanced model, capable of understanding and analyzing complex documents.",
  },
  {
    id: "deepseek-coder",
    name: "DeepSeek Coder",
    description:
      "Specialized in understanding technical documentation and code.",
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    description:
      "Anthropic's advanced model with strong reasoning capabilities for document analysis.",
  },
  {
    id: "llama-3-70b",
    name: "Llama 3 70B",
    description:
      "Meta's open-source large language model with strong document understanding capabilities.",
  },
];

export function ChatWithPdf() {
  const [apiKey, setApiKey] = React.useState<string>("");
  const [showApiKeyModal, setShowApiKeyModal] = React.useState(true);
  const [selectedModel, setSelectedModel] = React.useState(PDF_MODELS[0].id);
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isProcessed, setIsProcessed] = React.useState(false);
  const [messages, setMessages] = React.useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPdfPreview, setShowPdfPreview] = React.useState(false);
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Save API key to localStorage
  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast("API Key Required", {
        description: "Please enter your API key to continue.",
      });
      return;
    }

    localStorage.setItem("pdf_api_key", apiKey);
    setShowApiKeyModal(false);
    toast("API Key Saved", {
      description: "Your API key has been saved.",
    });
  };

  // Load API key from localStorage on component mount
  React.useEffect(() => {
    const savedApiKey = localStorage.getItem("pdf_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyModal(false);
    }
  }, []);

  // Scroll to bottom of chat when messages change
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);

      // Create URL for PDF preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setPdfUrl(fileUrl);

      // Reset processing state
      setIsProcessed(false);
      setMessages([]);
    } else if (selectedFile) {
      toast("Invalid File", {
        description: "Please upload a PDF file.",
      });
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);

      // Create URL for PDF preview
      const fileUrl = URL.createObjectURL(droppedFile);
      setPdfUrl(fileUrl);

      // Reset processing state
      setIsProcessed(false);
      setMessages([]);
    } else if (droppedFile) {
      toast("Invalid File", {
        description: "Please upload a PDF file.",
      });
    }
  };

  // Process PDF
  const processPdf = async () => {
    if (!file) {
      toast("No File Selected", {
        description: "Please upload a PDF file to process.",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", selectedModel);
      formData.append("apiKey", apiKey);

      const response = await fetch("/api/pdf/process", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process PDF");
      }

      // const data = await response.json();

      // Add system message about the processed PDF
      setMessages([
        {
          role: "system",
          content: `I've analyzed the PDF "${file.name}". You can now ask me questions about its content.`,
        },
      ]);

      setIsProcessed(true);

      toast("PDF Processed", {
        description:
          "Your PDF has been processed successfully. You can now chat about its content.",
      });
    } catch (error) {
      console.error("Error processing PDF:", error);

      toast("Processing Failed", {
        description: "Failed to process the PDF. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !isProcessed) return;

    setIsLoading(true);
    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await fetch("/api/pdf/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          model: selectedModel,
          apiKey,
          fileName: file?.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error in chat:", error);

      toast("Error", {
        description: "Failed to get a response. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Remove file
  const removeFile = () => {
    setFile(null);
    setPdfUrl(null);
    setIsProcessed(false);
    setMessages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Enter API Key</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              You need an API key to use the Chat with PDF feature. This key
              will be used to process PDFs and generate responses.
            </p>
            <Input
              type="password"
              placeholder="Enter your API key..."
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

      {/* PDF Preview Dialog */}
      <Dialog open={showPdfPreview} onOpenChange={setShowPdfPreview}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>PDF Preview: {file?.name}</DialogTitle>
            <DialogDescription>
              Preview of your uploaded PDF document
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 h-full overflow-hidden">
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                title="PDF Preview"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="grid h-full grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {/* PDF Upload Section */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Card className="flex-1">
            <CardContent className="p-4 flex flex-col gap-4">
              <h3 className="text-lg font-medium">Upload PDF</h3>

              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  file ? "border-primary" : "border-muted-foreground/20"
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-10 w-10 text-primary" />
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPdfPreview(true)}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={removeFile}
                      >
                        <X className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="font-medium">Drag & drop your PDF here</p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse files
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Select File
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="application/pdf"
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Select Model:</label>
                  <Select
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                      {PDF_MODELS.map((model) => (
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
                                <p className="max-w-xs">{model.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={processPdf}
                  disabled={!file || isProcessing || isProcessed}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : isProcessed ? (
                    "PDF Processed"
                  ) : (
                    "Process PDF"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Section */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <Card className="flex-1 flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col">
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto mb-4 space-y-4"
              >
                {messages.length > 0 ? (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : message.role === "system"
                            ? "bg-muted border border-border"
                            : "bg-secondary"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    {file
                      ? isProcessed
                        ? "Ask a question about your PDF"
                        : "Process the PDF to start chatting"
                      : "Upload a PDF to get started"}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isProcessed
                      ? "Ask a question about your PDF..."
                      : "Process a PDF first..."
                  }
                  disabled={!isProcessed}
                  className="min-h-[80px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button
                  className="self-end"
                  disabled={!isProcessed || isLoading || !input.trim()}
                  onClick={sendMessage}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
