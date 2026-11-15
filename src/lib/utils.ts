import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withBasePath(path: string): string {
  if (/^https?:\/\//.test(path)) return path;

  const base =
    process.env.NEXT_PUBLIC_BASE_PATH ??
    "";

  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}

/** URL-safe slug: lowercase, letters and digits only, single hyphens. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
