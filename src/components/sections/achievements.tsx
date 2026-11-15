"use client";

import { motion } from "framer-motion";
import { Award, Medal, Star, Trophy, Zap } from "lucide-react";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { ratings, siteConfig } from "@/data/site";

const stats = [
  { icon: Trophy, value: ratings.leetcode, label: "LeetCode rating", link: siteConfig.leetcode, tint: "from-purple-500/20 to-purple-500/5" },
  { icon: Star, value: ratings.codeforcesMax, label: "Codeforces max · Expert", link: siteConfig.codeforces, tint: "from-sky-500/20 to-sky-500/5" },
];

const recognition = [
  { icon: Medal, title: "Open Source Hackathon", detail: "Winner. Delivered production-ready features under time constraints.", tint: "text-emerald-500" },
  { icon: Zap, title: "Amazon ML Challenge 2025", detail: "Top 2,500 of 30,000+ participants.", tint: "text-orange-500" },
  { icon: Award, title: "Google The Big Code 2026", detail: "Qualified for Round 2.", tint: "text-sky-500" },
  { icon: Star, title: "Hackout 2025", detail: "Finalist, on technical merit.", tint: "text-purple-500" },
  { icon: Medal, title: "Oracle Cloud Infrastructure", detail: "Generative AI Professional and Data Science Professional.", tint: "text-red-500" },
];

export function Achievements() {
  return (
    <section id="achievements" className="section-alt section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Recognition"
            title="Achievements"
            subtitle="Competitive programming, hackathons and certifications. The Code for Good win is up top."
          />
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {stats.map((s, i) => {
            const Icon = s.icon;
            const body = (
              <>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.tint} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <Icon className="mb-3 h-7 w-7 text-accent" />
                  <div className="text-5xl font-bold tracking-tight text-foreground">
                    <AnimatedCounter value={s.value} />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground-muted">{s.label}</p>
                </div>
              </>
            );
            const cls = "group stat-card relative block overflow-hidden p-7";
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                {s.link ? (
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className={cls}>
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recognition.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-accent/40"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background-muted ${r.tint}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-foreground">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{r.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
