import type { Metadata } from "next";

import { PageIntro, ProjectCard } from "@/components/sections";
import { buildTitle, orderedWorkProjects, portfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: buildTitle("My Work"),
  description: portfolio.work.intro,
};

export default function WorkPage() {
  return (
    <div className="mb-16">
      <PageIntro title={portfolio.work.title} description={portfolio.work.intro} />

      <div className="mb-8 rounded-2xl border border-black/5 bg-black/[0.03] p-5 dark:border-white/10 dark:bg-white/[0.03]">
        <p className="text-neutral-700 dark:text-neutral-300">
          Detailed case-study pages are available for the featured projects and
          include STAR documentation, architecture diagrams, ERDs, API examples,
          security notes, ADR references, and delivery lessons.
        </p>
      </div>

      <div className="grid gap-8">
        {orderedWorkProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={index < 2}
          />
        ))}
      </div>
    </div>
  );
}
