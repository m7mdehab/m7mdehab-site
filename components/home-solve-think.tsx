import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const rawSignals = [
  ["SOURCE_01", "fragmented data"],
  ["SOURCE_02", "conflicting definitions"],
  ["QUESTION", "what actually matters?"],
  ["BOUNDARY", "evidence is incomplete"],
] as const;

const outputs = [
  ["MOVE", "validated migration"],
  ["EXPLAIN", "decision-ready analytics"],
  ["PREDICT", "evaluated model"],
  ["GOVERN", "AI workflow with boundaries"],
  ["SHIP", "usable product"],
] as const;

const steps = [
  {
    index: "01",
    verb: "SEE",
    title: "Make the truth visible.",
    detail: "Expose the data, evidence, constraints and unknowns before optimizing around them.",
  },
  {
    index: "02",
    verb: "REDUCE",
    title: "Reduce ambiguity.",
    detail: "Turn fuzzy business questions into explicit mappings, models, decisions and interfaces.",
  },
  {
    index: "03",
    verb: "BUILD",
    title: "Carry the job.",
    detail: "Build the smallest reliable system that can survive real use and real decisions.",
  },
] as const;

function EvidenceGlyph() {
  return (
    <svg className="solve-think-glyph" viewBox="0 0 180 76" aria-hidden="true">
      <g className="solve-think-glyph-noise">
        <circle cx="12" cy="19" r="3" /><circle cx="32" cy="52" r="3" /><circle cx="49" cy="28" r="3" />
        <circle cx="72" cy="61" r="3" /><circle cx="84" cy="15" r="3" /><circle cx="103" cy="43" r="3" />
      </g>
      <path d="M12 65 C48 65, 48 11, 88 11 S128 65, 168 65" />
      <line x1="118" y1="18" x2="168" y2="18" /><line x1="118" y1="31" x2="168" y2="31" />
      <line x1="118" y1="44" x2="168" y2="44" /><line x1="118" y1="57" x2="168" y2="57" />
    </svg>
  );
}

function DecisionGlyph() {
  return (
    <svg className="solve-think-glyph" viewBox="0 0 180 76" aria-hidden="true">
      <path d="M10 38 H46" /><path d="M46 38 C68 38 63 14 88 14 H110" /><path d="M46 38 C68 38 63 62 88 62 H110" />
      <path className="solve-think-glyph-muted" d="M46 38 H110" />
      <rect x="118" y="7" width="50" height="14" rx="2" /><rect className="solve-think-glyph-muted" x="118" y="31" width="50" height="14" rx="2" />
      <rect className="solve-think-glyph-muted" x="118" y="55" width="50" height="14" rx="2" />
      <path d="M131 14 L137 19 L149 8" />
    </svg>
  );
}

function SystemGlyph() {
  return (
    <svg className="solve-think-glyph" viewBox="0 0 180 76" aria-hidden="true">
      <rect x="10" y="11" width="42" height="54" rx="3" /><rect x="69" y="11" width="42" height="54" rx="3" /><rect x="128" y="11" width="42" height="54" rx="3" />
      <path d="M52 38 H69" /><path d="M111 38 H128" />
      <line x1="18" y1="24" x2="43" y2="24" /><line x1="18" y1="34" x2="38" y2="34" /><line x1="18" y1="44" x2="45" y2="44" />
      <polyline points="77,48 83,40 89,43 96,28 103,24" />
      <circle cx="148" cy="38" r="10" /><path d="M143 38 L147 42 L154 33" />
    </svg>
  );
}

const glyphs = [<EvidenceGlyph key="evidence" />, <DecisionGlyph key="decision" />, <SystemGlyph key="system" />] as const;

export function SolveThinkBridge() {
  return (
    <section id="method" className="solve-think" data-solve-think>
      <div className="shell solve-think-shell">
        <header className="solve-think-intro">
          <div>
            <p className="solve-think-eyebrow">How I work · 02</p>
            <h2>I like the <em>messy part.</em></h2>
          </div>
          <div className="solve-think-intro-copy">
            <p>
              The part before the dashboard, model or product, when the question is fuzzy, the data is fragmented and everyone is using a different definition.
            </p>
            <p>
              I do not start with tools. I make the problem legible, reduce ambiguity, then build the smallest reliable system that can carry the job.
            </p>
          </div>
        </header>

        <div className="solve-think-board" aria-label="Problem-to-system transformation">
          <div className="solve-think-raw" aria-label="Typical problem state">
            <div className="solve-think-board-label"><span>INPUT</span><strong>messy reality</strong></div>
            <div className="solve-think-raw-stack">
              {rawSignals.map(([key, value], index) => (
                <div className="solve-think-raw-line" key={key} data-offset={index % 3}>
                  <span>{key}</span><strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="solve-think-noise" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
          </div>

          <div className="solve-think-process">
            {steps.map((step, index) => (
              <article className="solve-think-step" key={step.index}>
                <div className="solve-think-step-head"><span>{step.index}</span><strong>{step.verb}</strong></div>
                {glyphs[index]}
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>

          <div className="solve-think-output" aria-label="Kinds of systems this method produces">
            <div className="solve-think-board-label"><span>OUTPUT</span><strong>reliable system</strong></div>
            <div className="solve-think-output-stack">
              {outputs.map(([verb, label]) => (
                <div key={verb}><span>{verb}</span><strong>{label}</strong></div>
              ))}
            </div>
            <div className="solve-think-status"><i aria-hidden="true" /> decision-ready</div>
          </div>

          <div className="solve-think-flow" aria-hidden="true"><span /><span /><span /></div>
        </div>

        <footer className="solve-think-footer">
          <p><strong>The medium changes.</strong> Migration pipeline, forecast, dashboard, AI workflow or customer-facing product. The operating discipline stays the same.</p>
          <Link href="/work" data-conversion="method-to-work">Inspect the evidence <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </footer>
      </div>
    </section>
  );
}
