"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GitMerge } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { experience } from "@/data/site";
import { cn } from "@/lib/utils";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="section-alt section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Experience"
            title="Where the work happened"
            subtitle="Open source and production backend work, in the order I did it."
          />
        </FadeIn>

        <div ref={ref} className="relative mx-auto mt-12 max-w-3xl">
          <div className="absolute bottom-2 left-[19px] top-2 w-px bg-border" aria-hidden />
          <motion.div
            className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-gradient-to-b from-accent to-purple-500"
            style={{ scaleY }}
            aria-hidden
          />

          <ol className="space-y-10">
            {experience.map((item, i) => {
              const Icon = i === 0 ? GitMerge : Briefcase;
              return (
                <motion.li
                  key={item.role}
                  className="relative pl-14"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <span
                    className={cn(
                      "absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border bg-card shadow-sm",
                      item.current ? "border-accent/60 text-accent" : "border-border text-foreground-muted",
                    )}
                  >
                    {item.current && (
                      <span className="absolute inset-0 animate-ping rounded-full border border-accent/40" aria-hidden />
                    )}
                    <Icon className="h-5 w-5" />
                  </span>

                  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-bold text-foreground">{item.role}</h3>
                      <span className="font-mono text-xs text-foreground-muted">{item.period}</span>
                    </div>
                    <p className="mt-0.5 text-sm font-medium text-accent">
                      {item.org}
                      <span className="text-foreground-muted"> · {item.place}</span>
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground-muted">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-background-muted px-2.5 py-0.5 text-xs font-medium text-foreground-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
