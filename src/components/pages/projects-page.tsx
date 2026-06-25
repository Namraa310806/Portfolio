"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code2, Cloud, Brain, Palette, Zap, CheckCircle2, Layout, Search } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Header } from "@/components/layout/header";
import { projects } from "@/data/site";
import { getTechColor, techColors } from "@/lib/tech-colors";
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
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return projects;

    return projects.filter((project) => {
      const searchable = [
        project.title,
        project.description,
        project.outcome,
        ...project.stack,
        ...project.stack.map((tech) => techColors[tech] ?? "other"),
        ...project.challenges,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [search]);

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

          <FadeIn delay={0.05}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-foreground-muted">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
                <Input
                  type="search"
                  placeholder="Search projects, tech, category..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="pl-10"
                  aria-label="Search projects"
                />
              </div>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => {
              const Icon = iconMap[project.title as keyof typeof iconMap] || Code2;
              return (
                <FadeIn key={project.title} delay={index * 0.1}>
                  <motion.div
                    className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-foreground/20 hover:shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background-muted border border-border text-foreground group-hover:scale-105 transition-all duration-300">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground-muted hover:border-foreground/20 hover:bg-background-muted hover:text-foreground transition-all duration-300"
                            aria-label={`${project.title} GitHub repository`}
                          >
                            <Code2 className="h-5 w-5" />
                          </a>
                          {project.liveDemo && (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground-muted hover:border-foreground/20 hover:bg-background-muted hover:text-foreground transition-all duration-300"
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

                      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                        {project.description}
                      </p>

                      <p className="mt-4 rounded-xl border border-border bg-background-muted px-3 py-2 text-sm font-semibold leading-relaxed text-foreground">
                        {project.outcome}
                      </p>

                      <div className="mt-4">
                        <p className="text-xs font-bold text-foreground mb-2 flex items-center gap-2">
                          <Layout className="h-3 w-3" />
                          Key Engineering Challenges
                        </p>
                        <ul className="space-y-1.5">
                          {project.challenges.map((challenge) => (
                            <li
                              key={challenge}
                              className="flex items-center gap-2 text-xs text-foreground-muted"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-foreground-muted flex-shrink-0" />
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        {project.stack.map((tech) => {
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
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <motion.p
              className="py-12 text-center text-sm text-foreground-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No projects match your search.
            </motion.p>
          )}
        </div>
      </section>
    </div>
  );
}
