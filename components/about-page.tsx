/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { BrandLogo, type BrandKey } from "@/components/brand-logo";
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
import { emailComposeHref } from "@/data/contact-links";

function AboutSectionHead({
  index,
  eyebrow,
  title,
  copy,
}: {
  index: string;
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <Reveal className="about-v2-section-head">
      <p className="about-v2-section-kicker">
        <span>{index}</span>
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {copy ? <p className="about-v2-section-copy">{copy}</p> : null}
    </Reveal>
  );
}

function brandForOrganization(name: string): BrandKey | null {
  const value = name.toLowerCase();
  if (value.includes("network international")) return "network";
  if (value.includes("al tayseer")) return "altayseer";
  if (value.includes("orcas")) return "orcas";
  if (value.includes("narss") || value.includes("remote sensing")) return "narss";
  if (value.includes("zewail")) return "zewail";
  if (value.includes("databricks")) return "databricks";
  if (value.includes("mckinsey")) return "mckinsey";
  if (value.includes("canadian international college")) return "cic";
  if (value.includes("exploreai") || value.includes("explore ai")) return "exploreai";
  return null;
}

function OrganizationMark({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const brand = brandForOrganization(name);
  if (!brand) return null;

  if (brand === "databricks") {
    return (
      <span
        className={`about-v2-logo about-v2-logo-vector about-v2-logo-databricks ${className}`}
        data-brand-logo="databricks"
        aria-hidden="true"
      >
        <img src="/brand/about/databricks.svg" alt="" />
      </span>
    );
  }

  if (brand === "mckinsey") {
    return (
      <span
        className={`about-v2-logo about-v2-logo-vector about-v2-logo-mckinsey ${className}`}
        data-brand-logo="mckinsey"
        aria-hidden="true"
      >
        <img src="/brand/about/mckinsey.svg" alt="" />
      </span>
    );
  }

  return <BrandLogo brand={brand} className={`about-v2-logo ${className}`} />;
}

function CareerRow({
  item,
  index,
}: {
  item: (typeof primaryExperience)[number];
  index: number;
}) {
  const organization =
    item.company === "Guksu" || item.company === "Egyptian African Trade"
      ? "Al Tayseer Group"
      : item.company;

  return (
    <Reveal
      as="article"
      delay={index * 0.035}
      className="about-v2-career-row"
      data-current={index === 0 ? "true" : undefined}
    >
      <div className="about-v2-period">
        <span>{item.period}</span>
        {index === 0 ? <small>Current</small> : null}
      </div>

      <div className="about-v2-organization">
        <OrganizationMark name={organization} />
        <div>
          <strong>{item.company}</strong>
          <span>{item.mode}</span>
        </div>
      </div>

      <div className="about-v2-role">
        <h3>{item.role}</h3>
        <p>{item.summary}</p>
        {"boundary" in item && item.boundary ? (
          <small>{item.boundary}</small>
        ) : null}
      </div>
    </Reveal>
  );
}

export function AboutPage() {
  const currentRole = primaryExperience[0];

  return (
    <main id="main-content" className="about-page about-page-v2">
      <section className="about-hero about-v2-hero">
        <div className="shell">
          <Reveal className="about-v2-topline">
            <span>About · Professional history</span>
            <Link href="/">
              Back home <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </Reveal>

          <div className="about-v2-hero-grid">
            <Reveal className="about-v2-hero-copy">
              <p className="about-v2-eyebrow">THE THROUGH-LINE</p>
              <h1>{aboutIntro.headline}</h1>
              <p className="about-v2-hero-lede">{aboutIntro.body}</p>
            </Reveal>

            <Reveal delay={0.06} className="about-v2-now" aria-label="Current professional position">
              <div className="about-v2-now-top">
                <span>Now</span>
                <span>2026</span>
              </div>

              <div className="about-v2-now-identity">
                <OrganizationMark name={aboutIntro.currentEmployer} />
                <div>
                  <strong>{aboutIntro.currentRole}</strong>
                  <p>{aboutIntro.currentEmployer}</p>
                </div>
              </div>

              <p className="about-v2-now-copy">{currentRole.summary}</p>

              <dl className="about-v2-facts">
                <div>
                  <dt>Based in</dt>
                  <dd>{aboutIntro.location}</dd>
                </div>
                <div>
                  <dt>Languages</dt>
                  <dd>{aboutIntro.languages}</dd>
                </div>
              </dl>

              <div className="about-v2-now-links">
                <a href="#career">
                  Career history <ArrowRight size={14} aria-hidden="true" />
                </a>
                <Link href="/work">
                  Selected work <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="career" className="about-career about-v2-section">
        <div className="shell">
          <AboutSectionHead
            index="01"
            eyebrow="Career"
            title="Different roles. One direction of travel."
            copy="The chronology matters, but the more useful signal is how the work moved from analysis and technical delivery toward larger data systems, operating decisions and accountable implementation."
          />

          <div className="about-v2-career-list">
            {primaryExperience.map((item, index) => (
              <CareerRow
                key={`${item.company}-${item.role}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="about-parallel about-v2-section about-v2-sidework">
        <div className="shell">
          <AboutSectionHead
            index="02"
            eyebrow="Alongside"
            title="Work that sharpened a different set of muscles."
            copy="Teaching and independent client work ran beside the primary career lane. They matter here for communication, scoping and end-to-end ownership, not as a second résumé."
          />

          <div className="about-v2-sidework-list">
            {parallelExperience.map((item, index) => (
              <Reveal
                as="article"
                key={item.company}
                delay={index * 0.04}
                className="about-v2-sidework-row"
              >
                <span className="about-v2-sidework-index">0{index + 1}</span>
                <div className="about-v2-sidework-org">
                  <OrganizationMark name={item.company} />
                  <div>
                    <strong>{item.company}</strong>
                    <span>{item.period}</span>
                  </div>
                </div>
                <div className="about-v2-sidework-copy">
                  <h3>{item.role}</h3>
                  <p>{item.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-foundation about-v2-section about-v2-foundation">
        <div className="shell">
          <AboutSectionHead
            index="03"
            eyebrow="Foundation"
            title="Three early placements, three different technical environments."
          />

          <div className="about-v2-foundation-grid">
            {earlyExperience.map((item, index) => (
              <Reveal
                as="article"
                key={item.company}
                delay={index * 0.04}
                className="about-v2-foundation-item"
              >
                <div className="about-v2-foundation-top">
                  <span>0{index + 1}</span>
                  <span>{item.period}</span>
                </div>
                <OrganizationMark name={item.company} />
                <h3>{item.role}</h3>
                <strong>{item.company}</strong>
                <p>{item.summary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-learning about-v2-section">
        <div className="shell">
          <AboutSectionHead
            index="04"
            eyebrow="Learning"
            title="Formal foundation, then targeted expansion."
            copy="The education and credentials stay because they explain the technical base and the areas I chose to deepen. They are evidence, not decoration."
          />

          <div className="about-v2-learning-grid">
            <div className="about-v2-ledger">
              <p className="about-v2-ledger-label">Education</p>
              {aboutEducation.map((item) => (
                <Reveal
                  as="article"
                  key={item.qualification}
                  className="about-v2-ledger-row"
                >
                  <span className="about-v2-ledger-date">{item.period}</span>
                  <div className="about-v2-ledger-main">
                    <OrganizationMark name={item.institution} />
                    <h3>{item.qualification}</h3>
                    <p>{item.institution}</p>
                  </div>
                  <strong>{item.detail}</strong>
                </Reveal>
              ))}
            </div>

            <div className="about-v2-ledger">
              <p className="about-v2-ledger-label">Credentials</p>
              {aboutCertifications.map((item) => (
                <Reveal
                  as="article"
                  key={item.name}
                  className="about-v2-ledger-row about-v2-cert-row"
                >
                  <span className="about-v2-ledger-date">{item.year}</span>
                  <div className="about-v2-ledger-main">
                    <OrganizationMark name={item.issuer} />
                    <h3>{item.name}</h3>
                    <p>{item.issuer}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-stack about-v2-section about-v2-stack">
        <div className="shell">
          <AboutSectionHead
            index="05"
            eyebrow="Operating stack"
            title="Tools grouped by the problems they help solve."
            copy="No proficiency bars and no technology wall. This is the practical stack I reach for across data engineering, analytics, machine learning, AI and delivery."
          />

          <div className="about-v2-stack-list">
            {aboutSkillGroups.map((group, index) => (
              <Reveal
                as="article"
                key={group.title}
                delay={index * 0.025}
                className="about-v2-stack-row"
              >
                <span>0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.skills.join(" · ")}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-principles about-v2-principles">
        <div className="shell">
          <AboutSectionHead
            index="06"
            eyebrow="How I work"
            title="A small set of rules for messy problems."
            copy="The common thread is reducing uncertainty without pretending it has disappeared."
          />

          <div className="about-v2-principles-grid">
            {workingPrinciples.map((principle, index) => (
              <Reveal
                as="article"
                key={principle.title}
                delay={index * 0.04}
                className="about-v2-principle"
              >
                <span>{principle.index}</span>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </Reveal>
            ))}
          </div>

          <div className="about-close about-v2-close">
            <Reveal className="about-v2-close-copy">
              <p className="about-v2-eyebrow">NEXT</p>
              <h2>The background is context. The work is the proof.</h2>
            </Reveal>

            <Reveal delay={0.05} className="about-v2-close-links">
              <Link href="/work">
                Selected work <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/writing">
                Writing <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/services">
                Services <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <a
                href={emailComposeHref("Role or project opportunity")}
                target="_blank"
                rel="noreferrer"
                data-conversion="about-contact"
              >
                Discuss an opportunity <Mail size={15} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
