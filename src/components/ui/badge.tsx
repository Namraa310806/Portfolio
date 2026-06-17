import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" &&
          "border border-border bg-background-muted text-foreground-muted",
        variant === "accent" &&
          "border border-accent/20 bg-accent-muted text-accent-foreground",
        variant === "outline" &&
          "border border-border bg-card text-foreground-muted",
        className,
      )}
      {...props}
    />
  );
}
