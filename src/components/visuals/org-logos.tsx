import type { OrgKey } from "@/types";
import { cn } from "@/lib/utils";

export const orgMeta: Record<
  OrgKey,
  { name: string; short: string; color: string; blurb: string }
> = {
  celery: { name: "Celery", short: "Celery", color: "#6bbf4b", blurb: "distributed task queue" },
  django: { name: "Django", short: "Django", color: "#44b78b", blurb: "web framework" },
  microsoft: {
    name: "Microsoft Agent Framework",
    short: "Microsoft",
    color: "#00a4ef",
    blurb: "AI agent framework",
  },
  off: { name: "Open Food Facts", short: "Open Food Facts", color: "#ff8714", blurb: "open food database" },
};

const CELERY_PATH =
  "M2.303 0A2.298 2.298 0 0 0 0 2.303v19.394A2.298 2.298 0 0 0 2.303 24h19.394A2.298 2.298 0 0 0 24 21.697V2.303A2.298 2.298 0 0 0 21.697 0zm8.177 3.072c4.098 0 7.028 1.438 7.68 1.764l-1.194 2.55c-2.442-1.057-4.993-1.41-5.672-1.41-1.574 0-2.17.922-2.17 1.763v8.494c0 .869.596 1.791 2.17 1.791.679 0 3.23-.38 5.672-1.41l1.194 2.496c-.435.271-3.637 1.818-7.68 1.818-1.112 0-4.64-.244-4.64-4.64V7.713c0-4.397 3.528-4.64 4.64-4.64z";
const DJANGO_PATH =
  "M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.53 3.109-2.625.561-1.121.739-2.421.739-5.835V6.059h3.924zM17.39.021h3.924v4.026H17.39z";

interface OrgLogoProps {
  org: OrgKey;
  className?: string;
  title?: string;
}

/** Brand marks for the four projects contributed to. Sized by className (default 24px). */
export function OrgLogo({ org, className, title }: OrgLogoProps) {
  const label = title ?? orgMeta[org].name;
  const common = {
    role: "img" as const,
    "aria-label": label,
    className: cn("h-6 w-6 shrink-0", className),
  };

  if (org === "celery") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d={CELERY_PATH} fill="#6bbf4b" />
      </svg>
    );
  }
  if (org === "django") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d={DJANGO_PATH} fill="#44b78b" />
      </svg>
    );
  }
  if (org === "microsoft") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M0 0v11.408h11.408V0z" fill="#f25022" />
        <path d="M12.594 0v11.408H24V0z" fill="#7fba00" />
        <path d="M0 12.594V24h11.408V12.594z" fill="#00a4ef" />
        <path d="M12.594 12.594V24H24V12.594z" fill="#ffb900" />
      </svg>
    );
  }
  // Open Food Facts mark (official icon geometry, handle follows the text colour)
  return (
    <svg viewBox="0 0 178 178" {...common}>
      <g transform="translate(-33.85,-30.075)">
        <path d="m 61.62,122.32 c 0,-33.82 27.41,-61.23 61.23,-61.23 33.82,0 61.23,27.41 61.23,61.23 z" fill="#ff8c14" />
        <path d="m 168.55,122.32 c 0,25.24 -20.46,45.71 -45.71,45.71 -25.24,0 -45.71,-20.46 -45.71,-45.71 z" fill="#ffffff" />
        <circle cx="143.58" cy="82.78" r="3.37" fill="#8c3c00" />
        <circle cx="159.98" cy="97.84" r="3.37" fill="#8c3c00" />
        <circle cx="141.43" cy="101.52" r="3.37" fill="#8c3c00" />
        <path
          d="m 93.15,175.84 -10.88,25.97 14.32,6 10.97,-26.19 c 4.89,1.26 10.01,1.93 15.29,1.93 33.76,0 61.23,-27.47 61.23,-61.23 h -15.52 c 0,25.2 -20.5,45.71 -45.71,45.71 -25.21,0 -45.71,-20.5 -45.71,-45.71 H 61.62 c 0,22.99 12.74,43.05 31.53,53.52 z"
          fill="currentColor"
        />
        <path d="m 148.17,30.34 c -12.04,0 -22.5,6.71 -27.88,16.59 4.14,3.86 7.27,8.79 8.89,14.38 14.01,-3.14 24.53,-15.53 24.77,-30.43 -1.87,-0.35 -3.8,-0.53 -5.78,-0.53 z" fill="#00a63a" />
        <path d="m 98.68,38.42 c -2.38,0 -4.7,0.27 -6.94,0.77 3.83,13.23 16.03,22.91 30.5,22.91 2.38,0 4.7,-0.27 6.94,-0.77 C 125.35,48.1 113.15,38.42 98.68,38.42 Z" fill="#26c24a" />
      </g>
    </svg>
  );
}
