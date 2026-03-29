import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailSection } from "@/components/sections";
import { buildTitle, getAdrById, getProjectBySlug, portfolio } from "@/lib/portfolio";

type WorkProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return portfolio.workProjects
    .filter((project) => project.detailReady)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: WorkProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: buildTitle("Project not found"),
    };
  }

  return {
    title: buildTitle(project.name),
    description: project.description,
  };
}

export default async function WorkProjectPage({ params }: WorkProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.detailReady) {
    notFound();
  }

  const adrs =
    project.adrRefs?.map((id) => getAdrById(id)).filter((item): item is NonNullable<typeof item> => item !== undefined) ?? [];

  return <ProjectDetailSection project={project} adrs={adrs} />;
}
