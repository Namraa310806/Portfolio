"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Award, Medal, Star, Zap, Code2 } from "lucide-react";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/data/site";

const achievements = [
  { icon: Trophy, value: 2013, label: "LeetCode Rating", color: "from-purple-500/20 to-purple-500/5", borderColor: "border-purple-500/30" },
  { icon: Target, value: 500, label: "Problems Solved", suffix: "+", color: "from-blue-500/20 to-blue-500/5", borderColor: "border-blue-500/30" },
  { icon: Star, value: 4, label: "CodeChef Rating", suffix: "★", color: "from-yellow-500/20 to-yellow-500/5", borderColor: "border-yellow-500/30" },
  { icon: Award, value: 47, label: "GSSoC Rank", color: "from-green-500/20 to-green-500/5", borderColor: "border-green-500/30" },
  { icon: Zap, value: 2500, label: "Amazon ML Challenge", suffix: " Top", color: "from-orange-500/20 to-orange-500/5", borderColor: "border-orange-500/30" },
  { icon: Medal, value: 2, label: "OCI Certifications", color: "from-red-500/20 to-red-500/5", borderColor: "border-red-500/30" },
];

export function Achievements() {
  return (
    <section id="achievements" className="section-alt section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Recognition"
            title="Achievements"
            subtitle="Competitive programming, open source recognition, and certifications."
          />
        </motion.div>

        <div className="mx-auto mt-10 max-w-6xl">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              
              return (
                <motion.div
                  key={index}
                  className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-8 hover:border-accent/50 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.15)] transition-all duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <motion.div 
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex-shrink-0 mb-4"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Icon className="h-8 w-8 text-accent" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="text-5xl font-bold tracking-tight text-foreground mb-2">
                        <AnimatedCounter
                          value={achievement.value}
                          suffix={achievement.suffix}
                        />
                      </div>
                      <p className="text-base font-bold text-foreground-muted">
                        {achievement.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <p className="text-sm font-medium text-foreground-muted">
              <a
                href={siteConfig.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-accent hover:underline transition-colors"
              >
                LeetCode profile
              </a>
              {" "}· Codeforces 1364 · CodeChef 4★
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
