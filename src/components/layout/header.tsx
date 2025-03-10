"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeSection?: string | null;
}

export default function Header({ activeSection }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure theme component doesn't render until mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="StreamLine Logo"
              width={32}
              height={32}
            />
            <span className="text-xl font-bold">StreamLine</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-3 lg:gap-6">
          <Link
            href="/#features"
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "features"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "how-it-works"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            How It Works
          </Link>
          <Link
            href="/#demo"
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "demo"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            Demo
          </Link>
          <Link
            href="/#testimonials"
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "testimonials"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            Testimonials
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
          >
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="outline" size="sm">
            Log in
          </Button>
          {mounted && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 pt-6">
              <Link
                href="/#features"
                className="text-sm font-medium hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                className="text-sm font-medium hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                href="/#demo"
                className="text-sm font-medium hover:text-primary"
              >
                Demo
              </Link>
              <Link
                href="/#testimonials"
                className="text-sm font-medium hover:text-primary"
              >
                Testimonials
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium hover:text-primary"
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="outline" size="sm">
                  Log in
                </Button>
                {mounted && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? (
                      <Sun className="mr-2 h-4 w-4" />
                    ) : (
                      <Moon className="mr-2 h-4 w-4" />
                    )}
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
