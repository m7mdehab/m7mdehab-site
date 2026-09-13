import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandLogo, type BrandKey } from "@/components/brand-logo";
import { HeroAmbientField } from "@/components/hero-ambient-field";
import { emailComposeHref } from "@/data/contact-links";
import { profile } from "@/data/public";

type BrandSignalData = { name: string; detail: string; brand: BrandKey; secondaryBrand?: BrandKey };

const experienceSignals: ReadonlyArray<BrandSignalData> = [
  { name: "Network International", detail: "Data Engineer", brand: "network" },
  { name: "Al Tayseer", detail: "Business Analyst", brand: "altayseer" },
  { name: "Orcas", detail: "Computer Science & Data Tutor", brand: "orcas" },
  { name: "NARSS", detail: "Data / ML Intern", brand: "narss" },
  { name: "Zewail City", detail: "ML Intern", brand: "zewail" },
];

const learningSignals: ReadonlyArray<BrandSignalData> = [
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
    <span className="credibility-item credibility-brand-item" aria-label={`${signal.name}: ${signal.detail}`}>
      <span className="credibility-brand-marks">
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
      <div className="credibility-logo-group">
        <span className="credibility-group">Experience across</span>
        {experienceSignals.map((signal) => <BrandSignal key={signal.name} signal={signal} />)}
      </div>
      <div className="credibility-logo-group credibility-logo-group-learning">
        <span className="credibility-group">Learning &amp; credentials</span>
        {learningSignals.map((signal) => <BrandSignal key={signal.name} signal={signal} />)}
      </div>
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
        <div className="credibility-track credibility-logo-track">
          <CredibilitySequence />
          <CredibilitySequence duplicate />
        </div>
      </div>
    </section>
  );
}
