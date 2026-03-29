import rawPortfolio from "@/data/portfolio.json";

export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary" | "outline";
};

export type DiagramData = {
  title: string;
  lines: string[];
};

export type MetricItem = {
  label: string;
  value: string;
};

export type ApiEndpoint = {
  method: string;
  endpoint: string;
  description: string;
  auth: string;
  rateLimit: string;
  requestBody?: string[];
  responseBody?: string[];
};

export type ApiDocumentation = {
  basePath: string;
  auth: string;
  rateLimit: string;
  endpoints: ApiEndpoint[];
};

export type TechnicalDecision = {
  title: string;
  rationale: string;
};

export type AdrRecord = {
  id: string;
  title: string;
  status: string;
  context: string[];
  decision: string;
  positive: string[];
  negative: string[];
  alternatives: {
    option: string;
    pros: string;
    cons: string;
    verdict: string;
  }[];
};

export type WorkProject = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  stack: string[];
  links: LinkItem[];
  detailReady?: boolean;
  situation?: string;
  task?: string[];
  actions?: string[];
  technicalDecisions?: TechnicalDecision[];
  results?: string[];
  metrics?: MetricItem[];
  architectureDiagram?: DiagramData;
  erdDiagram?: DiagramData;
  apiDocumentation?: ApiDocumentation;
  performanceBenchmarks?: {
    summary: string;
    items: MetricItem[];
  };
  securityMeasures?: string[];
  testing?: {
    summary: string;
    coverage: string;
    items: string[];
  };
  deployment?: {
    summary: string;
    items: string[];
  };
  challenges?: string[];
  lessonsLearned?: string[];
  adrRefs?: string[];
};

export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  dateTime: string;
  excerpt: string;
  latest?: boolean;
  tags: string[];
  sections: BlogSection[];
};

export type PortfolioData = {
  site: {
    title: string;
    description: string;
  };
  person: {
    name: string;
    shortName: string;
    role: string;
    location: string;
    availability: string;
    email: string;
    headline: string;
    summary: string;
    mission: string;
    heroImage: string;
  };
  navigation: {
    primary: LinkItem[];
    secondary: LinkItem[];
  };
  heroHighlights: {
    label: string;
    value: string;
    supportingText: string;
  }[];
  about: {
    title: string;
    description: string[];
    cta: LinkItem;
    stats: {
      label: string;
      value: string;
      description: string;
    }[];
  };
  technicalSkillsMatrix: {
    category: string;
    skills: string[];
    proficiency: string;
  }[];
  featuredProjectSlugs: string[];
  work: {
    title: string;
    intro: string;
  };
  workProjects: WorkProject[];
  blog: {
    title: string;
    intro: string;
    posts: BlogPost[];
  };
  technologies: {
    title: string;
    intro: string;
    items: {
      name: string;
      href: string;
      logo?: string;
    }[];
  };
  securityAssessment: {
    intro: string;
    checklist: {
      vulnerability: string;
      status: string;
      implementation: string;
    }[];
  };
  adrRecords: AdrRecord[];
  portfolioReport: {
    title: string;
    executiveSummary: string[];
    lessonsLearned: string[];
    linksAndResources: LinkItem[];
  };
  contact: {
    title: string;
    intro: string;
    links: LinkItem[];
  };
  uses: {
    title: string;
    intro: string;
    categories: {
      title: string;
      items: string[];
    }[];
  };
  photography: {
    title: string;
    intro: string;
    photos: {
      src: string;
      alt: string;
    }[];
  };
  resume: {
    title: string;
    pdf: string;
    actions: LinkItem[];
  };
  footer: {
    copyrightLabel: string;
    yearStart: number;
    yearEnd: number;
    columns: {
      title: string;
      links: LinkItem[];
    }[];
  };
};

export const portfolio = rawPortfolio as PortfolioData;

const TOP_PROJECT_SLUG = "stealth-startup-digital-finance";

function prioritizeProject<T extends { slug: string }>(items: T[], slug: string) {
  const projectIndex = items.findIndex((item) => item.slug === slug);

  if (projectIndex <= 0) {
    return items;
  }

  return [
    items[projectIndex],
    ...items.slice(0, projectIndex),
    ...items.slice(projectIndex + 1),
  ];
}

export const featuredProjects = portfolio.featuredProjectSlugs
  .map((slug) => getProjectBySlug(slug))
  .filter((project): project is WorkProject => project !== undefined);

export const orderedWorkProjects = prioritizeProject(
  portfolio.workProjects,
  TOP_PROJECT_SLUG,
);

export const detailedProjects = orderedWorkProjects.filter(
  (project) => project.detailReady,
);

export function getProjectBySlug(slug: string) {
  return portfolio.workProjects.find((project) => project.slug === slug);
}

export function getPostBySlug(slug: string) {
  return portfolio.blog.posts.find((post) => post.slug === slug);
}

export function getAdrById(id: string) {
  return portfolio.adrRecords.find((record) => record.id === id);
}

export function buildTitle(title?: string) {
  return title ? `${title} | ${portfolio.person.name}` : portfolio.site.title;
}
