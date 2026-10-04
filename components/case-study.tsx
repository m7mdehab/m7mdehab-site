import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import type { CaseStudy } from "@/data/case-studies";
import { emailComposeHref } from "@/data/contact-links";
import { services } from "@/data/public";
import type { EvidenceProjectSlug } from "@/data/project-visuals";
import styles from "@/components/case-study.module.css";

type ProjectSummary = {
  slug: EvidenceProjectSlug;
  title: string;
  kicker: string;
  statement: string;
  proof: string;
  tone: string;
};

type NextProject = {
  slug: string;
  title: string;
  kicker: string;
};

const toc = [
  ["project-question", "The project"],
  ["role-and-scope", "Role & scope"],
  ["approach", "Approach"],
  ["evidence", "Evidence"],
  ["limits", "Limits & boundaries"],
  ["public-record", "Public record"],
] as const;

export function ProjectCaseStudy({
  project,
  study,
  nextProject,
  evidenceHref,
}: {
  project: ProjectSummary;
  study: CaseStudy;
  nextProject: NextProject;
  evidenceHref?: string;
}) {
  const relevantServices = services.filter((service) => service.directProjectSlugs.includes(project.slug));

  return (
    <main
      id="main-content"
      className={styles.projectShell}
      data-project-case-study
      data-tone={project.tone}
    >
      <div className={styles.projectFrame}>
        <header className={styles.projectHero}>
          <div className={styles.topline}>
            <Link className={styles.backLink} href="/work">
              <ArrowLeft size={16} aria-hidden="true" /> All work
            </Link>
            <span className={styles.format}>Case study</span>
          </div>

          <p className={styles.caseEyebrow}>{project.kicker}</p>
          <h1>{project.title}</h1>
          <p className={styles.projectDeck}>{project.statement}</p>

          <div className={styles.projectMetaRow}>
            <p className={styles.proofMeta}>
              <span>Evidence domain</span>
              {project.proof}
            </p>
            {evidenceHref ? (
              <a className={styles.publicEvidence} href={evidenceHref} target="_blank" rel="noreferrer">
                Open public evidence <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ) : null}
          </div>

          <div
            className={styles.visualStage}
            data-project-visual-stage
            style={{ width: "min(720px, 100%)", height: "160px", maxHeight: "160px" }}
          >
            <div
              className={"case-hero-artboard-anchor " + styles.visualAnchor}
              style={{ viewTransitionName: `project-${project.slug}` }}
            >
              <ProjectVisual slug={project.slug} context="case" />
            </div>
          </div>
        </header>

        <section className={styles.evidenceSection} id="evidence" aria-labelledby="case-evidence-heading">
          <div className={styles.evidenceIntro}>
            <p className={styles.sectionEyebrow}>Evidence</p>
            <h2 id="case-evidence-heading">What can actually be checked.</h2>
          </div>
          <div className={styles.evidenceGridV2}>
            {study.evidence.map((item) => (
              <article key={`${item.label}-${item.value ?? "evidence"}`} className={styles.evidenceCardV2}>
                <p className={styles.evidenceLabelV2}>{item.label}</p>
                {item.value ? <p className={styles.evidenceValueV2}>{item.value}</p> : null}
                <p className={styles.evidenceDetailV2}>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.readingLayout}>
          <article className={styles.readingMain}>
            <section className={styles.articleSection} id="project-question">
              <p className={styles.sectionEyebrow}>The project</p>
              <div className={styles.keyIdea}>
                <p>{study.thesis}</p>
              </div>
              <p>{study.challenge}</p>
            </section>

            <section className={styles.articleSection} id="role-and-scope">
              <p className={styles.sectionEyebrow}>Role & scope</p>
              <h2>What this case study covers.</h2>
              <p>{study.scope}</p>
            </section>

            <section className={styles.articleSection} id="approach">
              <p className={styles.sectionEyebrow}>Approach</p>
              <h2>How the system earns the result.</h2>
              <div className={styles.approachList}>
                {study.steps.map((step) => (
                  <section key={step.eyebrow} className={styles.approachStep}>
                    <p className={styles.stepIndex}>{step.eyebrow}</p>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.detail}</p>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section className={styles.articleSection} id="limits">
              <p className={styles.sectionEyebrow}>Limits & boundaries</p>
              <h2>What the case study does not pretend.</h2>
              <ul className={styles.boundaryList}>
                {study.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}
              </ul>
            </section>

            <section className={styles.articleSection} id="public-record">
              <p className={styles.sectionEyebrow}>Public record</p>
              <h2>What is publishable, and where the evidence lives.</h2>
              <p>{study.publicationNote}</p>
              {study.links.length ? (
                <div className={styles.sourceList} aria-label="Public project evidence">
                  {study.links.map((link) => (
                    <a key={link.href} className={styles.sourceLink} href={link.href} target="_blank" rel="noreferrer">
                      <span>{link.label}</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              ) : null}
            </section>
          </article>

          <aside className={styles.tocRail}>
            <nav className={styles.toc} aria-label="Case study contents">
              <p>On this page</p>
              <ol>
                {toc.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
              </ol>
            </nav>
          </aside>
        </div>

        {relevantServices.length ? (
          <section className={styles.serviceBridge} aria-labelledby="project-service-heading">
            <div>
              <p className={styles.sectionEyebrow}>From proof to useful work</p>
              <h2 id="project-service-heading">Relevant service pathways.</h2>
            </div>
            <div className={styles.serviceList}>
              {relevantServices.map((service) => (
                <article key={service.id} className={styles.serviceItem}>
                  <div>
                    <small>{service.proofLabel}</small>
                    <strong>{service.title}</strong>
                  </div>
                  <div className={styles.serviceActions}>
                    <Link
                      href={`/services#service-${service.id}`}
                      data-conversion="project-to-service"
                      data-service-id={service.id}
                    >
                      Service context <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                    <a
                      href={emailComposeHref(service.contactSubject)}
                      target="_blank"
                      rel="noreferrer"
                      data-conversion="project-service-to-contact"
                      data-service-id={service.id}
                    >
                      Discuss it <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <footer className={styles.projectEnd}>
          <div>
            <p className={styles.sectionEyebrow}>Next project · {nextProject.kicker}</p>
            <p>Continue through the full work archive.</p>
          </div>
          <Link data-case-next className={styles.nextProjectV2} href={`/work/${nextProject.slug}`}>
            <span>{nextProject.title}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </main>
  );
}
