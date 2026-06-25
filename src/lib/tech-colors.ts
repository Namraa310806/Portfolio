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
