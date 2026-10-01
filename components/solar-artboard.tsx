import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";
import { artboardNodeStyle, selectedWorkArtboards, selectedWorkCopy, type ArtboardDebugMode } from "@/data/selected-work-artboards";
import { ProjectArtboard } from "@/components/project-artboard";
import { selectedWorkPathLoop } from "@/components/selected-work-motion";
import styles from "./solar-artboard.module.css";

const box = selectedWorkArtboards.projects["solar-site-selection"].desktop;
const copy = selectedWorkCopy["solar-site-selection"];
const legendColors = ["#567421", "#89a43b", "#d5ad28", "#bd7430", "#894324"];
const aoiPath = "M110 62 250 34 372 57 500 42 617 119 589 236 641 330 560 488 443 582 296 569 182 608 74 513 46 382 77 271 39 155Z";
const candidateCells = [{ rank: "#01", column: 4, row: 4 }, { rank: "#02", column: 5, row: 5 }, { rank: "#03", column: 2, row: 3 }];
const sequenceTimes = [0, 0.07, 0.08, 0.18, 0.19, 0.29, 0.3, 0.4, 0.6];
const candidateEmphasis = [
  [0.65, 0.65, 1, 1, 0.65, 0.65, 0.65, 0.65, 0.65],
  [0.65, 0.65, 0.65, 0.65, 1, 1, 0.65, 0.65, 0.65],
  [0.65, 0.65, 0.65, 0.65, 0.65, 0.65, 1, 1, 0.65],
];

function ProcessIcon({ kind }: { kind: string }) {
  if (kind === "DRAW") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m10 9 25 8-7 24-9-9-8 5 1-13-7-15Z" /></svg>;
  if (kind === "ANALYZE") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m5 15 19-10 19 10-19 11L5 15Zm0 9 19 11 19-11M5 33l19 11 19-11" /></svg>;
  if (kind === "RANK") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 39V27h8v12H7Zm13 0V16h8v23h-8Zm13 0V7h8v32h-8Z" /></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 5h19l10 10v28H10zM29 5v11h10M16 24h17M16 30h17M16 36h13" /></svg>;
}

export function SolarArtboard({ debugMode = "code", showGrid = false, isActive = false, transitionEnabled = false }: { debugMode?: ArtboardDebugMode; showGrid?: boolean; isActive?: boolean; transitionEnabled?: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const animate = isActive && debugMode === "code" && !reducedMotion;
  return (
    <ProjectArtboard project="solar-site-selection" debugMode={debugMode} showGrid={showGrid} motionEnabled={animate} transitionEnabled={transitionEnabled} active={isActive}>
      <h3 className={styles.title} aria-label={`${copy.titleLine1} ${copy.titleLine2}`} style={artboardNodeStyle(box.title)} data-project-title data-artboard-node="title" data-artboard-x="80" data-artboard-y="86" data-artboard-w="680" data-artboard-h="265">
        <span>{copy.titleLine1}</span><span>{copy.titleLine2}</span>
      </h3>
      <p className={styles.subtitle} style={artboardNodeStyle(box.subtitle)} data-artboard-node="subtitle" data-artboard-x="80" data-artboard-y="365" data-artboard-w="720" data-artboard-h="45">{copy.subtitle}</p>
      <span className={styles.accent} style={artboardNodeStyle(box.accentLine)} aria-hidden="true" />
      <div className={styles.process} style={artboardNodeStyle(box.process)} data-artboard-node="process" data-artboard-x="70" data-artboard-y="470" data-artboard-w="660" data-artboard-h="125">
        {copy.process.map((step) => <div key={step.title}><ProcessIcon kind={step.title} /><b>{step.title}</b><span>{step.detail.split("\n").map((line) => <i key={line}>{line}</i>)}</span></div>)}
      </div>
      <div className={styles.metrics} style={artboardNodeStyle(box.metrics)} data-artboard-node="validatedMeasures" data-artboard-x="68" data-artboard-y="630" data-artboard-w="650" data-artboard-h="130">
        <div><b>{copy.metrics[0].value}</b><strong>{copy.metrics[0].label}</strong><small>{copy.metrics[0].detail?.join(" · ")}</small></div>
        <div><b>{copy.metrics[1].value}</b><strong>{copy.metrics[1].label.replace("\n", " ")}</strong><div className={styles.classSwatches}>{legendColors.map((color) => <i style={{ background: color }} key={color} />)}</div></div>
        <div><b>{copy.metrics[2].value}</b><strong>{copy.metrics[2].label.replace("\n", " ")}</strong></div>
      </div>
      <div className={styles.map} style={artboardNodeStyle(box.suitabilityOverlay)} data-artboard-node="suitabilityMap" data-artboard-x="760" data-artboard-y="130" data-artboard-w="650" data-artboard-h="650">
        <svg viewBox="0 0 700 650" role="img" aria-labelledby="solar-map-title solar-map-description">
          <title id="solar-map-title">Conceptual five-class solar suitability map</title>
          <desc id="solar-map-description">A clipped five-class rectangular suitability tessellation over terrain, with three ranked candidate cells. No unsupported generation values are shown.</desc>
          <defs><clipPath id="solar-aoi-clip"><path d={aoiPath} /></clipPath></defs>
          {animate ? (
            <motion.path className={styles.aoi} d={aoiPath} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0, 0] }} transition={selectedWorkPathLoop(2.2)} />
          ) : <path className={styles.aoi} d={aoiPath} />}
          <g className={styles.classCells} clipPath="url(#solar-aoi-clip)">
            {Array.from({ length: 64 }, (_, index) => {
              const column = index % 8;
              const row = Math.floor(index / 8);
              const suitability = Math.min(4, Math.round(Math.hypot(column - 4, row - 4) * 0.72));
              return <rect key={`${row}-${column}`} data-suitability-cell={`${row}-${column}`} data-suitability-class={5 - suitability} x={40 + column * 75} y={34 + row * 71.75} width="75" height="71.75" fill={legendColors[suitability]} />;
            })}
            {candidateCells.map((cell, index) => {
              const x = 40 + cell.column * 75;
              const y = 34 + cell.row * 71.75;
              const rect = <rect className={styles.candidateCell} data-candidate-region={cell.rank} x={x} y={y} width="75" height="71.75" />;
              return animate ? <motion.rect key={cell.rank} className={styles.candidateCell} data-candidate-region={cell.rank} x={x} y={y} width="75" height="71.75" initial={{ opacity: 0.65 }} animate={{ opacity: candidateEmphasis[index] }} transition={{ duration: 8, times: sequenceTimes, ease: "linear", repeat: Infinity }} /> : <g key={cell.rank}>{rect}</g>;
            })}
          </g>
          <path className={styles.candidateCalloutLeader} d="M377.5 357.5 H365 V333 M452.5 428.4 V440 M227.5 284.8 V235 H216" />
          <path className={styles.aoiOutline} d={aoiPath} />
          {candidateCells.map((cell) => <circle key={cell.rank} className={styles.sitePoint} cx={40 + cell.column * 75 + 37.5} cy={34 + cell.row * 71.75 + 35.875} r="7" />)}
        </svg>
        {copy.candidateCallouts.map((callout, index) => {
          const className = styles.callout + " " + styles["callout" + index];
          const contents = <><b>{callout.rank}</b><span>{callout.lines.map((line) => <i key={line}>{line}</i>)}</span></>;
          const glow = ["0 0 0 rgb(240 196 87 / 0%)", "0 0 0 rgb(240 196 87 / 0%)", "0 0 16px rgb(240 196 87 / 24%)", "0 0 16px rgb(240 196 87 / 24%)", "0 0 0 rgb(240 196 87 / 0%)", "0 0 0 rgb(240 196 87 / 0%)", "0 0 0 rgb(240 196 87 / 0%)", "0 0 0 rgb(240 196 87 / 0%)", "0 0 0 rgb(240 196 87 / 0%)"];
          const idle = "0 0 0 rgb(240 196 87 / 0%)";
          return animate ? <motion.div className={className} data-candidate-callout={callout.rank} key={callout.rank} initial={{ boxShadow: idle }} animate={{ boxShadow: glow.map((value, stage) => stage >= index * 2 + 2 && stage <= index * 2 + 3 ? "0 0 16px rgb(240 196 87 / 24%)" : idle) }} transition={{ duration: 8, times: sequenceTimes, ease: "linear", repeat: Infinity }}>{contents}</motion.div> : <div className={className} data-candidate-callout={callout.rank} key={callout.rank}>{contents}</div>;
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
