"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Cloud,
  Code2,
  ExternalLink,
  Layout,
  Palette,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { projects } from "@/data/site";
import { getTechColor } from "@/lib/tech-colors";

const iconMap = {
  ProfiLens: Code2,
  "Personal Cloud Assistant": Cloud,
  TeamSense: Brain,
  "Animal Classification": Zap,
  "Color Classifier": Palette,
  GestureMediaPlayer: Palette,
  "n8n Workflow": Cloud,
  "Automated Book Workflow": Code2,
};

const featuredProjects = projects.slice(0, 5);
const carouselProjects = [...featuredProjects, ...featuredProjects];

export function Projects() {
  return (
    <section id="projects" className="section-padding overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Featured Work"
            title="Projects"
            subtitle="Full-stack applications, ML systems, and cloud architectures built with production-grade patterns."
          />
        </motion.div>

        <div className="mt-16">
          <div
            className="project-marquee relative -mx-4 overflow-hidden px-4 py-10 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            aria-label="Featured project carousel"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
            <div className="project-marquee-track flex w-max gap-5">
              {carouselProjects.map((project, index) => {
                const Icon = iconMap[project.title as keyof typeof iconMap] || Code2;
                const isDuplicate = index >= featuredProjects.length;

                return (
                  <article
                    key={`${project.title}-${index}`}
                    className="group relative flex h-[470px] w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-foreground/20 hover:shadow-md sm:w-[340px] lg:h-[510px] lg:w-[390px]"
                    aria-hidden={isDuplicate}
                  >
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background-muted text-foreground transition-transform duration-300 group-hover:scale-105">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground-muted transition-all hover:border-foreground/20 hover:bg-background-muted hover:text-foreground"
                            aria-label={`${project.title} GitHub repository`}
                          >
                            <Code2 className="h-5 w-5" />
                          </a>
                          {project.liveDemo && (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground-muted transition-all hover:border-foreground/20 hover:bg-background-muted hover:text-foreground"
                              aria-label={`${project.title} live demo`}
                            >
                              <ExternalLink className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground-muted">
                        {project.description}
                      </p>

                      <p className="mt-4 rounded-xl border border-border bg-background-muted px-3 py-2 text-sm font-semibold leading-relaxed text-foreground">
                        {project.outcome}
                      </p>

                      <div className="mt-5">
                        <p className="mb-3 flex items-center gap-2 text-xs font-bold text-foreground">
                          <Layout className="h-3.5 w-3.5" />
                          Key Engineering Challenges
                        </p>
                        <ul className="space-y-2">
                          {project.challenges.slice(0, 3).map((challenge) => (
                            <li
                              key={challenge}
                              className="flex items-center gap-2 text-xs text-foreground-muted"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-foreground-muted" />
                              <span className="line-clamp-1">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        {project.stack.slice(0, 5).map((tech) => {
                          return (
                            <span
                              key={tech}
                              className={getTechColor(tech)}
                            >
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-8 py-4 text-sm font-bold text-foreground-muted transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-foreground hover:shadow-lg"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
