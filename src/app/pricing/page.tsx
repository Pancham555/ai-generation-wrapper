"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CtaSection from "@/components/sections/cta-section";
import FaqSection from "@/components/sections/faq-section";

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Pricing Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl/tight">
                  Simple, transparent pricing
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Choose the plan that&apos;s right for your team. All plans
                  include a 14-day free trial.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-3 max-w-6xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$12",
                  description: "Perfect for small teams just getting started.",
                  features: [
                    "Up to 5 team members",
                    "10 projects",
                    "Basic reporting",
                    "24/7 email support",
                    "1GB storage per user",
                    "Basic integrations",
                  ],
                  cta: "Get started",
                  popular: false,
                },
                {
                  name: "Professional",
                  price: "$29",
                  description:
                    "Ideal for growing teams with more complex needs.",
                  features: [
                    "Up to 20 team members",
                    "Unlimited projects",
                    "Advanced reporting",
                    "Workflow automation",
                    "Priority support",
                    "10GB storage per user",
                    "Advanced integrations",
                    "Custom fields",
                  ],
                  cta: "Get started",
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "$79",
                  description:
                    "For large organizations with advanced requirements.",
                  features: [
                    "Unlimited team members",
                    "Unlimited projects",
                    "Custom reporting",
                    "Advanced automation",
                    "Dedicated support",
                    "SSO & advanced security",
                    "100GB storage per user",
                    "Enterprise integrations",
                    "Custom workflows",
                    "Dedicated account manager",
                  ],
                  cta: "Contact sales",
                  popular: false,
                },
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  <Card
                    className={`flex flex-col h-full ${
                      plan.popular ? "border-primary shadow-lg" : ""
                    }`}
                  >
                    <CardHeader>
                      {plan.popular && (
                        <Badge className="w-fit mb-2">Most Popular</Badge>
                      )}
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground ml-1">
                          /month per user
                        </span>
                      </div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                  Compare Plans
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Find the perfect plan for your team&apos;s needs
                </p>
              </motion.div>
            </div>

            <div className="overflow-x-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="min-w-[800px]"
              >
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left">Features</th>
                      <th className="py-4 px-6 text-center">Starter</th>
                      <th className="py-4 px-6 text-center bg-primary/5 border-x border-primary/10">
                        Professional
                      </th>
                      <th className="py-4 px-6 text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: "Team members",
                        starter: "Up to 5",
                        pro: "Up to 20",
                        enterprise: "Unlimited",
                      },
                      {
                        feature: "Projects",
                        starter: "10",
                        pro: "Unlimited",
                        enterprise: "Unlimited",
                      },
                      {
                        feature: "Storage per user",
                        starter: "1GB",
                        pro: "10GB",
                        enterprise: "100GB",
                      },
                      {
                        feature: "Reporting",
                        starter: "Basic",
                        pro: "Advanced",
                        enterprise: "Custom",
                      },
                      {
                        feature: "Workflow automation",
                        starter: "—",
                        pro: "✓",
                        enterprise: "Advanced",
                      },
                      {
                        feature: "Custom fields",
                        starter: "—",
                        pro: "✓",
                        enterprise: "✓",
                      },
                      {
                        feature: "API access",
                        starter: "—",
                        pro: "✓",
                        enterprise: "✓",
                      },
                      {
                        feature: "SSO",
                        starter: "—",
                        pro: "—",
                        enterprise: "✓",
                      },
                      {
                        feature: "Dedicated support",
                        starter: "—",
                        pro: "—",
                        enterprise: "✓",
                      },
                      {
                        feature: "Custom branding",
                        starter: "—",
                        pro: "—",
                        enterprise: "✓",
                      },
                    ].map((row, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-4 px-6 font-medium">{row.feature}</td>
                        <td className="py-4 px-6 text-center">{row.starter}</td>
                        <td className="py-4 px-6 text-center bg-primary/5 border-x border-primary/10">
                          {row.pro}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {row.enterprise}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FaqSection />

        {/* CTA Section */}
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
