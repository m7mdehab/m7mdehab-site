import {
  capabilities,
  education,
  experience,
  profile,
  projects,
  services,
  skillGroups,
} from "@/data/public";
import { writingArticles } from "@/data/writing";

export function projectCaseStudyUrl(slug: string) {
  return `${profile.domain}/work/${slug}`;
}

export function serviceContextUrl(serviceId: string) {
  return `${profile.domain}/services#service-${serviceId}`;
}

export function writingArticleUrl(slug: string) {
  return `${profile.domain}/writing/${slug}`;
}

export const serviceRecords = services.map((service) => ({
  id: service.id,
  title: service.title,
  capability: service.capability,
  description: service.description,
  evidence: service.evidence,
  proofLabel: service.proofLabel,
  url: serviceContextUrl(service.id),
  evidenceBoundary: service.projectContext,
  relatedProjects: service.projectSlugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug);
    if (!project) return [];
    return [{
      slug: project.slug,
      title: project.title,
      caseStudyUrl: projectCaseStudyUrl(project.slug),
      relationship: service.directProjectSlugs.includes(project.slug) ? "direct" : "adjacent",
    }];
  }),
  contact: {
    type: "mailto",
    subject: service.contactSubject,
    url: `mailto:${profile.email}?subject=${encodeURIComponent(service.contactSubject)}`,
  },
}));

export const projectRecords = projects.map((project) => {
  const publicEvidenceUrl = "href" in project ? project.href : undefined;
  const directServices = services
    .filter((service) => service.directProjectSlugs.includes(project.slug))
    .map((service) => ({
      id: service.id,
      title: service.title,
      url: serviceContextUrl(service.id),
    }));

  return {
    slug: project.slug,
    title: project.title,
    kicker: project.kicker,
    statement: project.statement,
    proof: project.proof,
    caseStudyUrl: projectCaseStudyUrl(project.slug),
    publicEvidenceUrl: publicEvidenceUrl ?? null,
    directServices,
  };
});

export const writingRecords = writingArticles.map((article) => ({
  slug: article.slug,
  title: article.title,
  description: article.description,
  topic: article.topic,
  createdAt: article.createdAt,
  readingMinutes: article.readingMinutes,
  url: writingArticleUrl(article.slug),
  alternateLanguageUrl: `${profile.domain}/ar/writing/${article.slug}`,
  derivedFromProject: {
    slug: article.projectSlug,
    title: article.projectTitle,
    caseStudyUrl: projectCaseStudyUrl(article.projectSlug),
  },
  evidenceAnchors: article.evidence,
}));

export const profileRecord = {
  name: profile.name,
  handle: profile.handle,
  location: profile.location,
  currentRole: profile.role,
  currentEmployer: profile.employer,
  proposition: profile.proposition,
  links: {
    website: profile.domain,
    github: profile.github,
    linkedin: profile.linkedin,
  },
  contact: {
    email: profile.email,
  },
  capabilities,
  skills: skillGroups,
  experience,
  education,
  services: serviceRecords.map(({ contact, ...service }) => service),
  writing: writingRecords.map(({ evidenceAnchors, ...article }) => article),
  machineReadable: {
    profile: `${profile.domain}/profile.json`,
    projects: `${profile.domain}/projects.json`,
    services: `${profile.domain}/services.json`,
    writing: `${profile.domain}/writing.json`,
    llms: `${profile.domain}/llms.txt`,
  },
};
