"use client";
import Feature from "@/components/features";
import Header from "@/components/header";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Header />
      <Hero />
      <Feature />
    </div>
  );
}
