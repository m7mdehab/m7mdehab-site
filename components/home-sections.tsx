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
import { Reveal } from "@/components/reveal";

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <Reveal className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
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
      <SectionIntro eyebrow="01 — Selected work" title="Proof, not portfolio filler." copy="Each project demonstrates a different part of how I think, build and deliver — with the visual treatment driven by the evidence that actually exists." />
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
      <SectionIntro eyebrow="02 — Capabilities" title="Across the boundary between business problems and technical systems." />
      <div className="capability-list">
        {capabilities.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.035} className="capability-row">
            <span>0{i + 1}</span><h3>{item.title}</h3><p>{item.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="section shell skills-section">
      <SectionIntro eyebrow="03 — Skills & stack" title="Tools are useful when they disappear into the work." copy="A working stack grouped by the problems it helps me solve — not a logo wall." />
      <div className="skills-groups">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 0.04} className="skill-group">
            <p className="skill-group-title">{group.title}</p>
            <div className="skill-cloud">
              {group.skills.map((skill, index) => (
                <span key={skill} className="skill-chip" style={{ transform: `rotate(${((index % 5) - 2) * 0.35}deg)` }}>{skill}</span>
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
      <SectionIntro eyebrow="04 — Experience" title="Enterprise credibility, product ownership and analytical depth." />
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
        <SectionIntro eyebrow="05 — Certifications" title="Continuous learning with receipts." />
        <div className="credential-list">
          {certifications.map((item) => <Reveal key={item.name} className="credential-item"><h3>{item.name}</h3><p>{item.issuer}</p></Reveal>)}
        </div>
      </div>
      <div>
        <SectionIntro eyebrow="06 — Education" title="The technical foundation." />
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
      <SectionIntro eyebrow="07 — Additional experience" title="Teaching, consulting and applied technical work." />
      <div className="compact-grid">
        {additionalExperience.map((item) => <Reveal key={`${item.company}-${item.role}`} className="compact-card"><p>{item.company}</p><h3>{item.role}</h3><span>{item.note}</span></Reveal>)}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section shell about-section">
      <Reveal className="about-display"><p className="eyebrow">08 — About / how I work</p><p>I like problems with messy edges: unclear requirements, fragmented data, competing constraints, and a real person waiting for the answer.</p></Reveal>
      <Reveal className="about-body"><p>{profile.shortBio}</p><p>I tend to work from first principles, make the truth visible, reduce ambiguity, then build the smallest reliable system that can carry the job. The medium can be a migration pipeline, a forecasting model, a dashboard, an AI workflow, or a customer-facing product.</p></Reveal>
    </section>
  );
}

export function Services() {
  return (
    <section className="section shell">
      <SectionIntro eyebrow="09 — Ways to work together" title="Useful outcomes, not a menu of buzzwords." />
      <div className="services-grid">
        {services.map((service, i) => <Reveal key={service.title} delay={i * 0.04} className="service-card"><span>0{i + 1}</span><h3>{service.title}</h3><p>{service.description}</p></Reveal>)}
      </div>
    </section>
  );
}

export function Writing() {
  return (
    <section className="section shell">
      <SectionIntro eyebrow="10 — Writing" title="Notes from the work behind the work." />
      <div className="writing-list">
        {writing.map((article) => <Reveal key={article.title} className="writing-row"><div><p>{article.topic}</p><h3>{article.title}</h3></div><span>{article.status}</span></Reveal>)}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="contact-section shell">
      <Reveal><p className="eyebrow">11 — Opportunity</p><h2>Have a difficult problem worth solving?</h2><p className="contact-copy">Discuss a role or project opportunity.</p></Reveal>
      <Reveal delay={0.08} className="contact-actions">
        <a href={`mailto:${profile.email}`}><Mail size={18}/> Email</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a>
      </Reveal>
    </section>
  );
}
