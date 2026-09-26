"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProjectVisual } from "@/components/project-visual";
import { projects } from "@/data/public";

export function SelectedWorkGallery() {
  const [active, setActive] = useState(0);
  const [mobileLayout, setMobileLayout] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const syncLayout = () => setMobileLayout(media.matches);
    syncLayout();
    media.addEventListener("change", syncLayout);
    const root = windowRef.current;
    if (!root) return () => media.removeEventListener("change", syncLayout);
    const slides = Array.from(
      root.querySelectorAll<HTMLElement>("[data-project-slug]"),
    );
    const observer = new IntersectionObserver(
      () => {
        const mostVisible = slides
          .map((slide) => {
            const rect = slide.getBoundingClientRect();
            const visible = Math.max(
              0,
              Math.min(rect.right, root.getBoundingClientRect().right) -
                Math.max(rect.left, root.getBoundingClientRect().left),
            );
            return { slide, ratio: visible / Math.max(rect.width, 1) };
          })
          .sort((a, b) => b.ratio - a.ratio)[0]?.slide;
        const slug = mostVisible?.getAttribute("data-project-slug");
        const index = projects.findIndex((project) => project.slug === slug);
        if (index >= 0) setActive(index);
      },
      { root, threshold: [0.5, 0.65, 0.8] },
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => {
      observer.disconnect();
      media.removeEventListener("change", syncLayout);
    };
  }, []);

  const move = (direction: -1 | 1) => {
    const next = Math.max(0, Math.min(projects.length - 1, active + direction));
    if (next === active) return;
    const target = windowRef.current?.querySelector<HTMLElement>(
      `[data-project-slug="${projects[next].slug}"]`,
    );
    if (window.matchMedia("(max-width: 700px)").matches) {
      windowRef.current?.scrollTo({
        left: target?.offsetLeft ?? 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
    setActive(next);
  };

  const activeProject = projects[active];

  return (
    <section id="work" className="selected-work" data-selected-work>
      <div className="shell selected-work-shell">
        <header className="selected-work-intro">
          <div>
            <p className="selected-work-eyebrow">Selected work · 01</p>
            <h2>
              Six ways into the work. <em>One standard.</em>
            </h2>
          </div>
          <div className="selected-work-intro-copy">
            <p>
              Six public projects, viewed one at a time. Each card carries one
              project, one evidence language and one route into the full case
              study.
            </p>
            <Link href="/work">
              Open the work index <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </header>

        <div
          className="selected-work-carousel"
          data-active-project={activeProject.slug}
          data-active-tone={activeProject.tone}
        >
          <div className="selected-work-carousel-status" aria-live="polite">
            <span>
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
            <div className="selected-work-carousel-progress" aria-hidden="true">
              <span
                className="selected-work-carousel-progress-fill"
                style={{
                  transform: `scaleX(${(active + 1) / projects.length})`,
                }}
              />
            </div>
            <span className="selected-work-carousel-mode">Swipe to browse</span>
          </div>

          <div
            className="selected-work-carousel-window"
            ref={windowRef}
            tabIndex={0}
            aria-label="Selected projects. Use the previous and next project buttons to browse."
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
                        <span>{String(index + 1).padStart(2, "0")}</span>
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
            className="selected-work-carousel-controls"
            aria-label="Project navigation"
          >
            <button
              className="selected-work-carousel-control"
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous project"
              disabled={mobileLayout && active === 0}
            >
            <ChevronLeft aria-hidden="true" />
          </button>
            <button
              className="selected-work-carousel-control"
              type="button"
              onClick={() => move(1)}
              aria-label="Next project"
              disabled={mobileLayout && active === projects.length - 1}
            >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
        </div>

        <div className="selected-work-footer">
          <span>6 projects · 6 public case studies</span>
          <Link href="/work">
            All work <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
