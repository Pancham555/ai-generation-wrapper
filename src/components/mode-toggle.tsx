"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      {/* //{" "}
      <DropdownMenu> */}
      {/* <DropdownMenuTrigger asChild> */}
      {theme === "light" ? (
        <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      )}
      <span className="sr-only">Toggle theme</span>
      {/* </Button> */}
      {/* <Button>Theme</Button> */}
      {/* </DropdownMenuTrigger> */}
      {/* //{" "}
        <DropdownMenuContent align="end">
          //{" "}
          <DropdownMenuItem onClick={() => setTheme("light")}>
            // Light //{" "}
          </DropdownMenuItem>
          //{" "}
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            // Dark //{" "}
          </DropdownMenuItem>
          //{" "}
          <DropdownMenuItem onClick={() => setTheme("system")}>
            // System //{" "}
          </DropdownMenuItem>
          //{" "}
        </DropdownMenuContent>
        //{" "}
      </DropdownMenu> */}
    </>
  );
}
