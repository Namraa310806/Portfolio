import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/pages/project-detail-page";
import { projects } from "@/data/site";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.title.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const slug = params.slug;
  const project = projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Namraa Patel`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const slug = params.slug;
  const project = projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
