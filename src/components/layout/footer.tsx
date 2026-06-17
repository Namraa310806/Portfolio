import { siteConfig } from "@/data/site";
import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="section-container flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <p className="text-sm text-foreground-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js,
          TypeScript & Framer Motion.
        </p>
        <div className="flex items-center gap-4">
          <p className="text-xs text-foreground-muted">
            Ctrl+K to navigate
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
