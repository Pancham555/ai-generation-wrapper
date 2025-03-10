"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LogosSection() {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16 border-y bg-muted/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-xl font-medium tracking-tight md:text-2xl">
              Trusted by companies worldwide
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                viewport={{ once: true }}
              >
                <Image
                  src={`/placeholder.svg?height=40&width=120&text=LOGO+${i}`}
                  alt={`Company ${i} logo`}
                  width={120}
                  height={40}
                  className="h-8 w-auto grayscale transition-all hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
