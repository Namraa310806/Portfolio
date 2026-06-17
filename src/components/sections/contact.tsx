"use client";

import { Code2, Link, Mail, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { buttonVariants } from "@/components/ui/button-variants";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { withBasePath } from "@/lib/utils";

export function Contact() {
  return (
    <section id="contact" className="section-alt section-padding pb-20">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Get in Touch"
            title="Let's Connect"
            subtitle="Open to backend engineering, distributed systems, and AI infrastructure roles."
            align="center"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-12 flex max-w-lg flex-col items-center gap-5">
            <motion.a
              href={`mailto:${siteConfig.email}`}
              className="glass-card group flex w-full items-center gap-4 p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10 transition-colors">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div className="text-left flex-1">
                <p className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Email</p>
                <p className="text-base font-bold text-foreground group-hover:text-accent transition-colors">{siteConfig.email}</p>
              </div>
              <Send className="h-5 w-5 text-foreground-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </motion.a>

            <motion.a
              href={`tel:${siteConfig.phone}`}
              className="glass-card group flex w-full items-center gap-4 p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10 transition-colors">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <div className="text-left flex-1">
                <p className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Phone</p>
                <p className="text-base font-bold text-foreground group-hover:text-accent transition-colors">{siteConfig.phone}</p>
              </div>
            </motion.a>

            <div className="flex w-full gap-4">
              <motion.a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "secondary" }), "flex-1 group")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code2 className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                GitHub
              </motion.a>
              <motion.a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "secondary" }), "flex-1 group")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                LinkedIn
              </motion.a>
            </div>

            <motion.a
              href={withBasePath(siteConfig.resumePath)}
              download
              className={cn(buttonVariants(), "w-full group relative overflow-hidden")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Download Resume
                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
