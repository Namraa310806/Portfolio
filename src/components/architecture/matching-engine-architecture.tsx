import { Node, Edge } from "reactflow";

export const matchingEngineNodes: Node[] = [
  { id: "1", type: "custom", position: { x: 250, y: 0 }, data: { label: "Order Feed" } },
  { id: "2", type: "custom", position: { x: 250, y: 100 }, data: { label: "Lock-free SPSC Queue" } },
  { id: "3", type: "custom", position: { x: 250, y: 200 }, data: { label: "Matching Thread" } },
  { id: "4", type: "custom", position: { x: 250, y: 300 }, data: { label: "Order Book" } },
  { id: "5", type: "custom", position: { x: 480, y: 235 }, data: { label: "Chunked Freelist Pool" } },
  { id: "6", type: "custom", position: { x: 250, y: 400 }, data: { label: "Fills and Trades" } },
];

export const matchingEngineEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e5-4", source: "5", target: "4", sourceHandle: "l", targetHandle: "r" },
  { id: "e4-6", source: "4", target: "6" },
];
