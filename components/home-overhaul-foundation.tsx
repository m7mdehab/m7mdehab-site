/* eslint-disable @next/next/no-img-element */
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";

const experienceSignals = [
  { name: "Network International", relationship: "Employment" },
  { name: "Al Tayseer", relationship: "Employment" },
  { name: "Orcas", relationship: "Teaching" },
  { name: "NARSS", relationship: "Internship" },
  { name: "Zewail City", relationship: "Internship" },
] as const;

const learningSignals = [
  { name: "McKinsey Forward", relationship: "Credential" },
  { name: "Udacity / ITIDA", relationship: "Credential" },
  { name: "Canadian International College", relationship: "Education" },
  { name: "ExploreAI / ALX", relationship: "Scholarship" },
] as const;

const calibration = projectVisuals.presaira.reliability;
const chartPoints = calibration
  .map(({ predicted, observed }) => {
    const x = 18 + predicted * 284;
    const y = 160 - observed * 132;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  })
  .join(" ");

function EvidenceAtlas() {
  return (
    <div className="hero-evidence-atlas" aria-label="Evidence atlas from Mohammed's public project work">
      <div className="atlas-grid" aria-hidden="true" />

      <figure className="atlas-panel atlas-forecast">
        <figcaption>
          <span>Presaira</span>
          <strong>Calibration</strong>
        </figcaption>
        <svg viewBox="0 0 320 180" role="img" aria-label="Presaira post-event probability calibration evidence">
          <line className="atlas-axis" x1="18" x2="302" y1="160" y2="28" />
          {[52, 88, 124, 160].map((y) => (
            <line className="atlas-guide" key={y} x1="18" x2="302" y1={y} y2={y} />
          ))}
          <polyline className="atlas-curve" points={chartPoints} />
          {calibration.map(({ predicted, observed }, index) => (
            <circle
              className="atlas-point"
              key={`${predicted}-${observed}`}
              cx={18 + predicted * 284}
              cy={160 - observed * 132}
              r={index === calibration.length - 1 ? 5 : 4}
            />
          ))}
        </svg>
        <div className="atlas-proof" aria-label="Presaira evidence summary">
          <span>104 matches</span>
          <span>50k Monte Carlo</span>
        </div>
      </figure>

      <figure className="atlas-panel atlas-sar">
        <img
          src={projectVisuals["oil-spill-detection"].image}
          alt={projectVisuals["oil-spill-detection"].imageAlt}
        />
        <figcaption>
          <span>Oil Spill Detection</span>
          <strong>Sentinel-1 · SAR</strong>
        </figcaption>
      </figure>

      <div className="atlas-panel atlas-system" aria-label="OpportunityOS governed workflow evidence">
        <div className="atlas-system-head">
          <span>OpportunityOS</span>
          <strong>Truth constrains action</strong>
        </div>
        <div className="atlas-stages">
          {projectVisuals.opportunityos.stages
            .filter((stage) => ["Discover", "Truth-lock", "Prepare", "Monitor", "Learn"].includes(stage))
            .map((stage, index) => (
              <span key={stage}><i aria-hidden="true">0{index + 1}</i>{stage}</span>
            ))}
        </div>
      </div>

      <div className="atlas-coordinate atlas-coordinate-a" aria-hidden="true">PROBABILITY / EVIDENCE</div>
      <div className="atlas-coordinate atlas-coordinate-b" aria-hidden="true">SYSTEM / DECISION</div>
    </div>
  );
}

export function SystemHero() {
  return (
    <section id="top" className="hero overhaul-hero">
      <div className="overhaul-hero-shell shell">
        <div className="overhaul-hero-meta">
          <span>Data · AI · Product</span>
          <span>Cairo, Egypt</span>
        </div>

        <EvidenceAtlas />

        <div className="overhaul-hero-copy">
          <p className="overhaul-hero-index" aria-hidden="true">M7 / 01</p>
          <h1 className="overhaul-hero-title">Mohammed Ehab <em className="display-script">ElNomany</em></h1>
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

        <div className="overhaul-hero-route" aria-hidden="true">
          <span>Forecast</span><span>Govern</span><span>Detect</span><span>Decide</span>
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
        <Link href="/#about">Full background <ArrowUpRight size={13} aria-hidden="true" /></Link>
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
