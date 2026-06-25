"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Search, ShieldCheck, TrendingUp } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Header } from "@/components/layout/header";
import contributions from "@/data/contributions.json";
import contributionsMeta from "@/data/contributions-meta.json";
import type { Contribution, ContributionCategory } from "@/types";
import { getContributionSummary } from "@/lib/contribution-summaries";
import { cn } from "@/lib/utils";
import Link from "next/link";

const filterCategories: ContributionCategory[] = [
  "Security",
  "Backend",
  "AI",
  "Performance",
  "Cloud",
  "Concurrency",
];

const allContributions = contributions as Contribution[];
const productionRepositories = contributionsMeta.productionRepos;
const topContributionIds = [
  "pr-Eventra-8655",
  "pr-Eventra-9156",
  "pr-LegalEase-350",
  "pr-AegisGraph-Sentinel-2.0-1054",
  "pr-pdf-qa-bot-69",
  "pr-LegalEase-402",
];
const topContributions = topContributionIds
  .map((id) => allContributions.find((pr) => pr.id === id))
  .filter((pr): pr is Contribution => Boolean(pr));

export function OpenSourcePage() {
  const [filter, setFilter] = useState<ContributionCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [repoFilter, setRepoFilter] = useState<string | "All">("All");

  const filtered = useMemo(() => {
    return allContributions.filter((pr) => {
      const q = search.toLowerCase();
      const matchesCategory = filter === "All" || pr.category === filter;
      const matchesRepo = repoFilter === "All" || pr.repository === repoFilter;
      const matchesSearch =
        !q ||
        pr.title.toLowerCase().includes(q) ||
        pr.repository.toLowerCase().includes(q) ||
        pr.category.toLowerCase().includes(q) ||
        getContributionSummary(pr).toLowerCase().includes(q);

      return matchesCategory && matchesRepo && matchesSearch;
    });
  }, [filter, repoFilter, search]);

  return (
    <div className="min-h-screen">
      <Header />
      <section className="section-alt section-padding pt-24">
        <div className="section-container">
          <FadeIn>
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
            <SectionHeader
              eyebrow="Open Source Impact"
              title="All Contributions"
              subtitle={`${contributionsMeta.totalPRs}+ merged pull requests across ${contributionsMeta.totalRepositories} production repositories - security, concurrency, AI, cloud, and backend systems.`}
            />
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mt-8 flex flex-wrap gap-2">
              {productionRepositories.map((repo) => (
                <motion.div
                  key={repo.name}
                  className="flex items-stretch"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setRepoFilter(repoFilter === repo.name ? "All" : repo.name)
                    }
                    className={cn(
                      "inline-flex items-center gap-2 rounded-l-xl border border-r-0 px-4 py-2.5 text-sm font-medium transition-all",
                      repoFilter === repo.name
                        ? "border-accent/40 bg-accent text-white shadow-lg shadow-accent/25"
                        : "border-border bg-card text-foreground hover:shadow-md",
                    )}
                  >
                    {repo.displayName}
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                        repoFilter === repo.name
                          ? "bg-white/25"
                          : "bg-background-muted text-foreground-muted",
                      )}
                    >
                      {repo.prCount}
                    </span>
                  </button>
                  <a
                    href={repo.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${repo.displayName} on GitHub`}
                    className={cn(
                      "inline-flex items-center rounded-r-xl border px-2.5 transition-colors",
                      repoFilter === repo.name
                        ? "border-accent/40 bg-accent text-white"
                        : "border-border bg-card text-foreground-muted hover:text-accent hover:shadow-md",
                    )}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="mt-10">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-muted px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Highest Impact
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    Top Contributions
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">
                    Curated by production risk, technical difficulty, and recruiter signal.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {topContributions.map((pr, index) => (
                  <motion.a
                    key={pr.id}
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.35 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/25 bg-accent-muted text-sm font-black text-accent-foreground">
                            {index + 1}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-foreground">
                              {pr.repository}
                            </p>
                            <p className="text-xs font-medium text-foreground-muted">
                              PR #{pr.number}
                            </p>
                          </div>
                        </div>
                        <Badge variant="accent" className="font-semibold">
                          {pr.category}
                        </Badge>
                      </div>
                      <h4 className="text-base font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                        {pr.title}
                      </h4>
                      <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">
                        {getContributionSummary(pr)}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-accent">
                        View important PR
                        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <motion.h3
                  className="flex items-center gap-2 text-xl font-bold text-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <TrendingUp className="h-5 w-5 text-accent" />
                  All Contributions ({filtered.length})
                </motion.h3>
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
                  <Input
                    type="search"
                    placeholder="Search PRs..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="pl-10"
                    aria-label="Search contributions"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(["All", ...filterCategories] as const).map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-xs font-bold transition-all",
                      filter === cat
                        ? "border-accent bg-accent text-white shadow-lg shadow-accent/25"
                        : "border-border bg-card text-foreground-muted hover:border-accent/30 hover:shadow-md",
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((pr, index) => (
                  <motion.div
                    key={pr.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02, type: "spring", stiffness: 300 }}
                    whileHover={{ y: -4 }}
                  >
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      <Card className="group relative h-full min-h-[230px] overflow-hidden border-border/70 transition-all hover:border-accent/40 hover:shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="relative z-10">
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <Badge
                              variant={pr.status === "Merged" ? "accent" : "outline"}
                              className="font-semibold"
                            >
                              {pr.status}
                            </Badge>
                            <Badge variant="outline" className="font-semibold">
                              {pr.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-base font-bold leading-snug transition-colors group-hover:text-accent">
                            {pr.title}
                          </CardTitle>
                          <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">
                            {getContributionSummary(pr)}
                          </p>
                          <CardDescription className="mt-3 text-sm font-medium">
                            {pr.repository} - #{pr.number}
                          </CardDescription>
                          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-accent">
                            View PR
                            <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </Card>
                    </a>
                  </motion.div>
                ))}
              </div>

              {filtered.length === 0 && (
                <motion.p
                  className="py-10 text-center text-sm text-foreground-muted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No contributions match your filters.
                </motion.p>
              )}

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-6 py-3 text-sm font-bold text-foreground-muted transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-foreground hover:shadow-lg"
                >
                  View All Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
