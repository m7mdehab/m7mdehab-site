/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ProjectVisual } from "@/components/project-visual";
import { profile } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";

const signals = [
  ["Network International", "Employment"], ["Al Tayseer", "Employment"], ["Orcas", "Teaching"],
  ["NARSS", "Internship"], ["Zewail City", "Internship"], ["McKinsey Forward", "Credential"],
  ["Udacity / ITIDA", "Credential"], ["Canadian International College", "Education"], ["ExploreAI / ALX", "Scholarship"],
] as const;

function Navigation() {
  return <nav className="proto-nav" aria-label="Prototype navigation"><div className="proto-nav-inner"><Link className="proto-mark" href="/prototypes">M7</Link><div className="proto-nav-links"><a href="#work">Work</a><a href="#think">Method</a><a href="#contact">Contact</a><Link href="/prototypes">Directions</Link></div></div></nav>;
}

function Rail() {
  return <div className="spatial-rail-wrap"><div className="proto-rail" aria-label="Selected professional signals"><div className="proto-track">{[...signals,...signals].map(([name,relationship],i)=><span className="proto-signal" aria-label={`${relationship}: ${name}`} key={`${name}-${i}`}><small>{relationship}</small>{name}</span>)}</div></div></div>;
}

export default function SpatialPrototype() {
  return (
    <main className="proto-page spatial" id="main-content">
      <Navigation />
      <section className="spatial-hero">
        <div className="proto-shell">
          <div className="spatial-title">
            <p className="proto-eyebrow">Mohammed Ehab ElNomany · Cairo</p>
            <h1>Business problems, <em>technical evidence.</em></h1>
            <p>{profile.proposition} The work below is treated like evidence in an exhibition: inspectable, distinct and deliberately incomplete until you choose to enter it.</p>
            <div className="proto-actions"><a className="proto-button" href="#work">Enter the work ↘</a><a className="proto-button" href={`mailto:${profile.email}`}>Discuss an opportunity ↗</a></div>
          </div>
          <span className="spatial-caption">Selected evidence / 2026</span>
          <div className="spatial-canvas" aria-label="Spatial composition of real project evidence">
            <div className="spatial-card a"><img src={projectVisuals["oil-spill-detection"].image} alt="Oil Spill Detection SAR evidence" /></div>
            <div className="spatial-card b"><svg viewBox="0 0 340 210" role="img" aria-label="Presaira calibration motif"><polyline points="20,160 82,148 135,112 190,64 250,44 320,38" /></svg></div>
            <div className="spatial-card c" aria-label="OpportunityOS stage fragments"><span>01 Discover</span><span>04 Score</span><span>05 Truth-lock</span><span>07 Monitor</span></div>
          </div>
        </div>
      </section>
      <Rail />
      <section className="spatial-work proto-shell" id="work">
        <div className="spatial-work-top"><h2>Three entrances into the work. <span className="proto-serif">No six-card wall.</span></h2><p className="proto-eyebrow">Selected work · 01</p></div>
        <div className="spatial-gallery">
          <Link className="spatial-tile hero" href="/work/oil-spill-detection">
            <div><ProjectVisual slug="oil-spill-detection" /></div>
            <div className="spatial-tile-copy"><small>SAR computer vision · inspectable public evidence</small><h3>Oil Spill Detection</h3><p>Sentinel-1 semantic segmentation with model evaluation, georeferenced outputs and a public case-study trail.</p></div>
          </Link>
          <Link className="spatial-tile spatial-secondary dark" href="/work/opportunityos"><p className="proto-eyebrow">Governed AI · 02</p><div><h3>OpportunityOS</h3><p>Truth-locked autonomous-agent workflow where provenance constrains what the system can say and do.</p></div></Link>
          <Link className="spatial-tile spatial-secondary gold" href="/work/solar-site-selection"><p className="proto-eyebrow">Geospatial decision system · 03</p><div><h3>Solar Site Selection</h3><p>Public geodata, AHP criteria and suitability mapping turned into ranked siting decisions.</p></div></Link>
        </div>
      </section>
      <section className="spatial-think proto-shell" id="think">
        <div className="spatial-think-copy"><p className="proto-eyebrow">Working method · 02</p><h2>From messy edges to a system people can <span className="proto-serif">trust.</span></h2><p>Capabilities are not a chip list here. They are the repeated transformation underneath very different work: expose the evidence, reduce ambiguity, then ship the smallest reliable system that carries the decision.</p></div>
        <div className="spatial-map" aria-label="Problem-to-system transformation diagram"><span className="step one">01 · Make truth visible</span><span className="wire w1" aria-hidden="true" /><span className="step two">02 · Reduce ambiguity</span><span className="wire w2" aria-hidden="true" /><span className="step three">03 · Build what carries the job</span></div>
      </section>
      <section className="spatial-cta proto-shell" id="contact"><div><p className="proto-eyebrow">Opportunity · 03</p><h2>Worth solving? <span className="proto-serif">Let&apos;s inspect it together.</span></h2></div><div className="proto-actions"><a className="proto-button" href={`mailto:${profile.email}`}>Email ↗</a><a className="proto-button" href={profile.linkedin}>LinkedIn ↗</a></div></section>
    </main>
  );
}
