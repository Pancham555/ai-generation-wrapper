"use client";

import { useEffect, useRef, useState } from "react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import LogosSection from "@/components/sections/logos-section";
import FeaturesSection from "@/components/sections/features-section";
import HowItWorksSection from "@/components/sections/how-it-works-section";
import DemoSection from "@/components/sections/demo-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import FaqSection from "@/components/sections/faq-section";
import IntegrationsSection from "@/components/sections/integrations-section";
import CaseStudiesSection from "@/components/sections/case-studies-section";
import BlogSection from "@/components/sections/blog-section";
import NewsletterSection from "@/components/sections/newsletter-section";
import CtaSection from "@/components/sections/cta-section";

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.keys(sectionRefs.current).forEach((id) => {
      const element = sectionRefs.current[id];
      if (element) observer.observe(element);
    });

    return () => {
      Object.keys(sectionRefs.current).forEach((id) => {
        const element = sectionRefs.current[id];
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const registerSection = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  return (
    <div className="flex min-h-screen flex-col relative">
      <Header activeSection={activeSection} />

      <main className="flex-1">
        <HeroSection />
        <LogosSection />

        <FeaturesSection
          id="features"
          ref={(el) => registerSection("features", el)}
        />

        <HowItWorksSection
          id="how-it-works"
          ref={(el) => registerSection("how-it-works", el)}
        />

        <DemoSection id="demo" ref={(el) => registerSection("demo", el)} />

        <TestimonialsSection
          id="testimonials"
          ref={(el) => registerSection("testimonials", el)}
        />

        <FaqSection />
        <IntegrationsSection />
        <CaseStudiesSection />
        <BlogSection />
        <NewsletterSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
