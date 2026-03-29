import Link from "next/link";

import {
  AboutSection,
  ContactSection,
  HomeHero,
  ProjectCard,
  ReportSummarySection,
  SkillsMatrixSection,
  SecurityAssessmentSection,
  AdrSection,
  SectionTitle,
  TechnologyGrid,
} from "@/components/sections";
import { featuredProjects, portfolio } from "@/lib/portfolio";

export default function HomePage() {
  return (
    <div className="mb-16">
      <div data-gopher-section="high" data-gopher-label="the hero introduction">
        <HomeHero person={portfolio.person} highlights={portfolio.heroHighlights} />
      </div>

      <div data-gopher-section="high" data-gopher-label="the about section">
        <AboutSection
          about={portfolio.about}
          summary={portfolio.person.summary}
          mission={portfolio.person.mission}
        />
      </div>

      <ReportSummarySection report={portfolio.portfolioReport} />

      <div data-gopher-section="high" data-gopher-label="the skills matrix">
        <SkillsMatrixSection items={portfolio.technicalSkillsMatrix} />
      </div>

      <section
        className="mb-12"
        data-gopher-section="high"
        data-gopher-label="featured projects"
      >
        <SectionTitle id="projects">Featured Projects</SectionTitle>
        <p className="text-neutral-700 dark:text-neutral-300">
          These featured projects emphasize context, decisions, diagrams, APIs,
          and results rather than only screenshots.
        </p>
        <div className="mt-6 grid gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-black/5 bg-black/[0.03] p-5 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="mb-2 text-neutral-700 dark:text-neutral-400">
            Want the full backend portfolio structure?
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/work"
              className="font-semibold text-blue-500 transition-colors hover:text-blue-400"
            >
              Explore the full work archive
            </Link>
            <Link
              href="/report"
              className="font-semibold text-blue-500 transition-colors hover:text-blue-400"
            >
              Open portfolio report
            </Link>
          </div>
        </div>
      </section>

      <div data-gopher-section="low" data-gopher-label="the technology inventory">
        <TechnologyGrid technologies={portfolio.technologies} />
      </div>

      <SecurityAssessmentSection
        securityAssessment={portfolio.securityAssessment}
      />

      <AdrSection items={portfolio.adrRecords.slice(0, 3)} />

      <div data-gopher-section="high" data-gopher-label="the contact section">
        <ContactSection
          contact={portfolio.contact}
          email={portfolio.person.email}
        />
      </div>
    </div>
  );
}
