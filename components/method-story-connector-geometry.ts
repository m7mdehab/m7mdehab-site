export type MethodStoryPoint = {
  x: number;
  y: number;
};

export type MethodStoryRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
};

export type MethodStoryConnectorGeometry = {
  viewport: {
    width: number;
    height: number;
  };
  inputToExpose: string[];
  exposeToReduce: string[];
  reduceToBuild: string;
  buildEntry: string;
  buildBus: string;
  buildToOutcomes: string[];
  buildBusNodes: MethodStoryPoint[];
  anchors: {
    messySources: MethodStoryPoint[];
    exposeLeftTargets: MethodStoryPoint[];
    exposeRightSources: MethodStoryPoint[];
    reduceLeft: MethodStoryPoint;
    reduceRight: MethodStoryPoint;
    buildLeft: MethodStoryPoint;
    buildRight: MethodStoryPoint;
    outcomeLeftTargets: MethodStoryPoint[];
  };
};

export const METHOD_STORY_DESKTOP_ANCHORS = {
  messy: [
    '[data-method-anchor="messy-1"]',
    '[data-method-anchor="messy-2"]',
    '[data-method-anchor="messy-3"]',
    '[data-method-anchor="messy-4"]',
  ],
  expose: '[data-method-anchor="expose-stack"]',
  reduce: '[data-method-anchor="reduce-card"]',
  build: '[data-method-anchor="build-system"]',
  outcomes: [
    '[data-method-anchor="outcome-1"]',
    '[data-method-anchor="outcome-2"]',
    '[data-method-anchor="outcome-3"]',
    '[data-method-anchor="outcome-4"]',
    '[data-method-anchor="outcome-5"]',
  ],
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function queryRequired(root: HTMLElement, selector: string): HTMLElement {
  const element = root.querySelector<HTMLElement>(selector);
  if (!element) {
    throw new Error(`Method Story geometry anchor missing: ${selector}`);
  }
  return element;
}

function relativeRect(rootRect: DOMRect, element: HTMLElement): MethodStoryRect {
  const rect = element.getBoundingClientRect();
  const left = rect.left - rootRect.left;
  const top = rect.top - rootRect.top;
  const width = rect.width;
  const height = rect.height;
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

function edgePoint(
  rect: MethodStoryRect,
  edge: "left" | "right",
  ratio = 0.5,
): MethodStoryPoint {
  return {
    x: edge === "left" ? rect.left : rect.right,
    y: rect.top + rect.height * ratio,
  };
}

function distributedRatios(
  count: number,
  start = 0.08,
  end = 0.92,
): number[] {
  if (count <= 1) return [0.5];
  const span = end - start;
  return Array.from({ length: count }, (_, index) => {
    return start + (span * index) / (count - 1);
  });
}

function horizontalCurve(
  start: MethodStoryPoint,
  end: MethodStoryPoint,
  tension = 0.42,
): string {
  const dx = end.x - start.x;
  const controlDistance = Math.max(16, Math.abs(dx) * tension);
  const c1x = start.x + Math.sign(dx || 1) * controlDistance;
  const c2x = end.x - Math.sign(dx || 1) * controlDistance;
  return [
    `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `C ${c1x.toFixed(2)} ${start.y.toFixed(2)}`,
    `${c2x.toFixed(2)} ${end.y.toFixed(2)}`,
    `${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
  ].join(" ");
}

function straightPath(start: MethodStoryPoint, end: MethodStoryPoint): string {
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

export function measureMethodStoryDesktopGeometry(
  root: HTMLElement,
): MethodStoryConnectorGeometry {
  const rootRect = root.getBoundingClientRect();

  const messyRects = METHOD_STORY_DESKTOP_ANCHORS.messy.map((selector) =>
    relativeRect(rootRect, queryRequired(root, selector)),
  );
  const exposeRect = relativeRect(
    rootRect,
    queryRequired(root, METHOD_STORY_DESKTOP_ANCHORS.expose),
  );
  const reduceRect = relativeRect(
    rootRect,
    queryRequired(root, METHOD_STORY_DESKTOP_ANCHORS.reduce),
  );
  const buildRect = relativeRect(
    rootRect,
    queryRequired(root, METHOD_STORY_DESKTOP_ANCHORS.build),
  );
  const outcomeRects = METHOD_STORY_DESKTOP_ANCHORS.outcomes.map((selector) =>
    relativeRect(rootRect, queryRequired(root, selector)),
  );

  const messySources = messyRects.map((rect) => edgePoint(rect, "right"));
  const exposeLeftTargets = distributedRatios(4, 0.14, 0.86).map((ratio) =>
    edgePoint(exposeRect, "left", ratio),
  );

  const exposeRightSources = distributedRatios(10, 0.05, 0.95).map((ratio) =>
    edgePoint(exposeRect, "right", ratio),
  );
  const reduceLeft = edgePoint(reduceRect, "left");
  const reduceRight = edgePoint(reduceRect, "right");
  const buildLeft = edgePoint(buildRect, "left");
  const buildRight = edgePoint(buildRect, "right");
  const outcomeLeftTargets = outcomeRects.map((rect) => edgePoint(rect, "left"));

  const firstOutcomeLeft = Math.min(
    ...outcomeLeftTargets.map((point) => point.x),
  );
  const buildToOutcomeGap = Math.max(1, firstOutcomeLeft - buildRight.x);
  const desiredBusOffset = clamp(buildToOutcomeGap * 0.42, 26, 56);
  const busX = Math.min(
    firstOutcomeLeft - 22,
    buildRight.x + desiredBusOffset,
  );

  const buildBusNodes = outcomeLeftTargets.map((target) => ({
    x: busX,
    y: target.y,
  }));

  const inputToExpose = messySources.map((source, index) =>
    horizontalCurve(source, exposeLeftTargets[index], 0.38),
  );

  const exposeToReduce = exposeRightSources.map((source) =>
    horizontalCurve(source, reduceLeft, 0.46),
  );

  const reduceToBuild = horizontalCurve(reduceRight, buildLeft, 0.36);

  const buildBusTop = buildBusNodes[0];
  const buildBusBottom = buildBusNodes[buildBusNodes.length - 1];
  const buildEntryTarget = {
    x: busX,
    y: buildRight.y,
  };

  const buildEntry = horizontalCurve(buildRight, buildEntryTarget, 0.5);
  const buildBus = straightPath(buildBusTop, buildBusBottom);
  const buildToOutcomes = buildBusNodes.map((node, index) =>
    horizontalCurve(node, outcomeLeftTargets[index], 0.42),
  );

  return {
    viewport: {
      width: rootRect.width,
      height: rootRect.height,
    },
    inputToExpose,
    exposeToReduce,
    reduceToBuild,
    buildEntry,
    buildBus,
    buildToOutcomes,
    buildBusNodes,
    anchors: {
      messySources,
      exposeLeftTargets,
      exposeRightSources,
      reduceLeft,
      reduceRight,
      buildLeft,
      buildRight,
      outcomeLeftTargets,
    },
  };
}

export function pointDistance(
  first: MethodStoryPoint,
  second: MethodStoryPoint,
): number {
  return Math.hypot(first.x - second.x, first.y - second.y);
}
