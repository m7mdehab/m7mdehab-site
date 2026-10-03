/* eslint-disable @next/next/no-img-element */
import { projectVisuals } from "@/data/project-visuals";
import type { WritingArticle, WritingCover as WritingCoverSpec } from "@/data/writing";

function ForecastCover({ alt, decorative }: { alt: string; decorative: boolean }) {
  const points = projectVisuals.presaira.reliability
    .map(({ predicted, observed }) => `${(24 + predicted * 252).toFixed(1)},${(142 - observed * 112).toFixed(1)}`)
    .join(" ");
  return (
    <div className="writing-system-cover writing-system-cover-forecast" aria-hidden={decorative || undefined} role={decorative ? undefined : "img"} aria-label={decorative ? undefined : alt}>
      <svg viewBox="0 0 300 160" aria-hidden="true" focusable="false">
        <line className="writing-system-forecast-reference" x1="24" y1="142" x2="276" y2="18" />
        {[48, 80, 112, 142].map((y) => <line className="writing-system-forecast-guide" key={y} x1="24" x2="276" y1={y} y2={y} />)}
        <polyline className="writing-system-forecast-curve" points={points} />
        {projectVisuals.presaira.reliability.map(({ predicted, observed }) => (
          <circle key={`${predicted}-${observed}`} cx={24 + predicted * 252} cy={142 - observed * 112} r="4" />
        ))}
      </svg>
    </div>
  );
}

function OilCover({ loading, alt }: { loading: "lazy" | "eager"; alt: string }) {
  const visual = projectVisuals["oil-spill-detection"];
  return (
    <div className="writing-system-cover writing-system-cover-oil">
      <img src={visual.image} alt={alt} width={1024} height={640} loading={loading} fetchPriority={loading === "eager" ? "high" : "auto"} />
    </div>
  );
}

function AgentCover({ alt, decorative }: { alt: string; decorative: boolean }) {
  return (
    <div className="writing-system-cover writing-system-cover-agent" aria-hidden={decorative || undefined} role={decorative ? undefined : "img"} aria-label={decorative ? undefined : alt}>
      <svg viewBox="0 0 360 160" aria-hidden="true" focusable="false">
        <path className="writing-system-agent-wire" d="M58 80 C96 80 96 45 132 45 M58 80 C96 80 96 115 132 115" />
        <path className="writing-system-agent-wire-active" d="M202 80 H246 M300 80 H332" />
        <rect className="writing-system-agent-node" x="16" y="58" width="72" height="44" rx="8" />
        <text x="52" y="77" textAnchor="middle">SOURCE</text><text className="writing-system-agent-small" x="52" y="90" textAnchor="middle">evidence</text>
        <rect className="writing-system-agent-node" x="126" y="25" width="78" height="40" rx="8" />
        <text x="165" y="50" textAnchor="middle">KNOWN</text>
        <rect className="writing-system-agent-node" x="126" y="95" width="78" height="40" rx="8" />
        <text x="165" y="120" textAnchor="middle">UNKNOWN</text>
        <circle className="writing-system-agent-active" cx="273" cy="80" r="27" />
        <text x="273" y="77" textAnchor="middle">CLAIM</text><text className="writing-system-agent-small" x="273" y="90" textAnchor="middle">traceable</text>
        <rect className="writing-system-agent-active" x="322" y="55" width="34" height="50" rx="7" />
        <text transform="rotate(-90 339 80)" x="339" y="83" textAnchor="middle" className="writing-system-agent-authority">AUTHORITY</text>
      </svg>
    </div>
  );
}

export function WritingCover({ cover, title, loading = "lazy", decorative = false }: { cover: WritingCoverSpec; title: string; loading?: "lazy" | "eager"; decorative?: boolean }) {
  if (cover.kind === "image") {
    return <div className="writing-system-cover"><img src={cover.src} alt={decorative ? "" : cover.alt} width={1200} height={675} loading={loading} fetchPriority={loading === "eager" ? "high" : "auto"} /></div>;
  }
  switch (cover.visual) {
    case "forecast-calibration": return <ForecastCover alt={cover.alt} decorative={decorative} />;
    case "oil-sar": return <OilCover loading={loading} alt={decorative ? "" : cover.alt} />;
    case "agent-provenance": return <AgentCover alt={cover.alt} decorative={decorative} />;
  }
  return <div className="writing-system-cover" role="img" aria-label={title} />;
}

export function ArticleCover({ article }: { article: WritingArticle }) {
  return <WritingCover cover={article.cover} title={article.title} loading="eager" />;
}
