"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SpotlightProps {
  className?: string;
}

export function Spotlight({ className = "" }: SpotlightProps) {
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
      className={`absolute inset-0 pointer-events-none ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="absolute w-64 h-64 bg-accent/20 rounded-full blur-[100px]"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
