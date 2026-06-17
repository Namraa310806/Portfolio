"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { skillCategories } from "@/data/site";

export function TechStack() {
  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Tools & Technologies"
            title="Tech Stack"
            subtitle="Categorized by domain — not a wall of icons."
          />
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category, index) => (
            <FadeIn key={category.name} delay={index * 0.08}>
              <motion.div
                className="glass-card p-6 group"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-sm font-bold tracking-widest text-accent uppercase">
                  {category.name}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="rounded-lg border-2 border-border bg-background-muted/50 px-4 py-2 text-sm font-bold text-foreground group-hover:border-accent/30 group-hover:bg-accent/5 transition-all cursor-default"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 + skillIndex * 0.02, type: "spring", stiffness: 400 }}
                      whileHover={{ scale: 1.05, borderColor: "var(--accent)" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
