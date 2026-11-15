export type ContributionCategory =
  | "Security"
  | "Backend"
  | "AI"
  | "Performance"
  | "Cloud"
  | "Concurrency";

export type ContributionStatus = "Merged" | "Open" | "Closed";

export type OrgKey = "celery" | "django" | "microsoft" | "off";

export interface Contribution {
  id: string;
  number: number;
  title: string;
  repository: string;
  repositoryOwner: string;
  repositoryUrl: string;
  url: string;
  status: ContributionStatus;
  category: ContributionCategory;
  tier?: "flagship" | "community";
  org?: OrgKey | null;
  mergedAt?: string | null;
  additions?: number | null;
  deletions?: number | null;
}

/** A hand-written upstream contribution shown with its full story. */
export interface FlagshipContribution {
  id: string; // matches the id in contributions.json, e.g. "pr-celery-10998"
  org: OrgKey;
  repository: string; // owner/name
  number: number;
  url: string;
  title: string; // plain-English headline
  kind: string; // bug class, e.g. "Race condition"
  category: ContributionCategory;
  problem: string;
  fix: string;
  shipped?: string; // release tag, only when confirmed
  note?: string;
}

export interface SelectedContribution {
  title: string;
  repository: string;
  description: string;
  outcome: string;
  category: ContributionCategory;
  url: string;
  prNumber: number;
}

export interface AchievementStat {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

export interface ExperienceItem {
  role: string;
  org: string;
  place: string;
  period: string;
  current?: boolean;
  bullets: string[];
  tags: string[];
}

export interface Education {
  institution: string;
  degree: string;
  cgpa: number;
  period: string;
}
