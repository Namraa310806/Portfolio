// Technology ecosystem color system with muted premium tones

export type TechEcosystem = 
  | "backend"
  | "cloud"
  | "data"
  | "ai"
  | "frontend"
  | "devops"
  | "other";

export const techColors: Record<string, TechEcosystem> = {
  // Backend Ecosystem - Green tones
  Python: "backend",
  Django: "backend",
  DRF: "backend",
  FastAPI: "backend",
  Celery: "backend",
  Flask: "backend",
  REST: "backend",
  GraphQL: "backend",
  Node: "backend",
  Express: "backend",
  JWT: "backend",
  JavaScript: "backend",
  
  // Cloud Ecosystem - Amber tones
  AWS: "cloud",
  Lambda: "cloud",
  "API Gateway": "cloud",
  CloudWatch: "cloud",
  Cognito: "cloud",
  Docker: "cloud",
  Linux: "cloud",
  EC2: "cloud",
  S3: "cloud",
  Amplify: "cloud",
  IAM: "cloud",
  Webhooks: "cloud",
  "n8n": "cloud",
  
  // Data Ecosystem - Red tones
  PostgreSQL: "data",
  Redis: "data",
  MongoDB: "data",
  DynamoDB: "data",
  Elasticsearch: "data",
  MySQL: "data",
  
  // AI Ecosystem - Orange tones
  TensorFlow: "ai",
  "scikit-learn": "ai",
  OpenCV: "ai",
  Transformers: "ai",
  RAG: "ai",
  PyTorch: "ai",
  LangChain: "ai",
  "Hugging Face": "ai",
  "MobileNetV2": "ai",
  MediaPipe: "ai",
  
  // Frontend Ecosystem - Blue tones
  React: "frontend",
  "Next.js": "frontend",
  TypeScript: "frontend",
  Tailwind: "frontend",
  Bootstrap: "frontend",
  Streamlit: "frontend",
  
  // DevOps Ecosystem - Purple tones
  Git: "devops",
  "GitHub Actions": "devops",
  "CI/CD": "devops",
  "Docker Compose": "devops",
  Nginx: "devops",
  Jenkins: "devops",
  
  // Other - Gray tones
  WeasyPrint: "other",
  NumPy: "data",
  Pandas: "data",
  Matplotlib: "data",
  CV2: "ai",
  PyAutoGUI: "ai",
  Threading: "backend",
};

export const ecosystemColors: Record<TechEcosystem, { bg: string; text: string; border: string }> = {
  backend: {
    bg: "bg-emerald-100 dark:bg-emerald-500/20",
    text: "text-gray-900 dark:text-emerald-200",
    border: "border-emerald-300 dark:border-emerald-500/30",
  },
  cloud: {
    bg: "bg-amber-100 dark:bg-amber-500/20",
    text: "text-gray-900 dark:text-amber-200",
    border: "border-amber-300 dark:border-amber-500/30",
  },
  data: {
    bg: "bg-red-100 dark:bg-red-500/20",
    text: "text-gray-900 dark:text-red-200",
    border: "border-red-300 dark:border-red-500/30",
  },
  ai: {
    bg: "bg-orange-100 dark:bg-orange-500/20",
    text: "text-gray-900 dark:text-orange-200",
    border: "border-orange-300 dark:border-orange-500/30",
  },
  frontend: {
    bg: "bg-blue-100 dark:bg-blue-500/20",
    text: "text-gray-900 dark:text-blue-200",
    border: "border-blue-300 dark:border-blue-500/30",
  },
  devops: {
    bg: "bg-purple-100 dark:bg-purple-500/20",
    text: "text-gray-900 dark:text-purple-200",
    border: "border-purple-300 dark:border-purple-500/30",
  },
  other: {
    bg: "bg-gray-100 dark:bg-gray-500/20",
    text: "text-gray-900 dark:text-gray-200",
    border: "border-gray-300 dark:border-gray-500/30",
  },
};

export function getTechColor(tech: string) {
  const ecosystem = techColors[tech] || "other";
  return ecosystemColors[ecosystem];
}
