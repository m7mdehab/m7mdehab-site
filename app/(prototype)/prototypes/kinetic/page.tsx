import Link from "next/link";
import { ProjectVisual } from "@/components/project-visual";
import { emailComposeHref } from "@/data/contact-links";
import { profile } from "@/data/public";

const signals = [
  ["Network International", "Employment"], ["Al Tayseer", "Employment"], ["Orcas", "Teaching"], ["NARSS", "Internship"],
  ["Zewail City", "Internship"], ["McKinsey Forward", "Credential"], ["Udacity / ITIDA", "Credential"], ["CIC", "Education"], ["ExploreAI / ALX", "Scholarship"],
] as const;

function Navigation() {
  return <nav className="proto-nav" aria-label="Prototype navigation"><div className="proto-nav-inner"><Link className="proto-mark" href="/prototypes">M7</Link><div className="proto-nav-links"><a href="#work">Work</a><a href="#think">How I work</a><a href="#contact">Contact</a><Link href="/prototypes">Directions</Link></div></div></nav>;
}

function Rail() {
  return <div className="kinetic-rail-wrap"><div className="proto-rail" aria-label="Selected experience, education and credentials"><div className="proto-track">{[...signals,...signals].map(([name,relationship],i)=><span className="proto-signal" aria-label={`${relationship}: ${name}`} key={`${name}-${i}`}><small>{relationship}</small>{name}</span>)}</div></div></div>;
}

export default function KineticPrototype() {
  return (
    <main className="proto-page kinetic" id="main-content">
      <Navigation />
      <section className="kinetic-hero proto-shell">
        <div className="kinetic-title">
          <p className="proto-eyebrow">Data · AI · Product · Cairo</p>
          <h1>Mohammed Ehab <em>ElNomany</em></h1>
          <p>{profile.proposition}</p>
          <div className="proto-actions"><a className="proto-button" href="#work">Selected work ↘</a><a className="proto-button" href={emailComposeHref("Role or project opportunity")} target="_blank" rel="noreferrer">Discuss an opportunity ↗</a></div>
        </div>
        <div className="kinetic-panel" aria-label="Presaira probability evidence panel">
          <div className="kinetic-panel-top"><span className="kinetic-panel-tag">Presaira · live forecasting product</span><svg viewBox="0 0 520 300" role="img" aria-label="Probability calibration curve"><line x1="20" x2="500" y1="245" y2="245"/><line x1="20" x2="500" y1="185" y2="185"/><line x1="20" x2="500" y1="125" y2="125"/><line x1="20" x2="500" y1="65" y2="65"/><polyline points="30,236 118,220 196,175 282,92 374,58 468,52"/></svg></div>
          <div className="kinetic-panel-bottom"><strong>104 matches.</strong><span>Forecasting, calibration and a 50,000-iteration Monte Carlo simulation condensed into one evidence surface rather than a paragraph wall.</span></div>
        </div>
      </section>
      <Rail />
      <section className="kinetic-work proto-shell" id="work">
        <div className="kinetic-work-head"><h2>Work first. <span className="proto-serif">Details on demand.</span></h2><p className="proto-eyebrow">Three selected projects · 01</p></div>
        <Link className="kinetic-project" href="/work/presaira"><span className="kinetic-project-index">01 / FORECAST</span><div><h3>Presaira</h3><p>Probabilistic forecasting product · public calibration and simulation evidence.</p></div><div className="kinetic-project-visual"><ProjectVisual slug="presaira" /></div></Link>
        <Link className="kinetic-project" href="/work/opportunityos"><span className="kinetic-project-index">02 / GOVERN</span><div><h3>OpportunityOS</h3><p>Governed autonomous-agent workflow · provenance and controlled generation.</p></div><div className="kinetic-project-visual"><ProjectVisual slug="opportunityos" /></div></Link>
        <Link className="kinetic-project" href="/work/oil-spill-detection"><span className="kinetic-project-index">03 / DETECT</span><div><h3>Oil Spill Detection</h3><p>Sentinel-1 semantic segmentation · real case-study imagery and evaluation.</p></div><div className="kinetic-project-visual"><ProjectVisual slug="oil-spill-detection" /></div></Link>
      </section>
      <section className="kinetic-think proto-shell" id="think"><div><p className="proto-eyebrow">What I solve · 02</p><h2>Not a skill list. A repeatable way to move from <span className="proto-serif">mess</span> to a reliable system.</h2></div><div className="kinetic-steps"><article className="kinetic-step"><b>01</b><h3>Make the truth visible.</h3><p>Map the actual data, evidence, constraints and unknowns.</p></article><article className="kinetic-step"><b>02</b><h3>Reduce ambiguity.</h3><p>Translate fuzzy business questions into explicit technical decisions.</p></article><article className="kinetic-step"><b>03</b><h3>Build what carries the job.</h3><p>Ship the smallest reliable product, pipeline, model or interface that survives real use.</p></article></div></section>
      <section className="kinetic-cta proto-shell" id="contact"><div><p className="proto-eyebrow">Opportunity · 03</p><h2>Role, project or system problem <span className="proto-serif">worth discussing?</span></h2></div><div className="proto-actions"><a className="proto-button" href={emailComposeHref("Role or project opportunity")} target="_blank" rel="noreferrer">Email ↗</a><a className="proto-button" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div></section>
    </main>
  );
}
