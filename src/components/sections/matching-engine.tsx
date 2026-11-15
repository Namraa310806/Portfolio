"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Cpu, ShieldCheck, Timer } from "lucide-react";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { TechChip } from "@/components/ui/tech-chip";
import { cn, withBasePath } from "@/lib/utils";

const stages = [
  { label: "Order feed", detail: "ingestion thread" },
  { label: "SPSC ring buffer", detail: "lock-free, acquire/release" },
  { label: "Matching thread", detail: "single writer" },
  { label: "Order book", detail: "sorted vector + intrusive lists" },
];

// Throughput on the cancel-heavy benchmark, drawn on a log scale (1K to 10M ops/s).
const logScale = (v: number) => ((Math.log10(v) - 3) / 4) * 100;
const bars = [
  { label: "map + deque book", value: 13_700, text: "13.7K ops/s", color: "from-slate-500 to-slate-400" },
  { label: "sorted vector + intrusive lists", value: 3_810_000, text: "3.81M ops/s", color: "from-accent to-purple-500" },
];

const stack = ["C++20", "CMake", "GoogleTest", "Google Benchmark", "ThreadSanitizer", "ASan", "UBSan"];

const metrics = [
  { value: 278, suffix: "×", label: "cancel-heavy throughput" },
  { value: 99.99, suffix: "%", label: "object-pool hit rate", decimals: 2 },
  { value: 5, suffix: "×", label: "lower variance (up to)" },
  { value: 490, suffix: "", label: "runs under ASan, UBSan, TSan" },
];

function Pipeline() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % stages.length), 1100);
    return () => clearInterval(timer);
  }, [reduce]);

  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      {stages.map((stage, i) => {
        const on = !reduce && active === i;
        return (
          <div key={stage.label} className="flex flex-1 flex-col items-center gap-2 sm:flex-row">
            <motion.div
              className={cn(
                "w-full flex-1 rounded-xl border px-3 py-3 text-center transition-colors",
                on ? "border-accent/60 bg-accent/10" : "border-border bg-background",
              )}
              animate={on ? { scale: 1.04, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <p className="text-sm font-bold text-foreground">{stage.label}</p>
              <p className="mt-0.5 text-[11px] text-foreground-muted">{stage.detail}</p>
            </motion.div>
            {i < stages.length - 1 && (
              <ArrowRight
                className={cn(
                  "h-4 w-4 shrink-0 rotate-90 transition-colors sm:rotate-0",
                  !reduce && active === i ? "text-accent" : "text-foreground-muted/50",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function MatchingEngine() {
  return (
    <section id="systems" className="section-alt section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Systems engineering"
            title="A matching engine, rebuilt from the profiler up"
            subtitle="A price-time-priority limit order book in C++20. Changes were profiled, and the experiments that regressed were reverted."
          />
        </FadeIn>

        <FadeIn delay={0.03}>
          <div className="mt-6 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <TechChip key={tech} tech={tech} size="md" />
            ))}
          </div>
        </FadeIn>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <FadeIn delay={0.05}>
            <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                <Timer className="h-3.5 w-3.5" />
                Cancel-heavy load
              </p>
              <h3 className="text-xl font-bold text-foreground">From 13.7K to 3.81M ops/s</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                Swapping a <code className="rounded bg-background-muted px-1.5 py-0.5 text-[12px]">map</code>/
                <code className="rounded bg-background-muted px-1.5 py-0.5 text-[12px]">deque</code> book for a sorted
                vector with intrusive lists made cancels O(1).
              </p>

              <div className="mt-6 space-y-5">
                {bars.map((bar, i) => (
                  <div key={bar.label}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                      <span className="font-medium text-foreground-muted">{bar.label}</span>
                      <span className="font-mono font-bold text-foreground">{bar.text}</span>
                    </div>
                    <div className="h-3.5 overflow-hidden rounded-full bg-background-muted">
                      <motion.div
                        className={cn("h-full rounded-full bg-gradient-to-r", bar.color)}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${logScale(bar.value)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.2 + i * 0.35, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-foreground-muted">Bars use a log scale (1K to 10M ops/s).</p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {metrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-border bg-background-muted/60 p-3 text-center">
                    <div className="text-2xl font-bold text-foreground">
                      <AnimatedCounter value={m.value} suffix={m.suffix} decimals={m.decimals} />
                    </div>
                    <p className="mt-1 text-[11px] leading-snug text-foreground-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                <Cpu className="h-3.5 w-3.5" />
                Ingestion path
              </p>
              <h3 className="text-xl font-bold text-foreground">Lock-free, with one writer</h3>
              <div className="mt-5">
                <Pipeline />
              </div>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-foreground-muted">
                <li className="flex gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  ThreadSanitizer caught a real memory-ordering race in the queue, and it is fixed.
                </li>
                <li className="flex gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  A flaw in my own benchmark was silently dropping orders. Runs now assert submitted = processed.
                </li>
                <li className="flex gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  A chunked freelist pool cut hot-path allocation: +22–49% throughput.
                </li>
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <a
                  href="https://github.com/Namraa310806/Matching-Engine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                  View source
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={withBasePath("/projects/matching-engine")}
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
                >
                  Architecture
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
