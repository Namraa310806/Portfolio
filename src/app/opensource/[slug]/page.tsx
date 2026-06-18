import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContributionDetailPage } from "@/components/pages/contribution-detail-page";
import { selectedContributions } from "@/data/site";

interface ContributionPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return selectedContributions.map((contribution) => ({
    slug: contribution.title.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }: ContributionPageProps): Promise<Metadata> {
  const slug = params.slug;
  const contribution = selectedContributions.find(
    (c) => c.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!contribution) {
    return {
      title: "Contribution Not Found",
    };
  }

  return {
    title: `${contribution.title} | Namraa Patel`,
    description: contribution.description,
  };
}

export default function ContributionPage({ params }: ContributionPageProps) {
  const slug = params.slug;
  const contribution = selectedContributions.find(
    (c) => c.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!contribution) {
    notFound();
  }

  return <ContributionDetailPage contribution={contribution} />;
}
