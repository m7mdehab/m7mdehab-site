import type { Locator } from "@playwright/test";

export type TestPoint = {
  x: number;
  y: number;
};

export type TestRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
};

function parseNumbers(pathData: string): number[] {
  return (pathData.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
}

export async function readSvgPathEndpoints(
  path: Locator,
): Promise<{ start: TestPoint; end: TestPoint }> {
  const d = await path.getAttribute("d");
  if (!d) throw new Error("SVG connector path has no d attribute");

  const values = parseNumbers(d);
  if (values.length < 4) {
    throw new Error(`SVG connector path cannot be parsed: ${d}`);
  }

  return {
    start: { x: values[0], y: values[1] },
    end: {
      x: values[values.length - 2],
      y: values[values.length - 1],
    },
  };
}

export async function readLocalRect(
  root: Locator,
  target: Locator,
): Promise<TestRect> {
  const readRect = (element: Element) => {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  const [rootBox, targetBox] = await Promise.all([
    root.evaluate(readRect),
    target.evaluate(readRect),
  ]);

  const left = targetBox.x - rootBox.x;
  const top = targetBox.y - rootBox.y;
  const width = targetBox.width;
  const height = targetBox.height;

  return {
    left,
    right: left + width,
    top,
    bottom: top + height,
    width,
    height,
    centerX: left + width / 2,
    centerY: top + height / 2,
  };
}

export function edgeCenter(
  rect: TestRect,
  edge: "left" | "right",
): TestPoint {
  return {
    x: edge === "left" ? rect.left : rect.right,
    y: rect.centerY,
  };
}

export function edgeAtRatio(
  rect: TestRect,
  edge: "left" | "right",
  ratio: number,
): TestPoint {
  return {
    x: edge === "left" ? rect.left : rect.right,
    y: rect.top + rect.height * ratio,
  };
}

export function pointError(actual: TestPoint, expected: TestPoint): number {
  return Math.hypot(actual.x - expected.x, actual.y - expected.y);
}

export function axisError(
  actual: TestPoint,
  expected: TestPoint,
): { x: number; y: number } {
  return {
    x: Math.abs(actual.x - expected.x),
    y: Math.abs(actual.y - expected.y),
  };
}

export function withinVerticalBounds(
  point: TestPoint,
  rect: TestRect,
  tolerance = 0,
): boolean {
  return (
    point.y >= rect.top - tolerance &&
    point.y <= rect.bottom + tolerance
  );
}
