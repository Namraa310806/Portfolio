"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Search, X } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { OrgLogo, orgMeta } from "@/components/visuals/org-logos";
import contributions from "@/data/contributions.json";
import contributionsMeta from "@/data/contributions-meta.json";
import { flagshipContributions } from "@/data/site";
import type { Contribution, ContributionCategory } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Scope = "all" | "flagship" | "community";

const PAGE_SIZE = 24;
const categories: ContributionCategory[] = ["Security", "Backend", "AI", "Performance", "Cloud", "Concurrency"];
const scopes: { key: Scope; label: string }[] = [
  { key: "all", label: "Everything" },
  { key: "flagship", label: "Big projects" },
  { key: "community", label: "Community" },
];

const all = contributions as Contribution[];
const flagshipRepos = contributionsMeta.flagshipRepos;
const communityRepos = contributionsMeta.communityRepos;

const featured = new Map(flagshipContributions.map((f) => [f.id, f]));

/** Plain-English title for featured PRs; light tidying of prefixes for the rest. */
function displayTitle(pr: Contribution) {
  const f = featured.get(pr.id);
  if (f) return f.title;
  const t = pr.title
    .replace(/^python:\s*/i, "")
    .replace(/^fix#\d+\s*-\s*/i, "")
    .replace(/^fixed\s+#\d+\s*--\s*/i, "")
    .replace(/^(fix|feat|chore)(\([^)]*\))?[:!/]\s*/i, "")
    .trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function topicOf(pr: Contribution): ContributionCategory {
  return featured.get(pr.id)?.category ?? pr.category;
}

function monthYear(iso?: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** Stable colour for a community repository's initial. */
function repoHue(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}

function ProjectMark({ pr }: { pr: Contribution }) {
  if (pr.org) return <OrgLogo org={pr.org} className="h-8 w-8 text-foreground" />;
  const hue = repoHue(pr.repository);
  return (
    <span
      aria-hidden
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
      style={{
        background: `hsl(${hue} 70% 55% / 0.16)`,
        color: `hsl(${hue} 75% 62%)`,
        border: `1px solid hsl(${hue} 70% 55% / 0.35)`,
      }}
    >
      {pr.repository.charAt(0).toUpperCase()}
    </span>
  );
}

export function OpenSourcePage() {
  const [scope, setScope] = useState<Scope>("all");
  const [repo, setRepo] = useState<string>("all");
  const [category, setCategory] = useState<ContributionCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [newestFirst, setNewestFirst] = useState(true);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = all.filter((pr) => {
      if (scope !== "all" && pr.tier !== scope) return false;
      if (repo !== "all" && pr.repository !== repo) return false;
      if (category !== "all" && topicOf(pr) !== category) return false;
      if (q && !(pr.title.toLowerCase().includes(q) || pr.repository.toLowerCase().includes(q))) return false;
      return true;
    });
    return list.sort((a, b) => {
      const diff = (a.mergedAt ?? "").localeCompare(b.mergedAt ?? "");
      return newestFirst ? -diff : diff;
    });
  }, [scope, repo, category, search, newestFirst]);

  const dirty = scope !== "all" || repo !== "all" || category !== "all" || search !== "";
  const visible = filtered.slice(0, limit);

  // Any filter change returns the list to its first page.
  const change = <T,>(setter: (v: T) => void) => (value: T) => {
    setter(value);
    setLimit(PAGE_SIZE);
  };
  const setScopeFilter = (value: Scope) => {
    setScope(value);
    setRepo("all");
    setLimit(PAGE_SIZE);
  };

  const repoOptions =
    scope === "flagship" ? flagshipRepos : scope === "community" ? communityRepos : [...flagshipRepos, ...communityRepos];

  return (
    <div className="min-h-screen">
      <Header />
      <section className="section-padding pt-24">
        <div className="section-container">
          <FadeIn>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <SectionHeader
              eyebrow="Open source"
              title="All merged pull requests"
              subtitle="Big upstream projects and community work in one place. Filter by project, topic or keyword."
            />
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
              <div className="flex flex-wrap items-center gap-3">
                <div role="group" aria-label="Scope" className="inline-flex rounded-xl border border-border bg-background-muted p-1">
                  {scopes.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setScopeFilter(s.key)}
                      aria-pressed={scope === s.key}
                      className={cn(
                        "rounded-lg px-4 py-1.5 text-sm font-semibold transition-all",
                        scope === s.key
                          ? "bg-accent text-white shadow-md shadow-accent/25"
                          : "text-foreground-muted hover:text-foreground",
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <select
                  value={repo}
                  onChange={(e) => change(setRepo)(e.target.value)}
                  aria-label="Project"
                  className="h-10 rounded-xl border border-border bg-card px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                >
                  <option value="all">All projects</option>
                  {repoOptions.map((r) => (
                    <option key={r.name} value={r.name}>
                      {r.displayName}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => change(setNewestFirst)(!newestFirst)}
                  className="h-10 rounded-xl border border-border bg-card px-3 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
                >
                  {newestFirst ? "Newest first" : "Oldest first"}
                </button>

                {dirty && (
                  <button
                    type="button"
                    onClick={() => {
                      setScope("all");
                      setRepo("all");
                      setCategory("all");
                      setSearch("");
                      setLimit(PAGE_SIZE);
                    }}
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {(["all", ...categories] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => change(setCategory)(c)}
                    aria-pressed={category === c}
                    className={cn(
                      "rounded-full border px-3.5 py-1 text-sm font-semibold transition-all",
                      category === c
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-background text-foreground-muted hover:border-accent/40 hover:text-foreground",
                    )}
                  >
                    {c === "all" ? "All topics" : c}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
                <Input
                  value={search}
                  onChange={(e) => change(setSearch)(e.target.value)}
                  placeholder="Search titles and projects"
                  aria-label="Search pull requests"
                  className="pl-11"
                />
              </div>
            </div>
          </FadeIn>

          <ul className="mt-6 space-y-2.5">
            {visible.map((pr) => (
              <li key={pr.id}>
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex items-center gap-4 rounded-xl border bg-card px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md",
                    pr.org ? "border-border" : "border-border/70",
                  )}
                  style={pr.org ? { borderLeft: `3px solid ${orgMeta[pr.org].color}` } : undefined}
                >
                  <ProjectMark pr={pr} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-foreground group-hover:text-accent">
                      {displayTitle(pr)}
                    </span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-foreground-muted">
                      <span className="font-medium">{pr.org ? orgMeta[pr.org].name : pr.repository}</span>
                      <span aria-hidden>·</span>
                      <span>{topicOf(pr)}</span>
                      {pr.mergedAt && (
                        <>
                          <span aria-hidden>·</span>
                          <span>{monthYear(pr.mergedAt)}</span>
                        </>
                      )}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-foreground-muted group-hover:text-accent">
                    #{pr.number}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="mt-10 rounded-2xl border border-dashed border-border py-12 text-center text-foreground-muted">
              Nothing matches those filters.
            </p>
          )}

          {filtered.length > visible.length && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setLimit((n) => n + PAGE_SIZE)}
                className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
