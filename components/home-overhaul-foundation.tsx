import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandLogo, type BrandKey } from "@/components/brand-logo";
import { HeroAmbientField } from "@/components/hero-ambient-field";
import { profile } from "@/data/public";

type BrandSignalData = { name: string; relationship: string; brand: BrandKey; secondaryBrand?: BrandKey };

const experienceSignals: ReadonlyArray<BrandSignalData> = [
  { name: "Network International", relationship: "Employment", brand: "network" },
  { name: "Al Tayseer", relationship: "Employment", brand: "altayseer" },
  { name: "Orcas", relationship: "Teaching", brand: "orcas" },
  { name: "NARSS", relationship: "Internship", brand: "narss" },
  { name: "Zewail City", relationship: "Internship", brand: "zewail" },
];

const learningSignals: ReadonlyArray<BrandSignalData> = [
  { name: "Databricks", relationship: "Credential", brand: "databricks" },
  { name: "McKinsey Forward", relationship: "Credential", brand: "mckinsey" },
  { name: "Canadian International College", relationship: "Education", brand: "cic" },
  { name: "ExploreAI / ALX", relationship: "Scholarship", brand: "exploreai", secondaryBrand: "alx" },
];

const heroRoles = ["Data Engineer", "AI Engineer", "Business Analyst", "Data Analyst"] as const;

export function SystemHero() {
  return (
    <section id="top" className="hero overhaul-hero">
      <HeroAmbientField />
      <div className="overhaul-hero-shell shell">
        <div className="overhaul-hero-meta">
          <span>Data · AI · Product</span>
          <span>Cairo, Egypt</span>
        </div>

        <div className="overhaul-hero-copy">
          <p className="overhaul-hero-index" aria-hidden="true">M7 / 01</p>
          <h1 className="overhaul-hero-title">
            <span className="overhaul-hero-signature">{profile.name}</span>
          </h1>
          <p className="overhaul-hero-roles" aria-label="Professional disciplines">
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

function BrandSignal({ signal }: { signal: BrandSignalData }) {
  return (
    <span className="credibility-item credibility-brand-item" aria-label={`${signal.relationship}: ${signal.name}`}>
      <span className="credibility-brand-marks">
        <BrandLogo brand={signal.brand} />
        {signal.secondaryBrand ? <BrandLogo brand={signal.secondaryBrand} /> : null}
      </span>
      <span className="credibility-brand-copy">
        <small>{signal.relationship}</small>
        <strong>{signal.name}</strong>
      </span>
    </span>
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
        <div className="credibility-track credibility-logo-track">
          <div className="credibility-logo-group">
            <span className="credibility-group">Experience across</span>
            {experienceSignals.map((signal) => <BrandSignal key={signal.name} signal={signal} />)}
          </div>
          <div className="credibility-logo-group credibility-logo-group-learning">
            <span className="credibility-group">Learning &amp; credentials</span>
            {learningSignals.map((signal) => <BrandSignal key={signal.name} signal={signal} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
