"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, GitMerge, Package } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { TiltCard } from "@/components/animations/tilt-card";
import { SectionHeader } from "@/components/ui/section-header";
import { OrgLogo, orgMeta } from "@/components/visuals/org-logos";
import { RaceVisual } from "@/components/visuals/race-visual";
import contributions from "@/data/contributions.json";
import { flagshipContributions } from "@/data/site";
import type { Contribution, ContributionCategory, FlagshipContribution, OrgKey } from "@/types";
import { cn } from "@/lib/utils";

const byId = new Map((contributions as Contribution[]).map((c) => [c.id, c]));

const categoryStyle: Record<ContributionCategory, string> = {
  Concurrency: "border-purple-500/30 bg-purple-500/10 text-purple-500",
  Security: "border-red-500/30 bg-red-500/10 text-red-500",
  Backend: "border-sky-500/30 bg-sky-500/10 text-sky-500",
  AI: "border-amber-500/30 bg-amber-500/10 text-amber-500",
  Cloud: "border-cyan-500/30 bg-cyan-500/10 text-cyan-500",
  Performance: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
};

const orgOrder: OrgKey[] = ["celery", "django", "microsoft", "off"];

function DiffStat({ id }: { id: string }) {
  const c = byId.get(id);
  if (c?.additions == null || c?.deletions == null) return null;
  return (
    <span className="font-mono text-xs">
      <span className="text-emerald-500">+{c.additions}</span>{" "}
      <span className="text-red-400">−{c.deletions}</span>
    </span>
  );
}

function ShippedPill({ shipped }: { shipped?: string }) {
  if (!shipped) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-500">
      <Package className="h-3 w-3" />
      Shipped in {shipped}
    </span>
  );
}

function FlagshipCard({ item }: { item: FlagshipContribution }) {
  return (
    <TiltCard className="h-full rounded-2xl">
      <article className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-accent/40">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-bold",
              categoryStyle[item.category],
            )}
          >
            {item.kind}
          </span>
        </div>

        <h3 className="text-lg font-bold leading-snug text-foreground">{item.title}</h3>

        <div className="mt-4 space-y-3 text-sm leading-relaxed">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-red-400">{item.kind === "Feature" ? "The gap" : "What broke"}</p>
            <p className="text-foreground-muted">{item.problem}</p>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-500">The fix</p>
            <p className="text-foreground-muted">{item.fix}</p>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <div className="flex flex-wrap items-center gap-2">
            <ShippedPill shipped={item.shipped} />
            <DiffStat id={item.id} />
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            #{item.number}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </article>
    </TiltCard>
  );
}

const pullsUrl: Record<OrgKey, string> = {
  celery: "https://github.com/celery/celery/pulls?q=is%3Apr+author%3ANamraa310806+is%3Amerged",
  django: "https://github.com/django/django/pulls?q=is%3Apr+author%3ANamraa310806+is%3Amerged",
  microsoft: "https://github.com/microsoft/agent-framework/pulls?q=is%3Apr+author%3ANamraa310806+is%3Amerged",
  off: "https://github.com/openfoodfacts/openfoodfacts-explorer/pulls?q=is%3Apr+author%3ANamraa310806+is%3Amerged",
};

function LeadStory({ item }: { item: FlagshipContribution }) {
  return (
    <div className="grid items-center gap-8 rounded-2xl border border-border bg-background-muted/60 p-5 sm:p-7 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
            <GitMerge className="h-3.5 w-3.5" />
            Lead story
          </span>
          <span className={cn("rounded-full border px-2.5 py-1 text-xs font-bold", categoryStyle[item.category])}>
            {item.kind}
          </span>
        </div>
        <h3 className="text-2xl font-bold leading-tight text-foreground">{item.title}</h3>
        <div className="mt-5 space-y-4 text-[15px] leading-relaxed">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-red-400">What broke</p>
            <p className="text-foreground-muted">{item.problem}</p>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-500">The fix</p>
            <p className="text-foreground-muted">{item.fix}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Read the PR #{item.number}
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <DiffStat id={item.id} />
        </div>
      </div>
      <RaceVisual />
    </div>
  );
}

export function Flagship() {
  const [open, setOpen] = useState<OrgKey | null>("celery");

  const groups = orgOrder
    .map((key) => ({ key, items: flagshipContributions.filter((c) => c.org === key) }))
    .filter((g) => g.items.length > 0);

  return (
    <section id="opensource" className="section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Upstream engineering"
            title="Bugs fixed in code that production runs on"
            subtitle="Merged into Celery, Django, Microsoft Agent Framework and Open Food Facts. The interesting part is never the diff. It is finding the root cause."
          />
        </FadeIn>

        <div className="mt-10 space-y-4">
          {groups.map(({ key, items }, index) => {
            const isOpen = open === key;
            const lead = key === "celery" ? items[0] : null;
            const rest = lead ? items.slice(1) : items;
            return (
              <FadeIn key={key} delay={index * 0.05}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-card shadow-sm transition-colors",
                    isOpen ? "border-accent/40" : "border-border hover:border-accent/30",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    aria-controls={`flagship-${key}`}
                    className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                  >
                    <OrgLogo org={key} className="h-10 w-10 text-foreground" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-bold text-foreground">{orgMeta[key].name}</span>
                      <span className="block text-sm text-foreground-muted">{orgMeta[key].blurb}</span>
                    </span>
                    <span className="hidden flex-wrap justify-end gap-1.5 md:flex">
                      {items.map((item) => (
                        <span
                          key={item.id}
                          className={cn("rounded-full border px-2.5 py-1 text-xs font-bold", categoryStyle[item.category])}
                        >
                          {item.kind}
                        </span>
                      ))}
                    </span>
                    <ChevronDown
                      className={cn("h-5 w-5 shrink-0 text-foreground-muted transition-transform duration-300", isOpen && "rotate-180 text-accent")}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`flagship-${key}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-5 border-t border-border p-5 sm:p-6">
                          {lead && <LeadStory item={lead} />}
                          {rest.length > 0 && (
                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                              {rest.map((item) => (
                                <FlagshipCard key={item.id} item={item} />
                              ))}
                            </div>
                          )}
                          <a
                            href={pullsUrl[key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                          >
                            Everything I merged in {orgMeta[key].short}
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
