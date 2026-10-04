import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Mail } from "lucide-react";
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

function SectionHead({
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
      <div className="about-v2-section-label">
        <span>{index}</span>
        <p>{eyebrow}</p>
      </div>
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
  return (
    <BrandLogo
      brand={brand}
      className={`about-v2-logo${className ? ` ${className}` : ""}`}
    />
  );
}

function organizationMarkName(name: string) {
  return name === "Guksu" || name === "Egyptian African Trade"
    ? "Al Tayseer Group"
    : name;
}

export function AboutPage() {
  return (
    <main id="main-content" className="about-page about-v2">
      <section className="about-hero about-v2-hero">
        <div className="shell">
          <Reveal className="about-v2-topline">
            <span>About · Professional history</span>
            <Link href="/">
              Back home <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </Reveal>

          <div className="about-v2-hero-grid">
            <Reveal className="about-v2-hero-title">
              <p className="about-v2-kicker">The through-line</p>
              <h1>{aboutIntro.headline}</h1>
            </Reveal>

            <Reveal delay={0.06} className="about-v2-intro">
              <p>{aboutIntro.body}</p>

              <div className="about-v2-current" aria-label="Current role">
                <div>
                  <span>Now</span>
                  <strong>{aboutIntro.currentRole}</strong>
                  <p>{aboutIntro.currentEmployer}</p>
                </div>
                <OrganizationMark
                  name={aboutIntro.currentEmployer}
                  className="about-v2-logo-current"
                />
              </div>

              <div className="about-v2-facts" aria-label="Profile details">
                <span>{aboutIntro.location}</span>
                <span>{aboutIntro.languages}</span>
              </div>

              <div className="about-v2-hero-actions">
                <a href="#career">
                  Experience <ArrowDownRight size={15} aria-hidden="true" />
                </a>
                <Link href="/work">
                  Selected work <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="about-v2-throughline" aria-label="Professional through-line">
            {["Migration", "Analytics", "ML / AI", "Product"].map((item, index) => (
              <span key={item}>
                <small>0{index + 1}</small>
                {item}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="career" className="about-career about-v2-career">
        <div className="shell">
          <SectionHead
            index="01"
            eyebrow="Experience"
            title="One direction of travel."
            copy="The roles changed. The work kept moving toward systems where data quality, technical judgment and business decisions have to survive contact with one another."
          />

          <div className="about-v2-timeline">
            {primaryExperience.map((item, index) => (
              <Reveal
                as="article"
                key={`${item.company}-${item.role}`}
                delay={index * 0.035}
                className={`about-v2-role${index === 0 ? " is-current" : ""}`}
              >
                <div className="about-v2-role-time">
                  <span>{item.period}</span>
                  <small>{item.mode}</small>
                </div>

                <div className="about-v2-role-name">
                  <h3>{item.role}</h3>
                  <div className="about-v2-orgline">
                    <strong>{item.company}</strong>
                    <OrganizationMark name={organizationMarkName(item.company)} />
                  </div>
                </div>

                <div className="about-v2-role-copy">
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

      <section className="about-v2-side">
        <div className="shell">
          <SectionHead
            index="02"
            eyebrow="Alongside & earlier"
            title="The main lane is not the whole story."
            copy="Teaching, client work and early technical placements added different kinds of practice without needing to compete with the primary career timeline."
          />

          <div className="about-v2-side-grid">
            <div className="about-v2-lane">
              <p className="about-v2-lane-label">Alongside the main role</p>
              {parallelExperience.map((item, index) => (
                <Reveal
                  as="article"
                  key={item.company}
                  delay={index * 0.04}
                  className="about-v2-side-row"
                >
                  <div className="about-v2-side-meta">
                    <span>{item.period}</span>
                    <OrganizationMark name={item.company} />
                  </div>
                  <h3>{item.role}</h3>
                  <strong>{item.company}</strong>
                  <p>{item.summary}</p>
                </Reveal>
              ))}
            </div>

            <div className="about-v2-lane">
              <p className="about-v2-lane-label">Earlier technical foundation</p>
              {earlyExperience.map((item, index) => (
                <Reveal
                  as="article"
                  key={item.company}
                  delay={index * 0.035}
                  className="about-v2-side-row about-v2-side-row-compact"
                >
                  <div className="about-v2-side-meta">
                    <span>{item.period}</span>
                    <OrganizationMark name={item.company} />
                  </div>
                  <h3>{item.role}</h3>
                  <strong>{item.company}</strong>
                  <p>{item.summary}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-learning about-v2-learning">
        <div className="shell">
          <SectionHead
            index="03"
            eyebrow="Education & credentials"
            title="Foundation first. Expansion where it matters."
            copy="Formal study establishes the base; later credentials document targeted depth rather than becoming a wall of badges."
          />

          <div className="about-v2-learning-grid">
            <div className="about-v2-ledger">
              <p className="about-v2-ledger-label">Education</p>
              {aboutEducation.map((item) => (
                <Reveal as="article" key={item.qualification} className="about-v2-ledger-row">
                  <span className="about-v2-ledger-year">{item.period}</span>
                  <div className="about-v2-ledger-main">
                    <h3>{item.qualification}</h3>
                    <p>{item.institution}</p>
                  </div>
                  <strong className="about-v2-ledger-detail">{item.detail}</strong>
                  <OrganizationMark name={item.institution} className="about-v2-logo-ledger" />
                </Reveal>
              ))}
            </div>

            <div className="about-v2-ledger">
              <p className="about-v2-ledger-label">Credentials</p>
              {aboutCertifications.map((item) => (
                <Reveal as="article" key={item.name} className="about-v2-ledger-row about-v2-credential">
                  <span className="about-v2-ledger-year">{item.year}</span>
                  <div className="about-v2-ledger-main">
                    <h3>{item.name}</h3>
                    <p>{item.issuer}</p>
                  </div>
                  <OrganizationMark name={item.issuer} className="about-v2-logo-ledger" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-stack about-v2-stack">
        <div className="shell">
          <SectionHead
            index="04"
            eyebrow="Operating stack"
            title="Tools grouped by the problems they help solve."
            copy="The useful signal is the combination of domains: data, platforms, programming, analytics, AI and delivery."
          />

          <div className="about-v2-stack-grid">
            {aboutSkillGroups.map((group, index) => (
              <Reveal
                as="article"
                key={group.title}
                delay={index * 0.025}
                className="about-v2-stack-group"
              >
                <div className="about-v2-stack-head">
                  <span>0{index + 1}</span>
                  <h3>{group.title}</h3>
                </div>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-principles about-v2-principles">
        <div className="shell">
          <SectionHead
            index="05"
            eyebrow="How I work"
            title="A few rules I keep returning to."
          />

          <div className="about-v2-principles-grid">
            {workingPrinciples.map((principle, index) => (
              <Reveal
                as="article"
                key={principle.title}
                delay={index * 0.045}
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

      <section className="about-close about-v2-close">
        <div className="shell about-v2-close-grid">
          <Reveal className="about-v2-close-copy">
            <p className="about-v2-kicker">Next</p>
            <h2>The background is context. The work is the proof.</h2>
            <p>Choose the route that matches what you are evaluating.</p>
          </Reveal>

          <Reveal delay={0.05} className="about-v2-close-links">
            <Link href="/work">
              Selected work <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/services">
              Service context <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/writing">
              Writing <ArrowRight size={15} aria-hidden="true" />
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
      </section>
    </main>
  );
}
