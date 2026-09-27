"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const rawSignals = [
  ["", "Fragmented data"],
  ["", "Conflicting definitions"],
  ["", "What matters?"],
  ["", "Incomplete evidence"],
] as const;

const outputs = [
  ["", "Validated migration"],
  ["", "Decision-ready analytics"],
  ["", "Evaluated model"],
  ["", "Bounded AI workflow"],
  ["", "Usable product"],
] as const;

const steps = [
  {
    verb: "SEE",
    title: "Make the truth visible.",
    detail: "Expose the evidence, constraints and unknowns.",
  },
  {
    verb: "REDUCE",
    title: "Reduce ambiguity.",
    detail:
      "Turn fuzzy questions into explicit mappings, models and decisions.",
  },
  {
    verb: "BUILD",
    title: "Carry the job.",
    detail: "Build the smallest reliable system that can survive real use.",
  },
] as const;

function EvidenceGlyph() {
  return (
    <svg className="solve-think-glyph" viewBox="0 0 180 76" aria-hidden="true">
      <g className="solve-think-glyph-noise">
        <circle cx="12" cy="19" r="3" />
        <circle cx="32" cy="52" r="3" />
        <circle cx="49" cy="28" r="3" />
        <circle cx="72" cy="61" r="3" />
        <circle cx="84" cy="15" r="3" />
        <circle cx="103" cy="43" r="3" />
      </g>
      <path d="M12 65 C48 65, 48 11, 88 11 S128 65, 168 65" />
      <line x1="118" y1="18" x2="168" y2="18" />
      <line x1="118" y1="31" x2="168" y2="31" />
      <line x1="118" y1="44" x2="168" y2="44" />
      <line x1="118" y1="57" x2="168" y2="57" />
    </svg>
  );
}

function DecisionGlyph() {
  return (
    <svg className="solve-think-glyph" viewBox="0 0 180 76" aria-hidden="true">
      <path d="M10 38 H46" />
      <path d="M46 38 C68 38 63 14 88 14 H110" />
      <path d="M46 38 C68 38 63 62 88 62 H110" />
      <path className="solve-think-glyph-muted" d="M46 38 H110" />
      <rect x="118" y="7" width="50" height="14" rx="2" />
      <rect
        className="solve-think-glyph-muted"
        x="118"
        y="31"
        width="50"
        height="14"
        rx="2"
      />
      <rect
        className="solve-think-glyph-muted"
        x="118"
        y="55"
        width="50"
        height="14"
        rx="2"
      />
      <path d="M131 14 L137 19 L149 8" />
    </svg>
  );
}

function SystemGlyph() {
  return (
    <svg className="solve-think-glyph" viewBox="0 0 180 76" aria-hidden="true">
      <rect x="10" y="11" width="42" height="54" rx="3" />
      <rect x="69" y="11" width="42" height="54" rx="3" />
      <rect x="128" y="11" width="42" height="54" rx="3" />
      <path d="M52 38 H69" />
      <path d="M111 38 H128" />
      <line x1="18" y1="24" x2="43" y2="24" />
      <line x1="18" y1="34" x2="38" y2="34" />
      <line x1="18" y1="44" x2="45" y2="44" />
      <polyline points="77,48 83,40 89,43 96,28 103,24" />
      <circle cx="148" cy="38" r="10" />
      <path d="M143 38 L147 42 L154 33" />
    </svg>
  );
}

const glyphs = [
  <EvidenceGlyph key="evidence" />,
  <DecisionGlyph key="decision" />,
  <SystemGlyph key="system" />,
] as const;

export function SolveThinkBridge() {
  const [activeStep, setActiveStep] = useState(0);
  const [mobileEnhanced, setMobileEnhanced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const sync = () => setMobileEnhanced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const selectStep = (index: number) =>
    setActiveStep((index + steps.length) % steps.length);

  return (
    <section id="method" className="solve-think" data-solve-think>
      <div className="shell solve-think-shell">
        <header className="solve-think-intro">
          <div>
            <h2>I like the messy part.</h2>
          </div>
          <div className="solve-think-intro-copy">
            <p>
              The part before the dashboard, model or product — when the
              question is fuzzy, data is fragmented and definitions conflict. I
              make the problem legible, reduce ambiguity, then build the
              smallest reliable system that can carry the job.
            </p>
          </div>
        </header>

        <div
          className="solve-think-board"
          aria-label="Problem-to-system transformation"
        >
          <div className="solve-think-raw" aria-label="Typical problem state">
            <div className="solve-think-board-label">
              <span>INPUT</span>
              <strong>messy reality</strong>
            </div>
            <div className="solve-think-raw-stack">
              {rawSignals.map(([, value], index) => (
                <div
                  className="solve-think-raw-line"
                  key={value}
                  data-offset={index % 3}
                >
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="solve-think-noise" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div
            className={`solve-think-process${mobileEnhanced ? " is-mobile-enhanced" : ""}`}
          >
            <div
              className="solve-think-step-tabs"
              role="tablist"
              aria-label="How I work"
            >
              {steps.map((step, index) => (
                <button
                  id={`method-tab-${step.verb.toLowerCase()}`}
                  key={step.verb}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === index}
                  aria-controls={`method-panel-${step.verb.toLowerCase()}`}
                  tabIndex={activeStep === index ? 0 : -1}
                  onClick={() => selectStep(index)}
                  onKeyDown={(event) => {
                    let next: number | null = null;
                    if (event.key === "ArrowRight")
                      next = (activeStep + 1) % steps.length;
                    if (event.key === "ArrowLeft")
                      next = (activeStep - 1 + steps.length) % steps.length;
                    if (event.key === "Home") next = 0;
                    if (event.key === "End") next = steps.length - 1;
                    if (next !== null) {
                      event.preventDefault();
                      selectStep(next);
                      document
                        .getElementById(
                          `method-tab-${steps[next].verb.toLowerCase()}`,
                        )
                        ?.focus();
                    }
                  }}
                >
                  {step.verb}
                </button>
              ))}
            </div>
            {steps.map((step, index) => (
              <div
                className={`solve-think-step${activeStep === index ? " is-active" : ""}`}
                id={`method-panel-${step.verb.toLowerCase()}`}
                role={mobileEnhanced ? "tabpanel" : undefined}
                aria-labelledby={
                  mobileEnhanced
                    ? `method-tab-${step.verb.toLowerCase()}`
                    : undefined
                }
                aria-hidden={mobileEnhanced && activeStep !== index}
                key={step.verb}
              >
                {glyphs[index]}
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>

          <div
            className="solve-think-output"
            aria-label="Kinds of systems this method produces"
          >
            <div className="solve-think-board-label">
              <span>OUTPUT</span>
              <strong>reliable system</strong>
            </div>
            <div className="solve-think-output-stack">
              {outputs.map(([, label]) => (
                <div key={label}>
                  <strong>{label}</strong>
                </div>
              ))}
            </div>
            <div className="solve-think-status">
              <i aria-hidden="true" /> decision-ready
            </div>
          </div>

          <div className="solve-think-flow" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <footer className="solve-think-footer">
          <p>Different medium. Same operating discipline.</p>
          <Link href="/work" data-conversion="method-to-work">
            Inspect the evidence <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </section>
  );
}
