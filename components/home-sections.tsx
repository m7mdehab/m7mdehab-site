import type { ReactNode } from "react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import {
  additionalExperience,
  capabilities,
  certifications,
  education,
  experience,
  profile,
  projects,
  services,
  skillGroups,
  writing,
} from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";
import { ProjectVisual } from "@/components/project-visual";
import projectStyles from "@/components/project-visual.module.css";
import serviceStyles from "@/components/service-conversion.module.css";
import { Reveal } from "@/components/reveal";

function SectionIntro({ eyebrow, title, copy, level = 2 }: { eyebrow: string; title: ReactNode; copy?: string; level?: 1 | 2 }) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <Reveal className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <Heading>{title}</Heading>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </Reveal>
  );
}

export function Hero() {
  return (
    <section id="top" className="hero shell">
      <Reveal className="hero-kicker"><span>Data · AI · Product</span><span>Cairo, Egypt</span></Reveal>
      <Reveal as="h1" delay={0.06} className="hero-title">Mohammed Ehab <em>ElNomany</em></Reveal>
      <Reveal delay={0.12} className="hero-bottom">
        <p>{profile.proposition}</p>
        <a className="round-link" href="#work">Explore selected work <ArrowUpRight size={18} /></a>
      </Reveal>
      <div className="hero-rule" />
    </section>
  );
}

export function Work() {
  return (
    <section id="work" className="section shell">
      <SectionIntro eyebrow="01 — Selected work" title={<><em className="display-script">Proof</em>, not portfolio filler.</>} copy="Each project demonstrates a different part of how I think, build and deliver — with the visual treatment driven by the evidence that actually exists." />
      <div className="work-list">
        {projects.map((project, index) => {
          const visual = projectVisuals[project.slug];
          return (
            <Reveal key={project.slug} delay={Math.min(index * 0.04, 0.2)}>
              <Link className={`${projectStyles.row} ${projectStyles[visual.layout]}`} href={`/work/${project.slug}`}>
                <div className="project-copy">
                  <p className="project-index">0{index + 1}</p>
                  <p className="project-kicker">{project.kicker}</p>
                  <h3>{project.title}</h3>
                  <p className="project-statement">{project.statement}</p>
                  <p className="project-proof">{project.proof}</p>
                </div>
                <ProjectVisual slug={project.slug} />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function Expertise() {
  return (
    <section id="expertise" className="section shell">
      <SectionIntro eyebrow="02 — Capabilities" title={<>Across the boundary between <strong className="display-strong">business problems</strong> and <em className="display-script">technical systems</em>.</>} />
      <div className="capability-list">
        {capabilities.map((item, i) => {
          const relatedService = services.find((service) => service.capability.includes(item.title));
          return (
            <Reveal key={item.title} delay={i * 0.035} className="capability-row">
              <span>0{i + 1}</span>
              <h3>{item.title}</h3>
              <div className={serviceStyles.capabilityDetail}>
                <p>{item.detail}</p>
                {relatedService ? (
                  <a className={serviceStyles.capabilityLink} href={`#service-${relatedService.id}`} data-conversion="capability-to-service" data-service-id={relatedService.id}>
                    Relevant service <ArrowUpRight size={14} aria-hidden="true" />
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

export function Skills() {
  return (
    <section className="section shell skills-section">
      <SectionIntro eyebrow="03 — Skills & stack" title={<>Tools are useful when they <em className="display-script">disappear</em> into the work.</>} copy="A working stack grouped by the problems it helps me solve — not a logo wall." />
      <div className="skills-groups">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 0.04} className="skill-group">
            <p className="skill-group-title">{group.title}</p>
            <div className="skill-cloud">
              {group.skills.map((skill) => (
                <span key={skill} className="skill-chip">{skill}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section shell">
      <SectionIntro eyebrow="04 — Experience" title={<>Enterprise credibility, <em className="display-script">product ownership</em> and <strong className="display-strong">analytical depth</strong>.</>} />
      <div className="timeline">
        {experience.map((item, i) => (
          <Reveal key={`${item.company}-${item.role}`} delay={i * 0.04} className="timeline-row">
            <p className="timeline-period">{item.period}</p>
            <div><h3>{item.role}</h3><p className="timeline-company">{item.company}</p></div>
            <p>{item.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Credentials() {
  return (
    <section className="section shell credential-grid">
      <div>
        <SectionIntro eyebrow="05 — Certifications" title={<>Continuous learning with <em className="display-script">receipts</em>.</>} />
        <div className="credential-list">
          {certifications.map((item) => <Reveal key={item.name} className="credential-item"><h3>{item.name}</h3><p>{item.issuer}</p></Reveal>)}
        </div>
      </div>
      <div>
        <SectionIntro eyebrow="06 — Education" title={<>The <em className="display-script">technical</em> foundation.</>} />
        <div className="credential-list">
          {education.map((item) => <Reveal key={item.qualification} className="credential-item"><h3>{item.qualification}</h3><p>{item.institution} · {item.period}</p></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export function AdditionalExperience() {
  return (
    <section className="section shell compact-section">
      <SectionIntro eyebrow="07 — Additional experience" title={<>Teaching, consulting and <em className="display-script">applied</em> technical work.</>} />
      <div className="compact-grid">
        {additionalExperience.map((item) => <Reveal key={`${item.company}-${item.role}`} className="compact-card"><p>{item.company}</p><h3>{item.role}</h3><span>{item.note}</span></Reveal>)}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section shell about-section">
      <Reveal className="about-display"><p className="eyebrow">08 — About / how I work</p><p>I like problems with <em className="display-script">messy edges</em>: unclear requirements, fragmented data, competing constraints, and a <strong className="display-strong">real person</strong> waiting for the answer.</p></Reveal>
      <Reveal className="about-body"><p>{profile.shortBio}</p><p>I tend to work from first principles, make the truth visible, reduce ambiguity, then build the smallest reliable system that can carry the job. The medium can be a migration pipeline, a forecasting model, a dashboard, an AI workflow, or a customer-facing product.</p></Reveal>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="section shell">
      <SectionIntro level={1} eyebrow="09 — Ways to work together" title={<>Useful outcomes, backed by the <em className="display-script">right kind of proof</em>.</>} copy="The evidence is intentionally unequal: public projects where they exist, experience and methods where confidentiality or publication rights limit screenshots." />
      <div className="services-grid">
        {services.map((service, i) => {
          const relatedProjects = service.projectSlugs
            .map((slug) => projects.find((project) => project.slug === slug))
            .filter((project): project is (typeof projects)[number] => Boolean(project));
          return (
            <Reveal key={service.id} delay={i * 0.04} className="service-card" id={`service-${service.id}`}>
              <div className={serviceStyles.cardHead}><span>0{i + 1}</span><span>{service.proofLabel}</span></div>
              <p className={serviceStyles.capability}>{service.capability}</p>
              <h2>{service.title}</h2>
              <p className={serviceStyles.description}>{service.description}</p>
              <p className={serviceStyles.evidence}>{service.evidence}</p>
              {relatedProjects.length ? (
                <div className={serviceStyles.projects} aria-label={`${service.title} evidence projects`}>
                  <p>{service.projectContext}</p>
                  <div className={serviceStyles.projectLinks}>
                    {relatedProjects.map((project) => (
                      <a key={project.slug} href={`/work/${project.slug}`} data-conversion="service-to-project" data-service-id={service.id}>
                        {project.title} <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
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
                Discuss this work <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function Writing() {
  return (
    <section className="section shell">
      <SectionIntro eyebrow="10 — Writing" title={<>Notes from the <em className="display-script">work behind the work</em>.</>} />
      <div className="writing-list">
        {writing.map((article) => <Reveal key={article.title} className="writing-row"><div><p>{article.topic}</p><h3>{article.title}</h3></div><span>{article.status}</span></Reveal>)}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="contact-section shell">
      <Reveal><p className="eyebrow">11 — Opportunity</p><h2>Have a <em className="display-script">difficult problem</em> worth solving?</h2><p className="contact-copy">Discuss a role or project opportunity.</p></Reveal>
      <Reveal delay={0.08} className="contact-actions">
        <a href={`mailto:${profile.email}`} data-conversion="contact-email"><Mail size={18}/> Email</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" data-conversion="contact-linkedin"><Linkedin size={18}/> LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noreferrer" data-conversion="contact-github"><Github size={18}/> GitHub</a>
      </Reveal>
    </section>
  );
}
