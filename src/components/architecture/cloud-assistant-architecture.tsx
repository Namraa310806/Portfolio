import { Node, Edge } from "reactflow";

export const cloudAssistantNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 250, y: 0 },
    data: { label: "User" },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 250, y: 100 },
    data: { label: "React Frontend" },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 250, y: 200 },
    data: { label: "API Gateway" },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 250, y: 300 },
    data: { label: "Lambda" },
  },
  {
    id: "5",
    type: "custom",
    position: { x: 100, y: 400 },
    data: { label: "DynamoDB" },
  },
  {
    id: "6",
    type: "custom",
    position: { x: 400, y: 400 },
    data: { label: "S3" },
  },
  {
    id: "7",
    type: "custom",
    position: { x: 550, y: 200 },
    data: { label: "Cognito" },
  },
  {
    id: "8",
    type: "custom",
    position: { x: 550, y: 300 },
    data: { label: "CloudWatch" },
  },
];

export const cloudAssistantEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e4-6", source: "4", target: "6" },
  { id: "e2-7", source: "2", target: "7" },
  { id: "e4-8", source: "4", target: "8" },
];
