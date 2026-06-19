"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Cloud, Brain, Palette, Zap, CheckCircle2, Layout, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { projects } from "@/data/site";

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

export function Projects() {
  return (
    <section id="projects" className="section-padding">
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

        <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((project, index) => {
            const Icon = iconMap[project.title as keyof typeof iconMap] || Code2;
            
            return (
              <motion.div
                key={project.title}
                className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6 hover:border-accent/50 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.15)] transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <motion.div 
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 group-hover:from-accent/30 group-hover:to-accent/10 group-hover:border-accent/40 transition-all duration-300 flex-shrink-0"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <Icon className="h-7 w-7 text-accent" />
                      </motion.div>
                      <div className="flex gap-2 flex-shrink-0">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-background/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Code2 className="h-4 w-4 text-foreground-muted group-hover:text-accent transition-colors" />
                        </motion.a>
                        {project.liveDemo && (
                          <motion.a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-background/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="h-4 w-4 text-foreground-muted group-hover:text-accent transition-colors" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground-muted line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-accent mb-2 flex items-center gap-2">
                        <Layout className="h-3 w-3" />
                        Key Engineering Challenges
                      </p>
                      <ul className="space-y-1">
                        {project.challenges.slice(0, 2).map((challenge) => (
                          <motion.li
                            key={challenge}
                            className="flex items-center gap-2 text-xs text-foreground-muted"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <CheckCircle2 className="h-3 w-3 text-accent flex-shrink-0" />
                            <span className="line-clamp-1">{challenge}</span>
                          </motion.li>
                        ))}
                        {project.challenges.length > 2 && (
                          <p className="text-xs text-foreground-muted">+{project.challenges.length - 2} more</p>
                        )}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((tech) => (
                        <motion.span
                          key={tech}
                          className="rounded-lg border border-border/50 bg-background/50 px-2 py-1 text-xs font-semibold text-foreground group-hover:border-accent/30 group-hover:bg-accent/10 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="rounded-lg border border-border/50 bg-background/50 px-2 py-1 text-xs font-semibold text-foreground-muted">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <a
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-6 py-3 text-sm font-bold text-foreground-muted transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-foreground hover:shadow-lg"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
