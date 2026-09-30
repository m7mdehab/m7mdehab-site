import Image from "next/image";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";
import { artboardNodeStyle, selectedWorkArtboards, selectedWorkCopy, type ArtboardDebugMode } from "@/data/selected-work-artboards";
import { ProjectArtboard } from "@/components/project-artboard";
import styles from "./ghareeb-oglu-artboard.module.css";

const box = selectedWorkArtboards.projects["ghareeb-oglu"].desktop;
const copy = selectedWorkCopy["ghareeb-oglu"];

function StageMark({ icon }: { icon: string }) {
  if (icon === "grid") return <svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="8" width="18" height="18" rx="3"/><rect x="38" y="8" width="18" height="18" rx="3"/><rect x="8" y="38" width="18" height="18" rx="3"/><rect x="38" y="38" width="18" height="18" rx="3"/><path d="M47 43v8M43 47h8"/></svg>;
  if (icon === "package") return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="m10 20 22-11 22 11-22 12-22-12Z"/><path d="M10 32 32 44l22-12M10 44l22 12 22-12M32 32v24"/></svg>;
  if (icon === "cart") return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M7 12h7l6 30h30l7-22H17M25 51a3 3 0 1 0 0 .1M45 51a3 3 0 1 0 0 .1M23 30h31"/></svg>;
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M6 19h34v27H6zM40 28h10l9 10v8H40zM13 51a5 5 0 1 0 0 .1M48 51a5 5 0 1 0 0 .1M40 38h19"/></svg>;
}

export function GhareebOgluArtboard({ debugMode = "code", showGrid = false, isActive = false }: { debugMode?: ArtboardDebugMode; showGrid?: boolean; isActive?: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const animate = isActive && debugMode === "code" && !reducedMotion;
  return (
    <ProjectArtboard project="ghareeb-oglu" debugMode={debugMode} showGrid={showGrid} motionEnabled={animate}>
      <div className={styles.logo} style={artboardNodeStyle(box.logo)} data-artboard-node="officialLogo" data-artboard-x="622" data-artboard-y="72" data-artboard-w="430" data-artboard-h="370">
        <Image src="/selected-work/logos/ghareeb-oglu-white-gold-transparent.png" alt="Ghareeb Oglu official white and gold logo" width={754} height={708} priority />
      </div>
      <h3 className={styles.headline} style={artboardNodeStyle(box.headline)} data-project-title data-artboard-node="headline" data-artboard-x="360" data-artboard-y="453" data-artboard-w="980" data-artboard-h="92">{copy.headline}</h3>
      <p className={styles.subheadline} style={artboardNodeStyle(box.subheadline)} data-artboard-node="subheadline" data-artboard-x="395" data-artboard-y="550" data-artboard-w="900" data-artboard-h="42">{copy.subheadline}</p>
      <span className={styles.ornament} style={artboardNodeStyle(box.ornament)} aria-hidden="true"><i /></span>
      <div className={styles.stages} style={artboardNodeStyle(box.stages)} data-artboard-node="commerceJourney" data-artboard-x="120" data-artboard-y="620" data-artboard-w="1420" data-artboard-h="210">
        <svg className={styles.path} viewBox="0 0 1420 210" aria-hidden="true">{animate ? <motion.path d="M20 68 C150 68 190 68 285 68 S470 115 540 115 S745 115 805 115 S1000 150 1070 150 S1280 150 1400 150" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: "easeInOut" }} /> : <path d="M20 68 C150 68 190 68 285 68 S470 115 540 115 S745 115 805 115 S1000 150 1070 150 S1280 150 1400 150" />}<circle cx="285" cy="68" r="6"/><circle cx="665" cy="115" r="6"/><circle cx="1070" cy="150" r="6"/></svg>
        {copy.stages.map((stage, index) => <div className={`${styles.stage} ${styles[`stage${index}`]}`} key={stage.title}><StageMark icon={stage.icon} /><b>{stage.title}</b><i aria-hidden="true" /></div>)}
      </div>
      <div className={styles.skills} style={artboardNodeStyle(box.footerSkills)} data-artboard-node="capabilities" data-artboard-x="145" data-artboard-y="864" data-artboard-w="1380" data-artboard-h="34">
        {copy.capabilities.map((capability, index) => <span key={capability}>{capability}{index !== copy.capabilities.length - 1 ? <i aria-hidden="true">·</i> : null}</span>)}
      </div>
    </ProjectArtboard>
  );
}
