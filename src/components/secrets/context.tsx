"use client";

import { createContext, useContext } from "react";

export type SecretId = "konami" | "terminal" | "devmode" | "hire" | "trophy";
export type ToastIcon = "trophy" | "terminal" | "code" | "wand";

export interface SecretsContextValue {
  notify: (toast: { title: string; detail?: string; icon?: ToastIcon }) => void;
  unlock: (id: SecretId) => void;
  openTerminal: () => void;
  startMatrix: () => void;
  toggleDevMode: () => void;
}

export const SecretsContext = createContext<SecretsContextValue | null>(null);

export function useSecrets() {
  const ctx = useContext(SecretsContext);
  if (!ctx) throw new Error("useSecrets must be used inside <SecretsProvider>");
  return ctx;
}
