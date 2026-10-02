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

/** Convert a source-pixel coordinate into a percentage of the canonical artboard. */
export function artboardPercent(value: number, axis: "x" | "y") {
  return `${(value / (axis === "x" ? ARTBOARD_WIDTH : ARTBOARD_HEIGHT)) * 100}%`;
}

/**
 * DOM contract expected by the visual QA tests.
 * Every meaningful foreground group should expose data-artboard-node and the canonical source box.
 */
export type ArtboardNodeContract = {
  "data-artboard-node": string;
  "data-artboard-x": number;
  "data-artboard-y": number;
  "data-artboard-w": number;
  "data-artboard-h": number;
};
