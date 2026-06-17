"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { education } from "@/data/site";

export function Education() {
  return (
    <section id="education" className="section-alt section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Academic Background"
            title="Education"
            subtitle="Strong academic foundation in computer science and engineering."
          />
        </FadeIn>

        <div className="mt-12 space-y-6">
          {education.map((edu, index) => (
            <FadeIn key={edu.institution} delay={index * 0.1}>
              <motion.div
                className="glass-card p-6 group relative overflow-hidden"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10 transition-colors">
                      <GraduationCap className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {edu.institution}
                      </h3>
                      <p className="mt-1 text-base font-semibold text-foreground-muted">
                        {edu.degree}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-accent" />
                          <span className="text-sm font-bold text-foreground">
                            CGPA: {edu.cgpa}/10
                          </span>
                        </div>
                        <span className="text-sm text-foreground-muted">
                          {edu.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
