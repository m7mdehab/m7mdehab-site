import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import {
  aboutCertifications,
  aboutEducation,
  aboutIntro,
  aboutSkillGroups,
  earlyExperience,
  parallelExperience,
  primaryExperience,
  workingPrinciples,
} from "@/data/about";
import { profile } from "@/data/public";

function AboutSectionHead({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy?: string }) {
  return (
    <Reveal className="about-section-head">
      <div className="about-section-index"><span>{index}</span><i aria-hidden="true" /></div>
      <div>
        <p className="about-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {copy ? <p className="about-section-copy">{copy}</p> : null}
    </Reveal>
  );
}

function ThroughLineMap() {
  const nodes = ["Migration", "Analytics", "ML / AI", "Product"];
  return (
    <div className="about-through-map" aria-label="Professional through-line across migration, analytics, machine learning, AI and product delivery">
      <div className="about-through-map-head">
        <span>Current position</span>
        <strong>{aboutIntro.currentRole}</strong>
        <small>{aboutIntro.currentEmployer}</small>
      </div>
      <div className="about-through-map-rail" aria-hidden="true"><i /><i /><i /></div>
      <div className="about-through-map-nodes">
        {nodes.map((node, index) => <span key={node}><small>0{index + 1}</small>{node}</span>)}
      </div>
      <div className="about-through-map-meta"><span>{aboutIntro.location}</span><span>{aboutIntro.languages}</span></div>
    </div>
  );
}

export function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <section className="about-hero">
        <div className="shell about-hero-shell">
          <Reveal className="about-hero-meta"><span>About · Professional history</span><Link href="/">Back home <ArrowUpRight size={14} aria-hidden="true" /></Link></Reveal>
          <div className="about-hero-grid">
            <Reveal className="about-hero-copy">
              <p className="about-eyebrow">THE THROUGH-LINE</p>
              <h1>{aboutIntro.headline}</h1>
              <p>{aboutIntro.body}</p>
              <div className="about-hero-actions">
                <a href="#career">Follow the career map <ArrowDownRight size={16} aria-hidden="true" /></a>
                <Link href="/work">Inspect the work <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </div>
            </Reveal>
            <Reveal delay={0.08}><ThroughLineMap /></Reveal>
          </div>
        </div>
      </section>

      <section id="career" className="about-career">
        <div className="shell">
          <AboutSectionHead
            index="01"
            eyebrow="Career map"
            title="Different roles. One direction of travel."
            copy="The chronology matters, but the transitions matter more: technical depth moved closer to business decisions, then back into enterprise systems with stronger delivery discipline."
          />

          <div className="about-timeline">
            {primaryExperience.map((item, index) => (
              <Reveal as="article" key={`${item.company}-${item.role}`} delay={index * 0.04} className="about-timeline-row">
                <div className="about-timeline-period"><span>{item.period}</span><i aria-hidden="true" /></div>
                <div className="about-timeline-role">
                  <p>{item.mode}</p>
                  <h3>{item.role}</h3>
                  <strong>{item.company}</strong>
                </div>
                <div className="about-timeline-context">
                  <p>{item.summary}</p>
                  {"boundary" in item && item.boundary ? <small>{item.boundary}</small> : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-parallel">
        <div className="shell">
          <AboutSectionHead
            index="02"
            eyebrow="Parallel tracks"
            title="Teaching and client work kept running beside the main lane."
            copy="These are not footnotes to a timeline. They sharpen communication, scoping and end-to-end ownership in ways a single job title does not show."
          />
          <div className="about-parallel-grid">
            {parallelExperience.map((item, index) => (
              <Reveal as="article" key={item.company} delay={index * 0.06} className="about-parallel-card">
                <div className="about-parallel-top"><span>{item.period}</span><span>0{index + 1}</span></div>
                <p>{item.company}</p>
                <h3>{item.role}</h3>
                <div className="about-parallel-rule" aria-hidden="true" />
                <span>{item.summary}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-foundation">
        <div className="shell">
          <AboutSectionHead
            index="03"
            eyebrow="Foundation"
            title="Three early placements, three different technical environments."
          />
          <div className="about-foundation-strip">
            {earlyExperience.map((item, index) => (
              <Reveal as="article" key={item.company} delay={index * 0.05} className="about-foundation-item">
                <span className="about-foundation-index">0{index + 1}</span>
                <p>{item.period}</p>
                <h3>{item.role}</h3>
                <strong>{item.company}</strong>
                <span>{item.summary}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-learning">
        <div className="shell">
          <AboutSectionHead
            index="04"
            eyebrow="Learning ledger"
            title="Formal foundation, then targeted expansion."
            copy="Education and credentials stay visible here because they help explain the range. They do not need their own homepage screens."
          />
          <div className="about-learning-grid">
            <div className="about-education-block">
              <p className="about-ledger-label">Education</p>
              {aboutEducation.map((item) => (
                <Reveal as="article" key={item.qualification} className="about-ledger-row">
                  <span>{item.period}</span>
                  <div><h3>{item.qualification}</h3><p>{item.institution}</p></div>
                  <strong>{item.detail}</strong>
                </Reveal>
              ))}
            </div>
            <div className="about-certification-block">
              <p className="about-ledger-label">Credentials</p>
              {aboutCertifications.map((item) => (
                <Reveal as="article" key={item.name} className="about-ledger-row about-cert-row">
                  <span>{item.year}</span>
                  <div><h3>{item.name}</h3><p>{item.issuer}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-stack">
        <div className="shell">
          <AboutSectionHead
            index="05"
            eyebrow="Operating stack"
            title="Tools grouped by the problems they help solve."
            copy="No percentages and no logo wall. The useful signal is the combination of domains, not a decorative count of technologies."
          />
          <div className="about-stack-grid">
            {aboutSkillGroups.map((group, index) => (
              <Reveal as="article" key={group.title} delay={index * 0.035} className="about-stack-group">
                <div className="about-stack-group-head"><span>0{index + 1}</span><h3>{group.title}</h3></div>
                <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-principles">
        <div className="shell">
          <AboutSectionHead
            index="06"
            eyebrow="How I work"
            title="A small set of rules for messy problems."
          />
          <div className="about-principles-grid">
            {workingPrinciples.map((principle, index) => (
              <Reveal as="article" key={principle.title} delay={index * 0.05} className="about-principle">
                <span>{principle.index}</span>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-close">
        <div className="shell about-close-grid">
          <Reveal className="about-close-copy">
            <p className="about-eyebrow">NEXT</p>
            <h2>The background is context. The work is the proof.</h2>
            <p>Choose the route that matches what you are evaluating.</p>
          </Reveal>
          <Reveal delay={0.06} className="about-close-links">
            <Link href="/work">Selected work <ArrowRight size={15} aria-hidden="true" /></Link>
            <Link href="/services">Service context <ArrowRight size={15} aria-hidden="true" /></Link>
            <Link href="/writing">Writing <ArrowRight size={15} aria-hidden="true" /></Link>
            <a href={`mailto:${profile.email}`} data-conversion="about-contact">Discuss an opportunity <Mail size={15} aria-hidden="true" /></a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
