"use client";

import Link from "next/link";
import { useSyncExternalStore, type CSSProperties } from "react";
import { PresairaArtboard } from "@/components/presaira-artboard";
import { OpportunityOsArtboard } from "@/components/opportunityos-artboard";
import { GhareebOgluArtboard } from "@/components/ghareeb-oglu-artboard";
import { OilSpillArtboard } from "@/components/oil-spill-artboard";
import { SolarArtboard } from "@/components/solar-artboard";
import { MakhbazyArtboard } from "@/components/makhbazy-artboard";
import type { ArtboardDebugMode, ProjectSlug } from "@/data/selected-work-artboards";
import { useSelectedWorkCarousel } from "@/components/use-selected-work-carousel";
import { selectedWorkProjects } from "@/data/home-selected-work";

export function SelectedWorkGallery() {
  const search = useSyncExternalStore(
    (notify) => {
      window.addEventListener("popstate", notify);
      return () => window.removeEventListener("popstate", notify);
    },
    () => window.location.search,
    () => "",
  );
  const debugParams = new URLSearchParams(search);
  const requestedProject = debugParams.get("cardDebug");
  const requestedMode = debugParams.get("view");
  const debugProject = process.env.NODE_ENV === "development" && selectedWorkProjects.some((project) => project.slug === requestedProject)
    ? (requestedProject as ProjectSlug)
    : null;
  const artboardDebug = debugProject
    ? {
        mode: (requestedMode === "reference" || requestedMode === "overlay" ? requestedMode : "code") as ArtboardDebugMode,
        grid: debugParams.get("grid") === "1",
      }
    : null;
  const {
    active,
    select,
    paused,
    rootRef,
    viewportRef,
    api,
    onMouseEnter,
    onMouseLeave,
    onFocusCapture,
    onBlurCapture,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
  } = useSelectedWorkCarousel();

  const activeProject = selectedWorkProjects[active];
  return (
    <section id="work" className="selected-work" data-selected-work>
      <div className="shell selected-work-shell">
        <header className="selected-work-intro">
          <div>
            <h2>
              Six projects.
              <br />
              One standard.
            </h2>
          </div>
          <div className="selected-work-intro-copy">
            <p className="selected-work-intro-desktop">
              Each project opens to a full case study with inspectable evidence.
            </p>
            <p className="selected-work-intro-mobile">
              Each project is backed by a full case study and inspectable evidence.
            </p>
            <Link href="/work">View all work ↗</Link>
          </div>
        </header>

        <div
          className="selected-work-carousel"
          ref={rootRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocusCapture={onFocusCapture}
          onBlurCapture={onBlurCapture}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          data-active-project={activeProject.slug}
          data-active-tone={activeProject.tone}
          data-carousel-paused={paused ? "true" : undefined}
        >
          <div
            className="selected-work-carousel-window"
            ref={viewportRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected projects"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") api?.scrollNext();
              if (event.key === "ArrowLeft") api?.scrollPrev();
            }}
          >
            <div
              className="selected-work-carousel-track"
              data-carousel-track
            >
              {selectedWorkProjects.map((project, index) => (
                <article
                  className="selected-work-carousel-slide selected-work-carousel-slide-artboard"
                  data-project-slug={project.slug}
                  data-tone={project.tone}
                  aria-hidden={index !== active}
                  key={project.slug}
                >
                  <Link
                    className="selected-work-carousel-card"
                    href={`/work/${project.slug}`}
                    data-conversion="selected-work-to-case-study"
                    tabIndex={index === active ? 0 : -1}
                    aria-label={`Open ${project.title} case study`}
                  >
                    <div className="selected-work-carousel-visual selected-work-carousel-artboard" data-evidence-region>
                      {project.slug === "presaira" ? <PresairaArtboard debugMode={debugProject === project.slug ? artboardDebug?.mode : undefined} showGrid={debugProject === project.slug && artboardDebug?.grid} isActive={index === active} transitionEnabled={index === active && !debugProject} /> : null}
                      {project.slug === "opportunityos" ? <OpportunityOsArtboard debugMode={debugProject === project.slug ? artboardDebug?.mode : undefined} showGrid={debugProject === project.slug && artboardDebug?.grid} isActive={index === active} transitionEnabled={index === active && !debugProject} /> : null}
                      {project.slug === "ghareeb-oglu" ? <GhareebOgluArtboard debugMode={debugProject === project.slug ? artboardDebug?.mode : undefined} showGrid={debugProject === project.slug && artboardDebug?.grid} isActive={index === active} transitionEnabled={index === active && !debugProject} /> : null}
                      {project.slug === "oil-spill-detection" ? <OilSpillArtboard debugMode={debugProject === project.slug ? artboardDebug?.mode : undefined} showGrid={debugProject === project.slug && artboardDebug?.grid} isActive={index === active} transitionEnabled={index === active && !debugProject} /> : null}
                      {project.slug === "solar-site-selection" ? <SolarArtboard debugMode={debugProject === project.slug ? artboardDebug?.mode : undefined} showGrid={debugProject === project.slug && artboardDebug?.grid} isActive={index === active} transitionEnabled={index === active && !debugProject} /> : null}
                      {project.slug === "makhbazy" ? <MakhbazyArtboard debugMode={debugProject === project.slug ? artboardDebug?.mode : undefined} showGrid={debugProject === project.slug && artboardDebug?.grid} isActive={index === active} transitionEnabled={index === active && !debugProject} /> : null}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
          <div
            className="carousel-dots"
            role="group"
            aria-label="Project slides"
          >
            {selectedWorkProjects.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                className={`carousel-dot${index === active ? " is-active" : ""}`}
                aria-label={`Go to project ${index + 1} of ${selectedWorkProjects.length}`}
                aria-current={index === active ? "step" : undefined}
                style={index === active ? { "--carousel-progress": "0%" } as CSSProperties : undefined}
                onClick={() => select(index)}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
