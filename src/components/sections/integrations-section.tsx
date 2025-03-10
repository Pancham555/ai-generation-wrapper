"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function IntegrationsSection() {
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
              Seamless Integrations
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Connect StreamLine with your favorite tools and services
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center justify-center p-6 rounded-xl border bg-card hover:shadow-md transition-all"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Image
                    src={`/placeholder.svg?height=48&width=48&text=App+${
                      i + 1
                    }`}
                    alt={`Integration ${i + 1}`}
                    width={48}
                    height={48}
                    className="h-8 w-8"
                  />
                </div>
                <p className="text-sm font-medium">Integration {i + 1}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
