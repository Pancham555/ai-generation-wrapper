"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface TestimonialsSectionProps {
  id: string;
}

const TestimonialsSection = forwardRef<HTMLElement, TestimonialsSectionProps>(
  ({ id }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
      >
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
                Loved by teams worldwide
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                See what our customers have to say about StreamLine.
              </p>
            </motion.div>
          </div>

          <div className="mt-12">
            {/* Featured Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16"
            >
              <Card className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3">
                    <div className="aspect-square relative rounded-full overflow-hidden border-4 border-primary/20 w-32 h-32 mx-auto">
                      <Image
                        src="/placeholder.svg?height=128&width=128&text=CEO"
                        alt="CEO Testimonial"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <h4 className="font-bold">Jennifer Martinez</h4>
                      <p className="text-sm text-muted-foreground">
                        CEO, TechInnovate
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex mb-4">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6 text-yellow-500"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                    </div>
                    <blockquote className="text-xl italic">
                      &quot;StreamLine has completely transformed how our entire
                      organization operates. The productivity gains have been
                      remarkable, and the ROI was evident within the first
                      month. I can&apos;t imagine running our business without
                      it now.&quot;
                    </blockquote>
                  </div>
                </div>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "StreamLine has completely transformed how our team works. We've reduced meeting time by 50% and increased productivity by 30%.",
                  author: "Sarah Johnson",
                  role: "Product Manager, TechCorp",
                },
                {
                  quote:
                    "The automation features alone have saved us countless hours. It's like having an extra team member who never sleeps.",
                  author: "Michael Chen",
                  role: "CTO, StartupX",
                },
                {
                  quote:
                    "We've tried many project management tools, but StreamLine is by far the most intuitive and powerful. It's a game-changer.",
                  author: "Emily Rodriguez",
                  role: "Team Lead, DesignHub",
                },
                {
                  quote:
                    "The customer support team is exceptional. They helped us customize StreamLine to fit our unique workflow perfectly.",
                  author: "David Kim",
                  role: "Operations Director, GlobalCorp",
                },
                {
                  quote:
                    "Our team collaboration has improved dramatically since we started using StreamLine. Everyone is on the same page now.",
                  author: "Lisa Thompson",
                  role: "Marketing Manager, BrandWave",
                },
                {
                  quote:
                    "The analytics and reporting features give me the insights I need to make data-driven decisions for our projects.",
                  author: "Robert Jackson",
                  role: "Project Director, BuildRight",
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  viewport={{ once: true }}
                >
                  <Card className="flex flex-col justify-between h-full">
                    <CardHeader>
                      <div className="space-y-2">
                        <div className="flex gap-0.5">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5 text-yellow-500"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start border-t pt-4">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

TestimonialsSection.displayName = "TestimonialsSection";

export default TestimonialsSection;
