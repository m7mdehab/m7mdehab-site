import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Blocks, ExternalLink, Gauge, ShieldCheck, Target } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";
import { emailComposeHref } from "@/data/contact-links";
import { services } from "@/data/public";
import styles from "@/components/case-study.module.css";
import serviceStyles from "@/components/service-conversion.module.css";

type NextProject = {
  slug: string;
  title: string;
  kicker: string;
};

function cleanText(value: string) {
  return value.replaceAll(" — ", " · ").replaceAll("—", "·");
}

function SectionMarker({ icon, label }: { icon: ReactNode; label: string }) {
  return <div className={styles.sectionMarker}><span aria-hidden="true">{icon}</span><p className={styles.eyebrow}>{label}</p></div>;
}

export function CaseStudyNarrative({
  study,
  nextProject,
  projectSlug,
}: {
  study: CaseStudy;
  nextProject: NextProject;
  projectSlug: string;
}) {
  const relevantServices = services.filter((service) => service.directProjectSlugs.includes(projectSlug));

  return (
    <article className={styles.story}>
      <section className={styles.statement} aria-labelledby="case-study-thesis">
        <SectionMarker icon={<Target size={17} />} label="Case study" />
        <h2 id="case-study-thesis" className={styles.thesis}>{cleanText(study.thesis)}</h2>
        <p className={styles.challenge}>{cleanText(study.challenge)}</p>
      </section>

      <section className={styles.scope} aria-labelledby="case-study-scope">
        <SectionMarker icon={<Gauge size={17} />} label="Role & scope" />
        <p id="case-study-scope">{cleanText(study.scope)}</p>
      </section>

      <section className={styles.section} aria-labelledby="case-study-approach">
        <div className={styles.sectionHead}>
          <SectionMarker icon={<Blocks size={17} />} label="Approach" />
          <h2 id="case-study-approach">How the system earns the result.</h2>
        </div>
        <div className={styles.steps}>
          {study.steps.map((step) => (
            <section key={step.eyebrow} className={styles.step}>
              <p className={styles.eyebrow}>{cleanText(step.eyebrow)}</p>
              <h3>{cleanText(step.title)}</h3>
              <p>{cleanText(step.detail)}</p>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="case-study-evidence">
        <div className={styles.sectionHead}>
          <SectionMarker icon={<Gauge size={17} />} label="Evidence" />
          <h2 id="case-study-evidence">What can actually be checked.</h2>
        </div>
        <div className={styles.evidenceGrid}>
          {study.evidence.map((item) => (
            <article key={`${item.label}-${item.value ?? "evidence"}`} className={styles.evidenceCard}>
              <p className={styles.evidenceLabel}>{cleanText(item.label)}</p>
              {item.value ? <p className={styles.evidenceValue}>{cleanText(item.value)}</p> : null}
              <p className={styles.evidenceDetail}>{cleanText(item.detail)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.constraints} aria-labelledby="case-study-constraints">
        <div>
          <SectionMarker icon={<ShieldCheck size={17} />} label="Limits & boundaries" />
          <h2 id="case-study-constraints">What the case study does not pretend.</h2>
        </div>
        <div className={styles.constraintList}>
          {study.constraints.map((constraint) => (
            <p key={constraint} className={styles.constraintItem}>{cleanText(constraint)}</p>
          ))}
        </div>
      </section>

      <section className={styles.publication} aria-labelledby="case-study-publication">
        <SectionMarker icon={<ExternalLink size={17} />} label="Publication boundary" />
        <div className={styles.publicationBody}>
          <p id="case-study-publication">{cleanText(study.publicationNote)}</p>
          {study.links.length ? (
            <div className={styles.links} aria-label="Public project evidence">
              {study.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {cleanText(link.label)} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {relevantServices.length ? (
        <section className={serviceStyles.bridge} aria-labelledby="project-service-heading">
          <p className={serviceStyles.bridgeEyebrow}>From proof to useful work</p>
          <div className={serviceStyles.bridgeBody}>
            <h2 id="project-service-heading">Where this project maps to real service work.</h2>
            <p>These links come from the governed project and service evidence map. They are not generic cross-sells and do not widen the claims made above.</p>
            <div className={serviceStyles.bridgeItems}>
              {relevantServices.map((service) => (
                <article key={service.id} className={serviceStyles.bridgeItem}>
                  <small>{cleanText(service.proofLabel)}</small>
                  <strong>{cleanText(service.title)}</strong>
                  <div className={serviceStyles.bridgeActions}>
                    <Link
                      className={serviceStyles.bridgeLink}
                      href={`/services#service-${service.id}`}
                      data-conversion="project-to-service"
                      data-service-id={service.id}
                    >
                      Service context <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                    <a
                      className={serviceStyles.bridgeLink}
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
          </div>
        </section>
      ) : null}

      <Link data-case-next className={styles.nextProject} href={`/work/${nextProject.slug}`}>
        <p className={styles.eyebrow}>Next project · {cleanText(nextProject.kicker)}</p>
        <strong>{cleanText(nextProject.title)}</strong>
        <span aria-hidden="true"><ArrowUpRight size={19} /></span>
      </Link>
    </article>
  );
}
