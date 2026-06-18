"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Download } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { cn, withBasePath } from "@/lib/utils";
import { CommandPaletteTrigger } from "./command-palette";
import { useScrollSpy } from "./scroll-progress";
import { ThemeToggle } from "./theme-toggle";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const active = useScrollSpy(isHomePage ? sectionIds : []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    
    if (isHomePage) {
      // On home page, scroll to section
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // On other pages, navigate to home page with hash
      router.push(`/${href}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-background/90 shadow-xs backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between">
        <button
          onClick={() => scrollTo("/")}
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Namraa<span className="text-accent">.</span>
        </button>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = isHomePage && active === id;
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
          <a
            href={withBasePath(siteConfig.resumePath)}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors text-foreground-muted hover:text-foreground flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <CommandPaletteTrigger />
          <ThemeToggle />
          <button
            className="rounded-lg p-2 text-foreground-muted hover:bg-background-muted hover:text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-border bg-background px-4 py-3 shadow-md md:hidden"
          aria-label="Mobile"
        >
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  "block w-full rounded-lg px-3 py-3 text-left text-sm transition-colors",
                  isHomePage && active === id
                    ? "bg-accent-muted font-medium text-accent-foreground"
                    : "text-foreground-muted hover:bg-background-muted hover:text-foreground",
                )}
              >
                {link.label}
              </button>
            );
          })}
          <a
            href={withBasePath(siteConfig.resumePath)}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-sm text-foreground-muted hover:bg-background-muted hover:text-foreground"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </nav>
      )}
    </header>
  );
}
