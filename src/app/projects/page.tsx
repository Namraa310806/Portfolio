import { Metadata } from "next";
import { ProjectsPage } from "@/components/pages/projects-page";

export const metadata: Metadata = {
  title: "Projects | Namraa Patel",
  description: "Full-stack applications, ML systems, and cloud architectures with detailed case studies and architecture.",
};

export default function Projects() {
  return <ProjectsPage />;
}
