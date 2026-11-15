"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSecrets } from "@/components/secrets/context";

export default function NotFound() {
  const { openTerminal } = useSecrets();
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 pt-24">
      <div className="mx-auto w-full max-w-xl">
        <motion.div
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/30"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#161b22] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-slate-400">namraa@portfolio: ~</span>
          </div>
          <div className="space-y-2 p-6 font-mono text-sm text-slate-300">
            <p><span className="text-emerald-400">$</span> open this-page</p>
            <p className="text-rose-400">Error 404: route not found.</p>
            <p className="text-slate-500">Race condition suspected. Two workers both claimed this URL and neither shipped it.</p>
            <p className="pt-2"><span className="text-emerald-400">$</span> <span className="caret" /></p>
          </div>
        </motion.div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90">
            Take me home
          </Link>
          <button
            type="button"
            onClick={openTerminal}
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
          >
            Open the terminal
          </button>
        </div>
      </div>
    </section>
  );
}
