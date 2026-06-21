"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Cloud, Brain, Palette, Zap, CheckCircle2, Layout, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { projects } from "@/data/site";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getTechColor } from "@/lib/tech-colors";

const iconMap = {
  ProfiLens: Code2,
  "Personal Cloud Assistant": Cloud,
  TeamSense: Brain,
  "Animal Classification": Zap,
  "Color Classifier": Palette,
  "GestureMediaPlayer": Palette,
  "n8n Workflow": Cloud,
  "Automated Book Workflow": Code2,
};

export function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      dragFree: false,
      containScroll: "trimSnaps",
      skipSnaps: false,
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollPrev, scrollNext]);

  const getScale = (index: number) => {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return 1.15;
    if (distance === 1) return 0.95;
    if (distance === 2) return 0.75;
    return 0.65;
  };

  const getOpacity = (index: number) => {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.85;
    if (distance === 2) return 0.6;
    return 0.4;
  };

  const getShadow = (index: number) => {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return "0 35px 70px -15px rgba(59, 130, 246, 0.35)";
    if (distance === 1) return "0 20px 50px -10px rgba(59, 130, 246, 0.2)";
    if (distance === 2) return "0 10px 30px -5px rgba(0, 0, 0, 0.1)";
    return "0 5px 15px -3px rgba(0, 0, 0, 0.08)";
  };

  const getZIndex = (index: number) => {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return 30;
    if (distance === 1) return 25;
    if (distance === 2) return 20;
    return 15;
  };

  return (
    <section id="projects" className="section-padding overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Featured Work"
            title="Projects"
            subtitle="Full-stack applications, ML systems, and cloud architectures built with production-grade patterns."
          />
        </motion.div>

        <div className="mt-16 relative px-4 md:px-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-2 py-12">
              {projects.slice(0, 5).map((project, index) => {
                const Icon = iconMap[project.title as keyof typeof iconMap] || Code2;
                const scale = getScale(index);
                const opacity = getOpacity(index);
                const shadow = getShadow(index);
                const zIndex = getZIndex(index);
                const distance = Math.abs(index - selectedIndex);

                return (
                  <motion.div
                    key={project.title}
                    className="flex-[0_0_260px] md:flex-[0_0_340px] lg:flex-[0_0_400px] relative"
                    style={{ zIndex }}
                    animate={{
                      scale,
                      opacity,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <div
                      className="relative h-[400px] md:h-[460px] lg:h-[500px] rounded-3xl border border-border/50 bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-2xl p-5 md:p-6 lg:p-7 transition-all duration-500"
                      style={{
                        boxShadow: shadow,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <motion.div
                            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/25 to-accent/5 border border-accent/25 transition-all duration-300 flex-shrink-0"
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <Icon className="h-8 w-8 text-accent" />
                          </motion.div>
                          <div className="flex gap-2 flex-shrink-0">
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/60 hover:border-accent/50 hover:bg-accent/15 transition-all duration-300"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Code2 className="h-5 w-5 text-foreground-muted hover:text-accent transition-colors" />
                            </motion.a>
                            {project.liveDemo && (
                              <motion.a
                                href={project.liveDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/60 hover:border-accent/50 hover:bg-accent/15 transition-all duration-300"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <ExternalLink className="h-5 w-5 text-foreground-muted hover:text-accent transition-colors" />
                              </motion.a>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                            {project.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-foreground-muted line-clamp-3 mb-6">
                            {project.description}
                          </p>

                          <div className="mb-6">
                            <p className="text-xs font-bold text-accent mb-3 flex items-center gap-2">
                              <Layout className="h-3.5 w-3.5" />
                              Key Engineering Challenges
                            </p>
                            <ul className="space-y-2">
                              {project.challenges.slice(0, 3).map((challenge) => (
                                <motion.li
                                  key={challenge}
                                  className="flex items-center gap-2 text-xs text-foreground-muted"
                                  whileHover={{ x: 4 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                                  <span className="line-clamp-1">{challenge}</span>
                                </motion.li>
                              ))}
                              {project.challenges.length > 3 && (
                                <p className="text-xs text-foreground-muted">+{project.challenges.length - 3} more</p>
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.stack.slice(0, 5).map((tech) => {
                            const colors = getTechColor(tech);
                            return (
                              <motion.span
                                key={tech}
                                className={`rounded-lg border ${colors.border} ${colors.bg} ${colors.text} px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:opacity-80`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {tech}
                              </motion.span>
                            );
                          })}
                          {project.stack.length > 5 && (
                            <span className="rounded-lg border border-border/50 bg-background/60 px-3 py-1.5 text-xs font-semibold text-foreground-muted">
                              +{project.stack.length - 5}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={scrollPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-card hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <div className="flex gap-2">
              {projects.slice(0, 5).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? "w-8 bg-accent" : "w-2 bg-border/50 hover:bg-border"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={scrollNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-card hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-8 py-4 text-sm font-bold text-foreground-muted transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-foreground hover:shadow-lg"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
