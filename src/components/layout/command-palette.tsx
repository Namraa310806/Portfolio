"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Code2, Link, Mail, Search } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { cn, withBasePath } from "@/lib/utils";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-4 pt-[15vh] backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <Command
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        label="Command palette"
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search className="h-4 w-4 text-foreground-muted" />
          <Command.Input
            placeholder="Search sections, links..."
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-foreground-muted"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-foreground-muted sm:inline">
            ESC
          </kbd>
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-4 py-8 text-center text-sm text-foreground-muted">
            No results found.
          </Command.Empty>
          <Command.Group heading="Navigate" className="px-2 py-1 text-xs text-foreground-muted">
            {navLinks.map((link) => (
              <Command.Item
                key={link.href}
                value={link.label}
                onSelect={() => navigate(link.href)}
                className={cn(
                  "flex cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm",
                  "aria-selected:bg-accent-muted aria-selected:text-accent",
                )}
              >
                {link.label}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Links" className="px-2 py-1 text-xs text-foreground-muted">
            <Command.Item
              value="GitHub"
              onSelect={() => {
                setOpen(false);
                window.open(siteConfig.github, "_blank");
              }}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-accent-muted aria-selected:text-accent"
            >
              <Code2 className="h-4 w-4" /> GitHub
            </Command.Item>
            <Command.Item
              value="LinkedIn"
              onSelect={() => {
                setOpen(false);
                window.open(siteConfig.linkedin, "_blank");
              }}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-accent-muted aria-selected:text-accent"
            >
              <Link className="h-4 w-4" /> LinkedIn
            </Command.Item>
            <Command.Item
              value="Email"
              onSelect={() => {
                setOpen(false);
                window.location.href = `mailto:${siteConfig.email}`;
              }}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-accent-muted aria-selected:text-accent"
            >
              <Mail className="h-4 w-4" /> Email
            </Command.Item>
            <Command.Item
              value="Resume"
              onSelect={() => {
                setOpen(false);
                window.open(withBasePath(siteConfig.resumePath), "_blank");
              }}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-accent-muted aria-selected:text-accent"
            >
              Download Resume
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

export function CommandPaletteTrigger() {
  return (
    <button
      onClick={() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
        );
      }}
      className="hidden items-center gap-2 rounded-xl border border-border bg-background-muted px-3 py-1.5 text-xs text-foreground-muted transition-colors hover:bg-card-hover sm:flex"
      aria-label="Open command palette"
    >
      <Search className="h-3.5 w-3.5" />
      <span>Search</span>
      <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px]">
        Ctrl K
      </kbd>
    </button>
  );
}
