"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** A soft accent spotlight that follows the pointer. Fine pointers only. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--cx", `${event.clientX}px`);
        el.style.setProperty("--cy", `${event.clientY}px`);
        el.style.opacity = "1";
      });
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(520px circle at var(--cx, 50%) var(--cy, 50%), color-mix(in srgb, var(--accent) 11%, transparent), transparent 65%)",
      }}
    />
  );
}
