import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { projects } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.statement };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const visual = projectVisuals[project.slug];
  const evidenceHref = project.href ?? ("evidenceHref" in visual ? visual.evidenceHref : undefined);

  return (
    <main id="main-content" className="case-shell shell">
      <Link className="back-link" href="/#work"><ArrowLeft size={17}/> Selected work</Link>
      <div className="case-hero">
        <div>
          <p className="eyebrow">{project.kicker}</p><h1>{project.title}</h1><p className="case-lede">{project.statement}</p><p className="project-proof">{project.proof}</p>
          {evidenceHref ? <a className="round-link" href={evidenceHref} target="_blank" rel="noreferrer">Open public evidence <ArrowUpRight size={18}/></a> : null}
        </div>
        <ProjectVisual slug={project.slug} context="case" />
      </div>
      <section className="case-note">
        <p className="eyebrow">Evidence narrative · {visual.provenance.replaceAll("_", " ")}</p>
        <h2>{visual.verb}. Proof before decoration.</h2>
        <p>{visual.caption} This project route keeps the evidence visible and truthful while the deeper case-study narrative is expanded from governed public sources.</p>
      </section>
    </main>
  );
}
