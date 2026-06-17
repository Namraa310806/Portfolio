"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { featuredSystems } from "@/data/site";
import { cn } from "@/lib/utils";

function ArchitectureDiagram({ slug }: { slug: string }) {
  if (slug === "matchhire") {
    const nodes = [
      { id: "react", label: "React UI", x: 50, y: 15 },
      { id: "api", label: "Django API", x: 50, y: 40 },
      { id: "auth", label: "JWT / RBAC", x: 20, y: 65 },
      { id: "parser", label: "Resume Parser", x: 80, y: 65 },
      { id: "db", label: "PostgreSQL", x: 50, y: 88 },
    ];
    const edges = [
      ["react", "api"],
      ["api", "auth"],
      ["api", "parser"],
      ["api", "db"],
      ["parser", "db"],
    ];
    return <SystemGraph nodes={nodes} edges={edges} />;
  }

  if (slug === "teamsense") {
    const nodes = [
      { id: "react", label: "React", x: 15, y: 50 },
      { id: "django", label: "Django", x: 40, y: 50 },
      { id: "redis", label: "Redis", x: 65, y: 30 },
      { id: "celery", label: "Celery", x: 65, y: 70 },
      { id: "docker", label: "Docker", x: 88, y: 50 },
    ];
    const edges = [
      ["react", "django"],
      ["django", "redis"],
      ["django", "celery"],
      ["celery", "redis"],
      ["django", "docker"],
    ];
    return <SystemGraph nodes={nodes} edges={edges} animated />;
  }

  const nodes = [
    { id: "gw", label: "API Gateway", x: 50, y: 12 },
    { id: "cognito", label: "Cognito", x: 20, y: 35 },
    { id: "lambda", label: "Lambda", x: 50, y: 40 },
    { id: "s3", label: "S3", x: 80, y: 35 },
    { id: "ddb", label: "DynamoDB", x: 50, y: 72 },
  ];
  const edges = [
    ["gw", "lambda"],
    ["gw", "cognito"],
    ["lambda", "ddb"],
    ["lambda", "s3"],
    ["cognito", "lambda"],
  ];
  return <SystemGraph nodes={nodes} edges={edges} />;
}

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

function SystemGraph({
  nodes,
  edges,
  animated = false,
}: {
  nodes: GraphNode[];
  edges: string[][];
  animated?: boolean;
}) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-56 w-full rounded-xl border border-border bg-background-muted p-4"
      aria-label="Architecture diagram"
    >
      {edges.map(([from, to], i) => {
        const a = nodeMap[from];
        const b = nodeMap[to];
        if (!a || !b) return null;
        return (
          <motion.line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="currentColor"
            strokeWidth="0.3"
            className="text-accent/40"
            initial={animated ? { pathLength: 0 } : undefined}
            animate={animated ? { pathLength: 1 } : undefined}
            transition={{ duration: 1, delay: i * 0.15 }}
          />
        );
      })}
      {nodes.map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="4"
            className="fill-accent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          />
          <text
            x={node.x}
            y={node.y + 8}
            textAnchor="middle"
            className="fill-foreground text-[3px] font-medium"
          >
            {node.label}
          </text>
        </g>
      ))}
      {animated && (
        <motion.circle
          r="1.2"
          className="fill-accent"
          animate={{ cx: [15, 40, 65, 88], cy: [50, 50, 30, 50] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      )}
    </svg>
  );
}

function DetailBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold tracking-wide text-foreground-muted uppercase">
        {title}
      </h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm leading-relaxed text-foreground"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FeaturedSystems() {
  const [active, setActive] = useState(0);
  const system = featuredSystems[active];

  return (
    <section id="systems" className="section-padding">
      <div className="section-container">
        <FadeIn>
          <SectionHeader
            eyebrow="Systems"
            title="Featured Systems"
            subtitle="End-to-end architectures with real engineering trade-offs and measurable outcomes."
          />
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-2">
            {featuredSystems.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
                  active === i
                    ? "border-accent/30 bg-accent text-white shadow-sm"
                    : "border-border bg-card text-foreground-muted hover:shadow-sm",
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={system.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-6 grid gap-6 lg:grid-cols-2"
          >
            <div className="space-y-5">
              <div className="glass-card p-5">
                <h3 className="text-lg font-semibold">{system.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {system.overview}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {system.tech.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="glass-card grid gap-5 p-5 sm:grid-cols-2">
                <DetailBlock title="Engineering Challenges" items={system.challenges} />
                <DetailBlock title="Results" items={system.results} />
              </div>
            </div>

            <div className="glass-card p-5">
              <h4 className="mb-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                Architecture Diagram
              </h4>
              <ArchitectureDiagram slug={system.slug} />
              <DetailBlock title="System Overview" items={system.architecture} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
