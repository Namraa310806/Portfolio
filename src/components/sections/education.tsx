"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { education } from "@/data/site";

export function Education() {
  return (
    <section id="education" className="section-alt section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Academic Background"
            title="Education"
            subtitle="Computer science and engineering degrees."
          />
        </motion.div>

        <div className="mt-10 max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((edu, index) => (
              <motion.div
                key={edu.institution}
                className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6 hover:border-accent/50 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.15)] transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10">
                  <motion.div 
                    className="flex items-center gap-2 mb-3 p-2 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 w-fit"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <GraduationCap className="h-5 w-5 text-accent" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-foreground">
                    {edu.institution}
                  </h3>
                  <p className="text-sm text-foreground-muted mt-1">
                    {edu.degree}
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-accent" />
                      <span className="text-lg font-bold text-foreground">CGPA {edu.cgpa}</span>
                    </div>
                    <span className="text-xs text-foreground-muted">{edu.period}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
