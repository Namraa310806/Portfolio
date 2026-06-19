"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, CheckCircle2, GitPullRequest } from "lucide-react";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { FadeIn } from "@/components/animations/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import contributionsMeta from "@/data/contributions-meta.json";
import { openSourceSummary, selectedContributions, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => <div className="h-[120px] w-full max-w-[900px] bg-background-muted/20 rounded-lg animate-pulse" />,
  }
);

const productionRepositories = contributionsMeta.productionRepos;
const featuredContributions = selectedContributions.slice(0, 3);

export function OpenSourceDashboard() {
  return (
    <section id="opensource" className="section-alt section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Open Source Impact"
            title="Production Contributions"
            subtitle={`${contributionsMeta.totalPRs}+ merged pull requests across ${contributionsMeta.totalRepositories} production repositories — security, concurrency, AI, cloud, and backend systems.`}
          />
        </motion.div>

        <motion.div
          className="mt-10 grid gap-6 lg:grid-cols-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div
              className="stat-card p-8 text-center"
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="text-5xl font-bold text-foreground">
                <AnimatedCounter
                  value={openSourceSummary.mergedPRs}
                  suffix="+"
                />
              </div>
              <p className="mt-3 text-base font-semibold text-foreground-muted">
                Merged PRs
              </p>
            </motion.div>
            <motion.div
              className="stat-card p-8 text-center"
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="text-5xl font-bold text-foreground">
                <AnimatedCounter
                  value={openSourceSummary.repositories}
                />
              </div>
              <p className="mt-3 text-base font-semibold text-foreground-muted">Production Repositories</p>
            </motion.div>
          </div>

          <motion.div
            className="rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h4 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">
              Focus Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {openSourceSummary.categories.map((cat) => (
                <motion.div
                  key={cat}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Badge variant="accent" className="font-semibold text-sm px-4 py-2">
                    {cat}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h4 className="text-sm font-bold text-accent uppercase tracking-wider mb-6">
            GitHub Contribution Heatmap
          </h4>
          <div className="flex justify-center" suppressHydrationWarning>
            <GitHubCalendar
              username={siteConfig.github.replace("https://github.com/", "")}
              blockSize={14}
              blockMargin={4}
              colorScheme="dark"
              style={{ width: "100%", maxWidth: "900px" }}
              theme={{
                dark: [
                  "#161b22",
                  "#0e4429",
                  "#006d32",
                  "#26a641",
                  "#39d353",
                ],
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-8 rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h4 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">
            Repository Distribution
          </h4>
          <div className="space-y-3">
            {productionRepositories.map((repo, index) => {
              const maxPrs = Math.max(...productionRepositories.map((r) => r.prCount));
              const percentage = (repo.prCount / maxPrs) * 100;
              const barWidth = Math.max(percentage, 10);
              return (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.35 + index * 0.05, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-32 text-sm font-semibold text-foreground truncate">
                      {repo.displayName}
                    </span>
                    <div className="flex-1 h-4 rounded-full bg-background-muted/50 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${barWidth}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="w-12 text-sm font-bold text-accent text-right">
                      {repo.prCount}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-6">Featured Contributions</h3>
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredContributions.map((contribution, index) => (
              <motion.div
                key={contribution.title}
                className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6 hover:border-accent/50 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.15)] transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.45 + index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/30 px-3 py-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      <span className="text-xs font-bold text-green-500">MERGED</span>
                    </div>
                    <Badge variant="outline" className="font-semibold text-xs">
                      {contribution.category}
                    </Badge>
                  </div>

                  <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors mb-1">
                    {contribution.title}
                  </h4>
                  <p className="text-sm text-foreground-muted mb-4 flex items-center gap-1">
                    <GitPullRequest className="h-3 w-3" />
                    {contribution.repository}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-bold text-accent mb-1">PROBLEM</p>
                      <p className="text-sm text-foreground-muted">{contribution.description}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-accent mb-1">SOLUTION</p>
                      <p className="text-sm text-foreground-muted">{contribution.outcome}</p>
                    </div>
                  </div>

                  <a
                    href={contribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                  >
                    View PR
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <a
              href="/opensource"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-6 py-3 text-sm font-bold text-foreground-muted transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-foreground hover:shadow-lg"
            >
              View All {openSourceSummary.mergedPRs} Contributions
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
