import artboardManifest from "@/design/selected-work/manifest/artboards.json";
import productionCopy from "@/design/selected-work/manifest/production-copy.json";
import type { CSSProperties } from "react";

export type ProjectSlug =
  | "presaira"
  | "opportunityos"
  | "ghareeb-oglu"
  | "solar-site-selection"
  | "oil-spill-detection"
  | "makhbazy";

export type ArtboardBox = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type ArtboardTextStyle = ArtboardBox & {
  font: string;
  size: number;
  weight: number;
  trackingEm?: number;
  lineHeight?: number;
  color?: string;
  align?: "left" | "center" | "right";
};

export const ARTBOARD_WIDTH = 1683;
export const ARTBOARD_HEIGHT = 935;
export const ARTBOARD_ASPECT_RATIO = ARTBOARD_WIDTH / ARTBOARD_HEIGHT;

export const selectedWorkArtboards = artboardManifest;
export const selectedWorkCopy = productionCopy;

/** Convert canonical reference coordinates to normalized CSS percentages. */
export function artboardPercent(value: number, axis: "x" | "y") {
  return `${(value / (axis === "x" ? ARTBOARD_WIDTH : ARTBOARD_HEIGHT)) * 100}%`;
}

/** CSS variables keep placement tied to the artboard's canonical coordinate space. */
export function artboardNodeStyle(box: ArtboardBox) {
  return {
    "--artboard-x": artboardPercent(box.x, "x"),
    "--artboard-y": artboardPercent(box.y, "y"),
    "--artboard-w": artboardPercent(box.w, "x"),
    "--artboard-h": artboardPercent(box.h, "y"),
  } as CSSProperties;
}

export type ArtboardDebugMode = "code" | "reference" | "overlay";

/** Stable selectors and source boxes used by visual QA and overlay comparison. */
export type ArtboardNodeContract = {
  "data-artboard-node": string;
  "data-artboard-x": number;
  "data-artboard-y": number;
  "data-artboard-w": number;
  "data-artboard-h": number;
};
