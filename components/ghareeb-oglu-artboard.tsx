import Image from "next/image";
import { Fragment } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";
import { artboardNodeStyle, selectedWorkArtboards, selectedWorkCopy, type ArtboardDebugMode } from "@/data/selected-work-artboards";
import { ProjectArtboard } from "@/components/project-artboard";
import { SELECTED_WORK_FORWARD_OPACITY, SELECTED_WORK_FORWARD_PATH, selectedWorkPathLoop } from "@/components/selected-work-motion";
import styles from "./ghareeb-oglu-artboard.module.css";

const box = selectedWorkArtboards.projects["ghareeb-oglu"].desktop;
const copy = selectedWorkCopy["ghareeb-oglu"];
const commerceWidth = 1120;
const stageCenters = [commerceWidth * 0.125, commerceWidth * 0.375, commerceWidth * 0.625, commerceWidth * 0.875] as const;

function StageMark({ icon }: { icon: string }) {
  if (icon === "grid") return <svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="8" width="18" height="18" rx="3"/><rect x="38" y="8" width="18" height="18" rx="3"/><rect x="8" y="38" width="18" height="18" rx="3"/><rect x="38" y="38" width="18" height="18" rx="3"/><path d="M47 43v8M43 47h8"/></svg>;
  if (icon === "package") return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="m10 20 22-11 22 11-22 12-22-12Z"/><path d="M10 32 32 44l22-12M10 44l22 12 22-12M32 32v24"/></svg>;
  if (icon === "cart") return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M7 12h7l6 30h30l7-22H17M25 51a3 3 0 1 0 0 .1M45 51a3 3 0 1 0 0 .1M23 30h31"/></svg>;
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M6 19h34v27H6zM40 28h10l9 10v8H40zM13 51a5 5 0 1 0 0 .1M48 51a5 5 0 1 0 0 .1M40 38h19"/></svg>;
}

export function GhareebOgluArtboard({ debugMode = "code", showGrid = false, isActive = false, transitionEnabled = false }: { debugMode?: ArtboardDebugMode; showGrid?: boolean; isActive?: boolean; transitionEnabled?: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const animate = isActive && debugMode === "code" && !reducedMotion;
  return (
    <ProjectArtboard project="ghareeb-oglu" debugMode={debugMode} showGrid={showGrid} motionEnabled={animate} transitionEnabled={transitionEnabled} active={isActive}>
      <div className={styles.logo} style={artboardNodeStyle(box.logo)} data-artboard-node="officialLogo" data-artboard-x="681.5" data-artboard-y="10" data-artboard-w="320" data-artboard-h="216">
        <Image src="/selected-work/logos/ghareeb-oglu-white-gold-transparent.png" alt="Ghareeb Oglu official white and gold logo" width={754} height={708} priority />
      </div>
      <h3 className={styles.headline} style={artboardNodeStyle(box.headline)} data-project-title data-mobile-one-line="ghareeb-title" data-artboard-node="headline" data-artboard-x="360" data-artboard-y="406" data-artboard-w="980" data-artboard-h="92">{copy.headline}</h3>
      <p className={styles.subheadline} style={artboardNodeStyle(box.subheadline)} data-mobile-one-line="ghareeb-subtitle" data-artboard-node="subheadline" data-artboard-x="395" data-artboard-y="503" data-artboard-w="900" data-artboard-h="42">{copy.subheadline}</p>
      <div className={styles.stages} style={artboardNodeStyle(box.stages)} data-artboard-node="commerceJourney" data-artboard-x="281.5" data-artboard-y="595" data-artboard-w="1120" data-artboard-h="210">
        <svg className={styles.path} viewBox={`0 0 ${commerceWidth} 210`} aria-hidden="true">{animate ? <motion.path d={`M${stageCenters[0]} 112 H${stageCenters[3]}`} initial={{ pathLength: 0 }} animate={{ pathLength: SELECTED_WORK_FORWARD_PATH, opacity: SELECTED_WORK_FORWARD_OPACITY }} transition={selectedWorkPathLoop(2.2)} /> : <path d={`M${stageCenters[0]} 112 H${stageCenters[3]}`} />}{stageCenters.map((x, index) => <circle data-commerce-node={index} key={x} cx={x} cy="112" r="6" />)}</svg>
        {copy.stages.map((stage, index) => <div className={`${styles.stage} ${styles[`stage${index}`]}`} key={stage.title} data-stage-anchor={stage.title.toLowerCase()}><StageMark icon={stage.icon} /><b data-mobile-one-line>{stage.title}</b></div>)}
      </div>
      <div className={styles.skills} style={artboardNodeStyle(box.footerSkills)} data-mobile-one-line="ghareeb-capabilities" data-artboard-node="capabilities" data-artboard-x="231.5" data-artboard-y="787" data-artboard-w="1220" data-artboard-h="34">
        {copy.capabilities.map((capability, index) => (
          <Fragment key={capability}>
            <span>{capability}</span>
            {index !== copy.capabilities.length - 1 ? <i aria-hidden="true">·</i> : null}
          </Fragment>
        ))}
      </div>
    </ProjectArtboard>
  );
}
