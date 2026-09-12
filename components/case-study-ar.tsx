import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";
import { profile } from "@/data/public";
import { servicesAr } from "@/data/public-ar";
import styles from "@/components/case-study.module.css";
import serviceStyles from "@/components/service-conversion.module.css";

type NextProject = {
  slug: string;
  title: string;
  kicker: string;
};

export function CaseStudyNarrativeAr({
  study,
  nextProject,
  projectSlug,
}: {
  study: CaseStudy;
  nextProject: NextProject;
  projectSlug: string;
}) {
  const relevantServices = servicesAr.filter((service) => service.directProjectSlugs.includes(projectSlug));

  return (
    <article className={styles.story}>
      <section className={styles.statement} aria-labelledby="case-study-thesis-ar">
        <p className={styles.eyebrow}>دراسة حالة</p>
        <h2 id="case-study-thesis-ar" className={styles.thesis}>{study.thesis}</h2>
        <p className={styles.challenge}>{study.challenge}</p>
      </section>

      <section className={styles.scope} aria-labelledby="case-study-scope-ar">
        <p className={styles.eyebrow}>الدور والنطاق</p>
        <p id="case-study-scope-ar">{study.scope}</p>
      </section>

      <section className={styles.section} aria-labelledby="case-study-approach-ar">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>المنهج</p>
          <h2 id="case-study-approach-ar">كيف يبني النظام نتيجة تستحق الثقة.</h2>
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

      <section className={styles.section} aria-labelledby="case-study-evidence-ar">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>الأدلة</p>
          <h2 id="case-study-evidence-ar">ما الذي يمكن التحقق منه فعلاً.</h2>
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

      <section className={styles.constraints} aria-labelledby="case-study-constraints-ar">
        <div>
          <p className={styles.eyebrow}>القيود والحدود</p>
          <h2 id="case-study-constraints-ar">ما الذي لا تدّعيه دراسة الحالة.</h2>
        </div>
        <div className={styles.constraintList}>
          {study.constraints.map((constraint) => (
            <p key={constraint} className={styles.constraintItem}>{constraint}</p>
          ))}
        </div>
      </section>

      <section className={styles.publication} aria-labelledby="case-study-publication-ar">
        <p className={styles.eyebrow}>حدود النشر</p>
        <div className={styles.publicationBody}>
          <p id="case-study-publication-ar">{study.publicationNote}</p>
          {study.links.length ? (
            <div className={styles.links} aria-label="أدلة المشروع العامة">
              {study.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <ArrowUpLeft size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {relevantServices.length ? (
        <section className={serviceStyles.bridge} aria-labelledby="project-service-heading-ar">
          <p className={serviceStyles.bridgeEyebrow}>من الدليل إلى عمل مفيد</p>
          <div className={serviceStyles.bridgeBody}>
            <h2 id="project-service-heading-ar">أين يترجم هذا المشروع إلى خدمة حقيقية.</h2>
            <p>هذه الروابط تأتي من خريطة الأدلة والخدمات المحكومة. ليست عروضاً عامة، ولا توسع الادعاءات المذكورة أعلاه.</p>
            <div className={serviceStyles.bridgeItems}>
              {relevantServices.map((service) => (
                <article key={service.id} className={serviceStyles.bridgeItem}>
                  <small>{service.proofLabel}</small>
                  <strong>{service.title}</strong>
                  <div className={serviceStyles.bridgeActions}>
                    <Link
                      className={serviceStyles.bridgeLink}
                      href={`/ar/services#service-${service.id}`}
                      data-conversion="project-to-service"
                      data-service-id={service.id}
                    >
                      سياق الخدمة <ArrowUpLeft size={14} aria-hidden="true" />
                    </Link>
                    <a
                      className={serviceStyles.bridgeLink}
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(service.contactSubject)}`}
                      data-conversion="project-service-to-contact"
                      data-service-id={service.id}
                    >
                      ناقش الفرصة <ArrowUpLeft size={14} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Link data-case-next className={styles.nextProject} href={`/ar/work/${nextProject.slug}`}>
        <p className={styles.eyebrow}>المشروع التالي · {nextProject.kicker}</p>
        <strong><bdi>{nextProject.title}</bdi></strong>
        <span aria-hidden="true"><ArrowUpLeft size={19} /></span>
      </Link>
    </article>
  );
}
