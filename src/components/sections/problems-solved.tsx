"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Brain, Lock, AlertTriangle } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { problemsSolved } from "@/data/site";

const iconMap = {
  Security: Shield,
  Concurrency: Zap,
  AI: Brain,
};

export function ProblemsSolved() {
  return (
    <section id="problems-solved" className="section-alt section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Signature Section"
            title="Problems I've Solved"
            subtitle="Real engineering challenges across production systems."
          />
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {problemsSolved.map((problem, index) => {
            const Icon = iconMap[problem.category as keyof typeof iconMap] || Shield;
            return (
              <FadeIn key={problem.title} delay={index * 0.1}>
                <motion.div
                  className="glass-card p-6 group relative overflow-hidden"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10 transition-colors">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                          {problem.title}
                        </h3>
                        <span className="inline-block mt-1 text-xs font-semibold text-accent/80">
                          {problem.category}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-bold text-foreground-muted mb-1">Problem</p>
                        <p className="text-sm text-foreground">{problem.problem}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground-muted mb-1">Solution</p>
                        <p className="text-sm text-foreground">{problem.solution}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-accent mb-1">Impact</p>
                        <p className="text-sm font-semibold text-foreground">{problem.impact}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
