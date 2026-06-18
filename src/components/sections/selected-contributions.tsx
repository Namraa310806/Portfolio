"use client";

import { Check, GitPullRequest, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
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

        <div className="mt-10 space-y-3">
          {selectedContributions.map((item, index) => (
            <FadeIn key={item.url} delay={index * 0.05}>
              <motion.a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-border bg-background-muted/30 p-4 hover:border-accent/50 hover:bg-accent/5 transition-all"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="rounded-full bg-green-500/10 p-2 border border-green-500/20">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-400">
                        Merged
                        <GitPullRequest className="h-3 w-3" />
                      </span>
                      <span className="text-xs text-foreground-muted">
                        {item.repository} · #{item.prNumber}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground-muted line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                        {item.category}
                      </span>
                      <span className="text-xs text-foreground-muted">
                        {item.outcome}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
