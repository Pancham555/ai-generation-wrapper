"use client";

import type React from "react";

import { forwardRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Users, BarChart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HowItWorksSectionProps {
  id: string;
}

const HowItWorksSection = forwardRef<HTMLElement, HowItWorksSectionProps>(
  ({ id }, ref) => {
    const { scrollYProgress } = useScroll({
      target: ref as React.RefObject<HTMLElement>,
      offset: ["start end", "end start"],
    });

    const steps = [
      {
        title: "Sign up and create your workspace",
        description:
          "Create your account and set up your team workspace in just a few clicks. No credit card required to get started.",
      },
      {
        title: "Invite your team members",
        description:
          "Add your team members to your workspace and assign roles and permissions based on their responsibilities.",
      },
      {
        title: "Create your first project",
        description:
          "Set up your project, define milestones, and create tasks to start organizing your work efficiently.",
      },
      {
        title: "Automate your workflows",
        description:
          "Set up automation rules to reduce manual work and keep your projects moving forward automatically.",
      },
    ];

    // Calculate progress thresholds for each step
    const stepThresholds = steps.map((_, i) => i / (steps.length - 1));

    // State to track active step
    const [activeStep, setActiveStep] = useState(0);

    // Update active step based on scroll progress
    useEffect(() => {
      const unsubscribe = scrollYProgress.onChange((value) => {
        for (let i = 0; i < stepThresholds.length; i++) {
          if (value <= stepThresholds[i] + 0.1) {
            setActiveStep(i);
            break;
          }
          if (i === stepThresholds.length - 1) {
            setActiveStep(i);
          }
        }
      });

      return () => unsubscribe();
    }, [scrollYProgress, stepThresholds]);

    return (
      <section
        id={id}
        ref={ref}
        className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 relative"
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
                How StreamLine Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Get started in minutes and transform how your team works
              </p>
            </motion.div>
          </div>

          <div className="mt-16 relative">
            {/* Segmented Line with Glowing Dots */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[3px] transform -translate-x-1/2 hidden md:block">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full"
                  style={{
                    top: `${(i / (steps.length - 1)) * 100}%`,
                    height:
                      i < steps.length - 1
                        ? `${100 / (steps.length - 1)}%`
                        : "0",
                  }}
                >
                  {/* Dot */}
                  <motion.div
                    className={cn(
                      "absolute w-5 h-5 rounded-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300",
                      activeStep >= i
                        ? "bg-primary shadow-[0_0_10px_2px_rgba(var(--primary),.6)]"
                        : "bg-muted border-2 border-primary/30"
                    )}
                  />

                  {/* Line segment */}
                  {i < steps.length - 1 && (
                    <motion.div
                      className={cn(
                        "absolute w-full transition-all duration-500",
                        activeStep > i ? "bg-primary" : "bg-primary/20"
                      )}
                      style={{
                        height: "100%",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Steps */}
            <div className="space-y-20 md:space-y-0 relative">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={cn(
                    "md:grid md:grid-cols-2 md:gap-8 items-center",
                    i % 2 === 1 ? "md:rtl" : ""
                  )}
                >
                  <div
                    className={cn(
                      "relative z-10 md:py-8",
                      i % 2 === 1 ? "md:ltr" : ""
                    )}
                  >
                    <div className="bg-card p-6 rounded-lg shadow-lg border relative">
                      {/* Step Number */}
                      <div
                        className={cn(
                          "absolute top-0 left-0 md:left-auto md:right-full md:translate-x-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300",
                          activeStep >= i
                            ? "bg-primary text-primary-foreground shadow-[0_0_10px_2px_rgba(var(--primary),.4)]"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {i + 1}
                      </div>

                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn("mt-8 md:mt-0", i % 2 === 1 ? "md:ltr" : "")}
                  >
                    {i === 0 && (
                      <div className="rounded-lg shadow-lg border bg-card p-4 h-[300px] relative overflow-hidden">
                        <div className="flex items-center justify-between border-b pb-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            <h3 className="font-medium">Workspace Setup</h3>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 animate-pulse">
                          <div className="h-24 rounded-md bg-muted"></div>
                          <div className="h-24 rounded-md bg-muted"></div>
                          <div className="h-24 rounded-md bg-muted"></div>
                          <div className="h-24 rounded-md bg-muted"></div>
                          <div className="h-24 rounded-md bg-muted"></div>
                          <div className="h-24 rounded-md bg-muted"></div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {i === 1 && (
                      <div className="rounded-lg shadow-lg border bg-card p-4 h-[300px] relative overflow-hidden">
                        <div className="flex items-center justify-between border-b pb-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            <h3 className="font-medium">Team Invitations</h3>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {[1, 2, 3].map((user) => (
                            <motion.div
                              key={user}
                              initial={{ x: -50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{
                                duration: 0.5,
                                delay: user * 0.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 3,
                              }}
                              className="flex items-center justify-between p-3 rounded-md border"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-muted"></div>
                                <div>
                                  <div className="h-4 w-24 bg-muted rounded"></div>
                                  <div className="h-3 w-32 bg-muted/50 rounded mt-1"></div>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                Invite
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {i === 2 && (
                      <div className="rounded-lg shadow-lg border bg-card p-4 h-[300px] relative overflow-hidden">
                        <div className="flex items-center justify-between border-b pb-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <BarChart className="h-4 w-4 text-primary" />
                            </div>
                            <h3 className="font-medium">Project Dashboard</h3>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="h-16 rounded-md bg-muted flex items-center justify-center">
                            <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                          </div>
                          <div className="h-16 rounded-md bg-muted flex items-center justify-center">
                            <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                          </div>
                        </div>
                        <div className="h-32 rounded-md bg-muted p-3">
                          <div className="flex h-full items-end gap-2">
                            {[40, 70, 30, 80, 60, 50, 75, 45].map(
                              (height, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ height: "0%" }}
                                  animate={{ height: `${height}%` }}
                                  transition={{
                                    duration: 1,
                                    delay: i * 0.1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatDelay: 3,
                                  }}
                                  className="flex-1 bg-primary/60 rounded-t"
                                ></motion.div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {i === 3 && (
                      <div className="rounded-lg shadow-lg border bg-card p-4 h-[300px] relative overflow-hidden">
                        <div className="flex items-center justify-between border-b pb-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <Zap className="h-4 w-4 text-primary" />
                            </div>
                            <h3 className="font-medium">Workflow Automation</h3>
                          </div>
                        </div>
                        <div className="relative h-[220px]">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg width="200" height="200" viewBox="0 0 200 200">
                              <motion.path
                                d="M20,100 C20,60 60,20 100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-primary"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                }}
                              />
                              <motion.circle
                                cx="100"
                                cy="20"
                                r="5"
                                fill="currentColor"
                                className="text-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                  times: [0, 0.1, 1],
                                }}
                              />
                              <motion.circle
                                cx="180"
                                cy="100"
                                r="5"
                                fill="currentColor"
                                className="text-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                  delay: 0.5,
                                  times: [0, 0.1, 1],
                                }}
                              />
                              <motion.circle
                                cx="100"
                                cy="180"
                                r="5"
                                fill="currentColor"
                                className="text-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                  delay: 1,
                                  times: [0, 0.1, 1],
                                }}
                              />
                              <motion.circle
                                cx="20"
                                cy="100"
                                r="5"
                                fill="currentColor"
                                className="text-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                  delay: 1.5,
                                  times: [0, 0.1, 1],
                                }}
                              />
                            </svg>
                          </div>
                          <motion.div
                            className="absolute h-10 w-10 rounded-md bg-primary/20 flex items-center justify-center"
                            initial={{ x: 95, y: 20 }}
                            animate={{
                              x: [95, 180, 95, 20, 95],
                              y: [20, 95, 180, 95, 20],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          >
                            <Zap className="h-5 w-5 text-primary" />
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

HowItWorksSection.displayName = "HowItWorksSection";

export default HowItWorksSection;
