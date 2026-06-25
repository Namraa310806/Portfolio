import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withBasePath(path: string): string {
  if (/^https?:\/\//.test(path)) return path;

  const base =
    process.env.NEXT_PUBLIC_BASE_PATH ??
    (process.env.NODE_ENV === "production" ? "/Portfolio" : "");

  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
