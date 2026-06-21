"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Search, TrendingUp, Filter, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Header } from "@/components/layout/header";
import contributions from "@/data/contributions.json";
import contributionsMeta from "@/data/contributions-meta.json";
import { siteConfig } from "@/data/site";
import type { Contribution, ContributionCategory } from "@/types";
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

export function OpenSourcePage() {
  const [filter, setFilter] = useState<ContributionCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [repoFilter, setRepoFilter] = useState<string | "All">("All");

  const filtered = useMemo(() => {
    return allContributions.filter((pr) => {
      const matchesCategory = filter === "All" || pr.category === filter;
      const matchesRepo = repoFilter === "All" || pr.repository === repoFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        pr.title.toLowerCase().includes(q) ||
        pr.repository.toLowerCase().includes(q);
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
                className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
            <SectionHeader
              eyebrow="Open Source Impact"
              title="All Contributions"
              subtitle={`${contributionsMeta.totalPRs}+ merged pull requests across ${contributionsMeta.totalRepositories} production repositories — security, concurrency, AI, cloud, and backend systems.`}
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
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <motion.h3
                  className="text-xl font-bold text-foreground flex items-center gap-2"
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
                    placeholder="Search PRs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 border-2 focus:border-accent/50"
                    aria-label="Search contributions"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <motion.button
                  onClick={() => setFilter("All")}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-bold transition-all",
                    filter === "All"
                      ? "border-accent bg-accent text-white shadow-lg shadow-accent/25"
                      : "border-border bg-card text-foreground-muted hover:border-accent/30 hover:shadow-md",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  All
                </motion.button>
                {filterCategories.map((cat) => (
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
                  >
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      <Card className="h-full transition-all hover:border-accent/40 hover:shadow-lg hover:-translate-y-1 group">
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <Badge
                            variant={
                              pr.status === "Merged" ? "accent" : "outline"
                            }
                            className="font-semibold"
                          >
                            {pr.status}
                          </Badge>
                          <Badge variant="outline" className="font-semibold">{pr.category}</Badge>
                        </div>
                        <CardTitle className="text-base leading-snug font-bold group-hover:text-accent transition-colors">
                          {pr.title}
                        </CardTitle>
                        <CardDescription className="mt-2 flex items-center gap-1 text-sm font-medium">
                          {pr.repository} · #{pr.number}
                          <ExternalLink className="h-3 w-3" />
                        </CardDescription>
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
