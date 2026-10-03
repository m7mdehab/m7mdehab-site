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

  const messySources = METHOD_STORY_DESKTOP_ANCHORS.messyPorts.map(
    (selector) => relativePoint(rootRect, queryRequired(root, selector)),
  );

  const evidenceRects = METHOD_STORY_DESKTOP_ANCHORS.evidenceSheets.map(
    (selector) => relativeRect(rootRect, queryRequired(root, selector)),
  );

  // Four incoming cards feed four visually separated sheet edges.
  // Keep the middle sheet unassigned so the stack still reads as five layers.
  const incomingSheetIndexes = [0, 1, 3, 4] as const;
  const exposeLeftTargets = incomingSheetIndexes.map((sheetIndex) =>
    edgePoint(evidenceRects[sheetIndex], "left"),
  );

  // Two outgoing paths per evidence sheet = ten total paths.
  // This makes the convergence occupy the full visual height of the five-sheet stack.
  const exposeRightSources = evidenceRects.flatMap((rect) => [
    edgePoint(rect, "right", 0.3),
    edgePoint(rect, "right", 0.7),
  ]);

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
