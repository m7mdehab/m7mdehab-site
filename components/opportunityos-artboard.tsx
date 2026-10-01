import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";
import {
  artboardNodeStyle,
  selectedWorkArtboards,
  selectedWorkCopy,
  type ArtboardDebugMode,
} from "@/data/selected-work-artboards";
import { ProjectArtboard } from "@/components/project-artboard";
import { SELECTED_WORK_FORWARD_OPACITY, SELECTED_WORK_FORWARD_PATH, selectedWorkPathLoop } from "@/components/selected-work-motion";
import styles from "./opportunityos-artboard.module.css";

const box = selectedWorkArtboards.projects.opportunityos.desktop;
const copy = selectedWorkCopy.opportunityos;

export function OpportunityOsArtboard({ debugMode = "code", showGrid = false, isActive = false, transitionEnabled = false }: { debugMode?: ArtboardDebugMode; showGrid?: boolean; isActive?: boolean; transitionEnabled?: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const animate = isActive && debugMode === "code" && !reducedMotion;
  return (
    <ProjectArtboard project="opportunityos" debugMode={debugMode} showGrid={showGrid} motionEnabled={animate} transitionEnabled={transitionEnabled} active={isActive}>
      <div className={styles.title} style={artboardNodeStyle(box.title)} data-artboard-node="title" data-artboard-x="93" data-artboard-y="74" data-artboard-w="960" data-artboard-h="148">
        <h3 data-project-title><span>{copy.titlePrefix}</span><span>{copy.titleAccent}</span></h3>
      </div>
      <p className={styles.tagline} style={artboardNodeStyle(box.tagline)} data-artboard-node="tagline" data-artboard-x="98" data-artboard-y="238" data-artboard-w="1030" data-artboard-h="55">{copy.tagline}</p>
      <div className={styles.mantra} aria-label={copy.mantra.join(" ")}>
        <span />{copy.mantra.map((line) => <b key={line}>{line}</b>)}
      </div>
      <div className={styles.watermark} style={artboardNodeStyle(box.truthGraphWatermark)} aria-hidden="true">{copy.watermark}</div>
      <div className={styles.taxonomy} style={artboardNodeStyle(box.truthGraphTaxonomy)} data-artboard-node="taxonomy" data-artboard-x="160" data-artboard-y="446" data-artboard-w="760" data-artboard-h="32">
        {copy.taxonomy.map((term) => <span key={term}>{term}</span>)}
      </div>
      <div className={styles.flow} style={artboardNodeStyle(box.flow)} data-artboard-node="truthFlow" data-artboard-x="88" data-artboard-y="507" data-artboard-w="1144" data-artboard-h="245">
        <svg viewBox="0 0 1144 245" aria-hidden="true">
          {animate ? (
            <motion.path className={styles.signal} d="M85 80.5 H1137" initial={{ pathLength: 0 }} animate={{ pathLength: SELECTED_WORK_FORWARD_PATH, opacity: SELECTED_WORK_FORWARD_OPACITY }} transition={selectedWorkPathLoop(2.45)} />
          ) : <path className={styles.signal} d="M85 80.5 H1137" />}
          <path className={styles.ambientWave} d="M0 65 C124 42 145 52 250 83 S415 121 490 92 S666 103 735 72 S884 101 1065 70" />
          {[85, 292, 500, 708, 1137].map((x) => <circle key={x} cx={x} cy="80.5" r="12" />)}
        </svg>
        <svg className={styles.mobileFlow} viewBox="0 0 1065 245" aria-hidden="true">
          <path className={styles.mobileSignal} d="M22 65 C124 10 177 22 250 70 S395 128 490 110 S635 72 735 72 S855 83 995 82" />
          <path className={styles.mobileWave} d="M0 65 C124 42 145 52 250 83 S415 121 490 92 S666 103 735 72 S884 101 1065 70" />
          {[22, 250, 490, 735, 995].map((x, index) => <circle key={x} cx={x} cy={[65, 70, 110, 72, 82][index]} r="12" />)}
        </svg>
        {copy.nodes.map((node, index) => (
          <div className={`${styles.flowNode} ${styles[`flowNode${index}`]}`} key={node.title}>
            <b>{node.title}</b>
            <span>{node.lines.map((line) => <span key={line}>{line}</span>)}</span>
          </div>
        ))}
      </div>
      <div className={styles.gate} style={artboardNodeStyle(box.authorityGate)} data-artboard-node="authorityGate" data-artboard-x="1120" data-artboard-y="444" data-artboard-w="210" data-artboard-h="320">
        {animate ? <motion.span className={styles.gateCheck} data-gate-check aria-hidden="true" initial={{ opacity: 0.72 }} animate={{ opacity: [0.72, 0.72, 1, 1, 0.72] }} transition={selectedWorkPathLoop(2.45)}>
          ✓
        </motion.span> : <span className={styles.gateCheck} data-gate-check aria-hidden="true">✓</span>}
        <b aria-label={copy.gate.label}><span className={styles.gateDesktopLabel}>{copy.gate.label}</span><span className={styles.gateMobileLabel} aria-hidden="true">Gate</span></b>
        <ul>{copy.gate.conditions.map((condition) => <li key={condition}>{condition}</li>)}</ul>
      </div>
      <div className={styles.modes} style={artboardNodeStyle(box.actionModes)} data-artboard-node="actionModes" data-artboard-x="1345" data-artboard-y="412" data-artboard-w="300" data-artboard-h="300">
        <b>Action modes</b>
        {copy.modes.map((mode, index) => {
          const className = index === 2 ? styles.controlled : "";
          const contents = <><i aria-hidden="true" /><span><strong>{mode.title}</strong><small>{mode.detail}</small></span></>;
          return animate && index === 2 ? (
            <motion.div className={className} key={mode.title} initial={{ boxShadow: "0 0 0 rgb(85 196 126 / 0%)" }} animate={{ boxShadow: ["0 0 0 rgb(85 196 126 / 0%)", "0 0 18px rgb(85 196 126 / 34%)", "0 0 0 rgb(85 196 126 / 12%)"] }} transition={{ delay: 3.35, duration: 1.8, repeat: Infinity, repeatDelay: 2.75, ease: "easeInOut" }}>{contents}</motion.div>
          ) : <div className={className} key={mode.title}>{contents}</div>;
        })}
      </div>
      <span className={styles.footerLine} style={artboardNodeStyle(box.footerAccent)} aria-hidden="true" />
      <p className={styles.footer} style={artboardNodeStyle(box.footer)} data-artboard-node="footer" data-artboard-x="98" data-artboard-y="783" data-artboard-w="540" data-artboard-h="42">{copy.footer}</p>
    </ProjectArtboard>
  );
}
