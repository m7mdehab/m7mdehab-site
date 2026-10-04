"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

type Progress = MotionValue<number>;
type MobileStageId = "messy" | "expose" | "reduce" | "build" | "outcomes";

const STAGE_WINDOWS: Record<MobileStageId, readonly [number, number]> = {
  messy: [0, 0.18],
  expose: [0.12, 0.36],
  reduce: [0.32, 0.58],
  build: [0.52, 0.78],
  outcomes: [0.72, 1],
};

function AnimatedPath({
  d,
  progress,
  window,
  enhanced,
  hot = false,
  handoff,
}: {
  d: string;
  progress: Progress;
  window: readonly [number, number];
  enhanced: boolean;
  hot?: boolean;
  handoff?: "in" | "out";
}) {
  const pathLength = useTransform(progress, [...window], [0, 1]);
  const opacity = useTransform(
    progress,
    [...window],
    [0.18, hot ? 0.96 : 0.62],
  );

  return (
    <motion.path
      d={d}
      className={
        hot
          ? "method-story__mobile-path method-story__mobile-path--hot"
          : "method-story__mobile-path"
      }
      style={enhanced ? { pathLength, opacity } : undefined}
      data-mobile-handoff={handoff}
    />
  );
}

function Node({
  cx,
  cy,
  progress,
  window,
  enhanced,
  hot = false,
}: {
  cx: number;
  cy: number;
  progress: Progress;
  window: readonly [number, number];
  enhanced: boolean;
  hot?: boolean;
}) {
  const opacity = useTransform(progress, [...window], [0.2, 1]);
  const scale = useTransform(progress, [...window], [0.72, 1]);

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={hot ? 4.2 : 3.1}
      className={
        hot
          ? "method-story__mobile-node method-story__mobile-node--hot"
          : "method-story__mobile-node"
      }
      style={enhanced ? { opacity, scale, transformOrigin: `${cx}px ${cy}px` } : undefined}
    />
  );
}

export function MethodStoryMobileConnectors({
  stage,
  progress,
  enhanced,
}: {
  stage: MobileStageId;
  progress: Progress;
  enhanced: boolean;
}) {
  const window = STAGE_WINDOWS[stage];

  if (stage === "messy") {
    const paths = [
      "M 180 58 C 226 58 244 118 286 175",
      "M 268 126 C 282 126 288 146 286 175",
      "M 190 208 C 238 208 258 192 286 175",
      "M 282 282 C 292 252 294 208 286 175",
      "M 286 175 C 310 175 330 175 350 175",
    ];
    return (
      <svg
        className="method-story__mobile-connectors"
        viewBox="0 0 350 350"
        preserveAspectRatio="none"
        aria-hidden="true"
        data-mobile-connectors="messy"
      >
        {paths.map((d, index) => (
          <AnimatedPath
            key={d}
            d={d}
            progress={progress}
            window={window}
            enhanced={enhanced}
            hot={index === paths.length - 1}
            handoff={index === paths.length - 1 ? "out" : undefined}
          />
        ))}
        <Node
          cx={286}
          cy={175}
          progress={progress}
          window={window}
          enhanced={enhanced}
          hot
        />
      </svg>
    );
  }

  if (stage === "expose") {
    const fan = [
      "M 223 96 C 263 96 280 132 308 175",
      "M 230 114 C 270 114 284 142 308 175",
      "M 236 132 C 274 132 288 150 308 175",
      "M 242 150 C 280 150 292 160 308 175",
      "M 242 168 C 282 168 296 170 308 175",
      "M 242 186 C 282 186 296 180 308 175",
      "M 236 204 C 274 204 288 192 308 175",
      "M 230 222 C 270 222 284 188 308 175",
      "M 223 240 C 263 240 280 184 308 175",
      "M 216 258 C 256 258 276 180 308 175",
    ];
    return (
      <svg
        className="method-story__mobile-connectors"
        viewBox="0 0 350 350"
        preserveAspectRatio="none"
        aria-hidden="true"
        data-mobile-connectors="expose"
      >
        <AnimatedPath
          d="M 0 175 C 24 175 44 175 66 175"
          progress={progress}
          window={window}
          enhanced={enhanced}
          hot
          handoff="in"
        />
        {fan.map((d, index) => (
          <AnimatedPath
            key={d}
            d={d}
            progress={progress}
            window={window}
            enhanced={enhanced}
            hot={index === 4 || index === 5}
          />
        ))}
        <AnimatedPath
          d="M 308 175 C 322 175 336 175 350 175"
          progress={progress}
          window={window}
          enhanced={enhanced}
          hot
          handoff="out"
        />
        <Node
          cx={308}
          cy={175}
          progress={progress}
          window={window}
          enhanced={enhanced}
          hot
        />
      </svg>
    );
  }

  if (stage === "reduce") {
    const incoming = [
      "M 0 105 C 48 105 74 146 118 175",
      "M 0 128 C 52 128 78 154 118 175",
      "M 0 151 C 54 151 82 162 118 175",
      "M 0 175 C 56 175 84 175 118 175",
      "M 0 199 C 54 199 82 188 118 175",
      "M 0 222 C 52 222 78 196 118 175",
      "M 0 245 C 48 245 74 204 118 175",
    ];
    return (
      <svg
        className="method-story__mobile-connectors"
        viewBox="0 0 350 350"
        preserveAspectRatio="none"
        aria-hidden="true"
        data-mobile-connectors="reduce"
      >
        {incoming.map((d, index) => (
          <AnimatedPath
            key={d}
            d={d}
            progress={progress}
            window={window}
            enhanced={enhanced}
            hot={index === 3}
            handoff={index === 3 ? "in" : undefined}
          />
        ))}
        <AnimatedPath
          d="M 118 175 C 146 175 170 175 194 175"
          progress={progress}
          window={window}
          enhanced={enhanced}
          hot
        />
        <AnimatedPath
          d="M 286 175 C 308 175 330 175 350 175"
          progress={progress}
          window={window}
          enhanced={enhanced}
          hot
          handoff="out"
        />
        <Node
          cx={118}
          cy={175}
          progress={progress}
          window={window}
          enhanced={enhanced}
          hot
        />
      </svg>
    );
  }

  if (stage === "build") {
    const nodeYs = [86, 130, 175, 220, 264];
    return (
      <svg
        className="method-story__mobile-connectors"
        viewBox="0 0 350 350"
        preserveAspectRatio="none"
        aria-hidden="true"
        data-mobile-connectors="build"
      >
        <AnimatedPath
          d="M 0 175 C 30 175 54 175 80 175"
          progress={progress}
          window={window}
          enhanced={enhanced}
          hot
          handoff="in"
        />
        <AnimatedPath
          d="M 220 175 C 242 175 260 175 276 175"
          progress={progress}
          window={window}
          enhanced={enhanced}
          hot
        />
        <AnimatedPath
          d="M 276 86 L 276 264"
          progress={progress}
          window={window}
          enhanced={enhanced}
        />
        {nodeYs.map((y) => (
          <Node
            key={y}
            cx={276}
            cy={y}
            progress={progress}
            window={window}
            enhanced={enhanced}
            hot={y === 175}
          />
        ))}
        <AnimatedPath
          d="M 276 175 C 302 175 326 175 350 175"
          progress={progress}
          window={window}
          enhanced={enhanced}
          hot
          handoff="out"
        />
      </svg>
    );
  }

  const rowYs = [72, 124, 175, 226, 278];
  return (
    <svg
      className="method-story__mobile-connectors"
      viewBox="0 0 350 350"
      preserveAspectRatio="none"
      aria-hidden="true"
      data-mobile-connectors="outcomes"
    >
      <AnimatedPath
        d="M 0 175 C 20 175 34 175 48 175"
        progress={progress}
        window={window}
        enhanced={enhanced}
        hot
        handoff="in"
      />
      <AnimatedPath
        d="M 48 72 L 48 278"
        progress={progress}
        window={window}
        enhanced={enhanced}
      />
      {rowYs.map((y, index) => (
        <g key={y}>
          <Node
            cx={48}
            cy={y}
            progress={progress}
            window={window}
            enhanced={enhanced}
            hot={index === 2}
          />
          <AnimatedPath
            d={`M 48 ${y} C 58 ${y} 66 ${y} 76 ${y}`}
            progress={progress}
            window={window}
            enhanced={enhanced}
          />
        </g>
      ))}
    </svg>
  );
}
