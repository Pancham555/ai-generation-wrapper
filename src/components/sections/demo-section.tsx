"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DemoSectionProps {
  id: string;
}

const DemoSection = forwardRef<HTMLElement, DemoSectionProps>(({ id }, ref) => {
  return (
    <section id={id} ref={ref} className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
              See StreamLine in Action
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Watch how StreamLine can transform your team&apos;s productivity
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden border shadow-xl"
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-16 w-16 p-0"
            >
              <Play className="h-8 w-8" />
            </Button>
          </div>
          <Image
            src="/placeholder.svg?height=720&width=1280&text=Product+Demo+Video"
            alt="Product Demo"
            width={1280}
            height={720}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Project Dashboard",
              description:
                "Get a bird's eye view of all your projects and their status.",
            },
            {
              title: "Task Management",
              description:
                "Create, assign, and track tasks with powerful filtering options.",
            },
            {
              title: "Team Collaboration",
              description:
                "Comment, share files, and collaborate in real-time.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

DemoSection.displayName = "DemoSection";

export default DemoSection;
