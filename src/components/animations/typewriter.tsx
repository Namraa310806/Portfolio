"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterProps {
  words: string[];
  colors?: string[];
  className?: string;
}

/** Types a word, holds it, deletes it, then moves on to the next one. */
export function Typewriter({ words, colors, className }: TypewriterProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [phase, setPhase] = useState<"hold" | "delete" | "type">("hold");

  useEffect(() => {
    if (reduce || words.length < 2) return;
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "hold") {
      timer = setTimeout(() => setPhase("delete"), 2400);
    } else if (phase === "delete") {
      timer = setTimeout(
        () => {
          if (text.length === 0) {
            setIndex((i) => (i + 1) % words.length);
            setPhase("type");
          } else {
            setText((s) => s.slice(0, -1));
          }
        },
        text.length === 0 ? 120 : 26,
      );
    } else {
      const target = words[index];
      timer = setTimeout(() => {
        if (text.length >= target.length) {
          setPhase("hold");
        } else {
          setText(target.slice(0, text.length + 1));
        }
      }, 55);
    }

    return () => clearTimeout(timer);
  }, [phase, text, index, reduce, words]);

  return (
    <span className={className} style={{ color: colors?.[index] }}>
      {text}
      <span className="caret" aria-hidden />
    </span>
  );
}
