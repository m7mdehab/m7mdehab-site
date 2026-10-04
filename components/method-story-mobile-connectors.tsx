"use client";

import { useLayoutEffect, useRef, useState } from "react";

type MobileStageId = "messy" | "expose" | "reduce" | "build" | "outcomes";

type Point = {
  x: number;
  y: number;
};

type MobileConnectorGeometry = {
  width: number;
  height: number;
  paths: Array<{
    d: string;
    hot?: boolean;
    handoff?: "in" | "out";
    key: string;
  }>;
  nodes: Array<{
    x: number;
    y: number;
    hot?: boolean;
    key: string;
  }>;
};

function localRect(element: Element, rootRect: DOMRect) {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left - rootRect.left,
    right: rect.right - rootRect.left,
    top: rect.top - rootRect.top,
    bottom: rect.bottom - rootRect.top,
    width: rect.width,
    height: rect.height,
    centerX: rect.left - rootRect.left + rect.width / 2,
    centerY: rect.top - rootRect.top + rect.height / 2,
  };
}

function leftEdge(element: Element, rootRect: DOMRect, ratio = 0.5): Point {
  const rect = localRect(element, rootRect);
  return {
    x: rect.left,
    y: rect.top + rect.height * ratio,
  };
}

function rightEdge(element: Element, rootRect: DOMRect, ratio = 0.5): Point {
  const rect = localRect(element, rootRect);
  return {
    x: rect.right,
    y: rect.top + rect.height * ratio,
  };
}

function curve(from: Point, to: Point, tension = 0.42) {
  const distance = Math.max(0, to.x - from.x);
  const handle = Math.max(12, distance * tension);
  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} C ${(
    from.x + handle
  ).toFixed(2)} ${from.y.toFixed(2)} ${(to.x - handle).toFixed(
    2,
  )} ${to.y.toFixed(2)} ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

function line(from: Point, to: Point) {
  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} L ${to.x.toFixed(
    2,
  )} ${to.y.toFixed(2)}`;
}

function buildGeometry(
  root: HTMLElement,
  stage: MobileStageId,
): MobileConnectorGeometry | null {
  const rootRect = root.getBoundingClientRect();
  const width = rootRect.width;
  const height = rootRect.height;

  if (!width || !height) return null;

  const centerY = height / 2;
  const paths: MobileConnectorGeometry["paths"] = [];
  const nodes: MobileConnectorGeometry["nodes"] = [];

  if (stage === "messy") {
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>(".method-story__input-card"),
    );
    if (cards.length !== 4) return null;

    const sources = cards.map((card) => rightEdge(card, rootRect));
    const maxSourceX = Math.max(...sources.map((point) => point.x));
    const node = {
      x: Math.min(width - 22, Math.max(width * 0.84, maxSourceX + 12)),
      y: centerY,
    };

    sources.forEach((source, index) => {
      paths.push({
        key: `messy-${index + 1}`,
        d: curve(source, node),
      });
    });
    paths.push({
      key: "messy-out",
      d: line(node, { x: width, y: centerY }),
      hot: true,
      handoff: "out",
    });
    nodes.push({ ...node, hot: true, key: "messy-node" });
  }

  if (stage === "expose") {
    const stack = root.querySelector<HTMLElement>(
      ".method-story__evidence-stack",
    );
    const sheets = Array.from(
      root.querySelectorAll<HTMLElement>(".method-story__evidence-sheet"),
    );
    if (!stack || sheets.length !== 5) return null;

    const stackIn = leftEdge(stack, rootRect);
    paths.push({
      key: "expose-in",
      d: line({ x: 0, y: centerY }, stackIn),
      hot: true,
      handoff: "in",
    });

    const fanSources = sheets.flatMap((sheet) => [
      rightEdge(sheet, rootRect, 0.34),
      rightEdge(sheet, rootRect, 0.66),
    ]);
    const maxSourceX = Math.max(...fanSources.map((point) => point.x));
    const node = {
      x: Math.min(width - 20, Math.max(width * 0.9, maxSourceX + 16)),
      y: centerY,
    };

    fanSources.forEach((source, index) => {
      paths.push({
        key: `expose-fan-${index + 1}`,
        d: curve(source, node, 0.36),
        hot: index === 4 || index === 5,
      });
    });
    paths.push({
      key: "expose-out",
      d: line(node, { x: width, y: centerY }),
      hot: true,
      handoff: "out",
    });
    nodes.push({ ...node, hot: true, key: "expose-node" });
  }

  if (stage === "reduce") {
    const decisionModule = root.querySelector<HTMLElement>(
      ".method-story__decision-module",
    );
    if (!decisionModule) return null;

    const moduleIn = leftEdge(decisionModule, rootRect);
    const moduleOut = rightEdge(decisionModule, rootRect);

    paths.push({
      key: "reduce-in",
      d: line({ x: 0, y: centerY }, moduleIn),
      hot: true,
      handoff: "in",
    });
    paths.push({
      key: "reduce-out",
      d: line(moduleOut, { x: width, y: centerY }),
      hot: true,
      handoff: "out",
    });
  }

  if (stage === "build") {
    const system = root.querySelector<HTMLElement>(
      ".method-story__system-stack",
    );
    if (!system) return null;

    const systemIn = leftEdge(system, rootRect);
    const systemOut = rightEdge(system, rootRect);

    paths.push({
      key: "build-in",
      d: line({ x: 0, y: centerY }, systemIn),
      hot: true,
      handoff: "in",
    });
    paths.push({
      key: "build-out",
      d: line(systemOut, { x: width, y: centerY }),
      hot: true,
      handoff: "out",
    });
  }

  if (stage === "outcomes") {
    const rows = Array.from(
      root.querySelectorAll<HTMLElement>(".method-story__output-row"),
    );
    if (rows.length !== 5) return null;

    const targets = rows.map((row) => leftEdge(row, rootRect));
    const busX = Math.max(18, Math.min(width * 0.18, targets[0].x - 24));
    const middle = targets[2];

    paths.push({
      key: "outcomes-in",
      d: line({ x: 0, y: centerY }, { x: busX, y: middle.y }),
      hot: true,
      handoff: "in",
    });
    paths.push({
      key: "outcomes-bus",
      d: line(
        { x: busX, y: targets[0].y },
        { x: busX, y: targets[targets.length - 1].y },
      ),
    });

    targets.forEach((target, index) => {
      paths.push({
        key: `outcomes-${index + 1}`,
        d: line({ x: busX, y: target.y }, target),
      });
      nodes.push({
        x: busX,
        y: target.y,
        hot: index === 2,
        key: `outcomes-node-${index + 1}`,
      });
    });
  }

  return { width, height, paths, nodes };
}

function sameGeometry(
  previous: MobileConnectorGeometry | null,
  next: MobileConnectorGeometry | null,
) {
  if (!previous || !next) return previous === next;
  if (
    Math.abs(previous.width - next.width) > 0.25 ||
    Math.abs(previous.height - next.height) > 0.25 ||
    previous.paths.length !== next.paths.length ||
    previous.nodes.length !== next.nodes.length
  ) {
    return false;
  }

  return (
    previous.paths.every(
      (path, index) =>
        path.d === next.paths[index]?.d &&
        path.hot === next.paths[index]?.hot &&
        path.handoff === next.paths[index]?.handoff,
    ) &&
    previous.nodes.every(
      (node, index) =>
        Math.abs(node.x - (next.nodes[index]?.x ?? 0)) <= 0.25 &&
        Math.abs(node.y - (next.nodes[index]?.y ?? 0)) <= 0.25 &&
        node.hot === next.nodes[index]?.hot,
    )
  );
}

export function MethodStoryMobileConnectors({
  stage,
}: {
  stage: MobileStageId;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geometry, setGeometry] = useState<MobileConnectorGeometry | null>(null);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const root = svg?.parentElement;
    if (!root) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = buildGeometry(root, stage);
        setGeometry((previous) =>
          sameGeometry(previous, next) ? previous : next,
        );
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(root);
    root
      .querySelectorAll(
        ".method-story__input-card, .method-story__evidence-stack, .method-story__evidence-sheet, .method-story__decision-module, .method-story__system-stack, .method-story__output-row",
      )
      .forEach((element) => observer.observe(element));

    document.fonts?.ready.then(measure).catch(() => undefined);
    window.addEventListener("orientationchange", measure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("orientationchange", measure);
    };
  }, [stage]);

  return (
    <svg
      ref={svgRef}
      className="method-story__mobile-connectors"
      viewBox={
        geometry
          ? `0 0 ${geometry.width} ${geometry.height}`
          : "0 0 350 350"
      }
      preserveAspectRatio="none"
      aria-hidden="true"
      data-mobile-connectors={stage}
      data-mobile-geometry={geometry ? "measured" : "pending"}
    >
      {geometry?.paths.map((path) => (
        <path
          key={path.key}
          d={path.d}
          className={
            path.hot
              ? "method-story__mobile-path method-story__mobile-path--hot"
              : "method-story__mobile-path"
          }
          data-mobile-path={path.key}
          data-mobile-handoff={path.handoff}
        />
      ))}
      {geometry?.nodes.map((node) => (
        <circle
          key={node.key}
          cx={node.x}
          cy={node.y}
          r={node.hot ? 4.2 : 3.1}
          className={
            node.hot
              ? "method-story__mobile-node method-story__mobile-node--hot"
              : "method-story__mobile-node"
          }
          data-mobile-node={node.key}
        />
      ))}
    </svg>
  );
}
