"use client";

import { motion } from "framer-motion";
import { ArrowDown, Cloud, Database, Server, Cpu, Shield, FileText } from "lucide-react";

const architectures = [
  {
    name: "Personal Cloud Assistant",
    description: "Serverless AWS application for secure note and file management",
    nodes: [
      { name: "React", icon: "Cpu" },
      { name: "API Gateway", icon: "Server" },
      { name: "Lambda", icon: "Cloud" },
      { name: "DynamoDB", icon: "Database" },
      { name: "S3", icon: "FileText" },
    ],
  },
  {
    name: "TeamSense",
    description: "AI-Powered HR Intelligence Platform with async task queues",
    nodes: [
      { name: "React", icon: "Cpu" },
      { name: "DRF", icon: "Server" },
      { name: "Celery", icon: "Shield" },
      { name: "Redis", icon: "Database" },
      { name: "PostgreSQL", icon: "Database" },
    ],
  },
  {
    name: "ProfiLens",
    description: "Career Development Platform with RBAC and PDF generation",
    nodes: [
      { name: "Frontend", icon: "Cpu" },
      { name: "Django", icon: "Server" },
      { name: "RBAC", icon: "Shield" },
      { name: "PostgreSQL", icon: "Database" },
      { name: "PDF Service", icon: "FileText" },
    ],
  },
];

const iconMap = {
  Cpu,
  Server,
  Cloud,
  Database,
  Shield,
  FileText,
};

export function FeaturedArchitecture() {
  return (
    <section className="section-container py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Architecture</h2>
        <p className="text-foreground-muted text-lg max-w-2xl">
          System design patterns and architecture decisions from key projects.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {architectures.map((arch, index) => (
          <motion.div
            key={arch.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-xl border border-border bg-background-muted/50 p-6"
          >
            <h3 className="text-lg font-semibold mb-2">{arch.name}</h3>
            <p className="text-sm text-foreground-muted mb-6">{arch.description}</p>
            
            <div className="flex flex-col items-center gap-2">
              {arch.nodes.map((node, nodeIndex) => {
                const Icon = iconMap[node.icon as keyof typeof iconMap] || Server;
                return (
                  <div key={node.name} className="flex flex-col items-center">
                    <div className="rounded-lg bg-accent/10 p-3 border border-accent/20">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-xs font-medium mt-2">{node.name}</span>
                    {nodeIndex < arch.nodes.length - 1 && (
                      <ArrowDown className="h-4 w-4 text-foreground-muted my-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
