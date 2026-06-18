import { Metadata } from "next";
import { ResumePage } from "@/components/pages/resume-page";

export const metadata: Metadata = {
  title: "Resume | Namraa Patel",
  description: "Download my resume or view it online.",
};

export default function Resume() {
  return <ResumePage />;
}
