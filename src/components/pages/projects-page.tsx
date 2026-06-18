"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Cloud, Brain, Palette, Zap, CheckCircle2, Layout, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Header } from "@/components/layout/header";
import { projects } from "@/data/site";
import Link from "next/link";

const iconMap = {
  ProfiLens: Code2,
  "Personal Cloud Assistant": Cloud,
  TeamSense: Brain,
  "Animal Classification": Zap,
  "Color Classifier": Palette,
  "GestureMediaPlayer": Palette,
  "n8n Workflow": Cloud,
  "Automated Book Workflow": Code2,
};

export function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="section-padding pt-24">
        <div className="section-container">
          <FadeIn>
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
            <SectionHeader
              eyebrow="Featured Work"
              title="All Projects"
              subtitle="Full-stack applications, ML systems, and cloud architectures built with production-grade patterns."
            />
          </FadeIn>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => {
              const Icon = iconMap[project.title as keyof typeof iconMap] || Code2;
              return (
                <FadeIn key={project.title} delay={index * 0.1}>
                  <motion.div
                    className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6 hover:border-accent/50 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.15)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 group-hover:from-accent/30 group-hover:to-accent/10 group-hover:border-accent/40 transition-all duration-300">
                          <Icon className="h-7 w-7 text-accent" />
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                          >
                            <Code2 className="h-5 w-5 text-foreground-muted group-hover:text-accent transition-colors" />
                          </a>
                          {project.liveDemo && (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                            >
                              <ExternalLink className="h-5 w-5 text-foreground-muted group-hover:text-accent transition-colors" />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                        {project.description}
                      </p>

                      <div className="mt-4">
                        <p className="text-xs font-bold text-accent mb-2 flex items-center gap-2">
                          <Layout className="h-3 w-3" />
                          Key Engineering Challenges
                        </p>
                        <ul className="space-y-1.5">
                          {project.challenges.map((challenge) => (
                            <li
                              key={challenge}
                              className="flex items-center gap-2 text-xs text-foreground-muted"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-border/50 bg-background/50 px-3 py-1.5 text-xs font-semibold text-foreground group-hover:border-accent/30 group-hover:bg-accent/10 transition-all duration-300"
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
    </div>
  );
}
