"use client";

import { ArrowDown, Download, Code2, Link, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/visuals/aurora-background";
import { GradientMesh } from "@/components/visuals/gradient-mesh";
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
      className="relative flex min-h-[90vh] items-center overflow-hidden pt-20"
    >
      <AuroraBackground />
      <GradientMesh />
      <div className="section-container relative z-10 py-12 sm:py-16">
        <div className="max-w-4xl space-y-6">
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">
              Backend Engineer · Open Source Contributor
            </span>
          </motion.div>
          
          <motion.h1
            className="text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            NAMRAA PATEL
          </motion.h1>

          <motion.p
            className="max-w-3xl text-lg leading-relaxed text-foreground-muted sm:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            I engineer backend systems that remain{" "}
            <motion.span
              className="text-accent font-semibold inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              reliable
            </motion.span>{" "}
            under scale,{" "}
            <motion.span
              className="text-accent font-semibold inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              secure
            </motion.span>{" "}
            under attack, and{" "}
            <motion.span
              className="text-accent font-semibold inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              resilient
            </motion.span>{" "}
            under failure.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 pt-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <Button
              size="lg"
              onClick={scrollToContributions}
              className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground/90"
            >
              <span className="relative z-10 flex items-center">
                View Contributions
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </span>
            </Button>
            <Button
              size="lg"
              onClick={scrollToProjects}
              variant="secondary"
              className="group backdrop-blur-sm"
            >
              <span className="relative z-10 flex items-center">
                View Projects
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </span>
            </Button>
            <a
              href={withBasePath(siteConfig.resumePath)}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "backdrop-blur-sm border-accent/30 hover:border-accent/50 hover:bg-accent/10"
              )}
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "backdrop-blur-sm border-accent/30 hover:border-accent/50 hover:bg-accent/10"
              )}
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "backdrop-blur-sm border-accent/30 hover:border-accent/50 hover:bg-accent/10"
              )}
            >
              <Link className="h-4 w-4" />
              LinkedIn
            </a>
          </motion.div>

          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <p className="text-sm text-foreground-muted">
              Focused on Security Engineering · Distributed Systems · Backend Architecture · Cloud Infrastructure · AI Systems
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
