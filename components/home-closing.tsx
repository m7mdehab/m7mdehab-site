"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTimedCarousel } from "@/components/use-timed-carousel";
import { emailComposeHref } from "@/data/contact-links";
import { profile } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";
import type { WritingArticle } from "@/data/writing";
import { OpportunityPaths } from "@/components/opportunity-paths";

const calibration = projectVisuals.presaira.reliability;
const calibrationPoints = calibration
  .map(({ predicted, observed }) => {
    const x = 20 + predicted * 250;
    const y = 145 - observed * 112;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  })
  .join(" ");

function ForecastNoteVisual() {
  return (
    <div
      className="closing-note-visual closing-note-forecast"
      aria-label="Presaira probability calibration evidence"
    >
      <div className="closing-note-visual-head">
        <span>FORECAST / CALIBRATION</span>
        <strong>104 / 104</strong>
      </div>
      <svg
        viewBox="0 0 290 165"
        role="img"
        aria-label="Observed outcomes compared with forecast probabilities"
      >
        <line
          className="closing-note-reference"
          x1="20"
          x2="270"
          y1="145"
          y2="33"
        />
        {[48, 80, 112, 145].map((y) => (
          <line
            className="closing-note-guide"
            key={y}
            x1="20"
            x2="270"
            y1={y}
            y2={y}
          />
        ))}
        <polyline className="closing-note-curve" points={calibrationPoints} />
        {calibration.map(({ predicted, observed }) => (
          <circle
            key={`${predicted}-${observed}`}
            cx={20 + predicted * 250}
            cy={145 - observed * 112}
            r="4"
          />
        ))}
      </svg>
      <div className="closing-note-proof">
        <span>Proper scoring</span>
        <span>Coverage</span>
        <span>Reliability</span>
      </div>
    </div>
  );
}

function OilNoteVisual() {
  const visual = projectVisuals["oil-spill-detection"];
  return (
    <div
      className="closing-note-visual closing-note-oil"
      aria-label="Oil Spill Detection SAR evidence"
    >
      <img
        src={visual.image}
        alt={visual.imageAlt}
        width={1024}
        height={640}
        loading="lazy"
      />
      <div className="closing-note-oil-overlay" aria-hidden="true" />
      <div className="closing-note-visual-head">
        <span>SAR / SEGMENTATION</span>
        <strong>Oil IoU 0.566</strong>
      </div>
      <div className="closing-note-proof">
        <span>Recall 0.764</span>
        <span>5 classes</span>
        <span>Sentinel-1</span>
      </div>
    </div>
  );
}

function noteVisual(article: WritingArticle) {
  if (article.projectSlug === "presaira") return <ForecastNoteVisual />;
  if (article.projectSlug === "oil-spill-detection") return <OilNoteVisual />;
  return null;
}

export function HomeClosing({
  articles,
}: {
  articles: readonly WritingArticle[];
}) {
  const featured = [
    articles.find(
      (article) => article.slug === "when-to-trust-a-probabilistic-forecast",
    ),
    articles.find(
      (article) =>
        article.slug === "why-accuracy-is-not-enough-for-oil-spill-detection",
    ),
  ].filter((article): article is WritingArticle => Boolean(article));
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
  } = useTimedCarousel(featured.length);
  const notesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = notesRef.current;
    if (!root) return;
    let settleTimer = 0;
    const syncActive = () => {
      const bounds = root.getBoundingClientRect();
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>(".closing-note"),
      );
      const mostVisible = cards
        .map((card) => {
          const rect = card.getBoundingClientRect();
          const visible = Math.max(
            0,
            Math.min(rect.right, bounds.right) -
              Math.max(rect.left, bounds.left),
          );
          return { card, ratio: visible / Math.max(rect.width, 1) };
        })
        .sort((a, b) => b.ratio - a.ratio)[0]?.card;
      const index = cards.indexOf(mostVisible as HTMLElement);
      if (index >= 0) setActive(index);
    };
    const onScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(syncActive, 120);
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      root.removeEventListener("scroll", onScroll);
      window.clearTimeout(settleTimer);
    };
  }, [setActive]);

  useEffect(() => {
    const card =
      notesRef.current?.querySelectorAll<HTMLElement>(".closing-note")[active];
    if (!card) return;
    const root = notesRef.current;
    const left =
      root && card
        ? card.getBoundingClientRect().left -
          root.getBoundingClientRect().left +
          root.scrollLeft
        : 0;
    root?.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, [active]);

  return (
    <>
      <section id="writing" className="closing-thinking">
        <div className="shell closing-thinking-shell">
          <header className="closing-heading">
            <div>
              <h2>What the work taught me.</h2>
            </div>
            <div className="closing-heading-side">
              <p>Evidence-backed notes from the work.</p>
              <Link href="/writing">
                All writing <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </header>

          <div
            className="closing-notes"
            ref={(element) => {
              notesRef.current = element;
              rootRef.current = element;
            }}
            role="region"
            aria-label="Featured writing"
            tabIndex={0}
            data-carousel-paused={paused ? "true" : undefined}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocusCapture={onFocusCapture}
            onBlurCapture={onBlurCapture}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            {featured.map((article, index) => (
              <Link
                key={article.slug}
                className="closing-note"
                href={`/writing/${article.slug}`}
                data-authority-link="article"
                aria-hidden={index !== active}
                tabIndex={index === active ? 0 : -1}
                data-note-slide={index}
              >
                {noteVisual(article)}
                <div className="closing-note-copy">
                  <div className="closing-note-meta">
                    <span>{article.topic}</span>
                    <span>{article.readingMinutes} min</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <span className="closing-note-action">
                    Read the field note{" "}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div
            className="carousel-dots"
            role="group"
            aria-label="Writing slides"
          >
            {featured.map((article, index) => (
              <button
                key={article.slug}
                type="button"
                className={`carousel-dot${index === active ? " is-active" : ""}`}
                aria-label={`Go to article ${index + 1} of ${featured.length}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => setActive(index)}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="closing-opportunity">
        <div className="shell closing-opportunity-shell">
          <header className="closing-opportunity-head">
            <h2>Choose the right conversation.</h2>
          </header>

          <OpportunityPaths />
        </div>
      </section>

      <footer className="closing-directory">
        <div className="shell closing-directory-grid">
          <Link
            className="closing-directory-mark"
            href="/#top"
            aria-label="M7 — back to top"
          >
            M7
          </Link>

          <nav className="closing-directory-nav" aria-label="Footer directory">
            <Link href="/#work">Work</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/writing">Writing</Link>
          </nav>

          <div className="closing-directory-end">
            <div className="closing-directory-icons" aria-label="Contact links">
              <a
                href={emailComposeHref()}
                target="_blank"
                rel="noreferrer"
                aria-label={`Email ${profile.name}`}
                data-conversion="footer-email"
              >
                <Mail size={16} aria-hidden="true" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${profile.name} on LinkedIn`}
              >
                <Linkedin size={16} aria-hidden="true" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${profile.name} on GitHub`}
              >
                <Github size={16} aria-hidden="true" />
              </a>
            </div>
            <p>
              © {new Date().getFullYear()} · Built as a living professional web
              identity.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
