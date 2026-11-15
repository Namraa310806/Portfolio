"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Mode = "before" | "after";

const PATH_A = "M160 70 C 232 70, 232 142, 304 142 L 470 150 L 596 142";
const PATH_B_THROUGH = "M160 230 C 232 230, 232 158, 304 158 L 470 150 L 596 158";
const PATH_B_BOUNCE = "M160 230 C 232 230, 232 158, 304 158";

/**
 * Animated explanation of Celery #10998: two workers finish a Redis chord at the same moment.
 * Before the fix both publish the callback; after it only the worker holding the claim does.
 */
export function RaceVisual({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("before");
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || reduce) return;
    const timer = setInterval(
      () => setMode((m) => (m === "before" ? "after" : "before")),
      6500,
    );
    return () => clearInterval(timer);
  }, [auto, reduce]);

  const before = mode === "before";
  const accent = before ? "#f87171" : "#34d399";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/30",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#161b22] px-4 py-3">
        <p className="truncate font-mono text-xs text-slate-400">
          celery#10998 · two workers, one callback
        </p>
        <div className="flex shrink-0 gap-1 rounded-lg border border-white/10 bg-black/30 p-0.5 font-mono text-[11px]">
          {(["before", "after"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setAuto(false);
                setMode(m);
              }}
              aria-pressed={mode === m}
              className={cn(
                "rounded-md px-2.5 py-1 font-semibold uppercase tracking-wide transition-colors",
                mode === m
                  ? m === "before"
                    ? "bg-red-500/20 text-red-300"
                    : "bg-emerald-500/20 text-emerald-300"
                  : "text-slate-400 hover:text-slate-200",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 760 300"
        className="block w-full"
        role="img"
        aria-label={
          before
            ? "Before the fix: both workers see the chord complete and both publish the callback."
            : "After the fix: an atomic claim lets only one worker publish the callback."
        }
      >
        <defs>
          <marker id="race-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#64748b" />
          </marker>
          <filter id="race-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* connections */}
        <path d="M160 70 C 232 70, 232 142, 300 142" fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#race-arrow)" />
        <path d="M160 230 C 232 230, 232 158, 300 158" fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#race-arrow)" />
        <path d="M470 150 L 592 150" fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#race-arrow)" />

        {/* workers */}
        <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          <rect x="30" y="40" width="130" height="60" rx="10" fill="#161b22" stroke="#22d3ee" strokeWidth="2" />
          <text x="95" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e5e7eb">worker A</text>
          <text x="95" y="86" textAnchor="middle" fontSize="10" fill="#94a3b8">last part done</text>
          <rect x="30" y="200" width="130" height="60" rx="10" fill="#161b22" stroke="#a78bfa" strokeWidth="2" />
          <text x="95" y="226" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e5e7eb">worker B</text>
          <text x="95" y="246" textAnchor="middle" fontSize="10" fill="#94a3b8">same instant</text>

          {/* redis */}
          <motion.rect
            x="300" y="112" width="170" height="76" rx="10" fill="#161b22" strokeWidth="2"
            animate={{ stroke: accent }}
            transition={{ duration: 0.4 }}
          />
          <text x="385" y="142" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e5e7eb">Redis · chord</text>
          <text x="385" y="164" textAnchor="middle" fontSize="10" fill="#94a3b8">
            {before ? "completion check" : "atomic Lua claim"}
          </text>

          {/* callback */}
          <motion.rect
            x="596" y="112" width="140" height="76" rx="10" fill="#161b22" strokeWidth="2"
            animate={{ stroke: accent }}
            transition={{ duration: 0.4 }}
          />
          <text x="666" y="142" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e5e7eb">callback</text>
          <text x="666" y="164" textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
            {before ? "fires twice" : "fires once"}
          </text>
        </g>

        {/* animated packets (keyed so they restart on every mode change) */}
        {!reduce && (
          <g key={mode}>
            <circle r="6" fill="#22d3ee" filter="url(#race-glow)">
              <animateMotion dur="3s" repeatCount="indefinite" path={PATH_A} />
            </circle>
            {before ? (
              <circle r="6" fill="#a78bfa" filter="url(#race-glow)">
                <animateMotion dur="3s" repeatCount="indefinite" path={PATH_B_THROUGH} />
              </circle>
            ) : (
              <circle r="5" fill="#64748b">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path={PATH_B_BOUNCE}
                  keyPoints="0;1;0;0"
                  keyTimes="0;0.45;0.8;1"
                  calcMode="linear"
                />
                <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.6;0.85;1" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        )}

        {/* callouts */}
        <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="11">
          <AnimatePresence mode="wait">
            {before ? (
              <motion.g key="b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <text x="385" y="214" textAnchor="middle" fill="#fbbf24">both see “all parts done”</text>
                <text x="380" y="282" textAnchor="middle" fill="#f87171" fontWeight="700">
                  duplicate callback, or a result that goes missing
                </text>
              </motion.g>
            ) : (
              <motion.g key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <text x="205" y="124" textAnchor="middle" fill="#34d399">token T1 ✓</text>
                <text x="205" y="270" textAnchor="middle" fill="#94a3b8">no token, skip</text>
                <text x="385" y="214" textAnchor="middle" fill="#34d399">one claim wins</text>
                <text x="380" y="292" textAnchor="middle" fill="#34d399" fontWeight="700">
                  cleanup releases the claim only if the token still matches
                </text>
              </motion.g>
            )}
          </AnimatePresence>
        </g>
      </svg>
    </div>
  );
}
