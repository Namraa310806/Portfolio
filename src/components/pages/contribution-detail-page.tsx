"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, ChevronRight, Home, GitPullRequest, Database, Shield, Zap } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ContributionDetailPageProps {
  contribution: {
    title: string;
    repository: string;
    description: string;
    outcome: string;
    category: string;
    url: string;
    prNumber: number;
  };
}

const categoryIcons: Record<string, any> = {
  Security: Shield,
  Concurrency: Zap,
  AI: Database,
  Backend: GitPullRequest,
};

export function ContributionDetailPage({ contribution }: ContributionDetailPageProps) {
  const Icon = categoryIcons[contribution.category] || GitPullRequest;

  return (
    <div className="min-h-screen">
      <Header />
      <section className="section-alt section-padding pt-24">
        <div className="section-container">
          <FadeIn>
            <nav className="flex items-center gap-2 text-sm text-foreground-muted mb-8">
              <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/opensource" className="hover:text-foreground transition-colors">
                Open Source
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{contribution.title}</span>
            </nav>

            <SectionHeader
              eyebrow="Contribution Details"
              title={contribution.title}
              subtitle={`Open source contribution to ${contribution.repository}`}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  className="rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="accent" className="font-semibold">
                      {contribution.category}
                    </Badge>
                    <span className="text-sm text-foreground-muted">
                      #{contribution.prNumber}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3">Problem</h3>
                  <p className="text-foreground-muted mb-6">{contribution.description}</p>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3">Solution</h3>
                  <p className="text-foreground-muted">{contribution.outcome}</p>
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
                  <h3 className="text-xl font-bold text-foreground mb-2">{contribution.title}</h3>
                  <p className="text-sm text-foreground-muted mb-4">{contribution.repository}</p>
                  <a
                    href={contribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                  >
                    <GitPullRequest className="h-4 w-4" />
                    View Pull Request
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link
                    href="/opensource"
                    className="flex items-center gap-2 text-sm font-semibold text-foreground-muted hover:text-foreground transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Back to All Contributions
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
