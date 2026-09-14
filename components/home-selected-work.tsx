"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProjectVisual } from "@/components/project-visual";
import { projects } from "@/data/public";
import { cleanPublicText } from "@/data/public-surface";

const AUTO_SCROLL_MS = 7000;

export function SelectedWorkGallery() {
  const [active, setActive] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cycle, setCycle] = useState(0);
  const paused = interactionPaused || userPaused;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % projects.length);
    }, AUTO_SCROLL_MS);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, cycle]);

  const move = (direction: -1 | 1) => {
    setActive((index) => (index + direction + projects.length) % projects.length);
    setCycle((value) => value + 1);
  };

  const activeProject = projects[active];

  return (
    <section id="work" className="selected-work" data-selected-work>
      <div className="shell selected-work-shell">
        <header className="selected-work-intro">
          <div>
            <p className="selected-work-eyebrow">Selected work</p>
            <h2>Different problems. <em>One standard.</em></h2>
          </div>
          <div className="selected-work-intro-copy">
            <p>
              Forecasting, governed AI, commerce, computer vision, geospatial systems and product delivery, each shown through the evidence that best explains the work.
            </p>
            <Link href="/work">Open the work index <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
        </header>

        <div
          className={`selected-work-carousel${paused ? " is-paused" : ""}`}
          data-active-project={activeProject.slug}
          data-active-tone={activeProject.tone}
          onMouseEnter={() => setInteractionPaused(true)}
          onMouseLeave={() => setInteractionPaused(false)}
          onFocusCapture={() => setInteractionPaused(true)}
          onBlurCapture={() => setInteractionPaused(false)}
        >
          <div className="selected-work-carousel-status" aria-live={paused || reducedMotion ? "polite" : "off"}>
            <span>{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            <div className="selected-work-carousel-progress" aria-hidden="true">
              <span
                key={`${active}-${cycle}`}
                className="selected-work-carousel-progress-fill"
                style={{ animationDuration: `${AUTO_SCROLL_MS}ms` }}
              />
            </div>
            {reducedMotion ? (
              <span className="selected-work-carousel-mode">Manual</span>
            ) : (
              <button
                className="selected-work-carousel-pause"
                type="button"
                aria-pressed={userPaused}
                aria-label={userPaused ? "Resume project autoplay" : "Pause project autoplay"}
                onClick={() => setUserPaused((value) => !value)}
              >
                {userPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
                <span>{userPaused ? "Resume" : "Pause"}</span>
              </button>
            )}
          </div>

          <div className="selected-work-carousel-window">
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
                  aria-hidden={index !== active}
                  key={project.slug}
                >
                  <Link
                    className="selected-work-carousel-card"
                    href={`/work/${project.slug}`}
                    data-conversion="selected-work-to-case-study"
                    tabIndex={index === active ? 0 : -1}
                    aria-label={`Open ${cleanPublicText(project.title)} case study`}
                  >
                    <div className="selected-work-carousel-visual">
                      <ProjectVisual slug={project.slug} />
                    </div>
                    <div className="selected-work-carousel-copy">
                      <div className="selected-work-carousel-meta">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span>{cleanPublicText(project.kicker)}</span>
                      </div>
                      <h3>{cleanPublicText(project.title)}</h3>
                      <p>{cleanPublicText(project.statement)}</p>
                      <div className="selected-work-carousel-proof">
                        <span>{cleanPublicText(project.proof)}</span>
                        <ArrowUpRight size={18} aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <button className="selected-work-carousel-control selected-work-carousel-prev" type="button" onClick={() => move(-1)} aria-label="Previous project">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button className="selected-work-carousel-control selected-work-carousel-next" type="button" onClick={() => move(1)} aria-label="Next project">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
