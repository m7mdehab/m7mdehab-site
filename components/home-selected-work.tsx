"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { PresairaArtboard } from "@/components/presaira-artboard";
import { OpportunityOsArtboard } from "@/components/opportunityos-artboard";
import { GhareebOgluArtboard } from "@/components/ghareeb-oglu-artboard";
import { OilSpillArtboard } from "@/components/oil-spill-artboard";
import { SolarArtboard } from "@/components/solar-artboard";
import { MakhbazyArtboard } from "@/components/makhbazy-artboard";
import type { ArtboardDebugMode, ProjectSlug } from "@/data/selected-work-artboards";
import { useTimedCarousel } from "@/components/use-timed-carousel";
import { selectedWorkProjects } from "@/data/home-selected-work";

export function SelectedWorkGallery() {
  const [mobileLayout, setMobileLayout] = useState(false);
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
  const windowRef = useRef<HTMLDivElement>(null);
  const {
    active,
    setActive,
    paused,
    rootRef,
    onMouseEnter,
    onMouseLeave,
    onFocusCapture,
    onBlurCapture,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
  } = useTimedCarousel(selectedWorkProjects.length);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const syncLayout = () => setMobileLayout(media.matches);
    syncLayout();
    media.addEventListener("change", syncLayout);
    const root = windowRef.current;
    if (!root) return () => media.removeEventListener("change", syncLayout);
    const syncActive = () => {
      const bounds = root.getBoundingClientRect();
      const slides = Array.from(
        root.querySelectorAll<HTMLElement>("[data-project-slug]"),
      );
      const mostVisible = slides
        .map((slide) => {
          const rect = slide.getBoundingClientRect();
          const visible = Math.max(
            0,
            Math.min(rect.right, bounds.right) -
              Math.max(rect.left, bounds.left),
          );
          return { slide, ratio: visible / Math.max(rect.width, 1) };
        })
        .sort((a, b) => b.ratio - a.ratio)[0]?.slide;
      const index = selectedWorkProjects.findIndex(
        (project) => project.slug === mostVisible?.dataset.projectSlug,
      );
      if (index >= 0) setActive(index);
    };
    let settleTimer = 0;
    const onScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(syncActive, 650);
    };
    const onScrollEnd = () => {
      window.clearTimeout(settleTimer);
      syncActive();
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("scrollend", onScrollEnd);
    return () => {
      root.removeEventListener("scroll", onScroll);
      root.removeEventListener("scrollend", onScrollEnd);
      window.clearTimeout(settleTimer);
      media.removeEventListener("change", syncLayout);
    };
  }, [setActive]);

  useEffect(() => {
    if (!mobileLayout) return;
    const root = windowRef.current;
    const target = root?.querySelector<HTMLElement>(
      `[data-project-slug="${selectedWorkProjects[active].slug}"]`,
    );
    if (!root || !target) return;
    const left =
      target.getBoundingClientRect().left -
      root.getBoundingClientRect().left +
      root.scrollLeft;
    root.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, [active, mobileLayout]);

  const activeProject = selectedWorkProjects[active];
  const goTo = (index: number) => {
    setActive(index);
    if (window.matchMedia("(max-width: 700px)").matches) {
      const target = windowRef.current?.querySelector<HTMLElement>(
        `[data-project-slug="${selectedWorkProjects[index].slug}"]`,
      );
      const root = windowRef.current;
      const left =
        root && target
          ? target.getBoundingClientRect().left -
            root.getBoundingClientRect().left +
            root.scrollLeft
          : 0;
      root?.scrollTo({
        left,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  };

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
            ref={windowRef}
            tabIndex={0}
            aria-label="Selected projects"
          >
            <div
              className="selected-work-carousel-track"
              data-carousel-track
              style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
            >
              {selectedWorkProjects.map((project, index) => (
                <article
                  className="selected-work-carousel-slide selected-work-carousel-slide-artboard"
                  data-project-slug={project.slug}
                  data-tone={project.tone}
                  aria-hidden={!mobileLayout && index !== active}
                  key={project.slug}
                >
                  <Link
                    className="selected-work-carousel-card"
                    href={`/work/${project.slug}`}
                    data-conversion="selected-work-to-case-study"
                    tabIndex={mobileLayout || index === active ? 0 : -1}
                    aria-label={`Open ${project.title} case study`}
                  >
                    <div className="selected-work-carousel-visual selected-work-carousel-artboard" data-evidence-region>
                      {project.slug === "presaira" ? <PresairaArtboard debugMode={debugProject === project.slug ? artboardDebug?.mode : undefined} showGrid={debugProject === project.slug && artboardDebug?.grid} /> : null}
                      {project.slug === "opportunityos" ? <OpportunityOsArtboard debugMode={debugProject === project.slug ? artboardDebug?.mode : undefined} showGrid={debugProject === project.slug && artboardDebug?.grid} /> : null}
                      {project.slug === "ghareeb-oglu" ? <GhareebOgluArtboard debugMode={debugProject === project.slug ? artboardDebug?.mode : undefined} showGrid={debugProject === project.slug && artboardDebug?.grid} /> : null}
                      {project.slug === "oil-spill-detection" ? <OilSpillArtboard debugMode={debugProject === project.slug ? artboardDebug?.mode : undefined} showGrid={debugProject === project.slug && artboardDebug?.grid} /> : null}
                      {project.slug === "solar-site-selection" ? <SolarArtboard debugMode={debugProject === project.slug ? artboardDebug?.mode : undefined} showGrid={debugProject === project.slug && artboardDebug?.grid} /> : null}
                      {project.slug === "makhbazy" ? <MakhbazyArtboard debugMode={debugProject === project.slug ? artboardDebug?.mode : undefined} showGrid={debugProject === project.slug && artboardDebug?.grid} /> : null}
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
                onClick={() => goTo(index)}
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
