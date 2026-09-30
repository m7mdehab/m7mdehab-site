import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";
import { artboardNodeStyle, selectedWorkArtboards, selectedWorkCopy, type ArtboardDebugMode } from "@/data/selected-work-artboards";
import { ProjectArtboard } from "@/components/project-artboard";
import styles from "./solar-artboard.module.css";

const box = selectedWorkArtboards.projects["solar-site-selection"].desktop;
const copy = selectedWorkCopy["solar-site-selection"];
const legendColors = ["#567421", "#89a43b", "#d5ad28", "#bd7430", "#894324"];

function ProcessIcon({ kind }: { kind: string }) {
  if (kind === "DRAW") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m10 9 25 8-7 24-9-9-8 5 1-13-7-15Z" /></svg>;
  if (kind === "ANALYZE") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m5 15 19-10 19 10-19 11L5 15Zm0 9 19 11 19-11M5 33l19 11 19-11" /></svg>;
  if (kind === "RANK") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 39V27h8v12H7Zm13 0V16h8v23h-8Zm13 0V7h8v32h-8Z" /></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 5h19l10 10v28H10zM29 5v11h10M16 24h17M16 30h17M16 36h13" /></svg>;
}

export function SolarArtboard({ debugMode = "code", showGrid = false, isActive = false }: { debugMode?: ArtboardDebugMode; showGrid?: boolean; isActive?: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const animate = isActive && debugMode === "code" && !reducedMotion;
  return (
    <ProjectArtboard project="solar-site-selection" debugMode={debugMode} showGrid={showGrid} motionEnabled={animate}>
      <h3 className={styles.title} aria-label={`${copy.titleLine1} ${copy.titleLine2}`} style={artboardNodeStyle(box.title)} data-project-title data-artboard-node="title" data-artboard-x="80" data-artboard-y="86" data-artboard-w="680" data-artboard-h="265">
        <span>{copy.titleLine1}</span><span>{copy.titleLine2}</span>
      </h3>
      <p className={styles.subtitle} style={artboardNodeStyle(box.subtitle)} data-artboard-node="subtitle" data-artboard-x="80" data-artboard-y="365" data-artboard-w="720" data-artboard-h="45">{copy.subtitle}</p>
      <span className={styles.accent} style={artboardNodeStyle(box.accentLine)} aria-hidden="true" />
      <div className={styles.process} style={artboardNodeStyle(box.process)} data-artboard-node="process" data-artboard-x="70" data-artboard-y="470" data-artboard-w="660" data-artboard-h="125">
        <svg viewBox="0 0 660 125" aria-hidden="true">{animate ? <motion.path d="M46 34H206M208 34H366M368 34H526" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }} /> : <path d="M46 34H206M208 34H366M368 34H526" />}<path d="m198 28 8 6-8 6m158-12 8 6-8 6m158-12 8 6-8 6" /></svg>
        {copy.process.map((step) => <div key={step.title}><ProcessIcon kind={step.title} /><b>{step.title}</b><span>{step.detail.split("\n").map((line) => <i key={line}>{line}</i>)}</span></div>)}
      </div>
      <div className={styles.metrics} style={artboardNodeStyle(box.metrics)} data-artboard-node="validatedMeasures" data-artboard-x="68" data-artboard-y="630" data-artboard-w="650" data-artboard-h="130">
        <div><b>{copy.metrics[0].value}</b><strong>{copy.metrics[0].label}</strong><small>{copy.metrics[0].detail?.join(" · ")}</small></div>
        <div><b>{copy.metrics[1].value}</b><strong>{copy.metrics[1].label.replace("\n", " ")}</strong><div className={styles.classSwatches}>{legendColors.map((color) => <i style={{ background: color }} key={color} />)}</div></div>
        <div><b>{copy.metrics[2].value}</b><strong>{copy.metrics[2].label.replace("\n", " ")}</strong></div>
      </div>
      <div className={styles.map} style={artboardNodeStyle(box.suitabilityOverlay)} data-artboard-node="suitabilityMap" data-artboard-x="760" data-artboard-y="130" data-artboard-w="700" data-artboard-h="650">
        <svg viewBox="0 0 700 650" role="img" aria-labelledby="solar-map-title solar-map-description">
          <title id="solar-map-title">Conceptual five-class solar suitability map</title>
          <desc id="solar-map-description">A stylized public-geodata suitability overlay showing five ranked classes and two ranked candidate callouts. No unsupported generation values are shown.</desc>
          {animate ? (
            <motion.path className={styles.aoi} d="M110 62 250 34 372 57 500 42 617 119 589 236 641 330 560 488 443 582 296 569 182 608 74 513 46 382 77 271 39 155Z" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.95, ease: "easeInOut" }} />
          ) : <path className={styles.aoi} d="M110 62 250 34 372 57 500 42 617 119 589 236 641 330 560 488 443 582 296 569 182 608 74 513 46 382 77 271 39 155Z" />}
          <path fill="#9c582b" d="m110 62 140-28 76 140-116 72-133-5-38-86Z" />
          <path fill="#d39d26" d="m250 34 122 23 49 115-91 96-120-50 116-72Z" />
          <path fill="#e3c436" d="m372 57 128-15 64 124-143 6-49-115Z" />
          <path fill="#8eaa3c" d="m429 172 143-6 17 70-84 92-118-60-57 0Z" />
          <path fill="#577a31" d="m387 268 118 60-35 95-137 28-72-101Z" />
          <path fill="#d5b22d" d="m206 194 120 50-65 106-126-20-3-84Z" />
          <path fill="#b86930" d="m135 330 126 20 72 101-129 49-130 13-28-131Z" />
          <path fill="#d3a42c" d="m363 451 107-28 90 65-117 94-147-13-4-118Z" />
          <g className={styles.classCells}>
            <path fill="#bd7b30" d="m83 142 37-54 70-16 28 36-45 39-62 20Z" />
            <path fill="#d5a52c" d="m213 91 37-53 63 12 34 55-43 32-78-9Z" />
            <path fill="#a8ae38" d="m347 70 58-12 63 14-24 55-71 14-27-40Z" />
            <path fill="#ba7830" d="m487 54 73-8 42 69-53 24-67-37Z" />
            <path fill="#8eaa3c" d="m463 140 70-15 50 55-33 48-70-16-36-42Z" />
            <path fill="#d3b932" d="m303 148 54-25 67 26-18 63-62 13-48-32Z" />
            <path fill="#b36d30" d="m139 203 70-17 45 47-37 55-79 11-31-48Z" />
            <path fill="#ddb930" d="m217 293 37-60 67 23 17 60-50 48-67-14Z" />
            <path fill="#698438" d="m355 238 56-26 76 25-16 71-64 20-55-41Z" />
            <path fill="#c58730" d="m506 247 44-19 48 22 22 68-59 31-56-46Z" />
            <path fill="#a45d2d" d="m93 349 72-25 64 31 21 72-62 39-85-20-38-54Z" />
            <path fill="#87a13a" d="m278 382 46-47 65 10 29 56-38 47-78 15-45-34Z" />
            <path fill="#c48a30" d="m431 466 39-43 90 65-53 54-72 30-45-40Z" />
          </g>
          <path className={styles.classEdge} d="M110 62 250 34 372 57 500 42 617 119 589 236 641 330 560 488 443 582 296 569 182 608 74 513 46 382 77 271 39 155Z" />
          <path className={styles.site} d="m342 259 67 8 36 48-30 60-61 9-47-45 4-49Z" />
          <path className={styles.siteSecondary} d="m434 406 44 5 20 36-23 32-42-7-17-34Z" />
          {animate ? <motion.path className={styles.route} d="M374 304 337 229 420 198M453 443l67-45 58 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.85, duration: 0.8, ease: "easeInOut" }} /> : <path className={styles.route} d="M374 304 337 229 420 198M453 443l67-45 58 7" />}
          <circle className={styles.sitePoint} cx="375" cy="305" r="8" />
          <circle className={styles.sitePoint} cx="454" cy="443" r="7" />
        </svg>
        {copy.candidateCallouts.map((callout, index) => {
          const className = styles.callout + " " + styles["callout" + index];
          const contents = <><b>{callout.rank}</b><span>{callout.lines.map((line) => <i key={line}>{line}</i>)}</span></>;
          return animate && index === 0 ? (
            <motion.div className={className} key={callout.rank} initial={{ scale: 0.98 }} animate={{ scale: [0.98, 1.035, 1] }} transition={{ delay: 1.45, duration: 0.8, ease: "easeOut" }}>{contents}</motion.div>
          ) : <div className={className} key={callout.rank}>{contents}</div>;
        })}
      </div>
      <div className={styles.legend} style={artboardNodeStyle(box.legend)} data-artboard-node="classLegend" data-artboard-x="1432" data-artboard-y="80" data-artboard-w="190" data-artboard-h="320">
        <b>Land suitability</b>
        {copy.legend.map((entry, index) => <span key={entry.class}><i style={{ background: legendColors[index] }} />{entry.label}</span>)}
      </div>
      <p className={styles.footer} style={artboardNodeStyle(box.footer)} data-artboard-node="capabilityFooter" data-artboard-x="80" data-artboard-y="812" data-artboard-w="860" data-artboard-h="36">{copy.footer}</p>
    </ProjectArtboard>
  );
}
