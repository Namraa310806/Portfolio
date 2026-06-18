import { Hero } from "@/components/sections/hero";
import { OpenSourceDashboard } from "@/components/sections/open-source-dashboard";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Education } from "@/components/sections/education";
import { TechStack } from "@/components/sections/tech-stack";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <OpenSourceDashboard />
      <Projects />
      <Achievements />
      <Education />
      <TechStack />
      <Contact />
    </>
  );
}
