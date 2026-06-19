"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverGlowProps {
  children: ReactNode;
  glowColor?: string;
  className?: string;
}

export function HoverGlow({ children, glowColor = "rgba(124, 58, 237, 0.3)", className = "" }: HoverGlowProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        boxShadow: `0 0 40px -10px ${glowColor}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
