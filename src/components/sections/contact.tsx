"use client";

import { Code2, Link, Mail, Download } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/data/site";
import { withBasePath } from "@/lib/utils";

export function Contact() {
  return (
    <section id="contact" className="section-alt section-padding pb-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Get in Touch"
            title="Let's Connect"
            subtitle="Open to backend engineering, distributed systems, and AI infrastructure roles."
            align="center"
          />
        </motion.div>

        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <motion.a
              href={`mailto:${siteConfig.email}`}
              className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6 hover:border-accent/50 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.15)] transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <motion.div 
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 group-hover:from-accent/30 group-hover:to-accent/10 group-hover:border-accent/40 transition-all duration-300 mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Mail className="h-7 w-7 text-accent" />
                </motion.div>
                <p className="text-xs font-bold text-foreground-muted uppercase tracking-wide mb-1">Email</p>
                <p className="text-base font-bold text-foreground group-hover:text-accent transition-colors">{siteConfig.email}</p>
              </div>
            </motion.a>

            <motion.a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6 hover:border-accent/50 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.15)] transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <motion.div 
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 group-hover:from-accent/30 group-hover:to-accent/10 group-hover:border-accent/40 transition-all duration-300 mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Code2 className="h-7 w-7 text-accent" />
                </motion.div>
                <p className="text-xs font-bold text-foreground-muted uppercase tracking-wide mb-1">GitHub</p>
                <p className="text-base font-bold text-foreground group-hover:text-accent transition-colors">@Namraa310806</p>
              </div>
            </motion.a>

            <motion.a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6 hover:border-accent/50 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.15)] transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <motion.div 
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 group-hover:from-accent/30 group-hover:to-accent/10 group-hover:border-accent/40 transition-all duration-300 mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Link className="h-7 w-7 text-accent" />
                </motion.div>
                <p className="text-xs font-bold text-foreground-muted uppercase tracking-wide mb-1">LinkedIn</p>
                <p className="text-base font-bold text-foreground group-hover:text-accent transition-colors">namraa-patel</p>
              </div>
            </motion.a>

            <motion.a
              href={withBasePath(siteConfig.resumePath)}
              download
              className="group relative rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-xl p-6 hover:border-accent/50 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.3)] transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <motion.div 
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30 group-hover:from-accent/40 group-hover:to-accent/20 group-hover:border-accent/50 transition-all duration-300 mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Download className="h-7 w-7 text-accent" />
                </motion.div>
                <p className="text-xs font-bold text-foreground-muted uppercase tracking-wide mb-1">Resume</p>
                <p className="text-base font-bold text-foreground group-hover:text-accent transition-colors">Download PDF</p>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
