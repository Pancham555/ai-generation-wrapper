"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FaqSection() {
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
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Find answers to common questions about StreamLine
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto space-y-4"
        >
          {[
            {
              question: "How does the 14-day free trial work?",
              answer:
                "You can sign up for StreamLine and use all features for 14 days without providing any payment information. At the end of the trial, you can choose a plan that fits your needs or continue with the free plan with limited features.",
            },
            {
              question: "Can I change my plan later?",
              answer:
                "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you upgrade, the new features will be available immediately. If you downgrade, the changes will take effect at the end of your current billing cycle.",
            },
            {
              question: "Is there a limit to how many projects I can create?",
              answer:
                "The Starter plan allows up to 10 projects. The Professional and Enterprise plans offer unlimited projects. You can always upgrade your plan if you need more projects.",
            },
            {
              question: "How secure is my data?",
              answer:
                "StreamLine uses enterprise-grade security measures, including encryption at rest and in transit, regular security audits, and compliance with industry standards. Your data is stored in secure data centers with 24/7 monitoring.",
            },
            {
              question: "Can I integrate StreamLine with other tools?",
              answer:
                "Yes, StreamLine offers integrations with popular tools like Slack, Google Workspace, Microsoft Office, GitHub, and many more. We also provide an API for custom integrations.",
            },
          ].map((faq, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-4 cursor-pointer">
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
