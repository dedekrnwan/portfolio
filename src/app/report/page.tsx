import type { Metadata } from "next";

import {
  AdrSection,
  ContactSection,
  PageIntro,
  ProjectCard,
  ReportSummarySection,
  SecurityAssessmentSection,
  SkillsMatrixSection,
  TechnologyGrid,
} from "@/components/sections";
import { buildTitle, detailedProjects, portfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: buildTitle("Portfolio report"),
  description:
    "Structured backend portfolio report including executive summary, skills matrix, project evidence, ADRs, and security awareness.",
};

export default function ReportPage() {
  return (
    <div className="mb-16">
      <PageIntro
        title={portfolio.portfolioReport.title}
        description="A structured backend engineering report covering executive summary, skills matrix, STAR project documentation, security awareness, ADRs, and lessons learned."
      />

      <ReportSummarySection report={portfolio.portfolioReport} />
      <SkillsMatrixSection items={portfolio.technicalSkillsMatrix} />

      <section className="mb-12">
        <h2 className="mb-2 bg-clip-text text-[1.7rem] font-[750] text-neutral-900 dark:text-white">
          Featured Project Evidence
          <span className="bg-gradient-to-r from-[#6310ff] to-[#1491ff] bg-clip-text text-fill-transparent dark:from-[#a2facf] dark:to-[#64acff]">
            .
          </span>
        </h2>
        <p className="mb-6 max-w-3xl text-neutral-700 dark:text-neutral-300">
          These case studies are the strongest documentation-ready examples in
          the portfolio and each links to a dedicated detail page.
        </p>
        <div className="grid gap-6">
          {detailedProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index === 0} />
          ))}
        </div>
      </section>

      <SecurityAssessmentSection securityAssessment={portfolio.securityAssessment} />
      <AdrSection items={portfolio.adrRecords} />

      <section className="mb-12 rounded-3xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-[#161617]/80">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          Lessons Learned & Growth
        </h2>
        <ul className="mt-4 space-y-3">
          {portfolio.portfolioReport.lessonsLearned.map((item) => (
            <li key={item} className="text-neutral-700 dark:text-neutral-300">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12 rounded-3xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-[#161617]/80">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          Links & Resources
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {portfolio.portfolioReport.linksAndResources.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-black/5 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <TechnologyGrid technologies={portfolio.technologies} />
      <ContactSection contact={portfolio.contact} email={portfolio.person.email} />
    </div>
  );
}
