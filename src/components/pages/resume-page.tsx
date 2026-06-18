"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, ChevronRight, Home, FileText } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { cn, withBasePath } from "@/lib/utils";
import Link from "next/link";

export function ResumePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="section-padding pt-24">
        <div className="section-container">
          <FadeIn>
            <nav className="flex items-center gap-2 text-sm text-foreground-muted mb-8">
              <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Resume</span>
            </nav>

            <SectionHeader
              eyebrow="Download"
              title="Resume"
              subtitle="Backend Engineer · Open Source Contributor"
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-12 max-w-4xl">
              <motion.div
                className="rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
                      <FileText className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Namraa Patel</h3>
                      <p className="text-sm text-foreground-muted">Backend Engineer · Open Source Contributor</p>
                    </div>
                  </div>
                  <a
                    href={withBasePath(siteConfig.resumePath)}
                    download
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-accent bg-accent px-6 py-3 text-sm font-bold text-white transition-all hover:bg-accent/90 hover:shadow-lg"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="mt-8 rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="text-lg font-bold text-foreground mb-4">Preview</h4>
                <div className="w-full h-[600px] rounded-xl border border-border/50 bg-background-muted/20 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-foreground-muted mx-auto mb-4" />
                    <p className="text-foreground-muted mb-4">PDF Preview</p>
                    <a
                      href={withBasePath(siteConfig.resumePath)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open in new tab
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/"
                  className="flex items-center gap-2 text-sm font-semibold text-foreground-muted hover:text-foreground transition-colors mt-6"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Back to Home
                </Link>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
