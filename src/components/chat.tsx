"use client";

import * as React from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Chat() {
  const [messages, setMessages] = React.useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await fetch("/api/huggingface/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
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
      //   toast({
      //     title: "Error",
      //     description: "Failed to get a response. Please try again.",
      //     variant: "destructive",
      //   });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col p-4">
      <Card className="flex-1 overflow-auto">
        <CardContent className="p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="mt-4 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? "Sending..." : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
