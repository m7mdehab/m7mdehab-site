import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpLeft } from "lucide-react";
import { CaseStudyNarrativeAr } from "@/components/case-study-ar";
import { ProjectVisual } from "@/components/project-visual";
import { caseStudiesAr } from "@/data/case-studies-ar";
import { profile, projects } from "@/data/public";
import { projectsAr } from "@/data/public-ar";
import { projectVisuals } from "@/data/project-visuals";

export function generateStaticParams() {
  return projectsAr.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsAr.find((item) => item.slug === slug);
  if (!project) return {};

  const title = `${project.title} — دراسة حالة`;
  const canonical = `${profile.domain}/ar/work/${project.slug}`;
  const english = `${profile.domain}/work/${project.slug}`;

  return {
    title,
    description: project.statement,
    alternates: {
      canonical,
      languages: { en: english, ar: canonical, "x-default": english },
    },
    openGraph: {
      title,
      description: project.statement,
      url: canonical,
      siteName: profile.name,
      type: "article",
      locale: "ar_EG",
      alternateLocale: ["en_US"],
    },
    twitter: {
      card: "summary",
      title,
      description: project.statement,
    },
  };
}

export default async function ArabicProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectIndex = projectsAr.findIndex((item) => item.slug === slug);
  if (projectIndex < 0) notFound();

  const project = projectsAr[projectIndex];
  const nextProject = projectsAr[(projectIndex + 1) % projectsAr.length];
  const visual = projectVisuals[project.slug];
  const study = caseStudiesAr[project.slug];
  const baseProject = projects.find((item) => item.slug === project.slug);
  const projectHref = baseProject && "href" in baseProject ? baseProject.href : undefined;
  const evidenceHref = projectHref ?? ("evidenceHref" in visual ? visual.evidenceHref : undefined);

  return (
    <main id="main-content" className="case-shell shell">
      <Link className="back-link" href="/ar/work">كل الأعمال <ArrowRight size={17} aria-hidden="true" /></Link>
      <div className="case-hero">
        <div>
          <p className="eyebrow">{project.kicker}</p>
          <h1><bdi>{project.title}</bdi></h1>
          <p className="case-lede">{project.statement}</p>
          <p className="project-proof">{project.proof}</p>
          {evidenceHref ? (
            <a className="round-link" href={evidenceHref} target="_blank" rel="noreferrer">
              فتح الدليل العام <ArrowUpLeft size={18} aria-hidden="true" />
            </a>
          ) : null}
        </div>
        <ProjectVisual slug={project.slug} context="case" locale="ar" />
      </div>
      <CaseStudyNarrativeAr study={study} nextProject={nextProject} projectSlug={project.slug} />
    </main>
  );
}
