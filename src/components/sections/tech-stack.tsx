"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";

const strongestTechnologies = [
  { name: "Django", category: "Backend" },
  { name: "PostgreSQL", category: "Data" },
  { name: "AWS", category: "Cloud" },
  { name: "React", category: "Frontend" },
  { name: "Python", category: "Backend" },
  { name: "Docker", category: "DevOps" },
  { name: "Redis", category: "Data" },
  { name: "TensorFlow", category: "AI" },
  { name: "FastAPI", category: "Backend" },
  { name: "Lambda", category: "Cloud" },
  { name: "Celery", category: "Backend" },
  { name: "Next.js", category: "Frontend" },
];

export function TechStack() {
  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Technical Expertise"
            title="Technologies"
            subtitle="Core technologies I work with for production systems."
          />
        </motion.div>

        <div className="mt-10 max-w-4xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {strongestTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                whileHover={{ scale: 1.15, y: -6 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm font-semibold border-accent/30 hover:border-accent hover:bg-accent/10 cursor-pointer transition-all duration-300"
                >
                  {tech.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
