import { ArrowUpLeft, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import {
  additionalExperienceAr,
  capabilitiesAr,
  certificationsAr,
  educationAr,
  experienceAr,
  profileAr,
  projectsAr,
  servicesAr,
  skillGroupsAr,
  writingAr,
} from "@/data/public-ar";
import { profile } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";
import { ProjectVisual } from "@/components/project-visual";
import projectStyles from "@/components/project-visual.module.css";
import serviceStyles from "@/components/service-conversion.module.css";
import { Reveal } from "@/components/reveal";

function SectionIntroAr({ eyebrow, title, copy, level = 2 }: { eyebrow: string; title: string; copy?: string; level?: 1 | 2 }) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <Reveal className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <Heading>{title}</Heading>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </Reveal>
  );
}

export function HeroAr() {
  return (
    <section id="top" className="hero shell">
      <Reveal className="hero-kicker"><span>البيانات · الذكاء الاصطناعي · المنتجات</span><span>{profileAr.location}</span></Reveal>
      <Reveal as="h1" delay={0.06} className="hero-title"><span lang="en" dir="ltr">Mohammed Ehab <em>ElNomany</em></span></Reveal>
      <Reveal delay={0.12} className="hero-bottom">
        <p>{profileAr.proposition}</p>
        <a className="round-link" href="#work">استكشف الأعمال المختارة <ArrowUpLeft size={18} /></a>
      </Reveal>
      <div className="hero-rule" />
    </section>
  );
}

export function WorkAr() {
  return (
    <section id="work" className="section shell">
      <SectionIntroAr eyebrow="01 — أعمال مختارة" title="الدليل أولاً، لا حشو معرض أعمال." copy="كل مشروع يثبت جانباً مختلفاً من طريقة تفكيري وبنائي وتسليمي، والمعالجة البصرية تأتي من الدليل الموجود فعلاً." />
      <div className="work-list">
        {projectsAr.map((project, index) => {
          const visual = projectVisuals[project.slug];
          return (
            <Reveal key={project.slug} delay={Math.min(index * 0.04, 0.2)}>
              <Link className={`${projectStyles.row} ${projectStyles[visual.layout]}`} href={`/ar/work/${project.slug}`}>
                <div className="project-copy">
                  <p className="project-index">0{index + 1}</p>
                  <p className="project-kicker">{project.kicker}</p>
                  <h3><bdi>{project.title}</bdi></h3>
                  <p className="project-statement">{project.statement}</p>
                  <p className="project-proof">{project.proof}</p>
                </div>
                <ProjectVisual slug={project.slug} locale="ar" />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function ExpertiseAr() {
  return (
    <section id="expertise" className="section shell">
      <SectionIntroAr eyebrow="02 — التخصصات" title="عند الحد الفاصل بين مشكلات الأعمال والأنظمة التقنية." />
      <div className="capability-list">
        {capabilitiesAr.map((item, i) => {
          const relatedService = servicesAr.find((service) => service.capability.includes(item.title));
          return (
            <Reveal key={item.title} delay={i * 0.035} className="capability-row">
              <span>0{i + 1}</span>
              <h3>{item.title}</h3>
              <div className={serviceStyles.capabilityDetail}>
                <p>{item.detail}</p>
                {relatedService ? (
                  <a className={serviceStyles.capabilityLink} href={`#service-${relatedService.id}`} data-conversion="capability-to-service" data-service-id={relatedService.id}>
                    الخدمة المرتبطة <ArrowUpLeft size={14} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function SkillsAr() {
  return (
    <section className="section shell skills-section">
      <SectionIntroAr eyebrow="03 — المهارات والأدوات" title="الأداة جيدة عندما تختفي داخل العمل." copy="مجموعة عملية مرتبة حسب المشكلات التي تساعدني على حلها، لا جدار شعارات." />
      <div className="skills-groups">
        {skillGroupsAr.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 0.04} className="skill-group">
            <p className="skill-group-title">{group.title}</p>
            <div className="skill-cloud">
              {group.skills.map((skill, index) => (
                <span key={skill} lang="en" dir="ltr" className="skill-chip" style={{ transform: `rotate(${((index % 5) - 2) * 0.35}deg)` }}>{skill}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ExperienceAr() {
  return (
    <section id="experience" className="section shell">
      <SectionIntroAr eyebrow="04 — الخبرة" title="خبرة مؤسسية، وملكية منتج، وعمق تحليلي." />
      <div className="timeline">
        {experienceAr.map((item, i) => (
          <Reveal key={`${item.company}-${item.role}`} delay={i * 0.04} className="timeline-row">
            <p className="timeline-period">{item.period}</p>
            <div><h3>{item.role}</h3><p className="timeline-company"><bdi>{item.company}</bdi></p></div>
            <p>{item.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function CredentialsAr() {
  return (
    <section className="section shell credential-grid">
      <div>
        <SectionIntroAr eyebrow="05 — الشهادات" title="تعلم مستمر بأدلة واضحة." />
        <div className="credential-list">
          {certificationsAr.map((item) => <Reveal key={item.name} className="credential-item"><h3><bdi>{item.name}</bdi></h3><p><bdi>{item.issuer}</bdi></p></Reveal>)}
        </div>
      </div>
      <div>
        <SectionIntroAr eyebrow="06 — التعليم" title="الأساس التقني." />
        <div className="credential-list">
          {educationAr.map((item) => <Reveal key={item.qualification} className="credential-item"><h3>{item.qualification}</h3><p><bdi>{item.institution}</bdi> · {item.period}</p><p>{item.detail}</p></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export function AdditionalExperienceAr() {
  return (
    <section className="section shell compact-section">
      <SectionIntroAr eyebrow="07 — خبرات إضافية" title="تدريس واستشارات وعمل تقني تطبيقي." />
      <div className="compact-grid">
        {additionalExperienceAr.map((item) => <Reveal key={`${item.company}-${item.role}`} className="compact-card"><p><bdi>{item.company}</bdi></p><h3>{item.role}</h3><span>{item.note}</span></Reveal>)}
      </div>
    </section>
  );
}

export function AboutAr() {
  return (
    <section id="about" className="section shell about-section">
      <Reveal className="about-display"><p className="eyebrow">08 — عني / كيف أعمل</p><p>أفضّل المشكلات ذات الحواف غير المرتبة: متطلبات غير واضحة، وبيانات متفرقة، وقيود متعارضة، وشخص حقيقي ينتظر نتيجة يمكن استخدامها.</p></Reveal>
      <Reveal className="about-body"><p>{profileAr.shortBio}</p><p>أبدأ عادةً من المبادئ الأساسية، وأجعل الحقائق مرئية، وأقلل الغموض، ثم أبني أصغر نظام موثوق يستطيع أداء المهمة. قد يكون ذلك مسار ترحيل بيانات، أو نموذج توقع، أو لوحة معلومات، أو مسار ذكاء اصطناعي، أو منتجاً موجهاً للعميل.</p></Reveal>
    </section>
  );
}

export function ServicesAr() {
  return (
    <section id="services" className="section shell">
      <SectionIntroAr level={1} eyebrow="09 — طرق العمل معاً" title="نتائج مفيدة، مدعومة بالنوع الصحيح من الأدلة." copy="الأدلة غير متساوية عمداً: مشروعات عامة حيث يوجد دليل قابل للنشر، وخبرة ومنهجيات عندما تحد السرية أو حقوق النشر من اللقطات العامة." />
      <div className="services-grid">
        {servicesAr.map((service, i) => {
          const relatedProjects = service.projectSlugs
            .map((slug) => projectsAr.find((project) => project.slug === slug))
            .filter((project): project is (typeof projectsAr)[number] => Boolean(project));
          return (
            <Reveal key={service.id} delay={i * 0.04} className="service-card" id={`service-${service.id}`}>
              <div className={serviceStyles.cardHead}><span>0{i + 1}</span><span>{service.proofLabel}</span></div>
              <p className={serviceStyles.capability}>{service.capability}</p>
              <h3>{service.title}</h3>
              <p className={serviceStyles.description}>{service.description}</p>
              <p className={serviceStyles.evidence}>{service.evidence}</p>
              {relatedProjects.length ? (
                <div className={serviceStyles.projects} aria-label={`مشروعات تدعم ${service.title}`}>
                  <p>{service.projectContext}</p>
                  <div className={serviceStyles.projectLinks}>
                    {relatedProjects.map((project) => (
                      <Link key={project.slug} href={`/ar/work/${project.slug}`} data-conversion="service-to-project" data-service-id={service.id}>
                        <bdi>{project.title}</bdi> <ArrowUpLeft size={13} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : <p className={serviceStyles.boundary}>{service.projectContext}</p>}
              <a
                className={serviceStyles.contactLink}
                href={`mailto:${profile.email}?subject=${encodeURIComponent(service.contactSubject)}`}
                data-conversion="service-to-contact"
                data-service-id={service.id}
              >
                ناقش هذا العمل <ArrowUpLeft size={15} aria-hidden="true" />
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function WritingAr() {
  return (
    <section className="section shell">
      <SectionIntroAr eyebrow="10 — الكتابة" title="ملاحظات من العمل خلف العمل." />
      <div className="writing-list">
        {writingAr.map((article) => <Reveal key={article.title} className="writing-row"><div><p>{article.topic}</p><h3>{article.title}</h3></div><span>{article.status}</span></Reveal>)}
      </div>
    </section>
  );
}

export function ContactAr() {
  return (
    <section id="contact" className="contact-section shell">
      <Reveal><p className="eyebrow">11 — فرصة</p><h2>هل لديك مشكلة صعبة تستحق الحل؟</h2><p className="contact-copy">لنتحدث عن دور مهني أو فرصة مشروع.</p></Reveal>
      <Reveal delay={0.08} className="contact-actions">
        <a href={`mailto:${profile.email}`} data-conversion="contact-email"><Mail size={18}/> البريد الإلكتروني</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" data-conversion="contact-linkedin"><Linkedin size={18}/> LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noreferrer" data-conversion="contact-github"><Github size={18}/> GitHub</a>
      </Reveal>
    </section>
  );
}
