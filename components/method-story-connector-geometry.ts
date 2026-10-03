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
  messyPorts: [
    '[data-method-port="messy-1-out"]',
    '[data-method-port="messy-2-out"]',
    '[data-method-port="messy-3-out"]',
    '[data-method-port="messy-4-out"]',
  ],
  exposeIn: '[data-method-port="expose-in"]',
  evidenceSheets: [
    '[data-method-evidence-sheet="1"]',
    '[data-method-evidence-sheet="2"]',
    '[data-method-evidence-sheet="3"]',
    '[data-method-evidence-sheet="4"]',
    '[data-method-evidence-sheet="5"]',
  ],
  reduceIn: '[data-method-port="reduce-in"]',
  reduceOut: '[data-method-port="reduce-out"]',
  buildIn: '[data-method-port="build-in"]',
  buildOut: '[data-method-port="build-out"]',
  outcomePorts: [
    '[data-method-port="outcome-1-in"]',
    '[data-method-port="outcome-2-in"]',
    '[data-method-port="outcome-3-in"]',
    '[data-method-port="outcome-4-in"]',
    '[data-method-port="outcome-5-in"]',
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

function relativePoint(rootRect: DOMRect, element: HTMLElement): MethodStoryPoint {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left - rootRect.left + rect.width / 2,
    y: rect.top - rootRect.top + rect.height / 2,
  };
}

function visibleEdgeSegment(
  rect: MethodStoryRect,
  edge: "left" | "right",
  occluders: MethodStoryRect[],
  clearance = 2,
): { top: number; bottom: number } {
  const edgeX = edge === "left" ? rect.left : rect.right;
  const start = rect.top + clearance;
  const end = rect.bottom - clearance;
  const covered = occluders
    .filter((other) => edgeX > other.left && edgeX < other.right)
    .map((other) => ({
      top: Math.max(start, other.top - clearance),
      bottom: Math.min(end, other.bottom + clearance),
    }))
    .filter((interval) => interval.bottom > interval.top)
    .sort((first, second) => first.top - second.top);

  const visible: Array<{ top: number; bottom: number }> = [];
  let cursor = start;
  for (const interval of covered) {
    if (interval.top > cursor)
      visible.push({ top: cursor, bottom: interval.top });
    cursor = Math.max(cursor, interval.bottom);
  }
  if (cursor < end) visible.push({ top: cursor, bottom: end });

  const segment = visible.reduce<{ top: number; bottom: number } | null>(
    (largest, current) =>
      !largest || current.bottom - current.top > largest.bottom - largest.top
        ? current
        : largest,
    null,
  );

  if (!segment || segment.bottom - segment.top < 4) {
    throw new Error(`Method Story ${edge} edge has no exposed connector port`);
  }
  return segment;
}

function visibleEdgePoint(
  rect: MethodStoryRect,
  edge: "left" | "right",
  occluders: MethodStoryRect[],
  ratio = 0.5,
): MethodStoryPoint {
  const segment = visibleEdgeSegment(rect, edge, occluders);
  return {
    x: edge === "left" ? rect.left : rect.right,
    y: segment.top + (segment.bottom - segment.top) * ratio,
  };
}

function routedHorizontalPath(
  start: MethodStoryPoint,
  end: MethodStoryPoint,
  laneX: number,
): string {
  const verticalDistance = end.y - start.y;
  if (Math.abs(verticalDistance) < 1) {
    return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
  }

  const radius = Math.min(
    12,
    Math.abs(verticalDistance) / 2,
    (laneX - start.x) / 3,
    (end.x - laneX) / 3,
  );
  const direction = Math.sign(verticalDistance);
  const curveFactor = 0.5523;
  const firstBendEndY = start.y + direction * radius;
  const secondBendStartY = end.y - direction * radius;
  return [
    `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `L ${(laneX - radius).toFixed(2)} ${start.y.toFixed(2)}`,
    `C ${(laneX - radius + radius * curveFactor).toFixed(2)} ${start.y.toFixed(2)}`,
    `${laneX.toFixed(2)} ${(firstBendEndY - direction * radius * curveFactor).toFixed(2)}`,
    `${laneX.toFixed(2)} ${firstBendEndY.toFixed(2)}`,
    `L ${laneX.toFixed(2)} ${secondBendStartY.toFixed(2)}`,
    `C ${laneX.toFixed(2)} ${(secondBendStartY + direction * radius * curveFactor).toFixed(2)}`,
    `${(laneX + radius - radius * curveFactor).toFixed(2)} ${end.y.toFixed(2)}`,
    `${(laneX + radius).toFixed(2)} ${end.y.toFixed(2)}`,
    `L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
  ].join(" ");
}

function horizontalCurve(
  start: MethodStoryPoint,
  end: MethodStoryPoint,
  tension = 0.42,
): string {
  const dx = end.x - start.x;
  const controlDistance = Math.max(16, Math.abs(dx) * tension);
  const direction = Math.sign(dx || 1);
  const c1x = start.x + direction * controlDistance;
  const c2x = end.x - direction * controlDistance;

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

  const messySources = METHOD_STORY_DESKTOP_ANCHORS.messyPorts.map((selector) =>
    relativePoint(rootRect, queryRequired(root, selector)),
  );
  const messyRects = METHOD_STORY_DESKTOP_ANCHORS.messyPorts.map((selector) => {
    const input = queryRequired(root, selector).closest<HTMLElement>(
      "[data-method-input]",
    );
    if (!input)
      throw new Error(`Method Story input card missing for ${selector}`);
    return relativeRect(rootRect, input);
  });

  const evidenceRects = METHOD_STORY_DESKTOP_ANCHORS.evidenceSheets.map(
    (selector) => relativeRect(rootRect, queryRequired(root, selector)),
  );

  // All four messy inputs converge into one exact Expose entry point.
  // This keeps the handoff visually clean instead of implying that each input
  // belongs to a different evidence sheet.
  const exposeEntry = relativePoint(
    rootRect,
    queryRequired(root, METHOD_STORY_DESKTOP_ANCHORS.exposeIn),
  );
  const exposeLeftTargets = messySources.map(() => exposeEntry);

  // Twelve outgoing paths: one exposed source from each rear sheet plus
  // eight balanced sources across the front sheet. This adds visual richness
  // while avoiding the bottom-heavy fan created by occluded rear edges.
  const rearExposeSources = evidenceRects.slice(0, 4).map((rect, index) =>
    visibleEdgePoint(rect, "right", evidenceRects.slice(index + 1), 0.5),
  );
  const frontRect = evidenceRects[4];
  const frontRatios = [0.07, 0.19, 0.31, 0.43, 0.57, 0.69, 0.81, 0.93];
  const frontExposeSources = frontRatios.map((ratio) => ({
    x: frontRect.right,
    y: frontRect.top + frontRect.height * ratio,
  }));
  const exposeRightSources = [...rearExposeSources, ...frontExposeSources];

  const reduceLeft = relativePoint(
    rootRect,
    queryRequired(root, METHOD_STORY_DESKTOP_ANCHORS.reduceIn),
  );
  const reduceRight = relativePoint(
    rootRect,
    queryRequired(root, METHOD_STORY_DESKTOP_ANCHORS.reduceOut),
  );
  const buildLeft = relativePoint(
    rootRect,
    queryRequired(root, METHOD_STORY_DESKTOP_ANCHORS.buildIn),
  );
  const buildRight = relativePoint(
    rootRect,
    queryRequired(root, METHOD_STORY_DESKTOP_ANCHORS.buildOut),
  );
  const outcomeLeftTargets = METHOD_STORY_DESKTOP_ANCHORS.outcomePorts.map(
    (selector) => relativePoint(rootRect, queryRequired(root, selector)),
  );

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

  const incomingLaneX = Math.max(...messyRects.map((rect) => rect.right)) + 12;

  const inputToExpose = messySources.map((source, index) =>
    routedHorizontalPath(
      source,
      exposeLeftTargets[index],
      incomingLaneX + index * 5,
    ),
  );

  const exposeToReduce = exposeRightSources.map((source) =>
    horizontalCurve(source, reduceLeft, 0.46),
  );

  const reduceToBuild = horizontalCurve(reduceRight, buildLeft, 0.36);

  const buildBusTop = buildBusNodes[0];
  const buildBusBottom = buildBusNodes[buildBusNodes.length - 1];
  const buildEntryTarget = buildBusNodes[Math.floor(buildBusNodes.length / 2)];

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
