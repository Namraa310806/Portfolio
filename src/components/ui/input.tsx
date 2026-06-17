import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-xl border border-border bg-card px-4 py-2 text-sm text-foreground shadow-xs placeholder:text-foreground-muted focus-visible:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20",
        className,
      )}
      {...props}
    />
  );
}
