"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { engineeringPrinciples } from "@/data/site";

export function EngineeringPrinciples() {
  return (
    <section id="principles" className="section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="How I Build"
            title="Engineering Principles"
            subtitle="How I approach systems that need to survive production — not just pass tests."
          />
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {engineeringPrinciples.map((principle, index) => (
            <FadeIn key={principle.title} delay={index * 0.08}>
              <motion.div
                className="glass-card h-full p-6 group relative overflow-hidden"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent font-bold">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-foreground text-lg group-hover:text-accent transition-colors">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {principle.description}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
