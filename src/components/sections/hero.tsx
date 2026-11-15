"use client";

import { ArrowDown, Download, Code2, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/visuals/aurora-background";
import { Constellation } from "@/components/visuals/constellation";
import { Magnetic } from "@/components/ui/magnetic";
import { TiltCard } from "@/components/animations/tilt-card";
import { GradientMesh } from "@/components/visuals/gradient-mesh";
import { OrgLogo, orgMeta } from "@/components/visuals/org-logos";
import { TerminalCard, type TerminalLine } from "@/components/visuals/terminal-card";
import { Typewriter } from "@/components/animations/typewriter";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn, withBasePath } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import type { OrgKey } from "@/types";

const orgs: OrgKey[] = ["celery", "django", "microsoft", "off"];

const terminalLines: TerminalLine[] = [
  { ref: "celery#10998", org: "celery", text: "redis chord race: callback fired twice" },
  { ref: "django#22177", org: "django", text: "FETCH_PEERS overwrote loaded values" },
  { ref: "agent-framework#8819", org: "microsoft", text: "failed run leaked state forward" },
  { ref: "celery#10493", org: "celery", text: "traceback_clear() was a silent no-op" },
  { ref: "celery#10497", org: "celery", text: "re-entrant PubSub lock deadlock" },
  { ref: "agent-framework#7944", org: "microsoft", text: "compaction dropped its summaries" },
];

const typed = ["Celery", "Django", "Microsoft Agent Framework", "Open Food Facts"];
const typedColors = [orgMeta.celery.color, orgMeta.django.color, orgMeta.microsoft.color, orgMeta.off.color];

function scrollTo(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const outline = cn(
    buttonVariants({ variant: "outline", size: "lg" }),
    "border-accent/30 backdrop-blur-sm hover:border-accent/50 hover:bg-accent/10",
  );

  return (
    <section id="hero" className="relative flex min-h-[92vh] items-center overflow-hidden pt-24 pb-14">
      <AuroraBackground />
      <GradientMesh />
      <Constellation className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="section-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <motion.div
              className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 backdrop-blur-sm"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-foreground">
                Open to Summer 2027 internships · SDE · Backend · ML
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
            >
              <span className="text-gradient-animated">Namraa Patel</span>
            </motion.h1>

            <motion.p
              className="min-h-[3.5rem] text-xl font-semibold text-foreground sm:min-h-[2.25rem] sm:text-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: "easeOut" }}
            >
              I fix hard bugs in{" "}
              <Typewriter words={typed} colors={typedColors} className="whitespace-nowrap sm:whitespace-normal" />
            </motion.p>

            <motion.p
              className="max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
            >
              Third-year CS student. I chase root causes in concurrency, memory and shared state, then get the fixes
              merged into the open-source projects production systems run on.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 pt-1"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: "easeOut" }}
            >
              <Magnetic>
                <Button
                  size="lg"
                  onClick={() => scrollTo("#opensource")}
                  className="group bg-foreground text-background hover:bg-foreground/90"
                >
                  See the merged work
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </Button>
              </Magnetic>
              <Magnetic>
                <a href={withBasePath(siteConfig.resumePath)} download target="_blank" rel="noopener noreferrer" className={outline}>
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </Magnetic>
              <Magnetic>
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={cn(outline, "px-4")}>
                  <Code2 className="h-5 w-5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={cn(outline, "px-4")}>
                  <LinkIcon className="h-5 w-5" />
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="basis-full text-xs font-bold uppercase tracking-wider text-foreground-muted">Merged into</span>
              {orgs.map((key, i) => (
                <motion.span
                  key={key}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <OrgLogo org={key} className="h-5 w-5 text-foreground" />
                  {orgMeta[key].short}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          >
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-accent/25 via-purple-500/15 to-transparent blur-2xl" aria-hidden />
            <TiltCard className="rounded-2xl" intensity={4}>
              <TerminalCard command="git log --merged upstream --author=namraa" lines={terminalLines} />
            </TiltCard>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
