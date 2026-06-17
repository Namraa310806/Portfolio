export type ContributionCategory =
  | "Security"
  | "Backend"
  | "AI"
  | "Performance"
  | "Cloud"
  | "Concurrency";

export type ContributionStatus = "Merged" | "Open" | "Closed";

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
}

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
}

export interface Problem {
  title: string;
  problem: string;
  solution: string;
  impact: string;
  category: ContributionCategory;
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

export interface EngineeringPrinciple {
  title: string;
  description: string;
}

export interface SystemFeature {
  name: string;
  slug: "matchhire" | "teamsense" | "cloud-assistant";
  overview: string;
  architecture: string[];
  challenges: string[];
  results: string[];
  tech: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface AchievementStat {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

export interface Education {
  institution: string;
  degree: string;
  cgpa: number;
  period: string;
}

export interface ProductionRepository {
  name: string;
  displayName: string;
  repositoryUrl: string;
  prCount: number;
}
