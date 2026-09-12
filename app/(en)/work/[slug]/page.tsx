import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CaseStudyNarrative } from "@/components/case-study";
import { ProjectVisual } from "@/components/project-visual";
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
  const arabic = `${profile.domain}/ar/work/${project.slug}`;

  return {
    title,
    description: project.statement,
    alternates: {
      canonical,
      languages: { en: canonical, ar: arabic, "x-default": canonical },
    },
    openGraph: {
      title,
      description: project.statement,
      url: canonical,
      siteName: profile.name,
      type: "article",
      locale: "en_US",
      alternateLocale: ["ar_EG"],
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
    <main id="main-content" className="case-shell shell">
      <Link className="back-link" href="/work"><ArrowLeft size={17} aria-hidden="true" /> All work</Link>
      <div className="case-hero">
        <div>
          <p className="eyebrow">{project.kicker}</p>
          <h1>{project.title}</h1>
          <p className="case-lede">{project.statement}</p>
          <p className="project-proof">{project.proof}</p>
          {evidenceHref ? (
            <a className="round-link" href={evidenceHref} target="_blank" rel="noreferrer">
              Open public evidence <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ) : null}
        </div>
        <ProjectVisual slug={project.slug} context="case" />
      </div>
      <CaseStudyNarrative study={study} nextProject={nextProject} projectSlug={project.slug} />
    </main>
  );
}
