import { Metadata } from "next";
import { OpenSourcePage } from "@/components/pages/open-source-page";

export const metadata: Metadata = {
  title: "Open Source Contributions | Namraa Patel",
  description: "All 114+ merged pull requests across production repositories with detailed analytics and breakdown.",
};

export default function OpenSource() {
  return <OpenSourcePage />;
}
