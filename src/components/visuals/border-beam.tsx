"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
}

export function BorderBeam({ className = "", size = 200, duration = 15 }: BorderBeamProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering]);

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="absolute w-[200%] h-[200%] bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        animate={{
          x: [0, size, 0],
          y: [0, size, 0],
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transform: `translate(${mousePosition.x - size / 2}px, ${mousePosition.y - size / 2}px)`,
        }}
      />
    </motion.div>
  );
}
