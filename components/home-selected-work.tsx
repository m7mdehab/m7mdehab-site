"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProjectVisual } from "@/components/project-visual";
import { useTimedCarousel } from "@/components/use-timed-carousel";
import { projects } from "@/data/public";

export function SelectedWorkGallery() {
  const [mobileLayout, setMobileLayout] = useState(false);
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
  } = useTimedCarousel(projects.length);

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
      const index = projects.findIndex(
        (project) => project.slug === mostVisible?.dataset.projectSlug,
      );
      if (index >= 0) setActive(index);
    };
    let settleTimer = 0;
    const onScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(syncActive, 120);
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      root.removeEventListener("scroll", onScroll);
      window.clearTimeout(settleTimer);
      media.removeEventListener("change", syncLayout);
    };
  }, [setActive]);

  useEffect(() => {
    if (!mobileLayout) return;
    const root = windowRef.current;
    const target = root?.querySelector<HTMLElement>(
      `[data-project-slug="${projects[active].slug}"]`,
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

  const activeProject = projects[active];
  const goTo = (index: number) => {
    setActive(index);
    if (window.matchMedia("(max-width: 700px)").matches) {
      const target = windowRef.current?.querySelector<HTMLElement>(
        `[data-project-slug="${projects[index].slug}"]`,
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
              Six ways into the work.
              <br />
              One standard.
            </h2>
          </div>
          <div className="selected-work-intro-copy">
            <p>
              Six public projects. One evidence-led route into each case study.
            </p>
            <Link href="/work">
              Open the work index <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
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
              {projects.map((project, index) => (
                <article
                  className="selected-work-carousel-slide"
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
                    <div className="selected-work-carousel-visual">
                      <ProjectVisual slug={project.slug} />
                    </div>
                    <div className="selected-work-carousel-copy">
                      <div className="selected-work-carousel-meta">
                        <span>{project.kicker}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.statement}</p>
                      <div className="selected-work-carousel-proof">
                        <span>{project.proof}</span>
                        <ArrowUpRight size={18} aria-hidden="true" />
                      </div>
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
            {projects.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                className={`carousel-dot${index === active ? " is-active" : ""}`}
                aria-label={`Go to project ${index + 1} of ${projects.length}`}
                aria-current={index === active ? "true" : undefined}
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
