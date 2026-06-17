"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { journey } from "@/data/site";

export function Journey() {
  return (
    <section id="journey" className="section-alt section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Engineering Evolution"
            title="How I Build"
            subtitle="From backend APIs to distributed systems — a progression of production engineering skills."
          />
        </FadeIn>

        <div className="relative mt-16">
          {/* Enhanced timeline line with glow effect */}
          <div
            className="absolute left-4 top-0 bottom-0 w-1.5 bg-gradient-to-b from-accent via-accent/60 to-accent/20 rounded-full sm:left-1/2 sm:-translate-x-1/2 shadow-lg shadow-accent/30"
            aria-hidden
          />

          <div className="space-y-16">
            {journey.map((milestone, index) => (
              <FadeIn key={milestone.year} delay={index * 0.12}>
                <div
                  className={`relative flex flex-col gap-4 sm:flex-row sm:items-center ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="hidden flex-1 sm:block" />
                  <motion.div
                    className="absolute left-4 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center sm:left-1/2 sm:-translate-x-1/2"
                    whileInView={{ scale: [0, 1], rotate: [0, 360] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.18, type: "spring", stiffness: 200 }}
                  >
                    <div className="h-5 w-5 rounded-full border-3 border-accent bg-card shadow-xl shadow-accent/40" />
                    <div className="absolute inset-0 h-5 w-5 rounded-full bg-accent/30 animate-ping" />
                    <div className="absolute inset-0 h-5 w-5 rounded-full bg-accent/20 animate-pulse" />
                  </motion.div>
                  <div
                    className={`ml-14 flex-1 sm:ml-0 ${
                      index % 2 === 0 ? "sm:pr-14 sm:text-right" : "sm:pl-14"
                    }`}
                  >
                    <motion.div
                      className="glass-card p-7 hover:border-accent/50 transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ scale: 1.03, y: -6 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <motion.div
                          className="inline-block mb-3"
                          initial={{ opacity: 0, y: -10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.12 + 0.25, type: "spring", stiffness: 300 }}
                        >
                          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 text-sm font-bold text-accent">
                            {milestone.year}
                          </span>
                        </motion.div>
                        <motion.h3
                          className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.12 + 0.3, type: "spring", stiffness: 300 }}
                        >
                          {milestone.title}
                        </motion.h3>
                        <motion.p
                          className="mt-3 text-base leading-relaxed text-foreground-muted"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.12 + 0.35, type: "spring", stiffness: 300 }}
                        >
                          {milestone.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
