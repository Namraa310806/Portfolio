"use client";

import { ArrowDown, Download, Code2, Link, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { NetworkBackground } from "@/components/animations/network-background";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn, withBasePath } from "@/lib/utils";
import { heroStats, openSourceSummary, siteConfig } from "@/data/site";

export function Hero() {
  const scrollToWork = () => {
    document
      .querySelector("#contributions")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="hero-gradient relative flex min-h-[88vh] items-center overflow-hidden pt-16"
    >
      <div
        className="grid-pattern pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
      />
      <NetworkBackground />
      <div className="section-container relative z-10 py-16 sm:py-20">
        <FadeIn>
          <motion.div
            className="section-eyebrow mb-5 inline-flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-4 w-4 text-accent" />
            Backend Engineer · {openSourceSummary.mergedPRs}+ Merged PRs
          </motion.div>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            I engineer backend systems that remain{" "}
            <motion.span
              className="text-accent inline-block animate-gradient bg-gradient-to-r from-accent via-purple-500 to-accent bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              reliable
            </motion.span>{" "}
            under scale,{" "}
            <motion.span
              className="text-accent inline-block animate-gradient bg-gradient-to-r from-accent via-purple-500 to-accent bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              secure
            </motion.span>{" "}
            under attack, and{" "}
            <motion.span
              className="text-accent inline-block animate-gradient bg-gradient-to-r from-accent via-purple-500 to-accent bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              resilient
            </motion.span>{" "}
            under failure.
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted sm:text-xl">
            Shipping production-grade backend systems, open-source contributions,
            and AI infrastructure across distributed, security-critical
            codebases.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button size="lg" onClick={scrollToWork} className="group">
              View Contributions
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
            <a
              href={withBasePath(siteConfig.resumePath)}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Link className="h-4 w-4" />
              LinkedIn
            </a>
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <motion.div
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card p-5 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-foreground-muted sm:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
