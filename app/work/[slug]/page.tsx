import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { projects } from "@/data/public";

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
  return (
    <main id="main-content" className="case-shell shell">
      <Link className="back-link" href="/#work"><ArrowLeft size={17}/> Selected work</Link>
      <div className="case-hero">
        <div>
          <p className="eyebrow">{project.kicker}</p><h1>{project.title}</h1><p className="case-lede">{project.statement}</p><p className="project-proof">{project.proof}</p>
          {project.href ? <a className="round-link" href={project.href} target="_blank" rel="noreferrer">Open public evidence <ArrowUpRight size={18}/></a> : null}
        </div>
        <ProjectVisual tone={project.tone} label={project.title} />
      </div>
      <section className="case-note"><p className="eyebrow">Case study status</p><h2>Evidence-first case study in progress.</h2><p>The production route is established now so project evidence, imagery, technical decisions, outcomes and public-safe implementation details can be added without changing the site architecture.</p></section>
    </main>
  );
}
