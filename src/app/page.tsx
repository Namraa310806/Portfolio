import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { EngineeringEcosystem } from "@/components/sections/engineering-ecosystem";
import { Experience } from "@/components/sections/experience";
import { Flagship } from "@/components/sections/flagship";
import { Hero } from "@/components/sections/hero";
import { MatchingEngine } from "@/components/sections/matching-engine";
import { OpenSourceDashboard } from "@/components/sections/open-source-dashboard";
import { Projects } from "@/components/sections/projects";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OpenSourceDashboard />
      <Flagship />
      <MatchingEngine />
      <Projects />
      <Experience />
      <Achievements />
      <EngineeringEcosystem />
      <Education />
      <Contact />
    </>
  );
}
