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
  "Node.js": "backend",
  Express: "backend",
  "Spring Boot": "backend",
  JWT: "backend",
  JavaScript: "backend",
  Java: "backend",
  "C++": "backend",
  Go: "backend",
  Rust: "backend",
  gRPC: "backend",
  "REST APIs": "backend",
  Motor: "backend",
  Pydantic: "backend",
  "GitHub OAuth": "backend",
  LLM: "ai",
  Vite: "frontend",
  "shadcn/ui": "frontend",
  Playwright: "devops",
  
  // Cloud Ecosystem - Amber tones
  AWS: "cloud",
  Lambda: "cloud",
  "API Gateway": "cloud",
  CloudWatch: "cloud",
  Cognito: "cloud",
  Docker: "cloud",
  Kubernetes: "cloud",
  Vercel: "cloud",
  Firebase: "cloud",
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
  SQLite: "data",
  Prisma: "data",
  
  // AI Ecosystem - Orange tones
  TensorFlow: "ai",
  "scikit-learn": "ai",
  OpenCV: "ai",
  Transformers: "ai",
  RAG: "ai",
  PyTorch: "ai",
  LangChain: "ai",
  "Hugging Face": "ai",
  HuggingFace: "ai",
  Ollama: "ai",
  "MobileNetV2": "ai",
  MediaPipe: "ai",
  
  // Frontend Ecosystem - Blue tones
  React: "frontend",
  "Next.js": "frontend",
  NextJS: "frontend",
  Svelte: "frontend",
  Vue: "frontend",
  TypeScript: "frontend",
  Tailwind: "frontend",
  "Tailwind CSS": "frontend",
  Bootstrap: "frontend",
  Streamlit: "frontend",
  
  // DevOps Ecosystem - Purple tones
  Git: "devops",
  GitHub: "devops",
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
  "C++20": "backend",
  CMake: "devops",
  GoogleTest: "devops",
  "Google Benchmark": "devops",
  ThreadSanitizer: "devops",
  ASan: "devops",
  UBSan: "devops",
};

export const ecosystemColors: Record<TechEcosystem, string> = {
  backend: "tech-badge tech-badge-backend",
  cloud: "tech-badge tech-badge-cloud",
  data: "tech-badge tech-badge-data",
  ai: "tech-badge tech-badge-ai",
  frontend: "tech-badge tech-badge-frontend",
  devops: "tech-badge tech-badge-devops",
  other: "tech-badge tech-badge-other",
};

export function getTechColor(tech: string) {
  const ecosystem = techColors[tech] || "other";
  return ecosystemColors[ecosystem];
}

/** Brand-style colour per technology, so every stack reads at a glance. */
const brandHex: Record<string, string> = {
  Python: "#3776ab",
  "C++": "#659ad2",
  "C++20": "#659ad2",
  CMake: "#4a8fd6",
  GoogleTest: "#4285f4",
  "Google Benchmark": "#ea4335",
  ThreadSanitizer: "#f43f5e",
  ASan: "#f97316",
  UBSan: "#eab308",
  Java: "#ed8b00",
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Django: "#44b78b",
  DRF: "#e11d48",
  FastAPI: "#009688",
  Flask: "#94a3b8",
  Celery: "#6bbf4b",
  JWT: "#d63aff",
  PostgreSQL: "#6d9bdb",
  Redis: "#ff4438",
  MongoDB: "#47a248",
  MySQL: "#5b9bd5",
  DynamoDB: "#4053d6",
  AWS: "#ff9900",
  Lambda: "#ff9900",
  EC2: "#ff9900",
  Amplify: "#ff9900",
  S3: "#569a31",
  Cognito: "#dd344c",
  IAM: "#dd344c",
  CloudWatch: "#e7157b",
  "API Gateway": "#a166ff",
  Docker: "#2496ed",
  Kubernetes: "#326ce5",
  Nginx: "#009639",
  Linux: "#fcc624",
  Git: "#f05032",
  "GitHub Actions": "#2088ff",
  React: "#61dafb",
  "Next.js": "#94a3b8",
  Tailwind: "#06b6d4",
  "Tailwind CSS": "#06b6d4",
  Bootstrap: "#7952b3",
  Streamlit: "#ff4b4b",
  TensorFlow: "#ff6f00",
  MobileNetV2: "#ff6f00",
  "scikit-learn": "#f7931e",
  OpenCV: "#7c6bf0",
  CV2: "#7c6bf0",
  MediaPipe: "#0097a7",
  NumPy: "#4dabcf",
  Pandas: "#8b7cf6",
  Matplotlib: "#11557c",
  "Hugging Face": "#ffd21e",
  "n8n": "#ea4b71",
  Motor: "#47a248",
  Pydantic: "#e52020",
  Vite: "#646cff",
  Playwright: "#45ba4b",
  "Node.js": "#68a063",
  WeasyPrint: "#a78bfa",
};

const ecosystemHex: Record<TechEcosystem, string> = {
  backend: "#34d399",
  cloud: "#fbbf24",
  data: "#f87171",
  ai: "#fb923c",
  frontend: "#60a5fa",
  devops: "#a78bfa",
  other: "#94a3b8",
};

export function getTechHex(tech: string): string {
  return brandHex[tech] ?? ecosystemHex[techColors[tech] ?? "other"];
}
