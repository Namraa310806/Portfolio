"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/data/site";

export function GitHubHeatmap() {
  // Generate a simple heatmap visualization
  const weeks = 52;
  const days = 7;
  const contributionData = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0)
  );

  const getLevelColor = (level: number) => {
    if (level === 0) return "bg-background-muted/30";
    if (level === 1) return "bg-accent/20";
    if (level === 2) return "bg-accent/40";
    if (level === 3) return "bg-accent/60";
    return "bg-accent/80";
  };

  return (
    <section className="section-padding py-8">
      <div className="section-container">
        <FadeIn>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">Contribution Activity</h3>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent hover:underline"
            >
              View on GitHub
            </a>
          </div>
          <div className="glass-card p-6 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {contributionData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((level, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-3 h-3 rounded-sm ${getLevelColor(level)} cursor-pointer`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                      whileHover={{ scale: 1.3 }}
                      title={`${level} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-foreground-muted">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div key={level} className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
