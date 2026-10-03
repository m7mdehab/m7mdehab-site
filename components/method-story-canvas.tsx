"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  METHOD_STORY,
  METHOD_STORY_CONNECTORS,
  METHOD_STORY_MOTION,
} from "@/components/method-story-contract";
import {
  MethodAnalyticsIcon,
  MethodCheckIcon,
  MethodConflictIcon,
  MethodCubeIcon,
  MethodDatabaseIcon,
  MethodDecisionIcon,
  MethodDocumentIcon,
  MethodEvidenceIcon,
  MethodModelIcon,
  MethodNetworkIcon,
  MethodUnknownIcon,
} from "@/components/method-story-icons";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";

type Progress = MotionValue<number>;

const desktopMethodQuery = "(min-width: 1100px)";

function subscribeDesktopMethodStory(onStoreChange: () => void) {
  const media = window.matchMedia(desktopMethodQuery);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getDesktopMethodSnapshot() {
  return window.matchMedia(desktopMethodQuery).matches;
}

function useDesktopMethodStory() {
  return useSyncExternalStore(
    subscribeDesktopMethodStory,
    getDesktopMethodSnapshot,
    () => false,
  );
}

const stageMap = Object.fromEntries(
  METHOD_STORY.stages.map((stage) => [stage.id, stage]),
) as Record<
  (typeof METHOD_STORY.stages)[number]["id"],
  (typeof METHOD_STORY.stages)[number]
>;

function StageHeader({ id }: { id: keyof typeof stageMap }) {
  const stage = stageMap[id];
  return (
    <header className="method-story__stage-head">
      <span>{stage.index}</span>
      <h3>{stage.title}</h3>
      <p>{stage.detail}</p>
    </header>
  );
}

function inputIcon(icon: (typeof METHOD_STORY.inputs)[number]["icon"]) {
  const props = { className: "method-story__micro-icon" };
  if (icon === "database") return <MethodDatabaseIcon {...props} />;
  if (icon === "conflict") return <MethodConflictIcon {...props} />;
  if (icon === "document") return <MethodDocumentIcon {...props} />;
  return <MethodUnknownIcon {...props} />;
}

function outputIcon(icon: (typeof METHOD_STORY.outputs)[number]["icon"]) {
  const props = { className: "method-story__micro-icon" };
  if (icon === "database") return <MethodDatabaseIcon {...props} />;
  if (icon === "analytics") return <MethodAnalyticsIcon {...props} />;
  if (icon === "model") return <MethodModelIcon {...props} />;
  if (icon === "network") return <MethodNetworkIcon {...props} />;
  return <MethodCubeIcon {...props} />;
}

function AnimatedInput({
  input,
  index,
  progress,
  enhanced,
}: {
  input: (typeof METHOD_STORY.inputs)[number];
  index: number;
  progress: Progress;
  enhanced: boolean;
}) {
  const x = useTransform(progress, [0, 0.18], [index % 2 ? 14 : -12, 0]);
  const y = useTransform(progress, [0, 0.18], [index % 2 ? -8 : 11, 0]);
  const rotate = useTransform(progress, [0, 0.18], [index % 2 ? 3 : -3, 0]);
  const opacity = useTransform(progress, [0, 0.11], [0.42, 1]);

  return (
    <div
      className={`method-story__input-position method-story__input-position--${index + 1}`}
    >
      <motion.div
        className="method-story__input-card"
        style={enhanced ? { x, y, rotate, opacity } : undefined}
        data-method-input={input.id}
      >
        {inputIcon(input.icon)}
        <strong>{input.label}</strong>
      </motion.div>
    </div>
  );
}

function RevealSheet({
  index,
  progress,
  enhanced,
}: {
  index: number;
  progress: Progress;
  enhanced: boolean;
}) {
  const start = 0.16 + index * 0.022;
  const end = Math.min(0.34, start + 0.12);
  const x = useTransform(progress, [start, end], [-13 + index * 2, 0]);
  const y = useTransform(progress, [start, end], [9, 0]);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.div
      className={`method-story__evidence-sheet method-story__evidence-sheet--${index + 1}`}
      style={enhanced ? { x, y, opacity } : undefined}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
    </motion.div>
  );
}

function RevealTag({
  tag,
  index,
  progress,
  enhanced,
}: {
  tag: (typeof METHOD_STORY.exposeTags)[number];
  index: number;
  progress: Progress;
  enhanced: boolean;
}) {
  const start = 0.24 + index * 0.035;
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  const y = useTransform(progress, [start, start + 0.08], [6, 0]);

  return (
    <motion.span
      className={`method-story__evidence-tag method-story__evidence-tag--${tag.tone}`}
      style={enhanced ? { opacity, y } : undefined}
    >
      {tag.label}
    </motion.span>
  );
}

function BranchPath({
  d,
  index,
  progress,
  enhanced,
}: {
  d: string;
  index: number;
  progress: Progress;
  enhanced: boolean;
}) {
  const start = 0.34 + index * 0.012;
  const pathLength = useTransform(progress, [start, 0.53], [0, 1]);
  const opacity = useTransform(
    progress,
    [start, 0.48, 0.6],
    [0.18, index === 3 ? 1 : 0.58, index === 3 ? 1 : 0.22],
  );

  return (
    <motion.path
      d={d}
      className={
        index === 3
          ? "method-story__path method-story__path--hot"
          : "method-story__path"
      }
      style={enhanced ? { pathLength, opacity } : undefined}
    />
  );
}

function ConnectorPath({
  d,
  window,
  progress,
  enhanced,
  hot = false,
  kind,
}: {
  d: string;
  window: readonly [number, number];
  progress: Progress;
  enhanced: boolean;
  hot?: boolean;
  kind?: string;
}) {
  const pathLength = useTransform(progress, [...window], [0, 1]);
  const opacity = useTransform(
    progress,
    [...window],
    [0.16, hot ? 0.95 : 0.58],
  );

  return (
    <motion.path
      d={d}
      className={
        hot
          ? "method-story__path method-story__path--hot"
          : "method-story__path"
      }
      style={enhanced ? { pathLength, opacity } : undefined}
      data-method-connector={kind}
    />
  );
}

function BuildLayer({
  index,
  progress,
  enhanced,
}: {
  index: number;
  progress: Progress;
  enhanced: boolean;
}) {
  const start = 0.56 + (2 - index) * 0.055;
  const y = useTransform(progress, [start, start + 0.14], [12, 0]);
  const opacity = useTransform(progress, [start, start + 0.11], [0.2, 1]);

  return (
    <motion.div
      className={`method-story__system-layer method-story__system-layer--${index + 1}`}
      style={enhanced ? { y, opacity } : undefined}
      aria-hidden="true"
    >
      <span className="method-story__system-top" />
      <span className="method-story__system-front">
        {index === 0 ? (
          <MethodDatabaseIcon />
        ) : index === 1 ? (
          <MethodAnalyticsIcon />
        ) : (
          <MethodCubeIcon />
        )}
      </span>
      <span className="method-story__system-side" />
    </motion.div>
  );
}

function OutputRow({
  output,
  index,
  progress,
  enhanced,
}: {
  output: (typeof METHOD_STORY.outputs)[number];
  index: number;
  progress: Progress;
  enhanced: boolean;
}) {
  const start = 0.76 + index * 0.035;
  const end = Math.min(0.98, start + 0.12);
  const x = useTransform(progress, [start, end], [-10, 0]);
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const checkScale = useTransform(progress, [start + 0.04, end], [0.65, 1]);

  return (
    <motion.li
      className="method-story__output-row"
      style={enhanced ? { x, opacity } : undefined}
      data-method-output={output.id}
    >
      <motion.span
        className="method-story__output-check"
        style={enhanced ? { scale: checkScale } : undefined}
        aria-hidden="true"
      >
        <MethodCheckIcon />
      </motion.span>
      {outputIcon(output.icon)}
      <strong>{output.label}</strong>
    </motion.li>
  );
}

export function MethodStoryCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useDesktopMethodStory();
  const enhanced = !reducedMotion;

  const { scrollYProgress: standardScrollYProgress } = useScroll({
    target: rootRef,
    offset: [...METHOD_STORY_MOTION.scrollOffset],
  });
  const { scrollYProgress: desktopScrollYProgress } = useScroll({
    target: rootRef,
    offset: [...METHOD_STORY_MOTION.desktopScrollOffset],
  });

  const standardProgress = useSpring(
    standardScrollYProgress,
    METHOD_STORY_MOTION.spring,
  );
  const desktopProgress = useSpring(
    desktopScrollYProgress,
    METHOD_STORY_MOTION.spring,
  );
  const progress = isDesktop ? desktopProgress : standardProgress;

  const exposeOpacity = useTransform(progress, [0.16, 0.3], [0.45, 1]);
  const reduceOpacity = useTransform(progress, [0.34, 0.49], [0.45, 1]);
  const buildOpacity = useTransform(progress, [0.56, 0.7], [0.45, 1]);
  const outputOpacity = useTransform(progress, [0.76, 0.88], [0.55, 1]);
  const decisionScale = useTransform(progress, [0.43, 0.58], [0.88, 1]);
  const decisionOpacity = useTransform(progress, [0.43, 0.56], [0.35, 1]);

  return (
    <div
      ref={rootRef}
      className="method-story__canvas"
      data-method-canvas
      data-motion-mode={
        reducedMotion ? "reduced" : enhanced ? "enhanced" : "static"
      }
    >
      <svg
        className="method-story__connectors"
        viewBox="0 0 1500 410"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {METHOD_STORY_CONNECTORS.inputToExpose.map((d, index) => (
          <ConnectorPath
            key={d}
            d={d}
            window={[0.08 + index * 0.02, 0.28 + index * 0.02]}
            progress={progress}
            enhanced={enhanced}
            kind="input-to-expose"
          />
        ))}
        {METHOD_STORY_CONNECTORS.exposeToReduce.map((d, index) => (
          <ConnectorPath
            key={d}
            d={d}
            window={[0.24 + index * 0.02, 0.46 + index * 0.02]}
            progress={progress}
            enhanced={enhanced}
            kind="expose-to-reduce"
          />
        ))}
        <motion.circle
          className="method-story__decision-node"
          cx="625"
          cy="120"
          r="5"
          style={enhanced ? { opacity: reduceOpacity } : undefined}
        />
        <ConnectorPath
          d={METHOD_STORY_CONNECTORS.reduceConvergedToDecision}
          window={[0.43, 0.56]}
          progress={progress}
          enhanced={enhanced}
          hot
          kind="converged-to-decision"
        />
        <ConnectorPath
          d={METHOD_STORY_CONNECTORS.reduceToBuild}
          window={[0.54, 0.72]}
          progress={progress}
          enhanced={enhanced}
          hot
          kind="decision-to-build"
        />
        {METHOD_STORY_CONNECTORS.buildToOutputs.map((d, index) => (
          <ConnectorPath
            key={d}
            d={d}
            window={[0.7 + index * 0.018, 0.88 + index * 0.018]}
            progress={progress}
            enhanced={enhanced}
            kind="build-to-output"
          />
        ))}
      </svg>

      <ol
        className="method-story__journey"
        aria-label="From messy reality to reliable outcomes"
      >
        <li
          className="method-story__stage method-story__stage--messy"
          data-method-stage="messy"
        >
          <StageHeader id="messy" />
          <div className="method-story__input-field">
            {METHOD_STORY.inputs.map((input, index) => (
              <AnimatedInput
                key={input.id}
                input={input}
                index={index}
                progress={progress}
                enhanced={enhanced}
              />
            ))}
            <span
              className="method-story__noise method-story__noise--1"
              aria-hidden="true"
            />
            <span
              className="method-story__noise method-story__noise--2"
              aria-hidden="true"
            />
            <span
              className="method-story__noise method-story__noise--3"
              aria-hidden="true"
            />
            <span
              className="method-story__noise method-story__noise--4"
              aria-hidden="true"
            />
          </div>
        </li>

        <li className="method-story__transformation">
          <ol
            className="method-story__transformation-list"
            aria-label="Transformation stages"
          >
            <motion.li
              className="method-story__stage method-story__stage--expose"
              data-method-stage="expose"
              style={enhanced ? { opacity: exposeOpacity } : undefined}
            >
              <StageHeader id="expose" />
              <div className="method-story__evidence-field">
                <MethodEvidenceIcon
                  className="method-story__stage-symbol"
                  aria-hidden="true"
                />
                <div
                  className="method-story__evidence-stack"
                  aria-hidden="true"
                >
                  {[0, 1, 2, 3, 4].map((index) => (
                    <RevealSheet
                      key={index}
                      index={index}
                      progress={progress}
                      enhanced={enhanced}
                    />
                  ))}
                </div>
                <div className="method-story__evidence-tags">
                  {METHOD_STORY.exposeTags.map((tag, index) => (
                    <RevealTag
                      key={tag.id}
                      tag={tag}
                      index={index}
                      progress={progress}
                      enhanced={enhanced}
                    />
                  ))}
                </div>
              </div>
            </motion.li>

            <motion.li
              className="method-story__stage method-story__stage--reduce"
              data-method-stage="reduce"
              style={enhanced ? { opacity: reduceOpacity } : undefined}
            >
              <StageHeader id="reduce" />
              <div className="method-story__decision-field">
                <svg viewBox="0 0 220 160" aria-hidden="true">
                  {[
                    "M8 24 C60 24 72 80 112 80",
                    "M8 46 C60 46 72 80 112 80",
                    "M8 68 C62 68 74 80 112 80",
                    "M8 90 C62 90 74 80 112 80",
                    "M8 112 C60 112 72 80 112 80",
                    "M8 134 C60 134 72 80 112 80",
                  ].map((d, index) => (
                    <BranchPath
                      key={d}
                      d={d}
                      index={index}
                      progress={progress}
                      enhanced={enhanced}
                    />
                  ))}
                  <circle
                    className="method-story__decision-node"
                    cx="112"
                    cy="80"
                    r="5"
                  />
                  <path
                    className="method-story__path method-story__path--hot"
                    d="M117 80H150"
                  />
                </svg>
                <motion.div
                  className="method-story__decision-module"
                  style={
                    enhanced
                      ? { scale: decisionScale, opacity: decisionOpacity }
                      : undefined
                  }
                  aria-hidden="true"
                >
                  <MethodDecisionIcon />
                  <i className="is-selected" />
                  <i />
                  <i />
                </motion.div>
              </div>
            </motion.li>

            <motion.li
              className="method-story__stage method-story__stage--build"
              data-method-stage="build"
              style={enhanced ? { opacity: buildOpacity } : undefined}
            >
              <StageHeader id="build" />
              <div className="method-story__build-field">
                <div className="method-story__system-stack">
                  {[0, 1, 2].map((index) => (
                    <BuildLayer
                      key={index}
                      index={index}
                      progress={progress}
                      enhanced={enhanced}
                    />
                  ))}
                </div>
                <span className="method-story__system-bus" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            </motion.li>
          </ol>
        </li>

        <motion.li
          className="method-story__stage method-story__stage--outcomes"
          data-method-stage="outcomes"
          style={enhanced ? { opacity: outputOpacity } : undefined}
        >
          <StageHeader id="outcomes" />
          <ul className="method-story__outputs">
            {METHOD_STORY.outputs.map((output, index) => (
              <OutputRow
                key={output.id}
                output={output}
                index={index}
                progress={progress}
                enhanced={enhanced}
              />
            ))}
          </ul>
        </motion.li>
      </ol>
    </div>
  );
}
