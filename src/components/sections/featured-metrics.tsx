"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { heroStats, achievementStats } from "@/data/site";

export function FeaturedMetrics() {
  const metrics = [
    ...heroStats,
    ...achievementStats,
  ];

  return (
    <section className="section-padding py-12 bg-gradient-to-b from-background to-background/50">
      <div className="section-container">
        <FadeIn>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.08, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                  />
                </div>
                <p className="mt-2 text-xs font-bold text-foreground-muted sm:text-sm">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
