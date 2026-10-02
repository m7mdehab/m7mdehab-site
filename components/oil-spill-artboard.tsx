import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";
import { artboardNodeStyle, selectedWorkArtboards, selectedWorkCopy, type ArtboardDebugMode } from "@/data/selected-work-artboards";
import { ProjectArtboard } from "@/components/project-artboard";
import { SELECTED_WORK_FORWARD_OPACITY, SELECTED_WORK_FORWARD_PATH, selectedWorkPathLoop } from "@/components/selected-work-motion";
import styles from "./oil-spill-artboard.module.css";

const box = selectedWorkArtboards.projects["oil-spill-detection"].desktop;
const copy = selectedWorkCopy["oil-spill-detection"];

export function OilSpillArtboard({ debugMode = "code", showGrid = false, isActive = false, transitionEnabled = false }: { debugMode?: ArtboardDebugMode; showGrid?: boolean; isActive?: boolean; transitionEnabled?: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const animate = isActive && debugMode === "code" && !reducedMotion;
  return (
    <ProjectArtboard project="oil-spill-detection" debugMode={debugMode} showGrid={showGrid} motionEnabled={animate} transitionEnabled={transitionEnabled} active={isActive}>
      <h3 className={styles.title} aria-label={`${copy.titleLine1} ${copy.titleLine2}`} style={artboardNodeStyle(box.title)} data-project-title data-mobile-one-line="oil-title" data-artboard-node="title" data-artboard-x="88" data-artboard-y="132" data-artboard-w="680" data-artboard-h="285">
        <span>{copy.titleLine1}</span><span>{copy.titleLine2}</span>
      </h3>
      <span className={styles.accent} style={artboardNodeStyle(box.accentLine)} aria-hidden="true" />
      <p className={styles.tagline} style={artboardNodeStyle(box.tagline)} data-mobile-one-line="oil-support" data-artboard-node="tagline" data-artboard-x="90" data-artboard-y="466" data-artboard-w="650" data-artboard-h="42">{copy.tagline}</p>
      <p className={styles.skills} style={artboardNodeStyle(box.skills)} data-mobile-one-line="oil-categories" data-artboard-node="skills" data-artboard-x="90" data-artboard-y="520" data-artboard-w="650" data-artboard-h="34">{copy.skills}</p>
      <svg className={styles.contour} style={artboardNodeStyle(box.detectionOverlay)} viewBox="0 0 790 720" aria-hidden="true" data-artboard-node="detectionContour" data-artboard-x="790" data-artboard-y="100" data-artboard-w="790" data-artboard-h="720">
        <path className={styles.spill} d="M172 13 C206 34 213 59 250 72 C288 87 280 118 310 133 C351 151 351 176 380 192 C421 214 406 240 445 260 C484 280 489 312 527 319 C571 329 576 358 610 379 C645 402 626 428 659 445 C698 465 683 490 712 504 C739 519 728 549 700 566 C664 587 673 620 640 634 C605 651 589 674 554 669 C521 663 514 634 487 627 C453 620 443 594 409 593 C370 591 356 565 326 552 C297 539 289 515 259 501 C231 488 232 460 205 444 C179 428 185 403 159 386 C133 369 147 341 122 325 C98 310 112 282 93 264 C77 247 97 221 111 207 C128 189 122 170 142 154 C160 139 148 116 165 99 C181 83 157 58 169 41 C176 31 166 22 172 13Z" />
        {animate ? (
          <motion.path className={styles.edge} d="M172 13 C206 34 213 59 250 72 C288 87 280 118 310 133 C351 151 351 176 380 192 C421 214 406 240 445 260 C484 280 489 312 527 319 C571 329 576 358 610 379 C645 402 626 428 659 445 C698 465 683 490 712 504 C739 519 728 549 700 566 C664 587 673 620 640 634 C605 651 589 674 554 669 C521 663 514 634 487 627 C453 620 443 594 409 593 C370 591 356 565 326 552 C297 539 289 515 259 501 C231 488 232 460 205 444 C179 428 185 403 159 386 C133 369 147 341 122 325 C98 310 112 282 93 264 C77 247 97 221 111 207 C128 189 122 170 142 154 C160 139 148 116 165 99 C181 83 157 58 169 41 C176 31 166 22 172 13Z" initial={{ pathLength: 0 }} animate={{ pathLength: SELECTED_WORK_FORWARD_PATH, opacity: SELECTED_WORK_FORWARD_OPACITY }} transition={selectedWorkPathLoop(2.5, 2.5, 0.08, 1.3)} />
        ) : (
          <path className={styles.edge} d="M172 13 C206 34 213 59 250 72 C288 87 280 118 310 133 C351 151 351 176 380 192 C421 214 406 240 445 260 C484 280 489 312 527 319 C571 329 576 358 610 379 C645 402 626 428 659 445 C698 465 683 490 712 504 C739 519 728 549 700 566 C664 587 673 620 640 634 C605 651 589 674 554 669 C521 663 514 634 487 627 C453 620 443 594 409 593 C370 591 356 565 326 552 C297 539 289 515 259 501 C231 488 232 460 205 444 C179 428 185 403 159 386 C133 369 147 341 122 325 C98 310 112 282 93 264 C77 247 97 221 111 207 C128 189 122 170 142 154 C160 139 148 116 165 99 C181 83 157 58 169 41 C176 31 166 22 172 13Z" />
        )}
        <path className={styles.leader} d="M443 267 H552 V238 H614" />
        <circle className={styles.anchor} cx="443" cy="267" r="7" />
        <path className={`${styles.lookLine} ${styles.lookLineDesktop}`} d="M218 514 H178 V556 H120" />
        <path className={`${styles.lookLine} ${styles.lookLineMobile}`} d="M218 514 H98 V554 H25" />
        <circle className={styles.lookAnchor} cx="218" cy="514" r="6" />
      </svg>
      <div className={styles.detected} style={artboardNodeStyle(box.detectedLabel)} data-mobile-one-line="oil-detected-label" data-artboard-node="detectedLabel" data-artboard-x="1418" data-artboard-y="302" data-artboard-w="170" data-artboard-h="70">{copy.detected.split("\n").map((line) => <span key={line}>{line}</span>)}</div>
      <div className={styles.lookalike} style={artboardNodeStyle(box.lookalikeLabel)} data-mobile-one-line="oil-lookalike" data-artboard-node="lookalikeLabel" data-artboard-x="682" data-artboard-y="605" data-artboard-w="230" data-artboard-h="72">{copy.lookalike.split("\n").map((line) => <span key={line}>{line}</span>)}</div>
    </ProjectArtboard>
  );
}
