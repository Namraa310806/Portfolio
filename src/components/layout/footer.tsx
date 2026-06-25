"use client";

import { siteConfig } from "@/data/site";
import { withBasePath } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Mail, Phone, FileText, ArrowUp } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-gradient-to-br from-background via-background-muted/30 to-background">
      <div className="section-container py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-foreground">{siteConfig.name}</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Backend & Systems Engineer specializing in distributed systems, cloud infrastructure, and AI applications.
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
              >
                <FaGithub className="h-5 w-5 text-foreground-muted hover:text-accent" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
              >
                <FaLinkedin className="h-5 w-5 text-foreground-muted hover:text-accent" />
              </a>
              <a
                href={withBasePath(siteConfig.resumePath)}
                download
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download resume"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
              >
                <FileText className="h-5 w-5 text-foreground-muted hover:text-accent" />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-accent uppercase tracking-wider">Contact</h4>
            <div className="space-y-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-accent uppercase tracking-wider">Navigation</h4>
            <div className="space-y-2">
              <Link href="#hero" className="block text-sm text-foreground-muted hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="#opensource" className="block text-sm text-foreground-muted hover:text-foreground transition-colors">
                Open Source
              </Link>
              <Link href="#projects" className="block text-sm text-foreground-muted hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link href="#achievements" className="block text-sm text-foreground-muted hover:text-foreground transition-colors">
                Achievements
              </Link>
              <a
                href={withBasePath(siteConfig.resumePath)}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Theme Toggle & Scroll */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-accent uppercase tracking-wider">Settings</h4>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <span className="text-sm text-foreground-muted">Dark Mode</span>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              <ArrowUp className="h-4 w-4" />
              Back to Top
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-foreground-muted">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-xs text-foreground-muted">
              Built with Next.js, TypeScript & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
