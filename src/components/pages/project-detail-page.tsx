"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Cloud, Brain, Palette, Zap, CheckCircle2, Layout, ArrowRight, ChevronRight, Home } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { ArchitectureDiagram } from "@/components/architecture/architecture-diagram";
import { profiLensNodes, profiLensEdges } from "@/components/architecture/profilens-architecture";
import { cloudAssistantNodes, cloudAssistantEdges } from "@/components/architecture/cloud-assistant-architecture";
import { teamSenseNodes, teamSenseEdges } from "@/components/architecture/teamsense-architecture";
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

interface ProjectDetailPageProps {
  project: {
    title: string;
    description: string;
    stack: string[];
    github: string;
    liveDemo: string | null;
    challenges: string[];
  };
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const Icon = iconMap[project.title as keyof typeof iconMap] || Code2;

  // Get architecture nodes and edges based on project title
  const getArchitecture = () => {
    switch (project.title) {
      case "ProfiLens":
        return { nodes: profiLensNodes, edges: profiLensEdges };
      case "Personal Cloud Assistant":
        return { nodes: cloudAssistantNodes, edges: cloudAssistantEdges };
      case "TeamSense":
        return { nodes: teamSenseNodes, edges: teamSenseEdges };
      default:
        return null;
    }
  };

  const architecture = getArchitecture();

  return (
    <div className="min-h-screen">
      <Header />
      <section className="section-padding pt-24">
        <div className="section-container">
          <FadeIn>
            <nav className="flex items-center gap-2 text-sm text-foreground-muted mb-8">
              <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/projects" className="hover:text-foreground transition-colors">
                Projects
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{project.title}</span>
            </nav>

            <SectionHeader
              eyebrow="Project Details"
              title={project.title}
              subtitle={project.description}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {architecture && (
                  <motion.div
                    className="rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Layout className="h-5 w-5 text-accent" />
                      System Architecture
                    </h3>
                    <ArchitectureDiagram nodes={architecture.nodes} edges={architecture.edges} />
                  </motion.div>
                )}

                <motion.div
                  className="rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: architecture ? 0.2 : 0.15 }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Layout className="h-5 w-5 text-accent" />
                    Key Engineering Challenges
                  </h3>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (architecture ? 0.25 : 0.2) + index * 0.05 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground-muted">{challenge}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className="rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: architecture ? 0.25 : 0.2 }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-accent" />
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="outline" className="font-semibold">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 mb-4">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-foreground-muted mb-4">{project.description}</p>
                  <div className="flex flex-col gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                    >
                      <Code2 className="h-4 w-4" />
                      View on GitHub
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link
                    href="/projects"
                    className="flex items-center gap-2 text-sm font-semibold text-foreground-muted hover:text-foreground transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Back to All Projects
                  </Link>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
