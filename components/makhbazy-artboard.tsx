import Image from "next/image";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";
import { artboardNodeStyle, selectedWorkArtboards, selectedWorkCopy, type ArtboardDebugMode } from "@/data/selected-work-artboards";
import { ProjectArtboard } from "@/components/project-artboard";
import { SELECTED_WORK_FORWARD_OPACITY, SELECTED_WORK_FORWARD_PATH, selectedWorkPathLoop } from "@/components/selected-work-motion";
import styles from "./makhbazy-artboard.module.css";

const box = selectedWorkArtboards.projects.makhbazy.desktop;
const copy = selectedWorkCopy.makhbazy;
const desktopActionCenters = [
  { x: 132.5, y: 377.33 },
  { x: 397.5, y: 410.98 },
  { x: 662.5, y: 394.14 },
  { x: 927.5, y: 404.25 },
] as const;

function connectorPath(points: readonly { x: number; y: number }[]) {
  return points.slice(1).reduce((path, point, index) => {
    const previous = points[index];
    const handle = (point.x - previous.x) / 3;
    return `${path} C${previous.x + handle} ${previous.y} ${point.x - handle} ${point.y} ${point.x} ${point.y}`;
  }, `M${points[0].x} ${points[0].y}`);
}

function JourneyGlyph({ index }: { index: number }) {
  if (index === 0) return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="20" cy="20" r="12"/><path d="m29 29 11 11M13 19h14M13 24h9"/></svg>;
  if (index === 1) return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 9h5l5 24h23l5-18H12M18 39a2 2 0 1 0 0 .1M35 39a2 2 0 1 0 0 .1"/></svg>;
  if (index === 2) return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 7v34M20 10h8M20 41h8"/><circle cx="24" cy="17" r="5"/><circle cx="24" cy="29" r="5"/></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m7 15 17-9 17 9-17 10L7 15Zm0 9 17 10 17-10M7 33l17 10 17-10M24 25v18"/></svg>;
}

function PhoneContent({ index }: { index: number }) {
  if (index === 0) return <><i className={styles.search} /><div className={styles.chips}><i /><i /><i /></div><div className={styles.heroTile}><i /></div><div className={styles.tiles}><i /><i /></div></>;
  if (index === 1) return <><i className={styles.headerLine} /><div className={styles.productTile}><i /><span><b /><b /></span></div><div className={styles.quantity}><i /><b>1</b><i /></div><i className={styles.button} /></>;
  if (index === 2) return <><i className={styles.headerLine} /><div className={styles.trackLine}><i /><i /><i /></div><div className={styles.mapTile}><i /></div></>;
  return <><i className={styles.headerLine} /><div className={styles.packageTile}><i /><i /></div><div className={styles.receiptLine}><i /><i /><i /></div><i className={styles.button} /></>;
}

export function MakhbazyArtboard({ debugMode = "code", showGrid = false, isActive = false, transitionEnabled = false }: { debugMode?: ArtboardDebugMode; showGrid?: boolean; isActive?: boolean; transitionEnabled?: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const animate = isActive && debugMode === "code" && !reducedMotion;
  return (
    <ProjectArtboard project="makhbazy" debugMode={debugMode} showGrid={showGrid} motionEnabled={animate} transitionEnabled={transitionEnabled} active={isActive}>
      <div className={styles.brand} style={artboardNodeStyle(box.logo)} data-artboard-node="brandLogo" data-artboard-x="75" data-artboard-y="45" data-artboard-w="320" data-artboard-h="270">
        <Image src="/selected-work/logos/makhbazy-light.png" alt="Makhbazy official light logo" width={3000} height={3000} priority />
      </div>
      <span className={styles.accent} style={artboardNodeStyle(box.accentLine)} aria-hidden="true" />
      <h3 className={styles.statement} aria-label={copy.statement.replace(/\n/g, " ")} style={artboardNodeStyle(box.statement)} data-project-title data-artboard-node="productStatement" data-artboard-x="78" data-artboard-y="451" data-artboard-w="460" data-artboard-h="160">{copy.statement.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
      <div className={styles.phones} style={artboardNodeStyle(box.phones)} data-artboard-node="journeyAbstraction" data-artboard-x="445" data-artboard-y="132" data-artboard-w="1060" data-artboard-h="475">
        <svg className={`${styles.path} ${styles.desktopPath}`} data-action-connector viewBox="0 0 1060 475" aria-hidden="true">{animate ? <motion.path d={connectorPath(desktopActionCenters)} initial={{ pathLength: 0 }} animate={{ pathLength: SELECTED_WORK_FORWARD_PATH, opacity: SELECTED_WORK_FORWARD_OPACITY }} transition={selectedWorkPathLoop(2.35)} /> : <path d={connectorPath(desktopActionCenters)} />}{desktopActionCenters.map((point, index) => <circle data-action-node={index} key={point.x} cx={point.x} cy={point.y} r="7" />)}</svg>
        <svg className={`${styles.path} ${styles.mobilePath}`} viewBox="0 0 1060 475" aria-hidden="true"><path d="M130 335 C195 410 205 404 290 335 S435 262 505 335 S655 410 735 335 S880 262 965 335"/><circle cx="192" cy="386" r="7"/><circle cx="450" cy="335" r="7"/><circle cx="735" cy="335" r="7"/><circle cx="965" cy="335" r="7"/></svg>
        {copy.stages.map((stage, index) => <div className={`${styles.journeyStage} ${styles[`journeyStage${index}`]}`} key={stage.title} data-stage-anchor={stage.title.toLowerCase()}>
          <b>{stage.title}</b>
          <div className={styles.phone} aria-label={`${stage.title.toLowerCase()} journey screen abstraction`}><span className={styles.camera} /><div className={styles.phoneContent}><PhoneContent index={index} /></div></div>
          <JourneyGlyph index={index} />
          <span className={styles.stageDetail}>{stage.detail.split("\n").map((line) => <i key={line}>{line}</i>)}</span>
        </div>)}
      </div>
      <div className={styles.utilities} style={artboardNodeStyle(box.utilityList)} data-artboard-node="secondaryFeatures" aria-label="Journey utilities">
        {copy.utilities.map((item, index) => <div key={item}><span aria-hidden="true">{index === 0 ? <svg viewBox="0 0 32 32"><path d="M25 12a10 10 0 0 0-17-4L5 11m0-7v7h7M7 20a10 10 0 0 0 17 4l3-3m0 7v-7h-7" /></svg> : index === 1 ? <svg viewBox="0 0 32 32"><path d="M6 17a10 10 0 0 1 20 0v7h-5v-8h5M6 16h5v8H6zM11 25h8" /></svg> : <svg viewBox="0 0 32 32"><path d="M8 4h12l5 5v19H8zM20 4v6h5M12 15h9M12 20h9M12 25h6" /></svg>}</span>{item}</div>)}
      </div>
      <div className={styles.capabilities} style={artboardNodeStyle(box.footerCapabilities)} data-artboard-node="capabilities" data-artboard-x="74" data-artboard-y="803" data-artboard-w="1300" data-artboard-h="84">
        {copy.capabilities.map((capability) => <div key={capability.title}><b>{capability.title}</b><span>{capability.detail}</span></div>)}
      </div>
    </ProjectArtboard>
  );
}
