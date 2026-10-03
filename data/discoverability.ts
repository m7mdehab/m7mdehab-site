import {
  capabilities,
  education,
  experience,
  profile,
  projects,
  services,
  skillGroups,
} from "@/data/public";
import { getWritingWordCount, publishedWritingArticles } from "@/data/writing";
import { projectVisuals } from "@/data/project-visuals";
import { getRelatedWritingProjects } from "@/data/writing-schema";

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

export const writingRecords = publishedWritingArticles.map((article) => {
  const coverImage = article.cover.kind === "image"
    ? article.cover.src
    : article.cover.kind === "visual" && article.cover.visual === "oil-sar"
      ? projectVisuals["oil-spill-detection"].image
      : undefined;
  return ({
  slug: article.slug,
  title: article.title,
  description: article.description,
  cardDescription: article.cardDescription ?? null,
  format: article.format,
  category: article.category,
  topics: article.topics,
  series: article.series ?? null,
  publishedAt: article.publishedAt,
  updatedAt: article.updatedAt ?? null,
  readingMinutes: article.readingMinutes,
  listenMinutes: article.listenMinutes,
  wordCount: getWritingWordCount(article),
  ...(article.audio
    ? { audio: {
        url: article.audio.src.startsWith("http")
          ? article.audio.src
          : `${profile.domain}${article.audio.src.startsWith("/") ? article.audio.src : `/${article.audio.src}`}`,
        mimeType: article.audio.mimeType,
        durationSeconds: article.audio.durationSeconds,
      } }
    : {}),
  url: writingArticleUrl(article.slug),
  relatedProjects: getRelatedWritingProjects(article),
  sourceLinks: (article.sources ?? []).map((source) => ({ label: source.label, url: source.href, kind: source.kind })),
  ...(coverImage ? { coverImage } : {}),
  });
});

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
  writing: writingRecords,
  machineReadable: {
    profile: `${profile.domain}/profile.json`,
    projects: `${profile.domain}/projects.json`,
    services: `${profile.domain}/services.json`,
    writing: `${profile.domain}/writing.json`,
    llms: `${profile.domain}/llms.txt`,
  },
};
