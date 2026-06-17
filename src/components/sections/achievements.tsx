"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Award, Medal, Star, Zap } from "lucide-react";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { achievementStats, siteConfig } from "@/data/site";

const additionalAchievements = [
  { icon: Award, text: "GSSoC 2026 S-Tier · Rank #47" },
  { icon: Medal, text: "Oracle Certified AI & Data Science" },
  { icon: Star, text: "Open Source Hackathon Winner" },
  { icon: Zap, text: "Amazon ML Challenge Top 2,500" },
];

export function Achievements() {
  return (
    <section id="achievements" className="section-alt section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="By the Numbers"
            title="Achievements"
            subtitle="Measurable output across open source, competitive programming, and academics."
            align="center"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {achievementStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card p-5 text-center sm:p-6"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.08, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.08, y: -4 }}
              >
                <div className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <p className="mt-2 text-xs font-bold text-foreground-muted sm:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <motion.div
            className="mx-auto mt-12 max-w-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          >
            <div className="glass-card p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {additionalAchievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + index * 0.05, type: "spring", stiffness: 300 }}
                    >
                      <Icon className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-sm font-semibold text-foreground">
                        {achievement.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 text-center">
                <p className="text-sm font-medium text-foreground-muted">
                  CodeChef 4★ · Codeforces 1364 ·{" "}
                  <a
                    href={siteConfig.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-accent hover:underline transition-colors"
                  >
                    LeetCode profile
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
