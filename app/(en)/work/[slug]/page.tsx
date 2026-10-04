import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/case-study";
import { caseStudies } from "@/data/case-studies";
import { projectCaseStudyUrl } from "@/data/discoverability";
import { profile, projects } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  const title = `${project.title} — Case Study`;
  const canonical = projectCaseStudyUrl(project.slug);

  return {
    title,
    description: project.statement,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description: project.statement,
      url: canonical,
      siteName: profile.name,
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description: project.statement,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  if (projectIndex < 0) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const visual = projectVisuals[project.slug];
  const study = caseStudies[project.slug];
  const projectHref = "href" in project ? project.href : undefined;
  const evidenceHref = projectHref ?? ("evidenceHref" in visual ? visual.evidenceHref : undefined);

  return (
    <ProjectCaseStudy
      project={project}
      study={study}
      nextProject={nextProject}
      evidenceHref={evidenceHref}
    />
  );
}
