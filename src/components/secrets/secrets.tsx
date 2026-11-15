"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Terminal, Trophy, Wand2 } from "lucide-react";
import { fireConfetti } from "@/components/animations/confetti";
import { SecretsContext, type SecretsContextValue } from "@/components/secrets/context";
import { TerminalPalette } from "@/components/secrets/terminal";

import type { SecretId, ToastIcon } from "@/components/secrets/context";

interface Toast {
  id: number;
  title: string;
  detail?: string;
  icon: ToastIcon;
}

const SECRETS: Record<SecretId, { title: string; detail: string; icon: ToastIcon }> = {
  konami: { title: "Old school", detail: "You typed the Konami code.", icon: "wand" },
  terminal: { title: "Hidden terminal", detail: "Type help to see what it can do.", icon: "terminal" },
  devmode: { title: "Dev mode", detail: "Every box on the page is outlined now. Click the logo 5 times to undo.", icon: "code" },
  hire: { title: "Excellent decision", detail: "sudo hire namraa: permission granted.", icon: "trophy" },
  trophy: { title: "Confetti cannon", detail: "You clicked the trophy.", icon: "trophy" },
};

const STORAGE_KEY = "portfolio-secrets";
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const toastIcons = { trophy: Trophy, terminal: Terminal, code: Code2, wand: Wand2 };

function MatrixRain({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const size = 16;
    const columns = Math.ceil(w / size);
    const drops = Array.from({ length: columns }, () => Math.random() * -40);
    const chars = "アイウエオカキクケコサシスセソ0123456789<>/{}=+*";
    let frame = 0;
    let last = 0;

    const draw = (time: number) => {
      if (time - last > 45) {
        last = time;
        ctx.fillStyle = "rgba(2, 6, 14, 0.14)";
        ctx.fillRect(0, 0, w, h);
        ctx.font = `${size}px ui-monospace, monospace`;
        for (let i = 0; i < drops.length; i++) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = Math.random() > 0.96 ? "#d1fae5" : "#22c55e";
          ctx.fillText(ch, i * size, drops[i] * size);
          if (drops[i] * size > h && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 1;
        }
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    const stop = setTimeout(onDone, 7000);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onDone();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(stop);
      window.removeEventListener("keydown", onKey);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[150] cursor-pointer bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onDone}
      role="presentation"
    >
      <canvas ref={ref} className="h-full w-full" aria-hidden />
      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-sm text-emerald-300/80">
        wake up, recruiter… (click or press Esc)
      </p>
    </motion.div>
  );
}

/** Wraps the site with toasts, a hidden terminal, a Konami-code rain and a dev-mode switch. */
export function SecretsProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const counter = useRef(0);
  const keys = useRef<string[]>([]);
  const logoClicks = useRef<number[]>([]);

  const notify = useCallback<SecretsContextValue["notify"]>(({ title, detail, icon = "trophy" }) => {
    const id = ++counter.current;
    setToasts((list) => [...list.slice(-2), { id, title, detail, icon }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 5200);
  }, []);

  const unlock = useCallback(
    (id: SecretId) => {
      try {
        const found: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
        if (found.includes(id)) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...found, id]));
      } catch {
        /* storage unavailable: still show the toast once per visit */
      }
      const s = SECRETS[id];
      notify({ title: `Secret unlocked: ${s.title}`, detail: s.detail, icon: s.icon });
    },
    [notify],
  );

  const openTerminal = useCallback(() => {
    setTerminalOpen(true);
    unlock("terminal");
  }, [unlock]);

  const startMatrix = useCallback(() => {
    setMatrix(true);
    unlock("konami");
  }, [unlock]);

  const toggleDevMode = useCallback(() => {
    const on = document.documentElement.classList.toggle("dev-mode");
    if (on) unlock("devmode");
  }, [unlock]);

  // Keyboard: Konami code, backtick or Ctrl/Cmd+K for the terminal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openTerminal();
        return;
      }
      if (typing) return;
      if (e.key === "`") {
        e.preventDefault();
        openTerminal();
        return;
      }
      keys.current = [...keys.current, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length);
      if (keys.current.join(",") === KONAMI.join(",")) {
        keys.current = [];
        startMatrix();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openTerminal, startMatrix]);

  // Header logo: five quick clicks toggle dev mode.
  useEffect(() => {
    const onLogo = () => {
      const now = Date.now();
      logoClicks.current = [...logoClicks.current.filter((t) => now - t < 2000), now];
      if (logoClicks.current.length >= 5) {
        logoClicks.current = [];
        toggleDevMode();
      }
    };
    window.addEventListener("secret:logo", onLogo);
    return () => window.removeEventListener("secret:logo", onLogo);
  }, [toggleDevMode]);

  // A note for anyone who opens the console.
  useEffect(() => {
    const art = "%c\n  Namraa Patel\n  you opened the console, so you debug for fun too.\n";
    console.log(art, "color:#a78bfa;font:600 14px ui-monospace,monospace");
    console.log(
      "%cHiring? patelnamraa88@gmail.com · or press ` on the page, type: sudo hire namraa",
      "color:#34d399;font:12px ui-monospace,monospace",
    );
  }, []);

  const value = useMemo(
    () => ({ notify, unlock, openTerminal, startMatrix, toggleDevMode }),
    [notify, unlock, openTerminal, startMatrix, toggleDevMode],
  );

  return (
    <SecretsContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {terminalOpen && <TerminalPalette onClose={() => setTerminalOpen(false)} />}
        {matrix && <MatrixRain onDone={() => setMatrix(false)} />}
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-5 left-5 z-[120] flex w-[min(22rem,calc(100vw-2.5rem))] flex-col gap-2.5" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = toastIcons[t.icon];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: -40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-card/95 p-3 pr-4 shadow-2xl shadow-black/30 backdrop-blur"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300/30 to-amber-600/10 text-amber-400">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-foreground">{t.title}</span>
                  {t.detail && <span className="block text-xs leading-snug text-foreground-muted">{t.detail}</span>}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </SecretsContext.Provider>
  );
}

