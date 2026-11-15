"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { fireConfetti } from "@/components/animations/confetti";
import { useSecrets } from "@/components/secrets/context";
import { siteConfig } from "@/data/site";
import { withBasePath } from "@/lib/utils";

type Kind = "in" | "out" | "ok" | "err" | "dim";
interface Line {
  kind: Kind;
  text: string;
}

const sections: Record<string, string> = {
  home: "#hero",
  hero: "#hero",
  upstream: "#opensource",
  opensource: "#opensource",
  systems: "#systems",
  engine: "#systems",
  projects: "#projects",
  experience: "#experience",
  activity: "#activity",
  achievements: "#achievements",
  skills: "#skills",
  education: "#education",
  contact: "#contact",
};

const color: Record<Kind, string> = {
  in: "text-slate-100",
  out: "text-slate-300",
  ok: "text-emerald-400",
  err: "text-rose-400",
  dim: "text-slate-500",
};

const welcome: Line[] = [
  { kind: "ok", text: "namraa-os 1.0 · hidden terminal" },
  { kind: "dim", text: "type `help` for commands. Esc to close." },
];

/** A tiny fake shell. Every command is also a real shortcut around the site. */
export function TerminalPalette({ onClose }: { onClose: () => void }) {
  const { unlock, startMatrix, notify } = useSecrets();
  const { setTheme } = useTheme();
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>(welcome);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  const go = (hash: string) => {
    onClose();
    setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 250);
  };

  const run = (raw: string): Line[] => {
    const text = raw.trim();
    const [cmd, ...rest] = text.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();
    const c = cmd.toLowerCase();

    if (text.toLowerCase() === "sudo hire namraa") {
      unlock("hire");
      fireConfetti({ y: window.innerHeight / 2 });
      return [
        { kind: "dim", text: "[sudo] password for recruiter: ********" },
        { kind: "ok", text: "permission granted. great call." },
        { kind: "out", text: `say hi → ${siteConfig.email}` },
      ];
    }

    switch (c) {
      case "":
        return [];
      case "help":
        return [
          { kind: "out", text: "about             who I am in three lines" },
          { kind: "out", text: "ls                list sections" },
          { kind: "out", text: "goto <section>    jump there (try: upstream, systems, projects)" },
          { kind: "out", text: "prs               every merged PR" },
          { kind: "out", text: "resume · github · linkedin · email" },
          { kind: "out", text: "theme dark|light" },
          { kind: "out", text: "matrix · confetti · clear · exit" },
          { kind: "dim", text: "there is at least one more command that is not listed." },
        ];
      case "about":
      case "whoami":
        return [
          { kind: "out", text: "Namraa Patel · third-year CS student · Ahmedabad" },
          { kind: "out", text: "I fix hard bugs in Celery, Django, Microsoft Agent Framework and Open Food Facts." },
          { kind: "ok", text: "open to Summer 2027 internships (SDE · Backend · ML)" },
        ];
      case "ls":
        return [{ kind: "out", text: Object.keys(sections).filter((k) => !["hero", "engine", "opensource"].includes(k)).join("  ") }];
      case "goto":
      case "cd": {
        const target = sections[arg];
        if (!target) return [{ kind: "err", text: `no such section: ${arg || "(empty)"}. try \`ls\`` }];
        go(target);
        return [{ kind: "ok", text: `→ ${arg}` }];
      }
      case "prs":
        onClose();
        router.push("/opensource");
        return [{ kind: "ok", text: "→ /opensource" }];
      case "resume":
        window.open(withBasePath(siteConfig.resumePath), "_blank");
        return [{ kind: "ok", text: "opening resume…" }];
      case "github":
        window.open(siteConfig.github, "_blank");
        return [{ kind: "ok", text: "opening GitHub…" }];
      case "linkedin":
        window.open(siteConfig.linkedin, "_blank");
        return [{ kind: "ok", text: "opening LinkedIn…" }];
      case "email":
        window.location.href = `mailto:${siteConfig.email}`;
        return [{ kind: "ok", text: siteConfig.email }];
      case "theme":
        if (arg !== "dark" && arg !== "light") return [{ kind: "err", text: "usage: theme dark|light" }];
        setTheme(arg);
        return [{ kind: "ok", text: `theme → ${arg}` }];
      case "matrix":
        onClose();
        startMatrix();
        return [];
      case "confetti":
        fireConfetti({ y: window.innerHeight / 2 });
        return [{ kind: "ok", text: "🎉" }];
      case "clear":
        return [{ kind: "dim", text: "\u0000clear" }];
      case "exit":
      case "quit":
        onClose();
        return [];
      case "sudo":
        return [{ kind: "err", text: "nice try. maybe sudo hire someone?" }];
      case "rm":
        notify({ title: "Whoa", detail: "Nothing was deleted. This site is static.", icon: "wand" });
        return [{ kind: "err", text: "permission denied (and this site is static anyway)" }];
      default:
        return [{ kind: "err", text: `command not found: ${c}. try \`help\`` }];
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const out = run(value);
    setHistory((h) => (value.trim() ? [value, ...h] : h));
    setCursor(-1);
    if (out[0]?.text === "\u0000clear") {
      setLines([]);
    } else {
      setLines((l) => [...l, { kind: "in", text: `$ ${value}` }, ...out]);
    }
    setValue("");
  };

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Hidden terminal"
    >
      <motion.div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/50"
        initial={{ y: -24, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: -16, scale: 0.97, opacity: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#161b22] px-4 py-3">
          <button type="button" onClick={onClose} aria-label="Close terminal" className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-xs text-slate-400">namraa@portfolio: ~</span>
        </div>
        <div ref={scroller} className="max-h-[48vh] min-h-[220px] space-y-1 overflow-y-auto p-5 font-mono text-[13px] leading-relaxed">
          {lines.map((l, i) => (
            <p key={i} className={`${color[l.kind]} whitespace-pre-wrap break-words`}>
              {l.text}
            </p>
          ))}
          <form onSubmit={submit} className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400">$</span>
            <input
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  const next = Math.min(cursor + 1, history.length - 1);
                  setCursor(next);
                  setValue(history[next] ?? "");
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  const next = Math.max(cursor - 1, -1);
                  setCursor(next);
                  setValue(next === -1 ? "" : (history[next] ?? ""));
                }
              }}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal command"
              className="w-full bg-transparent text-slate-100 caret-emerald-400"
              style={{ outline: "none", boxShadow: "none" }}
              placeholder="type a command…"
            />
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
