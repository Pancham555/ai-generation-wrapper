"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function CaseStudiesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
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
              Success Stories
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              See how leading companies are transforming their workflows with
              StreamLine
            </p>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              company: "TechGiant Inc.",
              title: "How TechGiant Reduced Project Delivery Time by 40%",
              image:
                "/placeholder.svg?height=200&width=400&text=TechGiant+Case+Study",
            },
            {
              company: "Global Finance",
              title:
                "Global Finance Improved Team Collaboration Across 12 Countries",
              image:
                "/placeholder.svg?height=200&width=400&text=Global+Finance+Case+Study",
            },
            {
              company: "Creative Studios",
              title:
                "Creative Studios Streamlined Their Content Production Pipeline",
              image:
                "/placeholder.svg?height=200&width=400&text=Creative+Studios+Case+Study",
            },
          ].map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="overflow-hidden h-full">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4">
                      <Badge className="mb-2">{study.company}</Badge>
                      <h3 className="text-lg font-bold text-white">
                        {study.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">
                    Learn how they transformed their workflow and achieved
                    remarkable results with StreamLine.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Case Study
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
