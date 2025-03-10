"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
              Stay Updated with StreamLine
            </h2>
            <p className="text-primary-foreground/80 md:text-xl">
              Get the latest updates, tips, and exclusive offers delivered
              straight to your inbox.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md border bg-primary-foreground/10 border-primary-foreground/20 px-3 py-2 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button variant="secondary">Subscribe</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
