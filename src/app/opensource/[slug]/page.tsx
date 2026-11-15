import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContributionDetailPage } from "@/components/pages/contribution-detail-page";
import { detailContributions } from "@/data/site";
import { slugify } from "@/lib/utils";

interface ContributionPageProps {
  params: Promise<{ slug: string }>;
}

const findContribution = (slug: string) =>
  detailContributions.find((c) => slugify(c.title) === slug);

export async function generateStaticParams() {
  return detailContributions.map((contribution) => ({
    slug: slugify(contribution.title),
  }));
}

export async function generateMetadata({ params }: ContributionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const contribution = findContribution(slug);

  if (!contribution) {
    return { title: "Contribution Not Found" };
  }

  return {
    title: `${contribution.title} | Namraa Patel`,
    description: contribution.description,
  };
}

export default async function ContributionPage({ params }: ContributionPageProps) {
  const { slug } = await params;
  const contribution = findContribution(slug);

  if (!contribution) {
    notFound();
  }

  return <ContributionDetailPage contribution={contribution} />;
}
