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
            subtitle="Computer science and engineering degrees."
          />
        </FadeIn>

        <div className="mt-8 max-w-3xl">
          <div className="space-y-4">
            {education.map((edu, index) => (
              <FadeIn key={edu.institution} delay={index * 0.1}>
                <motion.div
                  className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground">
                      {edu.institution}
                    </h3>
                    <p className="text-sm text-foreground-muted mt-0.5">
                      {edu.degree}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-foreground-muted">
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3 text-accent" />
                        <span className="font-semibold text-foreground">CGPA {edu.cgpa}</span>
                      </div>
                      <span>·</span>
                      <span>{edu.period}</span>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
