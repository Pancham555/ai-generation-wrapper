"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function BlogSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
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
              Latest from Our Blog
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Insights, tips, and news about productivity and project management
            </p>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "10 Ways to Boost Team Productivity with Automation",
              excerpt:
                "Discover how automation can transform your team's workflow and eliminate repetitive tasks.",
              date: "June 12, 2023",
              image:
                "/placeholder.svg?height=200&width=400&text=Productivity+Blog",
            },
            {
              title: "The Future of Remote Work and Project Management",
              excerpt:
                "How leading companies are adapting their project management strategies for remote teams.",
              date: "May 28, 2023",
              image:
                "/placeholder.svg?height=200&width=400&text=Remote+Work+Blog",
            },
            {
              title: "Building a Culture of Collaboration in Distributed Teams",
              excerpt:
                "Strategies for fostering collaboration and communication in geographically dispersed teams.",
              date: "May 15, 2023",
              image:
                "/placeholder.svg?height=200&width=400&text=Collaboration+Blog",
            },
          ].map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden h-full">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    {post.date}
                  </p>
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto">
                    Read More →
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline">View All Articles</Button>
        </div>
      </div>
    </section>
  );
}
