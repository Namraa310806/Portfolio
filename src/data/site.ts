import type {
  AchievementStat,
  EngineeringPrinciple,
  JourneyMilestone,
  SelectedContribution,
  SkillCategory,
  SystemFeature,
} from "@/types";
import contributionsMeta from "@/data/contributions-meta.json";

const TOTAL_PRS = contributionsMeta.totalPRs;
const TOTAL_REPOS = contributionsMeta.totalRepositories;

export const siteConfig = {
  name: "Namraa Patel",
  title: "Namraa Patel — Backend & Systems Engineer",
  description:
    `Production-grade backend systems, ${TOTAL_PRS}+ merged open-source PRs, and AI infrastructure. Distributed systems, security, and cloud engineering.`,
  url: "https://namraa310806.github.io/Portfolio",
  github: "https://github.com/Namraa310806",
  linkedin: "https://www.linkedin.com/in/namraa-patel/",
  email: "patelnamraa310806@gmail.com",
  phone: "+918780388389",
  resumePath: "/Namraa_Patel.pdf",
  leetcode: "https://leetcode.com/u/Namraa310806/",
};

export const heroStats = [
  { value: TOTAL_PRS, suffix: "+", label: "Merged PRs" },
  { value: 500, suffix: "+", label: "Problems Solved" },
  { value: 2013, suffix: "", label: "LeetCode" },
  { value: 9.84, suffix: "", label: "CGPA", decimals: 2 },
];

export const achievementStats: AchievementStat[] = [
  { value: TOTAL_PRS, suffix: "+", label: "Merged PRs" },
  { value: 47, suffix: "", label: "GSSoC Rank" },
  { value: 500, suffix: "+", label: "Problems Solved" },
  { value: 2013, suffix: "", label: "LeetCode" },
  { value: 9.84, suffix: "", label: "CGPA", decimals: 2 },
  { value: 4, suffix: "★", label: "CodeChef" },
];

export const openSourceSummary = {
  mergedPRs: TOTAL_PRS,
  repositories: TOTAL_REPOS,
  categories: ["Security", "Concurrency", "AI", "Cloud", "Backend"] as const,
};

export const selectedContributions: SelectedContribution[] = [
  {
    title: "Distributed Rate Limiting",
    repository: "Eventra",
    description:
      "Implemented Redis-backed distributed rate limiting eliminating instance-hopping bypass attacks.",
    outcome: "500+ concurrent requests supported.",
    category: "Security",
    url: "https://github.com/SandeepVashishtha/Eventra/pull/8655",
    prNumber: 8655,
  },
  {
    title: "Concurrency Synchronization",
    repository: "AegisGraph",
    description:
      "Eliminated race conditions across async services in runtime state management.",
    outcome: "Synchronized shared runtime state across async services.",
    category: "Concurrency",
    url: "https://github.com/Puneet04-tech/AegisGraph-Sentinel-2.0/pull/1054",
    prNumber: 1054,
  },
  {
    title: "Thread-Safe AI Inference",
    repository: "pdf-qa-bot",
    description:
      "Resolved concurrent model execution failures in the RAG inference pipeline.",
    outcome: "Reliable parallel document processing under load.",
    category: "AI",
    url: "https://github.com/FireFistisDead/pdf-qa-bot/pull/69",
    prNumber: 69,
  },
  {
    title: "Authentication Architecture",
    repository: "LegalEase",
    description:
      "Refactored to a unified identity model with secure JWT and API key separation.",
    outcome: "Consistent auth flows with reduced security surface area.",
    category: "Security",
    url: "https://github.com/AnuranjanJain/LegalEase/pull/350",
    prNumber: 350,
  },
  {
    title: "IP Header Validation",
    repository: "Eventra",
    description:
      "Validated forwarded IP headers before use to prevent IP spoofing attacks.",
    outcome: "Enhanced security against header manipulation.",
    category: "Security",
    url: "https://github.com/SandeepVashishtha/Eventra/pull/8687",
    prNumber: 8687,
  },
  {
    title: "AI Clause Analysis",
    repository: "LegalEase",
    description:
      "Hardened clause analysis JSON parsing and recovery for improved AI reliability.",
    outcome: "More robust AI document processing pipeline.",
    category: "AI",
    url: "https://github.com/AnuranjanJain/LegalEase/pull/402",
    prNumber: 402,
  },
];

export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    title: "Reliability First",
    description: "Systems should fail safely, not silently.",
  },
  {
    title: "Scale Through Simplicity",
    description: "The best distributed systems are often the simplest ones.",
  },
  {
    title: "Security By Default",
    description:
      "Authentication, authorization, and rate limiting are not afterthoughts.",
  },
  {
    title: "Measure Before Optimizing",
    description: "Every optimization should have a measurable outcome.",
  },
  {
    title: "Build For Operators",
    description: "Software is maintained longer than it is written.",
  },
];

export const journey: JourneyMilestone[] = [
  {
    year: "Backend Development",
    title: "Production APIs & Database Design",
    description:
      "Built REST APIs using Django and PostgreSQL with proper indexing, ORM optimization, and production-grade error handling.",
  },
  {
    year: "Cloud Infrastructure",
    title: "Serverless Systems on AWS",
    description:
      "Designed scalable serverless architectures using Lambda, API Gateway, DynamoDB, and S3 with zero infrastructure maintenance.",
  },
  {
    year: "AI Systems",
    title: "RAG Pipelines & ML Applications",
    description:
      "Built RAG pipelines, ML classification systems, and cloud-native AI applications with thread-safe inference execution.",
  },
  {
    year: "Open Source Engineering",
    title: `${TOTAL_PRS}+ Merged Production PRs`,
    description:
      "Contributed to production codebases with real code reviews, fixing security, concurrency, and authentication issues.",
  },
  {
    year: "Distributed Systems",
    title: "Rate Limiting & Concurrency Control",
    description:
      "Implemented Redis-backed distributed rate limiting, synchronized runtime state across async services, and centralized auth architecture.",
  },
];

export const featuredSystems: SystemFeature[] = [];

export const projects = [
  {
    title: "ProfiLens",
    description: "Full-Stack Career Development Platform with gamified learning, MCQ + coding exams, AI-powered resume generation, and a coin-based reward store. Built with Django, DRF, PostgreSQL, and WeasyPrint for PDF generation.",
    stack: ["Django", "DRF", "PostgreSQL", "Python", "Bootstrap", "WeasyPrint"],
    github: "https://github.com/Namraa310806/ProfiLens",
    liveDemo: null,
    challenges: [
      "RBAC authorization system",
      "Async PDF generation pipeline",
      "PostgreSQL schema design & indexing",
      "Service-oriented architecture",
    ],
  },
  {
    title: "Personal Cloud Assistant",
    description: "Fully serverless AWS application for secure note and file management. Uses Lambda + API Gateway for REST APIs, S3 pre-signed URLs for file I/O, DynamoDB for storage, Cognito for auth, and CloudWatch for monitoring.",
    stack: ["AWS", "Lambda", "API Gateway", "DynamoDB", "S3", "Cognito", "Amplify", "React"],
    github: "https://github.com/Namraa310806/AWSPeronsalCloudAssistant",
    liveDemo: "https://main.d1xrjjt0e3swym.amplifyapp.com/",
    challenges: [
      "Serverless architecture design",
      "S3 pre-signed URL security",
      "DynamoDB data modeling",
      "Cognito authentication flows",
    ],
  },
  {
    title: "TeamSense",
    description: "AI-Powered HR Intelligence Platform built for a hackathon. Features DRF APIs, async ingestion pipelines via Celery + Redis, PostgreSQL models, React dashboard, and Dockerized deployment.",
    stack: ["Django", "DRF", "PostgreSQL", "Redis", "Celery", "Docker", "React"],
    github: "https://github.com/Namraa310806/TeamSense",
    liveDemo: null,
    challenges: [
      "Async task queues with Celery",
      "Redis caching strategies",
      "PostgreSQL relationship modeling",
      "Docker containerization",
    ],
  },
  {
    title: "Color Classifier",
    description: "ML web app that analyzes and visualizes dominant color distribution in images. Uses Random Forest classifier on custom-labeled color dataset with OpenCV for feature extraction and Streamlit for the UI.",
    stack: ["Python", "scikit-learn", "OpenCV", "NumPy", "Streamlit"],
    github: "https://github.com/Namraa310806/ColorClassifierML",
    liveDemo: "https://namraapatel-colorclassifier.streamlit.app/",
    challenges: [
      "Custom dataset labeling",
      "Feature extraction with OpenCV",
      "Random Forest model training",
      "Streamlit real-time inference",
    ],
  },
  {
    title: "Animal Classification",
    description: "Deep learning project classifying images into 15 animal categories using MobileNetV2 transfer learning. Features data augmentation, early stopping, and a Streamlit web app for predictions.",
    stack: ["TensorFlow", "MobileNetV2", "Python", "Streamlit", "scikit-learn"],
    github: "https://github.com/Namraa310806/AnimalClassification",
    liveDemo: null,
    challenges: [
      "Transfer learning with MobileNetV2",
      "Data augmentation strategies",
      "Early stopping implementation",
      "Model deployment pipeline",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Backend",
    skills: ["Django", "DRF", "FastAPI", "Node.js", "Celery"],
  },
  {
    name: "Cloud",
    skills: ["AWS", "Lambda", "API Gateway", "Docker", "Linux"],
  },
  {
    name: "Data",
    skills: ["PostgreSQL", "Redis", "MongoDB", "DynamoDB", "S3"],
  },
  {
    name: "AI",
    skills: ["TensorFlow", "scikit-learn", "OpenCV", "Transformers", "RAG"],
  },
  {
    name: "Frontend",
    skills: ["React", "Bootstrap", "Streamlit", "Amplify"],
  },
];

export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#contributions", label: "Contributions" },
  { href: "#opensource", label: "Open Source" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];
