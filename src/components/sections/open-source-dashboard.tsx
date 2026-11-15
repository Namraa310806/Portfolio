"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/section-header";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { WinnerToast } from "@/components/sections/spotlight";
import { siteConfig } from "@/data/site";
import { withBasePath } from "@/lib/utils";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => <div className="h-[120px] w-full max-w-[900px] animate-pulse rounded-lg bg-background-muted/20" />,
  },
);

/** Consistency (the heatmap) and achievement (the Code for Good win), in one place under the hero. */
export function OpenSourceDashboard() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section id="activity" className="section-padding pt-10 sm:pt-14">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Consistency and achievement"
            title="The steady work, and what it led to"
            subtitle="Open source activity on one side, a hackathon win on the other."
          />
        </motion.div>

        <div className="mt-10">
          <WinnerToast />
        </div>

        <motion.div
          className="mt-8 rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 p-6 backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <div className="flex justify-center" suppressHydrationWarning>
            <GitHubCalendar
              username={siteConfig.github.replace("https://github.com/", "")}
              blockSize={14}
              blockMargin={4}
              colorScheme={isDark ? "dark" : "light"}
              style={{ width: "100%", maxWidth: "900px" }}
              theme={
                isDark
                  ? { dark: ["#0f172a", "#0e4429", "#006d32", "#26a641", "#39d353"] }
                  : { light: ["#f1f5f9", "#bbf7d0", "#4ade80", "#16a34a", "#166534"] }
              }
            />
          </div>
          <div className="mt-8 flex justify-center">
            <a
              href={withBasePath("/opensource")}
              className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Browse all merged PRs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        <div className="mt-8">
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}
