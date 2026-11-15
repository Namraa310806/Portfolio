"use client";

import { useSyncExternalStore } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  intensity?: number;
}

/** A card that tilts toward the pointer and lights up where it is hovered. */
export function TiltCard({ children, className, intensity = 5 }: TiltCardProps) {
  const reduce = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
  const enabled = !reduce && finePointer;

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [intensity, -intensity]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-intensity, intensity]), {
    stiffness: 220,
    damping: 22,
  });
  const px = useTransform(x, (v) => `${v * 100}%`);
  const py = useTransform(y, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(280px circle at ${px} ${py}, color-mix(in srgb, var(--accent) 16%, transparent), transparent 65%)`;

  return (
    <motion.div
      className={cn("group relative", className)}
      style={enabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      onMouseMove={(event) => {
        if (!enabled) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width);
        y.set((event.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
    >
      {enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
      )}
      {children}
    </motion.div>
  );
}
