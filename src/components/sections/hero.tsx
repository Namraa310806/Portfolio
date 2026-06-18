"use client";

import { ArrowDown, Download, Code2, Link, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { NetworkBackground } from "@/components/animations/network-background";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn, withBasePath } from "@/lib/utils";
import { siteConfig } from "@/data/site";

export function Hero() {
  const scrollToContributions = () => {
    document
      .querySelector("#opensource")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document
      .querySelector("#projects")
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
        <div className="max-w-4xl space-y-8">
          <FadeIn>
            <motion.div
              className="section-eyebrow mb-5 inline-flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4 text-accent" />
              Backend Engineer · Open Source Contributor
            </motion.div>
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              NAMRAA PATEL
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="max-w-3xl text-xl leading-relaxed text-foreground-muted sm:text-2xl">
              I engineer backend systems that remain{" "}
              <motion.span
                className="text-accent font-semibold"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                reliable
              </motion.span>{" "}
              under scale,{" "}
              <motion.span
                className="text-accent font-semibold"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                secure
              </motion.span>{" "}
              under attack, and{" "}
              <motion.span
                className="text-accent font-semibold"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                resilient
              </motion.span>{" "}
              under failure.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Button size="lg" onClick={scrollToContributions} className="group">
                View Contributions
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
              <Button size="lg" onClick={scrollToProjects} variant="secondary" className="group">
                View Projects
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
              <a
                href={withBasePath(siteConfig.resumePath)}
                download
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
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
        </div>
      </div>
    </section>
  );
}
