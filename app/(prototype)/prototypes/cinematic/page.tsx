/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ProjectVisual } from "@/components/project-visual";
import { profile } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";

const signals = [
  ["Network International", "Employment"],
  ["Al Tayseer", "Employment"],
  ["Orcas", "Teaching"],
  ["NARSS", "Internship"],
  ["Zewail City", "Internship"],
  ["McKinsey Forward", "Credential"],
  ["Udacity / ITIDA", "Credential"],
  ["CIC", "Education"],
  ["ExploreAI / ALX", "Scholarship"],
] as const;

const chartPoints = "18,142 86,126 144,90 204,50 264,35 330,31";

function Navigation() {
  return (
    <nav className="proto-nav" aria-label="Prototype navigation">
      <div className="proto-nav-inner">
        <Link className="proto-mark" href="/prototypes">M7</Link>
        <div className="proto-nav-links">
          <a href="#work">Work</a><a href="#think">How I work</a><a href="#contact">Contact</a><Link href="/prototypes">Directions</Link>
        </div>
      </div>
    </nav>
  );
}

function Rail() {
  const loop = [...signals, ...signals];
  return (
    <div className="cinema-rail-wrap" aria-label="Selected experience and credentials">
      <div className="proto-rail">
        <div className="proto-track">
          {loop.map(([name, relationship], index) => (
            <span className="proto-signal" aria-label={`${relationship}: ${name}`} key={`${name}-${index}`}>
              <small>{relationship}</small>{name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CinematicPrototype() {
  return (
    <main className="proto-page cinema" id="main-content">
      <Navigation />
      <section className="cinema-hero">
        <div className="cinema-grid" aria-hidden="true" /><div className="cinema-glow" aria-hidden="true" />
        <div className="cinema-atlas" aria-label="Project evidence atlas">
          <div className="cinema-orbit" aria-hidden="true" />
          <div className="cinema-chart" aria-label="Forecast calibration motif from Presaira">
            <svg viewBox="0 0 350 180" role="img" aria-label="Probability calibration curve">
              {[40,80,120,160].map((y) => <line key={y} x1="0" x2="350" y1={y} y2={y} />)}
              <polyline points={chartPoints} />
            </svg>
          </div>
          <div className="cinema-sar">
            <img src={projectVisuals["oil-spill-detection"].image} alt="Public Oil Spill Detection SAR case-study evidence" />
          </div>
          <div className="cinema-nodes" aria-label="OpportunityOS architecture stages">
            <span>Discover</span><span>Truth-lock</span><span>Prepare</span><span>Evidence</span><span>Monitor</span><span>Learn</span>
          </div>
        </div>
        <div className="proto-shell">
          <div className="cinema-copy">
            <div className="cinema-kicker proto-eyebrow"><span>Data · AI · Product</span><span>Cairo, Egypt</span></div>
            <h1 className="cinema-title">Mohammed Ehab <em>ElNomany</em></h1>
            <p className="cinema-lead">{profile.proposition}</p>
            <div className="proto-actions"><a className="proto-button" href="#work">Explore selected work ↘</a><a className="proto-button" href={`mailto:${profile.email}`}>Discuss an opportunity ↗</a></div>
          </div>
        </div>
      </section>
      <Rail />
      <section className="cinema-work proto-shell" id="work">
        <div className="cinema-work-head"><p className="proto-eyebrow">Selected work · 01</p><h2>Proof should feel like entering the <span className="proto-serif">system</span>, not reading a project summary.</h2></div>
        <article className="cinema-stage">
          <div className="cinema-project-copy">
            <p className="proto-eyebrow">Probabilistic forecasting · public product</p>
            <strong>Presaira</strong>
            <p>A full-tournament forecasting system covering all 104 matches, reproducible model evaluation and a 50,000-iteration Monte Carlo simulation.</p>
            <div className="cinema-proof"><span>104 matches</span><span>50k Monte Carlo</span><span>Calibration evidence</span></div>
            <div className="proto-actions" style={{marginTop: "26px"}}><Link className="proto-button" href="/work/presaira">Open case study ↗</Link></div>
          </div>
          <div className="cinema-stage-visual"><ProjectVisual slug="presaira" /></div>
        </article>
      </section>
      <section className="cinema-think proto-shell" id="think">
        <div><p className="proto-eyebrow">How I work · 02</p><h2>Make the <span className="proto-serif">truth</span> visible before making the system clever.</h2></div>
        <div className="cinema-flow">
          <article><b>01 / SEE</b><h3>Make the truth visible.</h3><p>Expose the data, constraints, evidence and unknowns before optimizing around them.</p></article>
          <article><b>02 / REDUCE</b><h3>Reduce ambiguity.</h3><p>Turn messy requirements into explicit mappings, models, decisions and interfaces.</p></article>
          <article><b>03 / BUILD</b><h3>Carry the job.</h3><p>Build the smallest reliable system that can survive real use and real decisions.</p></article>
        </div>
      </section>
      <section className="cinema-cta proto-shell" id="contact">
        <p className="proto-eyebrow">Opportunity · 03</p><h2>Have a difficult problem worth <span className="proto-serif">solving?</span></h2>
        <div className="proto-actions"><a className="proto-button" href={`mailto:${profile.email}`}>Email Mohammed ↗</a><a className="proto-button" href={profile.linkedin}>LinkedIn ↗</a></div>
      </section>
    </main>
  );
}
