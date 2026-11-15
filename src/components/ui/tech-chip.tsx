import { getTechHex } from "@/lib/tech-colors";
import { cn } from "@/lib/utils";

interface TechChipProps {
  tech: string;
  className?: string;
  size?: "sm" | "md";
}

/** A technology pill tinted with that technology's colour. Works in light and dark themes. */
export function TechChip({ tech, className, size = "sm" }: TechChipProps) {
  const hex = getTechHex(tech);
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border font-semibold leading-none transition-transform hover:-translate-y-0.5",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
        className,
      )}
      style={{
        color: `color-mix(in srgb, ${hex} 72%, var(--foreground))`,
        background: `color-mix(in srgb, ${hex} 14%, transparent)`,
        borderColor: `color-mix(in srgb, ${hex} 40%, transparent)`,
      }}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: hex }} aria-hidden />
      <span className="truncate">{tech}</span>
    </span>
  );
}
