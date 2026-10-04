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
      <div className="about-v2-section-title">
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
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
  if (value.includes("canadian international college")) return "cic";
  if (value.includes("exploreai") || value.includes("explore ai")) return "exploreai";
  return null;
}

function OrganizationMark({
  name,
  quiet = false,
}: {
  name: string;
  quiet?: boolean;
}) {
  const lower = name.toLowerCase();

  if (lower.includes("databricks")) {
    return (
      <span className="about-v2-issuer-mark about-v2-databricks" aria-label="Databricks">
        <img
          src="/brand/databricks.svg"
          alt=""
          aria-hidden="true"
          decoding="async"
        />
        <span>Databricks</span>
      </span>
    );
  }

  if (lower.includes("mckinsey")) {
    return (
      <span className="about-v2-issuer-mark about-v2-mckinsey" aria-label="McKinsey Forward">
        <span className="about-v2-mckinsey-name">McKinsey</span>
        <span className="about-v2-mckinsey-forward">Forward</span>
      </span>
    );
  }

  const brand = brandForOrganization(name);
  if (!brand) return null;

  return (
    <BrandLogo
      brand={brand}
      alt=""
      className={`about-v2-logo${quiet ? " about-v2-logo-quiet" : ""}`}
    />
  );
}

function CurrentContext() {
  const throughLine = ["Migration", "Analytics", "ML / AI", "Product"];

  return (
    <Reveal className="about-v2-current" delay={0.06}>
      <div className="about-v2-current-top">
        <span>Now</span>
        <OrganizationMark name={aboutIntro.currentEmployer} />
      </div>
      <h2>{aboutIntro.currentRole}</h2>
      <p>{aboutIntro.currentEmployer}</p>

      <div className="about-v2-current-meta">
        <span>{aboutIntro.location}</span>
        <span>{aboutIntro.languages}</span>
      </div>

      <div className="about-v2-throughline" aria-label="Professional through-line">
        {throughLine.map((item, index) => (
          <span key={item}>
            <small>0{index + 1}</small>
            {item}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

export function AboutPage() {
  return (
    <main id="main-content" className="about-v2-page">
      <section className="about-v2-hero">
        <div className="shell">
          <div className="about-v2-hero-grid">
            <Reveal className="about-v2-hero-copy">
              <p className="about-v2-eyebrow">THE THROUGH-LINE</p>
              <h1 aria-label={aboutIntro.headline}>
                <span aria-hidden="true">The through-line matters</span>{" "}
                <span aria-hidden="true">more than titles.</span>
              </h1>
              <p className="about-v2-intro">{aboutIntro.body}</p>
              <div className="about-v2-hero-links">
                <Link href="/work">
                  Inspect the work <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <a
                  href={emailComposeHref("Role or project opportunity")}
                  target="_blank"
                  rel="noreferrer"
                >
                  Start a conversation <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <CurrentContext />
          </div>
        </div>
      </section>

      <section id="career" className="about-v2-section about-v2-career">
        <div className="shell">
          <AboutSectionHead
            index="01"
            eyebrow="Career"
            title="Different roles. One direction of travel."
            copy="The chronology matters, but the useful signal is how the work moved from technical execution toward larger data, product and business decisions."
          />

          <div className="about-v2-career-list">
            {primaryExperience.map((item, index) => (
              <Reveal
                as="article"
                key={`${item.company}-${item.role}`}
                delay={index * 0.035}
                className="about-v2-career-row"
              >
                <div className="about-v2-career-period">
                  <span>{item.period}</span>
                  <small>{item.mode}</small>
                </div>

                <div className="about-v2-career-role">
                  <h3>{item.role}</h3>
                  <p className="about-v2-company-name">{item.company}</p>
                </div>

                <div className="about-v2-career-copy">
                  <p>{item.summary}</p>
                  {"boundary" in item && item.boundary ? (
                    <small>{item.boundary}</small>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-v2-section about-v2-secondary">
        <div className="shell">
          <AboutSectionHead
            index="02"
            eyebrow="Alongside the main lane"
            title="Parallel work and technical foundations."
            copy="Teaching, independent delivery and early technical work explain the range without competing with the main career chronology."
          />

          <div className="about-v2-secondary-list">
            {parallelExperience.map((item, index) => (
              <Reveal
                as="article"
                key={item.company}
                delay={index * 0.035}
                className="about-v2-secondary-row"
              >
                <div className="about-v2-secondary-meta">
                  <span>Parallel work</span>
                  <strong>{item.period}</strong>
                </div>
                <div className="about-v2-secondary-role">
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <p className="about-v2-secondary-copy">{item.summary}</p>
              </Reveal>
            ))}
            {earlyExperience.map((item, index) => (
              <Reveal
                as="article"
                key={item.company}
                delay={(parallelExperience.length + index) * 0.035}
                className="about-v2-secondary-row"
              >
                <div className="about-v2-secondary-meta">
                  <span>Foundation</span>
                  <strong>{item.period}</strong>
                </div>
                <div className="about-v2-secondary-role">
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <p className="about-v2-secondary-copy">{item.summary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-v2-section about-v2-learning">
        <div className="shell">
          <AboutSectionHead
            index="03"
            eyebrow="Learning"
            title="Formal foundation, then targeted expansion."
            copy="Education and credentials stay visible because they explain the range. They are evidence, not decoration."
          />

          <div className="about-v2-learning-grid">
            <div>
              <p className="about-v2-subhead">Credentials</p>
              <div className="about-v2-ledger">
                {aboutCertifications.map((item) => (
                  <Reveal as="article" key={item.name} className="about-v2-ledger-row about-v2-cert-row">
                    <span>{item.year}</span>
                    <div className="about-v2-ledger-main">
                      <h3>{item.name}</h3>
                      <p>{item.issuer}</p>
                    </div>
                    <div className="about-v2-ledger-end">
                      <OrganizationMark name={item.issuer} quiet />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <p className="about-v2-subhead">Education</p>
              <div className="about-v2-ledger">
                {aboutEducation.map((item) => (
                  <Reveal as="article" key={item.qualification} className="about-v2-ledger-row">
                    <span>{item.period}</span>
                    <div className="about-v2-ledger-main">
                      <h3>{item.qualification}</h3>
                      <p>{item.institution}</p>
                    </div>
                    <div className="about-v2-ledger-end">
                      <OrganizationMark name={item.institution} quiet />
                      <strong>{item.detail}</strong>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-v2-section about-v2-stack">
        <div className="shell">
          <AboutSectionHead
            index="04"
            eyebrow="Operating stack"
            title="Tools grouped by the problems they help solve."
            copy="No proficiency meters and no logo wall. The useful signal is the combination of domains and the way the tools fit together."
          />

          <div className="about-v2-stack-grid">
            {aboutSkillGroups.map((group, index) => (
              <Reveal
                as="article"
                key={group.title}
                delay={index * 0.025}
                className="about-v2-stack-group"
              >
                <span>0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.skills.join(" · ")}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-v2-principles">
        <div className="shell">
          <AboutSectionHead
            index="05"
            eyebrow="How I work"
            title="A small set of rules for messy problems."
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
        </div>
      </section>

      <section className="about-v2-close">
        <div className="shell about-v2-close-grid">
          <Reveal>
            <p className="about-v2-eyebrow">NEXT</p>
            <h2>The background is context. The work is the proof.</h2>
          </Reveal>

          <Reveal className="about-v2-close-links" delay={0.04}>
            <Link href="/work">
              Selected work <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link href="/writing">
              Writing <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <a
              href={emailComposeHref("Role or project opportunity")}
              target="_blank"
              rel="noreferrer"
              data-conversion="about-contact"
            >
              Discuss an opportunity <Mail size={14} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
