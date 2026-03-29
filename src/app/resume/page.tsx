import type { Metadata } from "next";

import { ResumeEmbed } from "@/components/sections";
import { buildTitle, portfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: buildTitle("Resume"),
  description: "Embedded resume page with a downloadable PDF and quick actions.",
};

export default function ResumePage() {
  return (
    <ResumeEmbed
      title={portfolio.resume.title}
      pdf={portfolio.resume.pdf}
      actions={portfolio.resume.actions}
    />
  );
}
