"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Menu, Search, Github, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className=" border-b bg-background">
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-12">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-4 h-4" />
          </Button>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/file.svg"
              alt="Logo"
              width={20}
              height={20}
              className="text-black fill-black"
            />
            shadcn/ui
          </Link>
          <nav className="hidden md:flex gap-3 text-sm text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground">
              Docs
            </Link>
            <Link href="/components" className="hover:text-foreground">
              Components
            </Link>
            <Link href="/themes" className="hover:text-foreground">
              Themes
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block max-w-xs w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={12}
            />
            <Input
              placeholder="Search..."
              className="pl-8 bg-muted rounded-md h-7 text-xs"
            />
          </div>
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          )}
          {/* <Button variant="ghost" size="icon" asChild>
          <Link href="https://github.com/shadcn/ui">
            <Github className="w-4 h-4" />
          </Link>
        </Button> */}
        </div>
      </nav>
    </header>
  );
}
