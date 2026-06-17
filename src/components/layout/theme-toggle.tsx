"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="h-9 w-[72px] rounded-lg border border-border bg-background-muted"
        aria-hidden
      />
    );
  }

  const current = resolvedTheme ?? theme ?? "light";
  const isLight = current === "light";

  return (
    <div
      className="flex items-center rounded-lg border border-border bg-background-muted p-0.5"
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={cn(
          "flex h-7 w-8 items-center justify-center rounded-md transition-all",
          isLight
            ? "bg-card text-accent shadow-sm"
            : "text-foreground-muted hover:text-foreground",
        )}
        aria-label="Light mode"
        aria-pressed={isLight}
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={cn(
          "flex h-7 w-8 items-center justify-center rounded-md transition-all",
          !isLight
            ? "bg-card text-accent shadow-sm"
            : "text-foreground-muted hover:text-foreground",
        )}
        aria-label="Dark mode"
        aria-pressed={!isLight}
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
