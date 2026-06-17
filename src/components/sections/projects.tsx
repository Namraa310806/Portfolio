"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Cloud, Brain, Palette, Zap, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { projects } from "@/data/site";

const iconMap = {
  ProfiLens: Code2,
  "Personal Cloud Assistant": Cloud,
  TeamSense: Brain,
  "Color Classifier": Palette,
  "Animal Classification": Zap,
};

export function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Featured Work"
            title="Projects"
            subtitle="Full-stack applications, ML systems, and cloud architectures built with production-grade patterns."
          />
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => {
            const Icon = iconMap[project.title as keyof typeof iconMap] || Code2;
            return (
              <FadeIn key={project.title} delay={index * 0.1}>
                <motion.div
                  className="glass-card p-6 group relative overflow-hidden"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10 transition-colors">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card hover:border-accent/40 hover:bg-accent/5 transition-all"
                        >
                          <Code2 className="h-5 w-5 text-foreground-muted group-hover:text-accent transition-colors" />
                        </a>
                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card hover:border-accent/40 hover:bg-accent/5 transition-all"
                          >
                            <ExternalLink className="h-5 w-5 text-foreground-muted group-hover:text-accent transition-colors" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                      {project.description}
                    </p>

                    <div className="mt-4">
                      <p className="text-xs font-bold text-accent mb-2">Key Engineering Challenges</p>
                      <ul className="space-y-1">
                        {project.challenges.map((challenge) => (
                          <li
                            key={challenge}
                            className="flex items-center gap-2 text-xs text-foreground-muted"
                          >
                            <CheckCircle2 className="h-3 w-3 text-accent flex-shrink-0" />
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-border bg-background-muted/50 px-3 py-1 text-xs font-semibold text-foreground group-hover:border-accent/30 group-hover:bg-accent/5 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
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
