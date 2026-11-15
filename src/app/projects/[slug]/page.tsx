import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/pages/project-detail-page";
import { projects } from "@/data/site";
import { slugify } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const findProject = (slug: string) => projects.find((p) => slugify(p.title) === slug);

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: slugify(project.title) }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Namraa Patel`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
