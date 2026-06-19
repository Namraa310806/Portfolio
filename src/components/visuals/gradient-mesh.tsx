"use client";

import { motion } from "framer-motion";

export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(at 40% 20%, rgba(124, 58, 237, 0.3) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(59, 130, 246, 0.3) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgba(236, 72, 153, 0.2) 0px, transparent 50%),
            radial-gradient(at 80% 50%, rgba(34, 197, 94, 0.2) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(168, 85, 247, 0.2) 0px, transparent 50%)
          `,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
