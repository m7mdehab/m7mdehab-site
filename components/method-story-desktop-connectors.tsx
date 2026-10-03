"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type {
  MethodStoryConnectorGeometry,
} from "@/components/method-story-connector-geometry";

type Progress = MotionValue<number>;

function MeasuredConnectorPath({
  d,
  progress,
  window,
  enhanced,
  hot = false,
  testId,
}: {
  d: string;
  progress: Progress;
  window: readonly [number, number];
  enhanced: boolean;
  hot?: boolean;
  testId?: string;
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
      data-method-measured-connector={testId}
      style={enhanced ? { pathLength, opacity } : undefined}
    />
  );
}

export function MethodStoryDesktopConnectors({
  geometry,
  progress,
  enhanced,
}: {
  geometry: MethodStoryConnectorGeometry | null;
  progress: Progress;
  enhanced: boolean;
}) {
  const busOpacity = useTransform(progress, [0.66, 0.8], [0.16, 0.86]);
  const nodeOpacity = useTransform(progress, [0.7, 0.84], [0.16, 1]);

  if (!geometry) return null;

  return (
    <svg
      className="method-story__connectors method-story__connectors--measured"
      viewBox={`0 0 ${geometry.viewport.width} ${geometry.viewport.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      data-method-measured-connectors
    >
      <g data-method-connectors="input-expose">
        {geometry.inputToExpose.map((d, index) => (
          <MeasuredConnectorPath
            key={`input-${index}`}
            d={d}
            progress={progress}
            window={[0.08 + index * 0.018, 0.24 + index * 0.018]}
            enhanced={enhanced}
            testId={`input-expose-${index + 1}`}
          />
        ))}
      </g>

      <g data-method-connectors="expose-reduce">
        {geometry.exposeToReduce.map((d, index) => (
          <MeasuredConnectorPath
            key={`expose-${index}`}
            d={d}
            progress={progress}
            window={[0.2 + index * 0.008, 0.47 + index * 0.008]}
            enhanced={enhanced}
            hot={index === 4 || index === 5}
            testId={`expose-reduce-${index + 1}`}
          />
        ))}
      </g>

      <MeasuredConnectorPath
        d={geometry.reduceToBuild}
        progress={progress}
        window={[0.5, 0.66]}
        enhanced={enhanced}
        hot
        testId="reduce-build"
      />

      <g data-method-connectors="build-bus">
        <MeasuredConnectorPath
          d={geometry.buildEntry}
          progress={progress}
          window={[0.62, 0.74]}
          enhanced={enhanced}
          hot
          testId="build-entry"
        />
        <motion.path
          d={geometry.buildBus}
          className="method-story__path method-story__path--bus"
          style={enhanced ? { opacity: busOpacity } : undefined}
          data-method-measured-connector="build-bus"
        />
        {geometry.buildBusNodes.map((node, index) => (
          <motion.circle
            key={`bus-node-${index}`}
            cx={node.x}
            cy={node.y}
            r="3.5"
            className="method-story__measured-node"
            style={enhanced ? { opacity: nodeOpacity } : undefined}
            data-method-measured-node={index + 1}
          />
        ))}
      </g>

      <g data-method-connectors="build-outcomes">
        {geometry.buildToOutcomes.map((d, index) => (
          <MeasuredConnectorPath
            key={`outcome-${index}`}
            d={d}
            progress={progress}
            window={[0.7 + index * 0.018, 0.88 + index * 0.018]}
            enhanced={enhanced}
            testId={`build-outcome-${index + 1}`}
          />
        ))}
      </g>
    </svg>
  );
}
