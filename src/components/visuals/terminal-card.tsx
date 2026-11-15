"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { OrgKey } from "@/types";
import { orgMeta } from "@/components/visuals/org-logos";

export interface TerminalLine {
  ref: string;
  org: OrgKey;
  text: string;
}

interface TerminalCardProps {
  command: string;
  lines: TerminalLine[];
}

/** An always-dark terminal that "types" a git-log of merged upstream fixes, then loops. */
export function TerminalCard({ command, lines }: TerminalCardProps) {
  const reduce = useReducedMotion();
  const [typedCommand, setTypedCommand] = useState(command.length);
  const [lineIdx, setLineIdx] = useState(lines.length);
  const [charIdx, setCharIdx] = useState(0);

  // Start the animation after mount so the server render shows the full transcript.
  useEffect(() => {
    if (reduce) return;
    const kickoff = setTimeout(() => {
      setTypedCommand(0);
      setLineIdx(0);
      setCharIdx(0);
    }, 400);
    return () => clearTimeout(kickoff);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    let timer: ReturnType<typeof setTimeout>;

    if (typedCommand < command.length) {
      timer = setTimeout(() => setTypedCommand((n) => n + 1), 28);
    } else if (lineIdx < lines.length) {
      const target = lines[lineIdx].text.length;
      if (charIdx < target) {
        timer = setTimeout(() => setCharIdx((n) => n + 1), 16);
      } else {
        timer = setTimeout(() => {
          setLineIdx((n) => n + 1);
          setCharIdx(0);
        }, 260);
      }
    } else {
      timer = setTimeout(() => {
        setTypedCommand(0);
        setLineIdx(0);
        setCharIdx(0);
      }, 6000);
    }
    return () => clearTimeout(timer);
  }, [typedCommand, lineIdx, charIdx, command, lines, reduce]);

  const done = lineIdx >= lines.length;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/30"
      role="img"
      aria-label="Terminal listing merged upstream fixes in Celery, Django and Microsoft Agent Framework"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#161b22] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 truncate font-mono text-xs text-slate-400">
          namraa@upstream: ~/merged
        </span>
      </div>
      <div className="min-h-[300px] space-y-2 p-5 font-mono text-[13px] leading-relaxed text-slate-200">
        <p className="break-words">
          <span className="text-emerald-400">$ </span>
          {command.slice(0, typedCommand)}
          {typedCommand < command.length && <span className="caret" aria-hidden />}
        </p>
        {lines.map((line, i) => {
          if (i > lineIdx) return null;
          const shown = i < lineIdx ? line.text : line.text.slice(0, charIdx);
          const active = i === lineIdx;
          return (
            <p key={line.ref} className="break-words">
              <span className="text-emerald-400">✔ </span>
              <span style={{ color: orgMeta[line.org].color }}>{line.ref}</span>
              <span className="text-slate-400"> {shown}</span>
              {active && <span className="caret" aria-hidden />}
            </p>
          );
        })}
        {done && (
          <p className="pt-1">
            <span className="text-emerald-400">$ </span>
            <span className="caret" aria-hidden />
          </p>
        )}
      </div>
    </div>
  );
}
