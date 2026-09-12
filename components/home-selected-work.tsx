import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { projects } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";

const presaira = projects.find((project) => project.slug === "presaira")!;
const opportunity = projects.find((project) => project.slug === "opportunityos")!;
const ghareeb = projects.find((project) => project.slug === "ghareeb-oglu")!;

const opportunityStages = projectVisuals.opportunityos.stages.filter((stage) =>
  ["Discover", "Truth-lock", "Prepare", "Monitor", "Learn"].includes(stage),
);

export function SelectedWorkGallery() {
  return (
    <section id="work" className="selected-work" data-selected-work>
      <div className="shell selected-work-shell">
        <header className="selected-work-intro">
          <div>
            <p className="selected-work-eyebrow">Selected work · 01</p>
            <h2>Three entrances into the work. <em>Different evidence, same standard.</em></h2>
          </div>
          <div className="selected-work-intro-copy">
            <p>
              The homepage keeps only three flagship systems in view. Each one carries a different kind of proof and opens into a full case study when more detail is useful.
            </p>
            <Link href="/work">Browse all six projects <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
        </header>

        <div className="selected-work-gallery">
          <Link
            className="selected-work-card selected-work-feature"
            href={`/work/${presaira.slug}`}
            data-project-slug={presaira.slug}
            data-conversion="selected-work-to-case-study"
          >
            <div className="selected-work-feature-visual">
              <ProjectVisual slug="presaira" />
            </div>
            <div className="selected-work-card-copy">
              <div className="selected-work-card-meta"><span>01</span><span>{presaira.kicker}</span></div>
              <h3>{presaira.title}</h3>
              <p>{presaira.statement}</p>
              <div className="selected-work-proof"><span>{presaira.proof}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
            </div>
          </Link>

          <Link
            className="selected-work-card selected-work-system"
            href={`/work/${opportunity.slug}`}
            data-project-slug={opportunity.slug}
            data-conversion="selected-work-to-case-study"
          >
            <div className="selected-work-system-top">
              <div className="selected-work-card-meta"><span>02</span><span>{opportunity.kicker}</span></div>
              <ArrowUpRight size={18} aria-hidden="true" />
            </div>
            <div className="selected-work-system-map" aria-label="OpportunityOS public-safe governed workflow">
              {opportunityStages.map((stage, index) => (
                <span key={stage}><i aria-hidden="true">0{index + 1}</i>{stage}</span>
              ))}
            </div>
            <div className="selected-work-card-copy selected-work-card-copy-compact">
              <h3>{opportunity.title}</h3>
              <p>{opportunity.statement}</p>
              <span className="selected-work-boundary">Public-safe architecture · truth and provenance constrain action</span>
            </div>
          </Link>

          <Link
            className="selected-work-card selected-work-commerce"
            href={`/work/${ghareeb.slug}`}
            data-project-slug={ghareeb.slug}
            data-conversion="selected-work-to-case-study"
          >
            <div className="selected-work-commerce-head">
              <div className="selected-work-card-meta"><span>03</span><span>{ghareeb.kicker}</span></div>
              <ArrowUpRight size={18} aria-hidden="true" />
            </div>
            <div className="selected-work-browser" aria-label="Ghareeb Oglu public-safe commerce journey">
              <div className="selected-work-browser-bar"><span /><span /><span /><strong>ghareeboglu.com</strong></div>
              <div className="selected-work-browser-body">
                <p>Browse to fulfillment.</p>
                <div>
                  {projectVisuals["ghareeb-oglu"].stages.map((stage, index) => (
                    <span key={stage}><i aria-hidden="true">0{index + 1}</i>{stage}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="selected-work-card-copy selected-work-card-copy-compact">
              <h3>{ghareeb.title}</h3>
              <p>{ghareeb.statement}</p>
              <span className="selected-work-boundary">Public-safe commerce flow · protected brand imagery remains unpublished</span>
            </div>
          </Link>
        </div>

        <div className="selected-work-footer">
          <span>3 shown · 6 public case studies</span>
          <Link href="/work">All work <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
