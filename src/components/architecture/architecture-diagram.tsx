"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Node,
  Edge,
  Connection,
  Handle,
  Position,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

interface ArchitectureDiagramProps {
  nodes: Node[];
  edges: Edge[];
}

const hiddenHandle = { opacity: 0, pointerEvents: "none" as const };

// Without handles React Flow cannot draw edges. Top/bottom carry the main flow;
// left/right exist for side connections (give an edge sourceHandle "l" and targetHandle "r").
const nodeTypes = {
  custom: ({ data }: { data: { label: string } }) => (
    <div className="rounded-lg border border-accent/30 bg-background/80 px-4 py-2 text-center shadow-lg backdrop-blur-sm">
      <Handle type="target" position={Position.Top} id="t" style={hiddenHandle} />
      <Handle type="target" position={Position.Right} id="r" style={hiddenHandle} />
      <div className="text-sm font-semibold text-foreground">{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="b" style={hiddenHandle} />
      <Handle type="source" position={Position.Left} id="l" style={hiddenHandle} />
    </div>
  ),
};

export function ArchitectureDiagram({ nodes: initialNodes, edges: initialEdges }: ArchitectureDiagramProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const defaultEdgeOptions = useMemo(
    () => ({
      animated: true,
      style: { stroke: "rgba(124, 58, 237, 0.6)", strokeWidth: 2 },
    }),
    []
  );

  return (
    <div className="w-full h-[500px] rounded-2xl border border-border/50 bg-background/50 backdrop-blur-xl overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        className="bg-background/30"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(124, 58, 237, 0.1)" />
        <Controls className="!bg-background/80 !border-border/50" />
        <MiniMap
          className="!bg-background/80 !border-border/50"
          nodeColor="#7c3aed"
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
}
