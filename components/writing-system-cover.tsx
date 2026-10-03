import { projectVisuals } from "@/data/project-visuals";
import type {
  PublishedWritingSystemArticle,
  WritingSystemVisualId,
} from "@/components/writing-system-contract";

function ForecastCalibrationCover({ alt }: { alt: string }) {
  const points = projectVisuals.presaira.reliability.map(({ predicted, observed }) => ({
    x: 24 + predicted * 272,
    y: 136 - observed * 112,
  }));
  const polyline = points.map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

  return (
    <div className="writing-system-cover writing-system-cover--forecast">
      <svg
        viewBox="0 0 320 160"
        role="img"
        aria-label={alt}
        preserveAspectRatio="xMidYMid meet"
      >
        <line className="writing-system-cover-guide" x1="24" x2="296" y1="132" y2="132" />
        <line className="writing-system-cover-guide" x1="24" x2="296" y1="96" y2="96" />
        <line className="writing-system-cover-guide" x1="24" x2="296" y1="60" y2="60" />
        <line className="writing-system-cover-reference" x1="24" x2="296" y1="136" y2="24" />
        <polyline className="writing-system-cover-curve" points={polyline} />
        {points.map(({ x, y }, index) => (
          <circle key={index} cx={x} cy={y} r="5" />
        ))}
      </svg>
    </div>
  );
}

function OilSarCover({ alt }: { alt: string }) {
  const visual = projectVisuals["oil-spill-detection"];

  return (
    <div className="writing-system-cover writing-system-cover--oil">
      <img
        src={visual.image}
        alt={alt}
        width={1024}
        height={640}
        loading="lazy"
      />
      <span className="writing-system-cover-shade" aria-hidden="true" />
    </div>
  );
}

function AgentProvenanceCover({ alt }: { alt: string }) {
  return (
    <div className="writing-system-cover writing-system-cover--agent">
      <svg
        viewBox="0 0 360 180"
        role="img"
        aria-label={alt}
        preserveAspectRatio="xMidYMid meet"
      >
        <path className="writing-system-agent-wire" d="M48 90 C88 90 90 56 132 56" />
        <path className="writing-system-agent-wire" d="M48 90 C88 90 90 124 132 124" />
        <path className="writing-system-agent-wire writing-system-agent-wire--active" d="M198 90 H242" />
        <path className="writing-system-agent-wire writing-system-agent-wire--active" d="M296 90 H334" />
        <rect className="writing-system-agent-node" x="16" y="66" width="72" height="48" rx="10" />
        <text x="52" y="86" textAnchor="middle">SOURCE</text>
        <text className="writing-system-agent-tiny" x="52" y="100" textAnchor="middle">evidence</text>
        <rect className="writing-system-agent-node" x="120" y="34" width="84" height="44" rx="10" />
        <text x="162" y="60" textAnchor="middle">KNOWN</text>
        <rect className="writing-system-agent-node" x="120" y="102" width="84" height="44" rx="10" />
        <text x="162" y="128" textAnchor="middle">UNKNOWN</text>
        <circle className="writing-system-agent-node writing-system-agent-node--active" cx="269" cy="90" r="29" />
        <text x="269" y="87" textAnchor="middle">CLAIM</text>
        <text className="writing-system-agent-tiny" x="269" y="101" textAnchor="middle">traceable</text>
        <rect className="writing-system-agent-node writing-system-agent-node--active" x="328" y="63" width="24" height="54" rx="8" />
        <text
          className="writing-system-agent-authority"
          transform="rotate(-90 340 90)"
          x="340"
          y="93"
          textAnchor="middle"
        >
          AUTHORITY
        </text>
      </svg>
    </div>
  );
}

function VisualCover({
  visual,
  alt,
}: {
  visual: WritingSystemVisualId;
  alt: string;
}) {
  switch (visual) {
    case "forecast-calibration":
      return <ForecastCalibrationCover alt={alt} />;
    case "oil-sar":
      return <OilSarCover alt={alt} />;
    case "agent-provenance":
      return <AgentProvenanceCover alt={alt} />;
  }
}

export function WritingSystemCover({
  article,
}: {
  article: Pick<PublishedWritingSystemArticle, "cover">;
}) {
  if (article.cover.kind === "image") {
    return (
      <div className="writing-system-cover writing-system-cover--image">
        <img
          src={article.cover.src}
          alt={article.cover.alt}
          width={1600}
          height={900}
          loading="lazy"
          style={
            article.cover.objectPosition
              ? { objectPosition: article.cover.objectPosition }
              : undefined
          }
        />
      </div>
    );
  }

  return <VisualCover visual={article.cover.visual} alt={article.cover.alt} />;
}
