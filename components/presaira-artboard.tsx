import Image from "next/image";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";
import {
  artboardNodeStyle,
  selectedWorkArtboards,
  selectedWorkCopy,
  type ArtboardDebugMode,
} from "@/data/selected-work-artboards";
import { projectVisuals } from "@/data/project-visuals";
import { ProjectArtboard } from "@/components/project-artboard";
import { PresairaWordmark } from "@/components/presaira-wordmark";
import { SELECTED_WORK_FORWARD_OPACITY, SELECTED_WORK_FORWARD_PATH, selectedWorkNodeLoop, selectedWorkPathLoop } from "@/components/selected-work-motion";
import styles from "./presaira-artboard.module.css";

const design = selectedWorkArtboards.projects.presaira;
const copy = selectedWorkCopy.presaira;
const competitions = copy.competitions;
const sourceChart = projectVisuals.presaira.reliability;
type PresairaBoxKey = "wordmark" | "tagline" | "accentLine" | "proofMetrics" | "competitionRail" | "chart" | "chartNarrative" | "score";

function sourceBox(name: PresairaBoxKey) {
  const box = design.desktop[name];
  return artboardNodeStyle(box);
}

function CalibrationChart({ animate }: { animate: boolean }) {
  const plot = { left: 72, top: 24, width: 990, height: 359 };
  const point = (x: number, y: number) => ({
    x: plot.left + x * plot.width,
    y: plot.top + (1 - y) * plot.height,
  });
  const points = sourceChart.map((entry) => point(entry.predicted, entry.observed));
  const curve = points.map((p, index) => `${index ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const baselineStart = point(0, 0);
  const baselineEnd = point(1, 1);

  return (
    <svg className={styles.chart} viewBox="0 0 1120 470" role="img" aria-labelledby="presaira-chart-title presaira-chart-description" data-plot-width={plot.width} data-plot-height={plot.height}>
      <title id="presaira-chart-title">Forecast calibration after the 2026 World Cup</title>
      <desc id="presaira-chart-description">Five observed win-rate points plotted against predicted probability from committed public Presaira calibration evidence. The dashed diagonal indicates perfect calibration.</desc>
      {[0, 0.2, 0.4, 0.6, 0.8, 1].map((tick) => {
        const p = point(tick, tick);
        return (
          <g key={tick} className={styles.axisMark}>
            <line x1={plot.left} y1={p.y} x2={plot.left + plot.width} y2={p.y} />
            <line x1={p.x} y1={plot.top} x2={p.x} y2={plot.top + plot.height} />
            <text data-axis-tick="x" x={p.x} y={plot.top + plot.height + 23} textAnchor="middle">{tick.toFixed(1)}</text>
            <text data-axis-tick="y" x={plot.left - 12} y={p.y + 4} textAnchor="end">{tick.toFixed(1)}</text>
          </g>
        );
      })}
      <line className={styles.perfect} x1={baselineStart.x} y1={baselineStart.y} x2={baselineEnd.x} y2={baselineEnd.y} />
      {animate ? (
        <motion.path className={styles.observedLine} d={curve} initial={{ pathLength: 0 }} animate={{ pathLength: SELECTED_WORK_FORWARD_PATH, opacity: SELECTED_WORK_FORWARD_OPACITY }} transition={selectedWorkPathLoop(2.35)} />
      ) : <path className={styles.observedLine} d={curve} />}
      {points.map((p, index) => {
        const radius = Math.max(5, Math.sqrt(sourceChart[index].n) * 1.1);
        const ci = Math.sqrt((sourceChart[index].observed * (1 - sourceChart[index].observed)) / sourceChart[index].n) * 1.96 * plot.height;
        return (
          <g key={sourceChart[index].n + index}>
            <line className={styles.interval} x1={p.x} x2={p.x} y1={p.y - ci} y2={p.y + ci} />
            <line className={styles.interval} x1={p.x - 5} x2={p.x + 5} y1={p.y - ci} y2={p.y - ci} />
            <line className={styles.interval} x1={p.x - 5} x2={p.x + 5} y1={p.y + ci} y2={p.y + ci} />
            {animate ? <motion.circle className={styles.point} cx={p.x} cy={p.y} r={radius} initial={{ opacity: 0.45, scale: 0.72 }} animate={{ opacity: [0.45, 1, 1, 0.45], scale: [0.72, 1.08, 1, 0.72] }} transition={selectedWorkNodeLoop(0.45 + index * 0.18)} /> : <circle className={styles.point} cx={p.x} cy={p.y} r={radius} />}
          </g>
        );
      })}
      <text className={styles.axisLabel} data-axis-label="x" x={plot.left + plot.width / 2} y="445" textAnchor="middle">{copy.chartLabels.x}</text>
      <text className={styles.axisLabel} data-axis-label="y" x="10" y="203.5" textAnchor="middle" transform="rotate(-90 10 203.5)">{copy.chartLabels.y}</text>
    </svg>
  );
}

function CompetitionRail({ pulseActiveNode }: { pulseActiveNode: boolean }) {
  return (
    <div className={styles.rail} style={sourceBox("competitionRail")} data-artboard-node="competitionRail" data-artboard-x="860" data-artboard-y="54" data-artboard-w="740" data-artboard-h="190">
      {competitions.map((competition, index) => (
        <div className={`${styles.competition} ${styles[`competition${index}`]}`} key={competition.logo}>
          <div className={styles.markStage}>
            <Image src={`/selected-work/logos/${competition.logo}`} alt={`${competition.name} logo`} width={1254} height={1254} />
          </div>
          <span className={styles.competitionName}>{competition.name}</span>
          <span className={styles.competitionStatus}>{competition.status}</span>
          {pulseActiveNode && competition.status === "ACTIVE" ? (
            <motion.span className={styles.node} data-status-node aria-hidden="true" initial={{ opacity: 0.7 }} animate={{ opacity: [0.7, 1, 1, 0.7] }} transition={selectedWorkNodeLoop(1.1)} />
          ) : <span className={styles.node} data-status-node aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

export function PresairaArtboard({ debugMode = "code", showGrid = false, isActive = false, transitionEnabled = false }: { debugMode?: ArtboardDebugMode; showGrid?: boolean; isActive?: boolean; transitionEnabled?: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const animate = isActive && debugMode === "code" && !reducedMotion;
  const score = design.desktop.score;

  return (
    <ProjectArtboard project="presaira" debugMode={debugMode} showGrid={showGrid} motionEnabled={animate} transitionEnabled={transitionEnabled} active={isActive}>
      <div className={styles.identity} style={sourceBox("wordmark")} data-artboard-node="wordmark" data-artboard-x="94" data-artboard-y="128" data-artboard-w="665" data-artboard-h="88">
        <h3 className={styles.semanticWordmark} data-project-title>{copy.wordmark}</h3>
        <PresairaWordmark />
      </div>
      <p className={styles.tagline} style={sourceBox("tagline")} data-artboard-node="tagline" data-artboard-x="97" data-artboard-y="224" data-artboard-w="650" data-artboard-h="52">{copy.tagline}</p>
      <span className={styles.accent} style={sourceBox("accentLine")} aria-hidden="true" />
      <div className={styles.proofMetrics} style={sourceBox("proofMetrics")} data-artboard-node="proofMetrics" data-artboard-x="97" data-artboard-y="332" data-artboard-w="670" data-artboard-h="68">
        {copy.proofMetrics.map((metric) => <div key={metric.label}><b>{metric.label}</b><strong>{metric.value}</strong></div>)}
      </div>

      <CompetitionRail pulseActiveNode={animate} />

      <div className={styles.chartWrap} style={sourceBox("chart")} data-artboard-node="calibrationChart" data-artboard-x="88" data-artboard-y="437" data-artboard-w="1120" data-artboard-h="470">
        <CalibrationChart animate={animate} />
      </div>
      <div className={styles.perfectLabel} aria-hidden="true">{copy.chartLabels.perfect}</div>
      <div className={styles.score} style={sourceBox("score")} data-artboard-node="proof" data-artboard-x="1265" data-artboard-y="382" data-artboard-w="330" data-artboard-h="235">
        <span className={styles.scoreNumber} data-artboard-node="scoreNumber" aria-label={copy.score.number}>{copy.score.number.split(" / ").map((number, index) => <span key={index}>{index ? "/ " : ""}{number}</span>)}</span>
        <span className={styles.scoreCaption}>{copy.score.caption}</span>
        <div className={styles.platformStatus} data-artboard-node="platformStatus"><span>UCL 2026/27 <b>ACTIVE</b></span><span>FORMULA 1 + NBA <b>COMING SOON</b></span></div>
      </div>
    </ProjectArtboard>
  );
}
