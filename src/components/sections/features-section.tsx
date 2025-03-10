"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { BarChart, Zap, Users, Shield, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeaturesSectionProps {
  id: string;
}

const FeaturesSection = forwardRef<HTMLElement, FeaturesSectionProps>(
  ({ id }, ref) => {
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
                Powerful features to boost productivity
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Everything you need to manage your projects, automate workflows,
                and collaborate with your team.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Project Management",
                description:
                  "Create, assign, and track tasks with ease. Set deadlines, priorities, and dependencies.",
                icon: <BarChart className="h-8 w-8" />,
              },
              {
                title: "Workflow Automation",
                description:
                  "Automate repetitive tasks and processes with customizable workflows and triggers.",
                icon: <Zap className="h-8 w-8" />,
              },
              {
                title: "Team Collaboration",
                description:
                  "Real-time communication, file sharing, and collaborative editing for seamless teamwork.",
                icon: <Users className="h-8 w-8" />,
              },
              {
                title: "Analytics & Reporting",
                description:
                  "Gain insights into team performance, project progress, and resource allocation.",
                icon: <BarChart className="h-8 w-8" />,
              },
              {
                title: "Advanced Security",
                description:
                  "Enterprise-grade security with role-based access control and data encryption.",
                icon: <Shield className="h-8 w-8" />,
              },
              {
                title: "Time Tracking",
                description:
                  "Track time spent on tasks and projects to improve productivity and billing accuracy.",
                icon: <Clock className="h-8 w-8" />,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="flex flex-col items-center text-center h-full">
                  <CardHeader>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                      {feature.icon}
                    </div>
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
  }
);

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
