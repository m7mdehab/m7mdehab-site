import {
  capabilities,
  education,
  experience,
  profile,
  projects,
  services,
  skillGroups,
} from "@/data/public";

export function projectCaseStudyUrl(slug: string) {
  return `${profile.domain}/work/${slug}`;
}

export function serviceContextUrl(serviceId: string) {
  return `${profile.domain}/#service-${serviceId}`;
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
  machineReadable: {
    profile: `${profile.domain}/profile.json`,
    projects: `${profile.domain}/projects.json`,
    services: `${profile.domain}/services.json`,
    llms: `${profile.domain}/llms.txt`,
  },
};
