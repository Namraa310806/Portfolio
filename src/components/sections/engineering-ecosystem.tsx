"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { 
  Layers, Cloud, Zap, Brain, Eye, Cpu as AI,
  Database, LucideIcon, Code
} from "lucide-react";
import {
  SiDjango,
  SiFastapi,
  SiNodedotjs,
  SiDocker,
  SiLinux,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiTensorflow,
  SiOpencv,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPytorch,
  SiElasticsearch,
  SiHuggingface,
  SiGithubactions,
  SiNginx
} from "react-icons/si";

interface Technology {
  name: string;
  category: "Backend" | "Cloud" | "Data" | "AI" | "Frontend" | "DevOps";
  usage: string[];
  projects: string[];
  contributions: string[];
  connections: string[];
  color: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
}

const iconMap: Record<string, LucideIcon | React.ComponentType<{ className?: string }>> = {
  Django: SiDjango,
  FastAPI: SiFastapi,
  "Node.js": SiNodedotjs,
  Celery: Layers,
  Express: Code,
  AWS: Cloud,
  Lambda: Zap,
  Docker: SiDocker,
  Linux: SiLinux,
  "API Gateway": Cloud,
  CloudWatch: Database,
  Cognito: Database,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  MongoDB: SiMongodb,
  DynamoDB: Database,
  Elasticsearch: SiElasticsearch,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  Transformers: AI,
  LangChain: Brain,
  HuggingFace: SiHuggingface,
  OpenCV: SiOpencv,
  RAG: Brain,
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "GitHub Actions": SiGithubactions,
  "CI/CD": Layers,
  Nginx: SiNginx,
};

const technologies: Technology[] = [
  // Backend
  {
    name: "Django",
    category: "Backend",
    usage: ["REST APIs", "Authentication", "RBAC"],
    projects: ["ProfiLens", "TeamSense"],
    contributions: ["Eventra"],
    connections: ["PostgreSQL", "Redis", "Celery"],
    color: "from-purple-500/20 to-purple-500/5",
    icon: iconMap.Django,
  },
  {
    name: "FastAPI",
    category: "Backend",
    usage: ["High-performance APIs", "Async Operations"],
    projects: ["API Services"],
    contributions: [],
    connections: ["Docker", "PostgreSQL"],
    color: "from-purple-500/20 to-purple-500/5",
    icon: iconMap.FastAPI,
  },
  {
    name: "Node.js",
    category: "Backend",
    usage: ["Server-side JavaScript", "Event-driven"],
    projects: [],
    contributions: ["n8n Workflows"],
    connections: ["Docker", "Redis"],
    color: "from-purple-500/20 to-purple-500/5",
    icon: iconMap["Node.js"],
  },
  {
    name: "Celery",
    category: "Backend",
    usage: ["Task Queues", "Background Jobs"],
    projects: ["TeamSense"],
    contributions: [],
    connections: ["Django", "Redis", "PostgreSQL"],
    color: "from-purple-500/20 to-purple-500/5",
    icon: iconMap.Celery,
  },
  {
    name: "Express",
    category: "Backend",
    usage: ["Web Framework", "Middleware", "Routing"],
    projects: [],
    contributions: [],
    connections: ["Node.js", "Docker"],
    color: "from-purple-500/20 to-purple-500/5",
    icon: iconMap.Express,
  },
  // Cloud
  {
    name: "AWS",
    category: "Cloud",
    usage: ["Lambda", "DynamoDB", "API Gateway"],
    projects: ["Personal Cloud Assistant"],
    contributions: [],
    connections: ["Docker", "Linux"],
    color: "from-blue-500/20 to-blue-500/5",
    icon: iconMap.AWS,
  },
  {
    name: "Lambda",
    category: "Cloud",
    usage: ["Serverless Functions", "Event-driven"],
    projects: ["Personal Cloud Assistant"],
    contributions: [],
    connections: ["AWS", "DynamoDB"],
    color: "from-blue-500/20 to-blue-500/5",
    icon: iconMap.Lambda,
  },
  {
    name: "Docker",
    category: "Cloud",
    usage: ["Containerization", "Deployment"],
    projects: ["All Projects"],
    contributions: [],
    connections: ["AWS", "Linux"],
    color: "from-blue-500/20 to-blue-500/5",
    icon: iconMap.Docker,
  },
  {
    name: "Linux",
    category: "Cloud",
    usage: ["Server Administration", "Shell Scripting"],
    projects: ["All Projects"],
    contributions: [],
    connections: ["Docker", "AWS"],
    color: "from-blue-500/20 to-blue-500/5",
    icon: iconMap.Linux,
  },
  {
    name: "API Gateway",
    category: "Cloud",
    usage: ["API Management", "Routing", "Authentication"],
    projects: ["Personal Cloud Assistant"],
    contributions: [],
    connections: ["AWS", "Lambda"],
    color: "from-blue-500/20 to-blue-500/5",
    icon: iconMap["API Gateway"],
  },
  {
    name: "CloudWatch",
    category: "Cloud",
    usage: ["Monitoring", "Logging", "Alerting"],
    projects: ["All Projects"],
    contributions: [],
    connections: ["AWS", "Lambda"],
    color: "from-blue-500/20 to-blue-500/5",
    icon: iconMap.CloudWatch,
  },
  {
    name: "Cognito",
    category: "Cloud",
    usage: ["Authentication", "User Management", "OAuth"],
    projects: ["Personal Cloud Assistant"],
    contributions: [],
    connections: ["AWS", "API Gateway"],
    color: "from-blue-500/20 to-blue-500/5",
    icon: iconMap.Cognito,
  },
  // Data
  {
    name: "PostgreSQL",
    category: "Data",
    usage: ["Relational Database", "ACID Transactions"],
    projects: ["ProfiLens", "TeamSense"],
    contributions: [],
    connections: ["Django", "Redis", "Celery"],
    color: "from-green-500/20 to-green-500/5",
    icon: iconMap.PostgreSQL,
  },
  {
    name: "Redis",
    category: "Data",
    usage: ["Caching", "Rate Limiting", "Pub/Sub"],
    projects: ["TeamSense"],
    contributions: ["Eventra", "Distributed Rate Limiting"],
    connections: ["PostgreSQL", "Celery", "Django"],
    color: "from-green-500/20 to-green-500/5",
    icon: iconMap.Redis,
  },
  {
    name: "MongoDB",
    category: "Data",
    usage: ["NoSQL Database", "Document Storage"],
    projects: [],
    contributions: [],
    connections: ["Docker"],
    color: "from-green-500/20 to-green-500/5",
    icon: iconMap.MongoDB,
  },
  {
    name: "DynamoDB",
    category: "Data",
    usage: ["NoSQL Database", "Serverless"],
    projects: ["Personal Cloud Assistant"],
    contributions: [],
    connections: ["AWS", "Lambda"],
    color: "from-green-500/20 to-green-500/5",
    icon: iconMap.DynamoDB,
  },
  {
    name: "Elasticsearch",
    category: "Data",
    usage: ["Search", "Analytics", "Log Analysis"],
    projects: [],
    contributions: [],
    connections: ["Docker", "CloudWatch"],
    color: "from-green-500/20 to-green-500/5",
    icon: iconMap.Elasticsearch,
  },
  // AI
  {
    name: "TensorFlow",
    category: "AI",
    usage: ["Machine Learning", "Deep Learning"],
    projects: ["Animal Classification"],
    contributions: [],
    connections: ["Python"],
    color: "from-orange-500/20 to-orange-500/5",
    icon: iconMap.TensorFlow,
  },
  {
    name: "PyTorch",
    category: "AI",
    usage: ["Deep Learning", "Neural Networks", "Research"],
    projects: [],
    contributions: [],
    connections: ["Python"],
    color: "from-orange-500/20 to-orange-500/5",
    icon: iconMap.PyTorch,
  },
  {
    name: "Transformers",
    category: "AI",
    usage: ["NLP", "Language Models"],
    projects: [],
    contributions: [],
    connections: ["HuggingFace", "LangChain"],
    color: "from-orange-500/20 to-orange-500/5",
    icon: iconMap.Transformers,
  },
  {
    name: "LangChain",
    category: "AI",
    usage: ["LLM Orchestration", "RAG", "Agents"],
    projects: [],
    contributions: [],
    connections: ["Transformers", "HuggingFace"],
    color: "from-orange-500/20 to-orange-500/5",
    icon: iconMap.LangChain,
  },
  {
    name: "HuggingFace",
    category: "AI",
    usage: ["Model Hub", "Transformers", "Datasets"],
    projects: [],
    contributions: [],
    connections: ["Transformers", "LangChain"],
    color: "from-orange-500/20 to-orange-500/5",
    icon: iconMap.HuggingFace,
  },
  {
    name: "OpenCV",
    category: "AI",
    usage: ["Computer Vision", "Image Processing"],
    projects: ["Animal Classification", "GestureMediaPlayer"],
    contributions: [],
    connections: ["Python"],
    color: "from-orange-500/20 to-orange-500/5",
    icon: iconMap.OpenCV,
  },
  {
    name: "RAG",
    category: "AI",
    usage: ["Retrieval Augmented Generation", "LLM"],
    projects: [],
    contributions: [],
    connections: ["LangChain", "Transformers"],
    color: "from-orange-500/20 to-orange-500/5",
    icon: iconMap.RAG,
  },
  // Frontend
  {
    name: "React",
    category: "Frontend",
    usage: ["UI Components", "State Management"],
    projects: ["Personal Cloud Assistant", "Portfolio"],
    contributions: [],
    connections: ["TypeScript", "Next.js"],
    color: "from-cyan-500/20 to-cyan-500/5",
    icon: iconMap.React,
  },
  {
    name: "Next.js",
    category: "Frontend",
    usage: ["SSR", "Routing", "API Routes"],
    projects: ["Portfolio"],
    contributions: [],
    connections: ["React", "TypeScript"],
    color: "from-cyan-500/20 to-cyan-500/5",
    icon: iconMap["Next.js"],
  },
  {
    name: "TypeScript",
    category: "Frontend",
    usage: ["Type Safety", "Interfaces"],
    projects: ["Portfolio"],
    contributions: [],
    connections: ["React", "Next.js"],
    color: "from-cyan-500/20 to-cyan-500/5",
    icon: iconMap.TypeScript,
  },
  // DevOps
  {
    name: "GitHub Actions",
    category: "DevOps",
    usage: ["CI/CD", "Automation", "Workflows"],
    projects: ["All Projects"],
    contributions: [],
    connections: ["Docker", "CI/CD"],
    color: "from-pink-500/20 to-pink-500/5",
    icon: iconMap["GitHub Actions"],
  },
  {
    name: "CI/CD",
    category: "DevOps",
    usage: ["Continuous Integration", "Continuous Deployment"],
    projects: ["All Projects"],
    contributions: [],
    connections: ["GitHub Actions", "Docker"],
    color: "from-pink-500/20 to-pink-500/5",
    icon: iconMap["CI/CD"],
  },
  {
    name: "Nginx",
    category: "DevOps",
    usage: ["Reverse Proxy", "Load Balancing", "Web Server"],
    projects: ["All Projects"],
    contributions: [],
    connections: ["Docker", "Linux"],
    color: "from-pink-500/20 to-pink-500/5",
    icon: iconMap.Nginx,
  },
];

interface NodePosition {
  preferredX: number;
  preferredY: number;
  currentX: number;
  currentY: number;
}

export function EngineeringEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<Technology | null>(null);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, NodePosition>>({});
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = Math.min(container.clientWidth, 1200);
    const height = 600;

    setContainerSize({ width, height });

    // Generate random positions for all nodes
    const positions: Record<string, NodePosition> = {};
    const padding = 60;

    technologies.forEach((tech) => {
      const preferredX = padding + Math.random() * (width - padding * 2);
      const preferredY = padding + Math.random() * (height - padding * 2);
      positions[tech.name] = {
        preferredX,
        preferredY,
        currentX: preferredX,
        currentY: preferredY,
      };
    });

    setNodePositions(positions);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setNodePositions((prev) => {
        const updated = { ...prev };
        const nodeRadius = 32;
        const collisionRadius = nodeRadius * 2.5;

        Object.keys(updated).forEach((techName) => {
          const node = updated[techName];
          if (!node) return;

          let collisionX = 0;
          let collisionY = 0;

          // Collision detection with other nodes
          Object.keys(updated).forEach((otherTechName) => {
            if (otherTechName === techName) return;
            
            const otherNode = updated[otherTechName];
            if (!otherNode) return;

            const dx = node.currentX - otherNode.currentX;
            const dy = node.currentY - otherNode.currentY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < collisionRadius && distance > 0) {
              const collisionForce = (collisionRadius - distance) / collisionRadius;
              collisionX += (dx / distance) * collisionForce * 8;
              collisionY += (dy / distance) * collisionForce * 8;
            }
          });

          // Cursor magnetic repulsion
          let cursorX = 0;
          let cursorY = 0;

          if (mousePosition) {
            const dx = node.currentX - mousePosition.x;
            const dy = node.currentY - mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 120;

            if (distance < repelRadius && distance > 0) {
              const repelForce = (repelRadius - distance) / repelRadius;
              cursorX = (dx / distance) * repelForce * 40;
              cursorY = (dy / distance) * repelForce * 40;
            }
          }

          // Spring back to preferred position
          const springStrength = 0.06;
          const returnX = (node.preferredX - node.currentX) * springStrength;
          const returnY = (node.preferredY - node.currentY) * springStrength;

          updated[techName] = {
            ...node,
            currentX: node.currentX + collisionX + cursorX + returnX,
            currentY: node.currentY + collisionY + cursorY + returnY,
          };
        });

        return updated;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  const handleNodeHover = (tech: Technology) => {
    setHoveredTech(tech);
  };

  const handleNodeClick = (tech: Technology) => {
    setSelectedTech(tech === selectedTech ? null : tech);
  };

  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Technical Expertise"
            title="Technology Constellation"
            subtitle="A living visualization of connected technologies floating in space."
          />
        </motion.div>

        <div className="mt-10 flex justify-center">
          <div
            ref={containerRef}
            className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl overflow-hidden"
            style={{ height: "600px", maxWidth: "1200px", width: "100%" }}
            onMouseMove={(e) => {
              const rect = containerRef.current?.getBoundingClientRect();
              if (rect) {
                setMousePosition({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }
            }}
            onMouseLeave={() => setMousePosition(null)}
          >
            {/* Technology nodes */}
            <div className="absolute inset-0 pointer-events-none">
              {technologies.map((tech) => {
                const Icon = tech.icon;
                const position = nodePositions[tech.name];
                if (!position || isNaN(position.currentX) || isNaN(position.currentY)) return null;
                const isSelected = selectedTech?.name === tech.name;
                const isConnected = selectedTech && selectedTech.connections.includes(tech.name);
                
                return (
                  <motion.div
                    key={tech.name}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{
                      left: position.currentX - 32,
                      top: position.currentY - 32,
                      width: 64,
                      height: 64,
                    }}
                    onMouseEnter={() => handleNodeHover(tech)}
                    onMouseLeave={() => setHoveredTech(null)}
                    onClick={() => handleNodeClick(tech)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${tech.color} border-2 ${isSelected ? 'border-accent shadow-[0_0_30px_-10px_rgba(124,58,237,0.5)]' : isConnected ? 'border-accent/70 shadow-[0_0_20px_-10px_rgba(124,58,237,0.3)]' : 'border-accent/30'} flex flex-col items-center justify-center backdrop-blur-sm p-1.5 shadow-lg transition-all duration-300`}>
                      <Icon className="h-6 w-6 text-foreground mb-1" />
                      <div className="text-[9px] font-bold text-foreground text-center leading-tight">
                        {tech.name}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Relationship lines */}
            <svg className="absolute inset-0 pointer-events-none">
              {selectedTech && technologies.map((tech) => {
                if (!selectedTech.connections.includes(tech.name)) return null;
                const fromPos = nodePositions[selectedTech.name];
                const toPos = nodePositions[tech.name];
                if (!fromPos || !toPos) return null;
                
                return (
                  <motion.line
                    key={`${selectedTech.name}-${tech.name}`}
                    x1={fromPos.currentX}
                    y1={fromPos.currentY}
                    x2={toPos.currentX}
                    y2={toPos.currentY}
                    stroke="rgba(124, 58, 237, 0.5)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </svg>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredTech && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute top-4 right-4 w-80 rounded-2xl border border-accent/40 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl p-6 shadow-2xl z-20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${hoveredTech.color} border border-accent/30`}>
                      <hoveredTech.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground">{hoveredTech.name}</h4>
                      <p className="text-xs font-semibold text-accent">{hoveredTech.category}</p>
                    </div>
                  </div>
                  
                  {hoveredTech.projects.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-accent mb-2 tracking-wide">PROJECTS</p>
                      <ul className="space-y-1.5">
                        {hoveredTech.projects.map((p) => (
                          <li key={p} className="text-sm text-foreground-muted flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <p className="text-xs font-bold text-accent mb-2 tracking-wide">USE CASES</p>
                    <div className="flex flex-wrap gap-2">
                      {hoveredTech.usage.map((u) => (
                        <span key={u} className="text-xs text-foreground bg-accent/10 px-3 py-1 rounded-md font-medium border border-accent/20">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {hoveredTech.contributions.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-accent mb-2 tracking-wide">OPEN SOURCE</p>
                      <ul className="space-y-1.5">
                        {hoveredTech.contributions.map((c) => (
                          <li key={c} className="text-sm text-foreground-muted flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Connection panel */}
            <AnimatePresence>
              {selectedTech && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute bottom-4 left-4 right-4 rounded-2xl border border-accent/30 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl p-5 shadow-2xl z-10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-foreground">{selectedTech.name}</h4>
                      <p className="text-xs text-foreground-muted">Connected Technologies</p>
                    </div>
                    <button
                      onClick={() => setSelectedTech(null)}
                      className="text-foreground-muted hover:text-foreground transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTech.connections.map((conn) => {
                      const connectedTech = technologies.find((t) => t.name === conn);
                      if (!connectedTech) return null;
                      return (
                        <motion.div
                          key={conn}
                          className={`rounded-lg border border-accent/30 bg-gradient-to-br ${connectedTech.color} px-3 py-2`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-sm font-semibold text-foreground">{conn}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="mt-3 pt-3 border-t border-accent/20">
                    <p className="text-xs font-bold text-accent mb-2">USED TOGETHER IN</p>
                    <div className="space-y-1">
                      {selectedTech.projects.map((p) => (
                        <p key={p} className="text-sm text-foreground-muted">✓ {p}</p>
                      ))}
                      {selectedTech.contributions.map((c) => (
                        <p key={c} className="text-sm text-foreground-muted">✓ {c}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
