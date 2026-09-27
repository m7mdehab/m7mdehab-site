"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { BrandLogo, type BrandKey } from "@/components/brand-logo";

type BrandSignal = {
  name: string;
  detail: string;
  brand: BrandKey;
  secondaryBrand?: BrandKey;
};

const credibilitySignals: ReadonlyArray<BrandSignal> = [
  {
    name: "Network International",
    detail: "Data Engineer",
    brand: "network",
  },
  {
    name: "Al Tayseer International",
    detail: "Business Analyst Team Lead",
    brand: "altayseer",
  },
  {
    name: "Orcas",
    detail: "Private Tutor · Computer Science & Data",
    brand: "orcas",
  },
  { name: "NARSS", detail: "Data / ML Intern", brand: "narss" },
  { name: "Zewail City", detail: "ML Intern", brand: "zewail" },
  {
    name: "Databricks",
    detail: "Certified Data Engineer Associate",
    brand: "databricks",
  },
  {
    name: "McKinsey Forward",
    detail: "Foundation & Advanced",
    brand: "mckinsey",
  },
  {
    name: "Canadian International College",
    detail: "BSc Computer Science · Data Science Major",
    brand: "cic",
  },
  {
    name: "ExploreAI / ALX",
    detail: "Data Science & AI Scholarship",
    brand: "exploreai",
    secondaryBrand: "alx",
  },
];

const MARQUEE_SPEED = 30;
const GROUP_SAFETY_RATIO = 1.25;

function BrandSignalItem({
  signal,
  duplicate,
  onShowTooltip,
  onMoveTooltip,
  onHideTooltip,
}: {
  signal: BrandSignal;
  duplicate: boolean;
  onShowTooltip: (
    label: string,
    item: HTMLElement,
    x?: number,
    y?: number,
  ) => void;
  onMoveTooltip: (event: PointerEvent<HTMLSpanElement>) => void;
  onHideTooltip: () => void;
}) {
  return (
    <span
      className="credibility-item credibility-brand-item"
      aria-label={`${signal.name}: ${signal.detail}`}
      role="img"
      tabIndex={duplicate ? -1 : 0}
      data-brand-card={signal.brand}
      data-organization={signal.name}
      onPointerEnter={
        duplicate
          ? undefined
          : (event) =>
              onShowTooltip(
                signal.name,
                event.currentTarget,
                event.clientX,
                event.clientY,
              )
      }
      onPointerMove={duplicate ? undefined : onMoveTooltip}
      onPointerLeave={duplicate ? undefined : onHideTooltip}
      onFocus={
        duplicate
          ? undefined
          : (event) => onShowTooltip(signal.name, event.currentTarget)
      }
      onBlur={duplicate ? undefined : onHideTooltip}
    >
      <span
        className="credibility-brand-marks credibility-logo-stage"
        aria-hidden="true"
      >
        <BrandLogo
          brand={signal.brand}
          mode="native"
          src={
            signal.brand === "network"
              ? "/logos/network-international.png"
              : undefined
          }
        />
        {signal.secondaryBrand ? (
          <BrandLogo brand={signal.secondaryBrand} mode="native" />
        ) : null}
      </span>
      <span className="credibility-brand-copy relationship-caption">
        <strong>{signal.detail}</strong>
      </span>
    </span>
  );
}

function CredibilitySequence({
  duplicate,
  sourceRepeats,
  groupRef,
  tooltipHandlers,
}: {
  duplicate: boolean;
  sourceRepeats: number;
  groupRef?: React.Ref<HTMLDivElement>;
  tooltipHandlers: Pick<
    BrandItemTooltipProps,
    "onShowTooltip" | "onMoveTooltip" | "onHideTooltip"
  >;
}) {
  return (
    <div
      className="credibility-sequence credibility-logo-sequence"
      aria-hidden={duplicate ? "true" : undefined}
      data-source-repeats={sourceRepeats}
      ref={groupRef}
    >
      {Array.from(
        { length: sourceRepeats * credibilitySignals.length },
        (_, index) => {
          const signal = credibilitySignals[index % credibilitySignals.length];
          return (
            <BrandSignalItem
              key={`${signal.name}-${index}`}
              signal={signal}
              duplicate={duplicate}
              {...tooltipHandlers}
            />
          );
        },
      )}
    </div>
  );
}

type BrandItemTooltipProps = {
  onShowTooltip: (
    label: string,
    item: HTMLElement,
    x?: number,
    y?: number,
  ) => void;
  onMoveTooltip: (event: PointerEvent<HTMLSpanElement>) => void;
  onHideTooltip: () => void;
};

function tooltipPosition(tooltip: HTMLElement, x: number, y: number) {
  const gap = 14;
  const margin = 8;
  const rect = tooltip.getBoundingClientRect();
  const left = Math.min(
    window.innerWidth - rect.width - margin,
    Math.max(margin, x + gap),
  );
  const above = y - rect.height - gap;
  const top =
    above >= margin
      ? above
      : Math.min(window.innerHeight - rect.height - margin, y + gap);
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${Math.max(margin, top)}px`;
}

export function CredibilityMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [sourceRepeats, setSourceRepeats] = useState(1);
  const [loopWidth, setLoopWidth] = useState(0);
  const [tooltipLabel, setTooltipLabel] = useState<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipCoordinatesRef = useRef({ x: 0, y: 0 });

  const moveTooltip = (x: number, y: number) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const tooltip = tooltipRef.current;
    if (tooltip) tooltipPosition(tooltip, x, y);
  };

  const showTooltip = (
    label: string,
    item: HTMLElement,
    x?: number,
    y?: number,
  ) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const rect = item.getBoundingClientRect();
    tooltipCoordinatesRef.current = {
      x: x ?? rect.left + rect.width / 2,
      y: y ?? rect.top,
    };
    setTooltipLabel(label);
  };

  const hideTooltip = () => setTooltipLabel(null);

  useEffect(() => {
    if (!tooltipLabel || !tooltipRef.current) return;
    const { x, y } = tooltipCoordinatesRef.current;
    tooltipPosition(tooltipRef.current, x, y);
  }, [tooltipLabel]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const measure = () => {
      const viewportWidth = viewport.getBoundingClientRect().width;
      const groupWidth = group.getBoundingClientRect().width;
      if (!viewportWidth || !groupWidth) return;

      if (motionPreference.matches) {
        setSourceRepeats((current) => (current === 1 ? current : 1));
        setLoopWidth(0);
        return;
      }

      const currentRepeats = Number(group.dataset.sourceRepeats) || 1;
      const widthPerSourceSet = groupWidth / currentRepeats;
      const nextRepeats = Math.max(
        1,
        Math.ceil((viewportWidth * GROUP_SAFETY_RATIO) / widthPerSourceSet),
      );
      setSourceRepeats((current) =>
        current === nextRepeats ? current : nextRepeats,
      );
      setLoopWidth(groupWidth);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    measure();

    const onMotionPreferenceChange = () => {
      if (motionPreference.matches) {
        setSourceRepeats(1);
        setLoopWidth(0);
      } else {
        measure();
      }
    };
    motionPreference.addEventListener("change", onMotionPreferenceChange);

    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  const marqueeStyle = {
    "--credibility-loop-distance": `${-loopWidth}px`,
    "--credibility-loop-duration": `${loopWidth / MARQUEE_SPEED}s`,
  } as CSSProperties;

  return (
    <div
      className="credibility-viewport"
      ref={viewportRef}
      tabIndex={0}
      aria-label="Selected professional and learning relationships"
      data-loop-width={loopWidth}
      data-loop-speed={MARQUEE_SPEED}
      data-source-item-count={credibilitySignals.length}
    >
      <div
        className="credibility-track credibility-logo-track"
        style={marqueeStyle}
        data-loop-ready={loopWidth > 0 ? "true" : "false"}
      >
        <CredibilitySequence
          duplicate={false}
          sourceRepeats={sourceRepeats}
          groupRef={groupRef}
          tooltipHandlers={{
            onShowTooltip: showTooltip,
            onMoveTooltip: (event) => moveTooltip(event.clientX, event.clientY),
            onHideTooltip: hideTooltip,
          }}
        />
        <CredibilitySequence
          duplicate
          sourceRepeats={sourceRepeats}
          tooltipHandlers={{
            onShowTooltip: showTooltip,
            onMoveTooltip: (event) => moveTooltip(event.clientX, event.clientY),
            onHideTooltip: hideTooltip,
          }}
        />
      </div>
      {tooltipLabel && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={tooltipRef}
              id="credibility-tooltip"
              className="credibility-tooltip"
              role="tooltip"
            >
              {tooltipLabel}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
