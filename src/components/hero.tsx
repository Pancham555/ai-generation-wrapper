import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex justify-center">
      <div className="max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-5 lg:gap-8">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-6xl">
              Your workspace <br />
              <span className="mx-1 inline-block whitespace-nowrap">
                anywhere.
              </span>
            </h1>
            <p className="text-muted-foreground lg:text-lg">
              Set up your environment with everything you need and share it
              effortlessly. Stay productive throughout your workflow, no matter
              where you are.
            </p>
            <div className="flex">
              <Button className="flex items-center">
                <span>Get Started</span>
                <ArrowRight />
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              width={1000}
              height={950}
              src="/image.svg"
              alt="placeholder"
              className="mx-auto max-h-[700px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
