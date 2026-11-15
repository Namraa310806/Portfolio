"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

/** Section title whose words rise into place when it scrolls into view. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  icon,
  className,
  align = "left",
}: SectionHeaderProps) {
  const reduce = useReducedMotion();
  const words = title.split(" ");

  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      {eyebrow && (
        <motion.p
          className="section-eyebrow"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          {icon}
          {eyebrow}
        </motion.p>
      )}
      {/* The heading itself is observed (not the clipped words), so the reveal always triggers. */}
      <motion.h2
        className="section-title"
        aria-label={title}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                show: { y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00a0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
