import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";
import styles from "@/components/case-study.module.css";

type NextProject = {
  slug: string;
  title: string;
  kicker: string;
};

export function CaseStudyNarrative({ study, nextProject }: { study: CaseStudy; nextProject: NextProject }) {
  return (
    <article className={styles.story}>
      <section className={styles.statement} aria-labelledby="case-study-thesis">
        <p className={styles.eyebrow}>Case study</p>
        <h2 id="case-study-thesis" className={styles.thesis}>{study.thesis}</h2>
        <p className={styles.challenge}>{study.challenge}</p>
      </section>

      <section className={styles.scope} aria-labelledby="case-study-scope">
        <p className={styles.eyebrow}>Role & scope</p>
        <p id="case-study-scope">{study.scope}</p>
      </section>

      <section className={styles.section} aria-labelledby="case-study-approach">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Approach</p>
          <h2 id="case-study-approach">How the system earns the result.</h2>
        </div>
        <div className={styles.steps}>
          {study.steps.map((step) => (
            <section key={step.eyebrow} className={styles.step}>
              <p className={styles.eyebrow}>{step.eyebrow}</p>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="case-study-evidence">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Evidence</p>
          <h2 id="case-study-evidence">What can actually be checked.</h2>
        </div>
        <div className={styles.evidenceGrid}>
          {study.evidence.map((item) => (
            <article key={`${item.label}-${item.value ?? "evidence"}`} className={styles.evidenceCard}>
              <p className={styles.evidenceLabel}>{item.label}</p>
              {item.value ? <p className={styles.evidenceValue}>{item.value}</p> : null}
              <p className={styles.evidenceDetail}>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.constraints} aria-labelledby="case-study-constraints">
        <div>
          <p className={styles.eyebrow}>Limits & boundaries</p>
          <h2 id="case-study-constraints">What the case study does not pretend.</h2>
        </div>
        <div className={styles.constraintList}>
          {study.constraints.map((constraint) => (
            <p key={constraint} className={styles.constraintItem}>{constraint}</p>
          ))}
        </div>
      </section>

      <section className={styles.publication} aria-labelledby="case-study-publication">
        <p className={styles.eyebrow}>Publication boundary</p>
        <div className={styles.publicationBody}>
          <p id="case-study-publication">{study.publicationNote}</p>
          {study.links.length ? (
            <div className={styles.links} aria-label="Public project evidence">
              {study.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <Link className={styles.nextProject} href={`/work/${nextProject.slug}`}>
        <p className={styles.eyebrow}>Next project · {nextProject.kicker}</p>
        <strong>{nextProject.title}</strong>
        <span aria-hidden="true"><ArrowUpRight size={19} /></span>
      </Link>
    </article>
  );
}
