import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandLogo, type BrandKey } from "@/components/brand-logo";
import { HeroAmbientField } from "@/components/hero-ambient-field";
import { emailComposeHref } from "@/data/contact-links";
import { profile } from "@/data/public";
import { cleanPublicText } from "@/data/public-surface";

type BrandSignalData = { name: string; detail: string; brand: BrandKey; secondaryBrand?: BrandKey };

const credibilitySignals: ReadonlyArray<BrandSignalData> = [
  { name: "Network International", detail: "Data engineering & migration", brand: "network" },
  { name: "Al Tayseer", detail: "Business analysis & reporting", brand: "altayseer" },
  { name: "Orcas", detail: "Computer science & data tutoring", brand: "orcas" },
  { name: "NARSS", detail: "Data & machine learning", brand: "narss" },
  { name: "Zewail City", detail: "Machine learning", brand: "zewail" },
  { name: "Databricks", detail: "Data Engineer Associate", brand: "databricks" },
  { name: "McKinsey Forward", detail: "Foundation & Advanced", brand: "mckinsey" },
  { name: "Canadian International College", detail: "BSc Computer Science · Data Science", brand: "cic" },
  { name: "ExploreAI / ALX", detail: "Data Science & AI Scholarship", brand: "exploreai", secondaryBrand: "alx" },
];

const heroRoles = ["Data Engineer", "AI Engineer", "Business Analyst", "Data Analyst"] as const;

export function SystemHero() {
  return (
    <section id="top" className="hero overhaul-hero">
      <HeroAmbientField />
      <div className="overhaul-hero-shell shell">
        <div className="overhaul-hero-copy">
          <h1 className="overhaul-hero-title">
            <span className="overhaul-hero-signature">{cleanPublicText(profile.name)}</span>
          </h1>
          <p className="overhaul-hero-roles" aria-label="Professional disciplines">
            {heroRoles.map((role) => <span key={role}>{role}</span>)}
          </p>
          <p className="overhaul-hero-proposition">{cleanPublicText(profile.proposition)}</p>
          <div className="overhaul-hero-actions">
            <a className="overhaul-action overhaul-action-primary" href="#work">
              Explore selected work <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <a
              className="overhaul-action overhaul-action-secondary"
              href={emailComposeHref("Role or project opportunity")}
              target="_blank"
              rel="noreferrer"
              data-conversion="hero-contact"
            >
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
    <span
      className="credibility-item credibility-brand-item"
      aria-label={`${signal.name}: ${signal.detail}`}
      data-brand-card={signal.brand}
    >
      <span className="credibility-brand-marks" aria-hidden="true">
        <BrandLogo brand={signal.brand} mode="native" />
        {signal.secondaryBrand ? <BrandLogo brand={signal.secondaryBrand} mode="native" /> : null}
      </span>
      <span className="credibility-brand-copy">
        <strong>{signal.name}</strong>
        <small>{signal.detail}</small>
      </span>
    </span>
  );
}

function CredibilitySequence({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="credibility-sequence credibility-logo-sequence" aria-hidden={duplicate ? "true" : undefined}>
      {credibilitySignals.map((signal) => <BrandSignal key={signal.name} signal={signal} />)}
    </div>
  );
}

export function CredibilityRail() {
  return (
    <section className="credibility-rail" aria-label="Selected experience, education and credentials">
      <div className="credibility-rail-label shell">
        <p>Experience & credentials</p>
        <Link href="/about">View background <ArrowUpRight size={13} aria-hidden="true" /></Link>
      </div>
      <div className="credibility-viewport" tabIndex={0} aria-label="Selected professional and learning relationships">
        <div className="credibility-track credibility-logo-track">
          <CredibilitySequence />
          <CredibilitySequence duplicate />
        </div>
      </div>
    </section>
  );
}
