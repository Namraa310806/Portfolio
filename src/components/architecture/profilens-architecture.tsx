import { Node, Edge } from "reactflow";

export const profiLensNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 250, y: 0 },
    data: { label: "Frontend" },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 250, y: 100 },
    data: { label: "Django Backend" },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 250, y: 200 },
    data: { label: "RBAC Layer" },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 250, y: 300 },
    data: { label: "PostgreSQL" },
  },
  {
    id: "5",
    type: "custom",
    position: { x: 450, y: 300 },
    data: { label: "PDF Generation Service" },
  },
];

export const profiLensEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
];
