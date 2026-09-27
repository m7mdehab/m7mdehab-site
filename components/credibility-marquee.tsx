"use client";

import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
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

const DESKTOP_MARQUEE_SPEED = 30;
const MOBILE_MARQUEE_SPEED = 52;
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
      onPointerEnter={(event) =>
        onShowTooltip(
          signal.name,
          event.currentTarget,
          event.clientX,
          event.clientY,
        )
      }
      onPointerMove={onMoveTooltip}
      onPointerLeave={(event) => {
        if (document.activeElement !== event.currentTarget) onHideTooltip();
      }}
      onFocus={duplicate ? undefined : (event) => onShowTooltip(signal.name, event.currentTarget)}
      onBlur={
        duplicate
          ? undefined
          : (event) => {
              if (!event.currentTarget.matches(":hover")) onHideTooltip();
            }
      }
    >
      <span
        className="credibility-brand-marks credibility-logo-stage"
        aria-hidden="true"
      >
        <BrandLogo
          brand={signal.brand}
          mode="native"
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
      data-logical-group={duplicate ? undefined : "canonical"}
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
  const [marqueeViewportWidth, setMarqueeViewportWidth] = useState(0);
  const [tooltipLabel, setTooltipLabel] = useState<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipCoordinatesRef = useRef({ x: 0, y: 0 });
  const loopWidthRef = useRef(0);
  const speedRef = useRef(DESKTOP_MARQUEE_SPEED);
  const viewportVisibleRef = useRef(true);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const draggingRef = useRef(false);
  const touchPointerDownRef = useRef(false);
  const touchScrollActiveRef = useRef(false);
  const interactionUntilRef = useRef(0);
  const lastFrameTimestampRef = useRef(0);
  const fractionalScrollRef = useRef(0);
  const dragLastXRef = useRef(0);
  const animationFrameRef = useRef(0);

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

  const normalizeScrollPosition = () => {
    const viewport = viewportRef.current;
    const width = loopWidthRef.current;
    if (!viewport || width <= 0) return;

    if (viewport.scrollLeft < width) {
      viewport.scrollLeft += width;
    } else if (viewport.scrollLeft >= width * 2) {
      viewport.scrollLeft -= width;
    }
  };

  const noteInteraction = (duration = 750) => {
    fractionalScrollRef.current = 0;
    interactionUntilRef.current = performance.now() + duration;
    lastFrameTimestampRef.current = 0;
  };

  const handleScroll = () => {
    if (touchPointerDownRef.current || touchScrollActiveRef.current) {
      fractionalScrollRef.current = 0;
      touchScrollActiveRef.current = true;
      interactionUntilRef.current = performance.now() + 750;
      lastFrameTimestampRef.current = 0;
    }
    normalizeScrollPosition();
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      hoveredRef.current = true;
      lastFrameTimestampRef.current = 0;
    }
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      hoveredRef.current = false;
      lastFrameTimestampRef.current = 0;
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      fractionalScrollRef.current = 0;
      touchPointerDownRef.current = true;
      touchScrollActiveRef.current = true;
      interactionUntilRef.current = Number.POSITIVE_INFINITY;
      lastFrameTimestampRef.current = 0;
      return;
    }
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    draggingRef.current = true;
    fractionalScrollRef.current = 0;
    dragLastXRef.current = event.clientX;
    event.currentTarget.dataset.dragging = "true";
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    lastFrameTimestampRef.current = 0;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" && touchPointerDownRef.current) {
      interactionUntilRef.current = performance.now() + 750;
      return;
    }
    if (!draggingRef.current || event.pointerType !== "mouse") return;

    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollLeft -= event.clientX - dragLastXRef.current;
    dragLastXRef.current = event.clientX;
    normalizeScrollPosition();
  };

  const finishPointerInteraction = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      touchPointerDownRef.current = false;
      touchScrollActiveRef.current = true;
      noteInteraction(750);
      return;
    }
    if (!draggingRef.current) return;
    draggingRef.current = false;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    lastFrameTimestampRef.current = 0;
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) > 0 || event.shiftKey) noteInteraction(750);
  };

  const handleFocus = () => {
    focusedRef.current = true;
    lastFrameTimestampRef.current = 0;
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (
      event.relatedTarget instanceof Node &&
      event.currentTarget.contains(event.relatedTarget)
    )
      return;
    window.setTimeout(() => {
      const viewport = viewportRef.current;
      focusedRef.current = Boolean(
        viewport && viewport.contains(document.activeElement),
      );
      lastFrameTimestampRef.current = 0;
    }, 0);
  };

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
      const windowWidth = window.innerWidth;
      const speed =
        windowWidth <= 700 ? MOBILE_MARQUEE_SPEED : DESKTOP_MARQUEE_SPEED;
      speedRef.current = speed;
      viewport.dataset.loopSpeed = String(speed);
      setMarqueeViewportWidth((current) =>
        current === windowWidth ? current : windowWidth,
      );

      if (motionPreference.matches) {
        if (Number(group.dataset.sourceRepeats) !== 1) {
          setSourceRepeats(1);
          return;
        }
      } else {
        const currentRepeats = Number(group.dataset.sourceRepeats) || 1;
        const widthPerSourceSet = groupWidth / currentRepeats;
        const nextRepeats = Math.max(
          1,
          Math.ceil((viewportWidth * GROUP_SAFETY_RATIO) / widthPerSourceSet),
        );
        if (nextRepeats !== currentRepeats) {
          setSourceRepeats(nextRepeats);
          return;
        }
      }

      const priorWidth = loopWidthRef.current;
      if (priorWidth <= 0) {
        fractionalScrollRef.current = 0;
        viewport.scrollLeft = groupWidth;
      } else if (Math.abs(priorWidth - groupWidth) > 0.5) {
        const progress = ((viewport.scrollLeft % priorWidth) + priorWidth) % priorWidth / priorWidth;
        fractionalScrollRef.current = 0;
        viewport.scrollLeft = groupWidth + progress * groupWidth;
      }
      loopWidthRef.current = groupWidth;
      setLoopWidth((current) =>
        Math.abs(current - groupWidth) <= 0.5 ? current : groupWidth,
      );
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    measure();

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        viewportVisibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.15;
        lastFrameTimestampRef.current = 0;
      },
      { threshold: [0, 0.15] },
    );
    intersectionObserver.observe(viewport);

    const onVisibilityChange = () => {
      lastFrameTimestampRef.current = 0;
    };
    const onScrollEnd = () => {
      if (touchScrollActiveRef.current) noteInteraction(750);
    };

    const animate = (timestamp: number) => {
      const now = performance.now();
      if (touchScrollActiveRef.current && now >= interactionUntilRef.current) {
        touchScrollActiveRef.current = false;
        interactionUntilRef.current = 0;
      }

      const paused =
        motionPreference.matches ||
        document.hidden ||
        !viewportVisibleRef.current ||
        hoveredRef.current ||
        focusedRef.current ||
        draggingRef.current ||
        touchPointerDownRef.current ||
        now < interactionUntilRef.current;
      if (!paused && loopWidthRef.current > 0) {
        if (lastFrameTimestampRef.current > 0) {
          const elapsed = Math.min(
            (timestamp - lastFrameTimestampRef.current) / 1000,
            0.1,
          );
          const movement =
            fractionalScrollRef.current + speedRef.current * elapsed;
          const wholePixels = Math.floor(movement);
          fractionalScrollRef.current = movement - wholePixels;
          if (wholePixels > 0) viewport.scrollLeft += wholePixels;
          normalizeScrollPosition();
        }
        lastFrameTimestampRef.current = timestamp;
      } else {
        lastFrameTimestampRef.current = 0;
      }
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };
    animationFrameRef.current = window.requestAnimationFrame(animate);

    const onMotionPreferenceChange = () => {
      lastFrameTimestampRef.current = 0;
      measure();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    viewport.addEventListener("scrollend", onScrollEnd);
    motionPreference.addEventListener("change", onMotionPreferenceChange);

    return () => {
      observer.disconnect();
      intersectionObserver.disconnect();
      window.cancelAnimationFrame(animationFrameRef.current);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      viewport.removeEventListener("scrollend", onScrollEnd);
      motionPreference.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  const marqueeSpeed =
    marqueeViewportWidth > 0 && marqueeViewportWidth <= 700
      ? MOBILE_MARQUEE_SPEED
      : DESKTOP_MARQUEE_SPEED;
  return (
    <div
      className="credibility-viewport"
      ref={viewportRef}
      tabIndex={0}
      role="region"
      aria-label="Selected professional and learning relationships"
      data-loop-width={loopWidth}
      data-loop-speed={marqueeSpeed}
      data-loop-groups="3"
      data-marquee-engine="scroll-raf"
      data-source-item-count={credibilitySignals.length}
      onScroll={handleScroll}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointerInteraction}
      onPointerCancel={finishPointerInteraction}
      onLostPointerCapture={(event) => {
        if (draggingRef.current) {
          draggingRef.current = false;
          delete event.currentTarget.dataset.dragging;
        }
      }}
      onWheel={handleWheel}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
    >
      <div
        className="credibility-track credibility-logo-track"
        data-loop-ready={loopWidth > 0 ? "true" : "false"}
      >
        <CredibilitySequence
          duplicate
          sourceRepeats={sourceRepeats}
          tooltipHandlers={{
            onShowTooltip: showTooltip,
            onMoveTooltip: (event) => moveTooltip(event.clientX, event.clientY),
            onHideTooltip: hideTooltip,
          }}
        />
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
