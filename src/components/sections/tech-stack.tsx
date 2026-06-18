"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { skillCategories } from "@/data/site";

const categoryIcons: Record<string, string> = {
  Backend: "🔧",
  Cloud: "☁️",
  Data: "🗄️",
  AI: "🤖",
  Frontend: "🎨",
};

export function TechStack() {
  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Technical Expertise"
            title="Technologies"
            subtitle="Core tools and technologies I work with."
          />
        </FadeIn>

        <div className="mt-8 max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, index) => (
              <FadeIn key={category.name} delay={index * 0.05}>
                <motion.div
                  className="p-4 rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{categoryIcons[category.name] || "⚡"}</span>
                    <h3 className="text-xs font-bold tracking-widest text-accent uppercase">
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border/50 bg-background/50 px-2 py-0.5 text-[10px] font-semibold text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
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
