"use client";

// import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HexagonalPattern from "@/components/ui/hexagonal-pattern";

export default function HeroSection() {
  // const [isTyping, setIsTyping] = useState(false);
  const isTyping = false;

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
      {/* Hexagonal Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <HexagonalPattern />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <Badge className="inline-flex">New Features Available</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Streamline your workflow like never before
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                The all-in-one platform that helps teams manage projects,
                automate workflows, and collaborate seamlessly.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-2 min-[400px]:flex-row"
            >
              <Button size="lg" className="gap-1" asChild>
                <Link href="/pricing">
                  Get started for free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Book a demo
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xs text-muted-foreground"
            >
              No credit card required. 14-day free trial.
            </motion.p>
          </div>

          {/* Text-to-Image AI Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mx-auto w-full max-w-[500px] h-[400px] rounded-xl border bg-card p-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">StreamLine AI Image Generator</h3>
                  <p className="text-xs text-muted-foreground">Powered by AI</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-[280px] overflow-y-auto py-4 flex flex-col gap-3">
              <AnimatePresence>
                {/* Prompt Input */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-primary text-primary-foreground self-end rounded-lg rounded-br-none p-3 max-w-[80%]"
                >
                  Generate a dashboard for project management
                </motion.div>

                {/* Loading Animation */}
                {isTyping ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-[80%] rounded-lg p-3 bg-muted self-start rounded-bl-none"
                  >
                    <div className="flex gap-1">
                      <span className="animate-bounce">●</span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      >
                        ●
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      >
                        ●
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-[90%] rounded-lg p-2 bg-muted self-start rounded-bl-none"
                  >
                    <div className="relative w-full aspect-video rounded-md overflow-hidden border">
                      <Image
                        src="/placeholder.svg?height=200&width=320&text=AI+Generated+Dashboard"
                        alt="AI Generated Dashboard"
                        width={320}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-2">
                        <span className="text-xs text-white">
                          Generated in 2.3s
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Second Prompt */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1 }}
                  className="bg-primary text-primary-foreground self-end rounded-lg rounded-br-none p-3 max-w-[80%]"
                >
                  Now make it dark themed with analytics charts
                </motion.div>

                {/* Second Generated Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="max-w-[90%] rounded-lg p-2 bg-muted self-start rounded-bl-none"
                >
                  <div className="relative w-full aspect-video rounded-md overflow-hidden border">
                    <Image
                      src="/placeholder.svg?height=200&width=320&text=Dark+Theme+Dashboard"
                      alt="Dark Theme Dashboard"
                      width={320}
                      height={200}
                      className="w-full h-full object-cover bg-gray-900"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-2">
                      <span className="text-xs text-white">
                        Generated in 1.8s
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <input
                type="text"
                placeholder="Describe the image you want..."
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              />
              <Button size="icon" className="rounded-full">
                <Zap className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-sm text-muted-foreground">Scroll to explore</p>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.div>
    </section>
  );
}
