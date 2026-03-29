import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import type {
  AdrRecord,
  ApiDocumentation,
  BlogPost,
  LinkItem,
  PortfolioData,
  WorkProject,
} from "@/lib/portfolio";

import { ContactForm } from "./contact-form";
import { MermaidDiagram } from "./mermaid-diagram";

function proseCardClassName() {
  return "min-w-0 rounded-3xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-[#161617]/80";
}

export function SectionTitle({
  id,
  children,
}: {
  id?: string;
  children: string;
}) {
  return (
    <h2
      id={id}
      className="mb-2 scroll-mt-20 bg-clip-text text-[1.7rem] font-[750]"
    >
      {children}
      <span className="bg-gradient-to-r from-[#6310ff] to-[#1491ff] bg-clip-text text-fill-transparent dark:from-[#a2facf] dark:to-[#64acff]">
        .
      </span>
    </h2>
  );
}

export function PageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-16 mt-20 flex flex-col items-start justify-center">
      <h1 className="mb-2 bg-clip-text text-3xl font-black tracking-[-0.03em] text-neutral-800 dark:text-white">
        {title}
        <span className="bg-gradient-to-r from-[#6310ff] to-[#1491ff] bg-clip-text text-fill-transparent dark:from-[#a2facf] dark:to-[#64acff]">
          .
        </span>
      </h1>
      <p className="max-w-3xl text-neutral-700 dark:text-neutral-300">{description}</p>
    </div>
  );
}

export function ButtonLink({ link }: { link: LinkItem }) {
  const variant =
    link.variant === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : link.variant === "outline"
        ? "border text-neutral-700 hover:bg-[#f2f3f5] dark:border-neutral-800 dark:bg-[#161617] dark:text-white dark:hover:border-neutral-700 dark:hover:bg-[#202021]"
        : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/15";

  return (
    <Link
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noreferrer" : undefined}
      className={`group inline-flex w-fit items-center rounded-md px-4 py-2 font-medium duration-200 ${variant}`}
    >
      {link.label}
      <ArrowRight className="ml-2 size-4 duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export function HomeHero({
  person,
  highlights,
}: {
  person: PortfolioData["person"];
  highlights: PortfolioData["heroHighlights"];
}) {
  return (
    <section className="mt-8 md:mt-10">
      <div className="relative overflow-hidden rounded-3xl border border-black/5 shadow-lg dark:border-transparent dark:shadow-2xl">
        <div className="relative aspect-square md:aspect-[16/9]">
          <Image
            src={person.heroImage}
            alt={person.name}
            fill
            priority
            className="object-cover object-[85%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-white/20 md:bg-gradient-to-r dark:from-black/80 dark:via-black/60 dark:to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 md:max-w-[55%]">
            <h2 className="flex items-center text-sm font-medium uppercase tracking-wider text-neutral-700 dark:text-white sm:text-base">
              {person.role}
            </h2>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:mt-3 sm:text-4xl lg:text-5xl">
              hey, I&apos;m {person.name}
              <span className="animate-wave ml-2 inline-block">👋</span>
            </h1>
            <p className="mt-3 text-base font-light leading-relaxed text-neutral-700 dark:text-white sm:mt-4 sm:text-lg">
              {person.headline}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <div className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-sm text-neutral-700 backdrop-blur dark:border-white/10 dark:bg-black/30 dark:text-neutral-200">
                <MapPin className="mr-2 inline size-4" />
                {person.location}
              </div>
              <div className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-sm text-neutral-700 backdrop-blur dark:border-white/10 dark:bg-black/30 dark:text-neutral-200">
                <Mail className="mr-2 inline size-4" />
                {person.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="card-surface rounded-2xl p-4 shadow-sm transition-all hover:-translate-y-0.5"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {item.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white">
              {item.value}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {item.supportingText}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutSection({
  about,
  summary,
  mission,
}: {
  about: PortfolioData["about"];
  summary: string;
  mission: string;
}) {
  return (
    <section className="mb-12 mt-16">
      <SectionTitle id="about">{about.title}</SectionTitle>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="card-surface rounded-3xl p-6 shadow-sm sm:p-8">
          <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            {summary}
          </p>
          {about.description.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-300"
            >
              {paragraph}
            </p>
          ))}
          <p className="mt-4 text-base italic text-neutral-700 dark:text-neutral-300">
            {mission}
          </p>
          <div className="mt-6">
            <ButtonLink link={{ ...about.cta, variant: "primary" }} />
          </div>
        </div>

        <div className="grid gap-4">
          {about.stats.map((item) => (
            <div key={item.label} className="card-surface rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {item.label}
              </h3>
              <p className="mt-2 text-lg font-bold text-neutral-900 dark:text-white">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillsMatrixSection({
  items,
}: {
  items: PortfolioData["technicalSkillsMatrix"];
}) {
  return (
    <section className="mb-12">
      <SectionTitle id="skills">Technical Skills Matrix</SectionTitle>
      <div className={`${proseCardClassName()} overflow-hidden p-0`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03]">
              <tr>
                <th className="px-4 py-3 font-semibold text-neutral-800 dark:text-white">
                  Category
                </th>
                <th className="px-4 py-3 font-semibold text-neutral-800 dark:text-white">
                  Skills
                </th>
                <th className="px-4 py-3 font-semibold text-neutral-800 dark:text-white">
                  Proficiency
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.category}
                  className="border-b border-black/5 last:border-b-0 dark:border-white/10"
                >
                  <td className="px-4 py-4 font-semibold text-neutral-800 dark:text-white">
                    {item.category}
                  </td>
                  <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                    {item.skills.join(", ")}
                  </td>
                  <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                    {item.proficiency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function ProjectCard({
  project,
  priority,
}: {
  project: WorkProject;
  priority?: boolean;
}) {
  return (
    <article className="grid gap-6 rounded-3xl border border-black/5 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-[#161617]/80 lg:grid-cols-[1.1fr_0.9fr] lg:p-6">
      <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="relative aspect-[16/10]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            priority={priority}
            className="object-cover"
          />
        </div>
        {project.gallery.length > 1 ? (
          <div className="grid grid-cols-3 gap-2 border-t border-black/5 p-2 dark:border-neutral-800">
            {project.gallery.slice(0, 3).map((image) => (
              <div key={image} className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <Image src={image} alt={project.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
          {project.tagline}
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white lg:text-3xl">
          {project.name}
        </h3>
        <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-300">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.detailReady ? (
            <ButtonLink
              link={{
                label: "View case study",
                href: `/work/${project.slug}`,
                variant: "primary",
              }}
            />
          ) : null}
          {project.links.map((link) => (
            <ButtonLink
              key={`${project.slug}-${link.href}`}
              link={{
                ...link,
                variant: link.variant ?? "secondary",
              }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export function BlogTimeline({ posts }: { posts: BlogPost[] }) {
  return (
    <ol className="relative mt-4 border-l border-neutral-200 dark:border-neutral-800">
      {posts.map((post) => (
        <li
          key={post.slug}
          className="-mt-3 mb-10 ml-6 rounded-2xl border duration-200 hover:bg-neutral-200/50 dark:border-neutral-800 dark:bg-[#161617] dark:hover:border-neutral-700 dark:hover:bg-[#202021]"
        >
          <Link className="block px-6 py-3" href={`/blog/${post.slug}`}>
            <span className="absolute -left-3 flex size-6 items-center justify-center rounded-full bg-black/10 ring-8 ring-white backdrop-blur dark:bg-white/10 dark:ring-[#101110]" />
            <header>
              <h3 className="mb-1 flex items-center text-lg font-bold text-neutral-900 dark:text-white">
                {post.title}
                {post.latest ? (
                  <span className="ml-3 mr-2 hidden rounded bg-black/10 py-0.5 pl-1.5 pr-2.5 text-sm font-medium dark:bg-white/10 sm:block">
                    Latest
                  </span>
                ) : null}
              </h3>
              <time
                className="mb-2 block text-sm font-normal leading-none text-neutral-500"
                dateTime={post.dateTime}
              >
                {post.date}
              </time>
            </header>
            <p className="mb-2 text-base font-normal text-neutral-700 dark:text-neutral-300">
              {post.excerpt}
            </p>
            <p className="inline-flex text-sm font-bold text-blue-500">Read more</p>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function ArticleBody({ post }: { post: BlogPost }) {
  return (
    <article className="mb-16 mt-20">
      <header className="mb-10">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="max-w-4xl text-3xl font-black tracking-[-0.03em] text-neutral-900 dark:text-white sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700 dark:text-neutral-300">
          {post.excerpt}
        </p>
        <time className="mt-4 block text-sm text-neutral-500" dateTime={post.dateTime}>
          {post.date}
        </time>
      </header>

      <div className="grid gap-6">
        {post.sections.map((section) => (
          <section key={section.heading} className={proseCardClassName()}>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              {section.heading}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="mt-4 space-y-3">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="rounded-2xl border border-black/5 bg-black/[0.03] px-4 py-3 text-neutral-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}

export function TechnologyGrid({
  technologies,
}: {
  technologies: PortfolioData["technologies"];
}) {
  return (
    <section className="mb-12">
      <SectionTitle id="tech">{technologies.title}</SectionTitle>
      <p className="text-neutral-700 dark:text-neutral-300">{technologies.intro}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {technologies.items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="flex cursor-pointer items-center gap-2 rounded-md border border-black/10 px-2 py-1 font-medium text-neutral-500 duration-200 hover:bg-black/5 dark:border-neutral-800 dark:text-white/50 dark:hover:border-neutral-700 dark:hover:bg-white/5"
          >
            {item.logo ? (
              <Image
                src={item.logo}
                alt={item.name}
                width={20}
                height={20}
                className="size-5 rounded"
              />
            ) : null}
            {item.name}
          </Link>
        ))}
      </div>
      <p className="mt-4 text-center text-neutral-700 dark:text-neutral-400">
        ...and many more.
      </p>
    </section>
  );
}

export function SecurityAssessmentSection({
  securityAssessment,
}: {
  securityAssessment: PortfolioData["securityAssessment"];
}) {
  return (
    <section className="mb-12">
      <SectionTitle id="security">Security Awareness</SectionTitle>
      <p className="text-neutral-700 dark:text-neutral-300">
        {securityAssessment.intro}
      </p>
      <div className={`${proseCardClassName()} mt-6 overflow-hidden p-0`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03]">
              <tr>
                <th className="px-4 py-3 font-semibold text-neutral-800 dark:text-white">
                  Vulnerability
                </th>
                <th className="px-4 py-3 font-semibold text-neutral-800 dark:text-white">
                  Status
                </th>
                <th className="px-4 py-3 font-semibold text-neutral-800 dark:text-white">
                  Implementation
                </th>
              </tr>
            </thead>
            <tbody>
              {securityAssessment.checklist.map((item) => (
                <tr
                  key={item.vulnerability}
                  className="border-b border-black/5 last:border-b-0 dark:border-white/10"
                >
                  <td className="px-4 py-4 font-semibold text-neutral-800 dark:text-white">
                    {item.vulnerability}
                  </td>
                  <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <ShieldCheck className="size-3" />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                    {item.implementation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function AdrSection({ items }: { items: AdrRecord[] }) {
  return (
    <section className="mb-12">
      <SectionTitle id="adr">Architecture Decision Records</SectionTitle>
      <div className="grid gap-6">
        {items.map((record) => (
          <article key={record.id} className={proseCardClassName()}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
                {record.id}
              </span>
              <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
                {record.status}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-neutral-900 dark:text-white">
              {record.title}
            </h3>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Context
                </h4>
                <ul className="mt-3 space-y-2">
                  {record.context.map((item) => (
                    <li key={item} className="text-neutral-700 dark:text-neutral-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Decision
                </h4>
                <p className="mt-3 text-neutral-700 dark:text-neutral-300">
                  {record.decision}
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Positive
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                  {record.positive.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  Trade-offs
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                  {record.negative.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-black/5 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Alternatives
                </h4>
                <div className="mt-3 space-y-3 text-sm">
                  {record.alternatives.map((item) => (
                    <div key={item.option}>
                      <p className="font-semibold text-neutral-900 dark:text-white">
                        {item.option} ({item.verdict})
                      </p>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        Pros: {item.pros}
                      </p>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        Cons: {item.cons}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ReportSummarySection({
  report,
}: {
  report: PortfolioData["portfolioReport"];
}) {
  return (
    <section className="mb-12">
      <SectionTitle id="report">{report.title}</SectionTitle>
      <div className={proseCardClassName()}>
        {report.executiveSummary.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-4 first:mt-0 leading-relaxed text-neutral-700 dark:text-neutral-300"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function CodeBlock({ lines }: { lines: string[] }) {
  return (
    <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-2xl border border-black/5 bg-black/[0.03] p-4 text-sm text-neutral-700 sm:whitespace-pre dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300">
      <code>{lines.join("\n")}</code>
    </pre>
  );
}

function ApiDocumentationSection({ api }: { api: ApiDocumentation }) {
  return (
    <section className={proseCardClassName()}>
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
        API Documentation
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="min-w-0 rounded-2xl border border-black/5 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Base path
          </p>
          <p className="mt-2 break-words text-sm text-neutral-800 dark:text-white">
            {api.basePath}
          </p>
        </div>
        <div className="min-w-0 rounded-2xl border border-black/5 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Auth
          </p>
          <p className="mt-2 break-words text-sm text-neutral-800 dark:text-white">
            {api.auth}
          </p>
        </div>
        <div className="min-w-0 rounded-2xl border border-black/5 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Rate limit
          </p>
          <p className="mt-2 break-words text-sm text-neutral-800 dark:text-white">
            {api.rateLimit}
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        {api.endpoints.map((endpoint) => (
          <div
            key={`${endpoint.method}-${endpoint.endpoint}`}
            className="min-w-0 rounded-2xl border border-black/5 bg-black/[0.03] p-5 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                {endpoint.method}
              </span>
              <code className="min-w-0 break-all text-sm font-semibold text-neutral-900 dark:text-white">
                {endpoint.endpoint}
              </code>
            </div>
            <p className="mt-3 text-neutral-700 dark:text-neutral-300">
              {endpoint.description}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Auth:
                </span>{" "}
                {endpoint.auth}
              </p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Rate limit:
                </span>{" "}
                {endpoint.rateLimit}
              </p>
            </div>
            {endpoint.requestBody?.length ? (
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-neutral-900 dark:text-white">
                  Example request
                </p>
                <CodeBlock lines={endpoint.requestBody} />
              </div>
            ) : null}
            {endpoint.responseBody?.length ? (
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-neutral-900 dark:text-white">
                  Example response
                </p>
                <CodeBlock lines={endpoint.responseBody} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function MetricGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="min-w-0 rounded-2xl border border-black/5 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.03]"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {item.label}
          </p>
          <p className="mt-2 break-words text-lg font-bold text-neutral-900 dark:text-white">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ProjectDetailSection({
  project,
  adrs,
}: {
  project: WorkProject;
  adrs: AdrRecord[];
}) {
  return (
    <article className="mb-16 mt-20 min-w-0">
      <header className="mb-10 min-w-0">
        <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
          {project.tagline}
        </p>
        <h1 className="mt-3 max-w-5xl text-3xl font-black tracking-[-0.03em] text-neutral-900 dark:text-white sm:text-4xl">
          {project.name}
        </h1>
        <p className="mt-4 max-w-4xl text-lg text-neutral-700 dark:text-neutral-300">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="break-words rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
            >
              {item}
            </span>
          ))}
        </div>
      </header>

      <div className="grid min-w-0 gap-6">
        <section className={proseCardClassName()}>
          <SectionTitle>STAR Documentation</SectionTitle>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Situation
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-700 dark:text-neutral-300">
                {project.situation}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Task
              </h3>
              <ul className="mt-3 space-y-2">
                {project.task?.map((item) => (
                  <li key={item} className="text-neutral-700 dark:text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Action
              </h3>
              <ul className="mt-3 space-y-2">
                {project.actions?.map((item) => (
                  <li key={item} className="text-neutral-700 dark:text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Result
              </h3>
              <ul className="mt-3 space-y-2">
                {project.results?.map((item) => (
                  <li key={item} className="text-neutral-700 dark:text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {project.metrics?.length ? (
          <section className={proseCardClassName()}>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              Results & Metrics
            </h2>
            <div className="mt-4">
              <MetricGrid items={project.metrics} />
            </div>
          </section>
        ) : null}

        {project.technicalDecisions?.length ? (
          <section className={proseCardClassName()}>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              Technical Decisions
            </h2>
            <div className="mt-4 grid gap-4">
              {project.technicalDecisions.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-black/5 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                    {item.rationale}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {project.architectureDiagram ? (
          <section className={proseCardClassName()}>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              {project.architectureDiagram.title}
            </h2>
            <div className="mt-4 min-w-0 overflow-x-auto rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-[#111111]">
              <MermaidDiagram chart={project.architectureDiagram.lines.join("\n")} />
            </div>
          </section>
        ) : null}

        {project.erdDiagram ? (
          <section className={proseCardClassName()}>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              {project.erdDiagram.title}
            </h2>
            <div className="mt-4 min-w-0 overflow-x-auto rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-[#111111]">
              <MermaidDiagram chart={project.erdDiagram.lines.join("\n")} />
            </div>
          </section>
        ) : null}

        {project.apiDocumentation ? (
          <ApiDocumentationSection api={project.apiDocumentation} />
        ) : null}

        {project.performanceBenchmarks ? (
          <section className={proseCardClassName()}>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              Performance & Operational Notes
            </h2>
            <p className="mt-4 text-neutral-700 dark:text-neutral-300">
              {project.performanceBenchmarks.summary}
            </p>
            <div className="mt-4">
              <MetricGrid items={project.performanceBenchmarks.items} />
            </div>
          </section>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          {project.securityMeasures?.length ? (
            <section className={proseCardClassName()}>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Security Measures
              </h2>
              <ul className="mt-4 space-y-3">
                {project.securityMeasures.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
                  >
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.testing ? (
            <section className={proseCardClassName()}>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Testing Strategy
              </h2>
              <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                {project.testing.summary}
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Coverage / confidence
              </p>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                {project.testing.coverage}
              </p>
              <ul className="mt-4 space-y-2">
                {project.testing.items.map((item) => (
                  <li key={item} className="text-neutral-700 dark:text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {project.deployment ? (
            <section className={proseCardClassName()}>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Deployment Strategy
              </h2>
              <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                {project.deployment.summary}
              </p>
              <ul className="mt-4 space-y-2">
                {project.deployment.items.map((item) => (
                  <li key={item} className="text-neutral-700 dark:text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.challenges?.length ? (
            <section className={proseCardClassName()}>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Challenges Faced
              </h2>
              <ul className="mt-4 space-y-2">
                {project.challenges.map((item) => (
                  <li key={item} className="text-neutral-700 dark:text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        {project.lessonsLearned?.length ? (
          <section className={proseCardClassName()}>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              Lessons Learned
            </h2>
            <ul className="mt-4 space-y-3">
              {project.lessonsLearned.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {adrs.length ? (
          <section className={proseCardClassName()}>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              Related ADRs
            </h2>
            <div className="mt-4 grid gap-4">
              {adrs.map((record) => (
                <div
                  key={record.id}
                  className="rounded-2xl border border-black/5 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {record.id} • {record.status}
                  </p>
                  <p className="mt-2 font-semibold text-neutral-900 dark:text-white">
                    {record.title}
                  </p>
                  <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                    {record.decision}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}

export function ContactSection({
  contact,
  email,
}: {
  contact: PortfolioData["contact"];
  email: string;
}) {
  return (
    <section className="mb-12">
      <SectionTitle id="contact">{contact.title}</SectionTitle>
      <p className="text-neutral-700 dark:text-neutral-300">{contact.intro}</p>
      <div className="my-6 flex w-full rounded-md border border-black/15 bg-white p-5 dark:border-neutral-800 dark:bg-[#161617]">
        <ContactForm email={email} />
      </div>
      <p className="text-neutral-700 dark:text-neutral-300">Or contact me with...</p>
      <div className="mt-4 flex flex-wrap gap-4">
        {contact.links.map((link) => (
          <ButtonLink
            key={link.href}
            link={{
              ...link,
              variant: "outline",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export function ResumeEmbed({
  title,
  pdf,
  actions,
}: {
  title: string;
  pdf: string;
  actions: LinkItem[];
}) {
  return (
    <div className="mb-16 mt-20">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="mb-2 text-3xl font-black tracking-[-0.03em] text-neutral-800 dark:text-white">
          {title}
          <span className="bg-gradient-to-r from-[#6310ff] to-[#1491ff] bg-clip-text text-fill-transparent dark:from-[#a2facf] dark:to-[#64acff]">
            .
          </span>
        </h1>
        <a
          href={pdf}
          download
          className="flex items-center gap-2 rounded-md bg-blue-500 px-5 py-2.5 font-medium text-white duration-200 hover:bg-blue-600"
        >
          <Download className="size-5" />
          Download
        </a>
      </div>
      <div className="relative w-full overflow-hidden rounded-lg border border-neutral-200 shadow-lg dark:border-neutral-700">
        <embed
          src={pdf}
          type="application/pdf"
          className="h-[calc(100vh-10rem)] w-full min-h-[800px]"
        />
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {actions.map((action) => (
          <ButtonLink key={action.href} link={action} />
        ))}
      </div>
    </div>
  );
}
