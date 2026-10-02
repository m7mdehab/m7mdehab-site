/* eslint-disable @next/next/no-img-element -- Artboard backgrounds use supplied responsive WebP sources through native picture selection. */
import type { ArtboardDebugMode, ProjectSlug } from "@/data/selected-work-artboards";
import type { ReactNode } from "react";
import styles from "./project-artboard.module.css";

const projects: Record<ProjectSlug, { title: string }> = {
  presaira: { title: "Presaira" },
  opportunityos: { title: "OpportunityOS" },
  "ghareeb-oglu": { title: "Ghareeb Oglu" },
  "solar-site-selection": { title: "Solar Site Selection" },
  "oil-spill-detection": { title: "Oil Spill Detection" },
  makhbazy: { title: "Makhbazy" },
};

export function ProjectArtboard({
  project,
  debugMode = "code",
  showGrid = false,
  children,
  motionEnabled = false,
  transitionEnabled = false,
  active = false,
}: {
  project: ProjectSlug;
  debugMode?: ArtboardDebugMode;
  showGrid?: boolean;
  children: ReactNode;
  motionEnabled?: boolean;
  transitionEnabled?: boolean;
  active?: boolean;
}) {
  const title = projects[project].title;
  const image = `/selected-work/backgrounds/${project}`;
  const debug = debugMode !== "code";

  return (
    <div
      className={styles.artboard}
      data-project-artboard={project}
      data-evidence-region
      data-artboard-debug={debug ? debugMode : undefined}
      data-motion-active={motionEnabled ? "true" : undefined}
      style={transitionEnabled ? { viewTransitionName: `project-${project}` } : undefined}
      aria-label={`${title} project artboard`}
    >
      <picture className={styles.background}>
        <source
          media="(max-width: 480px)"
          srcSet={`${image}-960.webp`}
          type="image/webp"
        />
        <source
          media="(max-width: 1100px)"
          srcSet={`${image}-1280.webp`}
          type="image/webp"
        />
        <img src={`${image}-1683.webp`} alt="" />
      </picture>

      <div className={styles.content} data-artboard-content>
        {children}
      </div>

      <a className={styles.caseStudyCta} href={`/work/${project}`} tabIndex={active ? 0 : -1} data-conversion="selected-work-to-case-study">
        View case study <span aria-hidden="true">↗</span>
      </a>

      {debug ? (
        <>
          <img
            className={styles.reference}
            src={`/api/dev/selected-work-reference/${project}`}
            alt=""
            aria-hidden="true"
            draggable={false}
          />
          {showGrid ? <div className={styles.coordinateGrid} aria-hidden="true" /> : null}
        </>
      ) : null}
    </div>
  );
}
