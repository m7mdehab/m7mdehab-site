import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HeroAmbientField } from "@/components/hero-ambient-field";
import { experience, profile } from "@/data/public";

const experienceSignals = [
  { name: "Network International", relationship: "Employment" },
  { name: "Al Tayseer", relationship: "Employment" },
  { name: "Orcas", relationship: "Teaching" },
  { name: "NARSS", relationship: "Internship" },
  { name: "Zewail City", relationship: "Internship" },
] as const;

const learningSignals = [
  { name: "Databricks", relationship: "Credential" },
  { name: "McKinsey Forward", relationship: "Credential" },
  { name: "Canadian International College", relationship: "Education" },
  { name: "ExploreAI / ALX", relationship: "Scholarship" },
] as const;

const heroRoles = experience.slice(0, 3).map((item) => item.role);

export function SystemHero() {
  return (
    <section id="top" className="hero overhaul-hero">
      <div className="overhaul-hero-shell shell">
        <HeroAmbientField />

        <div className="overhaul-hero-meta">
          <span>Data · AI · Product</span>
          <span>Cairo, Egypt</span>
        </div>

        <div className="overhaul-hero-copy">
          <p className="overhaul-hero-index" aria-hidden="true">M7 / 01</p>
          <h1 className="overhaul-hero-title">
            <span className="overhaul-hero-signature">{profile.name}</span>
          </h1>
          <p className="overhaul-hero-roles" aria-label="Current and previous roles">
            {heroRoles.map((role) => <span key={role}>{role}</span>)}
          </p>
          <p className="overhaul-hero-proposition">{profile.proposition}</p>
          <div className="overhaul-hero-actions">
            <a className="overhaul-action overhaul-action-primary" href="#work">
              Explore selected work <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <a className="overhaul-action overhaul-action-secondary" href={`mailto:${profile.email}`} data-conversion="hero-contact">
              Discuss an opportunity <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function RailSequence({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="credibility-sequence" aria-hidden={duplicate ? "true" : undefined}>
      <span className="credibility-group">Experience across</span>
      {experienceSignals.map((signal) => (
        <span
          className="credibility-item"
          aria-label={`${signal.relationship}: ${signal.name}`}
          key={`experience-${signal.name}`}
        >
          <small>{signal.relationship}</small>
          <strong>{signal.name}</strong>
        </span>
      ))}
      <span className="credibility-group">Learning &amp; credentials</span>
      {learningSignals.map((signal) => (
        <span
          className="credibility-item"
          aria-label={`${signal.relationship}: ${signal.name}`}
          key={`learning-${signal.name}`}
        >
          <small>{signal.relationship}</small>
          <strong>{signal.name}</strong>
        </span>
      ))}
    </div>
  );
}

export function CredibilityRail() {
  return (
    <section className="credibility-rail" aria-label="Selected experience, education and credentials">
      <div className="credibility-rail-label shell">
        <p>Credibility, compressed.</p>
        <Link href="/about">Full background <ArrowUpRight size={13} aria-hidden="true" /></Link>
      </div>
      <div className="credibility-viewport" tabIndex={0} aria-label="Selected professional and learning relationships">
        <div className="credibility-track">
          <RailSequence />
          <RailSequence duplicate />
        </div>
      </div>
    </section>
  );
}
