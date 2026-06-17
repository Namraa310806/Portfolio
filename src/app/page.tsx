import { Hero } from "@/components/sections/hero";
import { FeaturedMetrics } from "@/components/sections/featured-metrics";
import { SelectedContributions } from "@/components/sections/selected-contributions";
import { OpenSourceDashboard } from "@/components/sections/open-source-dashboard";
import { GitHubHeatmap } from "@/components/sections/github-heatmap";
import { Projects } from "@/components/sections/projects";
import { Journey } from "@/components/sections/journey";
import { Achievements } from "@/components/sections/achievements";
import { TechStack } from "@/components/sections/tech-stack";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedMetrics />
      <SelectedContributions />
      <OpenSourceDashboard />
      <GitHubHeatmap />
      <Projects />
      <Journey />
      <Achievements />
      <TechStack />
      <Contact />
    </>
  );
}
