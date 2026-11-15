"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Trophy } from "lucide-react";
import { fireConfetti } from "@/components/animations/confetti";
import { useSecrets } from "@/components/secrets/context";

/**
 * The JPMorgan Chase Code for Good win, as a game-style "achievement unlocked" toast.
 * It pops in when scrolled to, throws confetti once, and throws more when clicked.
 */
export function WinnerToast() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const fired = useRef(false);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const { unlock } = useSecrets();

  const burst = () => {
    const rect = ref.current?.getBoundingClientRect();
    fireConfetti({
      x: rect ? rect.left + 50 : undefined,
      y: rect ? rect.top + rect.height / 2 : undefined,
      count: 110,
    });
  };

  return (
    <div className="flex justify-center">
        <motion.button
          ref={ref}
          type="button"
          onClick={() => {
            burst();
            unlock("trophy");
          }}
          onAnimationComplete={() => {
            if (!fired.current && inView) {
              fired.current = true;
              burst();
            }
          }}
          aria-label="JPMorgan Chase Code for Good, winner 2026. Press for confetti."
          className="group relative w-full max-w-xl cursor-pointer overflow-hidden rounded-[2rem] border border-amber-500/30 bg-card/90 p-2.5 pr-7 text-left shadow-2xl shadow-amber-500/10 backdrop-blur"
          initial={reduce ? false : { opacity: 0, x: -90, scale: 0.9 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : undefined}
          transition={{ type: "spring", stiffness: 180, damping: 17, delay: 0.1 }}
          whileHover={{ scale: 1.02, rotate: -0.6 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* a shine that sweeps across every few seconds */}
          {!reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              animate={{ left: ["-40%", "130%"] }}
              transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 4.5 }}
            />
          )}

          <span className="relative flex items-center gap-4">
            <span className="relative shrink-0">
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-amber-400/60"
                  animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <motion.span
                className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-amber-950 shadow-lg shadow-amber-500/40"
                animate={inView && !reduce ? { rotate: [0, -12, 12, -8, 8, 0], scale: [1, 1.12, 1] } : undefined}
                transition={{ duration: 1, delay: 0.55 }}
              >
                <Trophy className="h-9 w-9" strokeWidth={2} />
              </motion.span>
            </span>

            <span className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-amber-500">
                Achievement unlocked
              </span>
              <span className="mt-0.5 block text-xl font-extrabold leading-tight text-foreground sm:text-2xl">
                JPMorgan Chase Code for Good
              </span>
              <span className="mt-1 block text-sm leading-snug text-foreground-muted">
                Winner · 2026. Production-ready solution for a nonprofit partner.
              </span>
            </span>
          </span>

          <span className="pointer-events-none absolute right-4 top-3 text-[10px] font-semibold uppercase tracking-wider text-amber-500/0 transition-colors group-hover:text-amber-500/80">
            click me
          </span>
        </motion.button>
    </div>
  );
}
