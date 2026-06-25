import type {
  AchievementStat,
  Education,
  SelectedContribution,
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


export const achievementStats: AchievementStat[] = [
  { value: TOTAL_PRS, suffix: "+", label: "Merged PRs" },
  { value: 47, suffix: "", label: "GSSoC Rank" },
  { value: 500, suffix: "+", label: "Problems Solved" },
  { value: 2013, suffix: "", label: "LeetCode" },
  { value: 9.46, suffix: "", label: "CGPA", decimals: 2 },
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

export const education: Education[] = [
  {
    institution: "Pandit Deendayal Energy University",
    degree: "B.Tech Computer Science and Business System (CSBS)",
    cgpa: 9.46,
    period: "2025–2028",
  },
  {
    institution: "Government Polytechnic Ahmedabad",
    degree: "Diploma Computer Engineering",
    cgpa: 9.78,
    period: "2022–2025",
  },
];



export const projects = [
  {
    title: "ProfiLens",
    description: "Full-Stack Career Development Platform with gamified learning, MCQ + coding exams, AI-powered resume generation, and a coin-based reward store. Built with Django, DRF, PostgreSQL, and WeasyPrint for PDF generation.",
    stack: ["Django", "DRF", "PostgreSQL", "Python", "Bootstrap", "WeasyPrint", "JWT", "Celery", "Redis"],
    outcome: "Built async resume/PDF generation with RBAC-backed learning workflows.",
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
    stack: ["AWS", "Lambda", "API Gateway", "DynamoDB", "S3", "Cognito", "Amplify", "React", "CloudWatch", "IAM"],
    outcome: "Shipped secure serverless notes and file storage with Cognito and S3 pre-signed URLs.",
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
    stack: ["Django", "DRF", "PostgreSQL", "Redis", "Celery", "Docker", "React", "Nginx", "JWT"],
    outcome: "Designed async HR intelligence pipelines with Celery, Redis, and Dockerized services.",
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
    title: "Animal Classification",
    description: "Deep learning project classifying images into 15 animal categories using MobileNetV2 transfer learning. Features data augmentation, early stopping, and a Streamlit web app for predictions.",
    stack: ["TensorFlow", "MobileNetV2", "Python", "Streamlit", "scikit-learn", "NumPy", "Pandas"],
    outcome: "Trained and deployed transfer-learning inference for 15-class image classification.",
    github: "https://github.com/Namraa310806/AnimalClassification",
    liveDemo: null,
    challenges: [
      "Transfer learning with MobileNetV2",
      "Data augmentation strategies",
      "Early stopping implementation",
      "Model deployment pipeline",
    ],
  },
  {
    title: "Color Classifier",
    description: "ML web app that analyzes and visualizes dominant color distribution in images. Uses Random Forest classifier on custom-labeled color dataset with OpenCV for feature extraction and Streamlit for the UI.",
    stack: ["Python", "scikit-learn", "OpenCV", "NumPy", "Streamlit", "Pandas", "Matplotlib"],
    outcome: "Delivered real-time dominant-color prediction with OpenCV feature extraction.",
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
    title: "GestureMediaPlayer",
    description: "Computer vision application that controls media playback using hand gestures. Uses MediaPipe for real-time hand tracking and gesture recognition with OpenCV for video processing.",
    stack: ["Python", "MediaPipe", "OpenCV", "NumPy", "CV2", "PyAutoGUI", "Threading"],
    outcome: "Implemented low-latency hand-gesture controls for desktop media playback.",
    github: "https://github.com/Namraa310806/GestureMediaPlayer",
    liveDemo: null,
    challenges: [
      "Real-time hand tracking",
      "Gesture recognition accuracy",
      "Low-latency video processing",
      "Cross-platform compatibility",
    ],
  },
  {
    title: "n8n Workflow",
    description: "Custom n8n workflow automation for data processing and integration. Features automated triggers, API integrations, and conditional logic for complex business processes.",
    stack: ["n8n", "JavaScript", "Node.js", "REST APIs", "Webhooks"],
    outcome: "Automated API-triggered workflows with conditional routing and retry-aware handling.",
    github: "https://github.com/Namraa310806/n8n-workflows",
    liveDemo: null,
    challenges: [
      "Workflow orchestration",
      "API integration patterns",
      "Error handling and retry logic",
      "Data transformation pipelines",
    ],
  },
  {
    title: "Automated Book Workflow",
    description: "End-to-end automation system for book processing and management. Integrates multiple APIs for metadata extraction, content processing, and automated publishing workflows.",
    stack: ["Python", "n8n", "REST APIs", "Docker", "PostgreSQL"],
    outcome: "Orchestrated multi-service book processing with resilient workflow state management.",
    github: "https://github.com/Namraa310806/AutomatedBookWorkflow",
    liveDemo: null,
    challenges: [
      "Multi-service integration",
      "Workflow state management",
      "Error recovery mechanisms",
      "Scalable architecture design",
    ],
  },
];



export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#opensource", label: "Open Source" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];
