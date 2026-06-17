"use client";

import { ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { selectedContributions } from "@/data/site";

export function SelectedContributions() {
  return (
    <section
      id="contributions"
      className="section-padding border-b border-border-subtle"
    >
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Production Impact"
            title="Selected Engineering Contributions"
            subtitle="Merged pull requests that fixed real security, concurrency, and reliability issues — click to verify on GitHub."
          />
        </FadeIn>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {selectedContributions.map((item, index) => (
            <FadeIn key={item.url} delay={index * 0.08}>
              <motion.a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card group block h-full p-6 transition-all hover:border-accent/40 relative overflow-hidden"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <Badge variant="accent" className="font-semibold">
                      {item.category}
                    </Badge>
                    <span className="text-xs font-semibold text-foreground-muted bg-background-muted/50 px-2 py-1 rounded-full">
                      {item.repository} · #{item.prNumber}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {item.description}
                  </p>
                  <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/10">
                    <p className="text-sm font-semibold text-accent-foreground">
                      {item.outcome}
                    </p>
                  </div>
                  <motion.span
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    View merged PR
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
