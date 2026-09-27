"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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
    detail: "Data engineering & migration",
    brand: "network",
  },
  {
    name: "Al Tayseer",
    detail: "Business analysis & reporting",
    brand: "altayseer",
  },
  { name: "Orcas", detail: "Computer science & data tutoring", brand: "orcas" },
  { name: "NARSS", detail: "Data & machine learning", brand: "narss" },
  { name: "Zewail City", detail: "Machine learning", brand: "zewail" },
  {
    name: "Databricks",
    detail: "Data Engineer Associate",
    brand: "databricks",
  },
  {
    name: "McKinsey Forward",
    detail: "Foundation & Advanced",
    brand: "mckinsey",
  },
  {
    name: "Canadian International College",
    detail: "BSc Computer Science · Data Science",
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
}: {
  signal: BrandSignal;
  duplicate: boolean;
}) {
  return (
    <span
      className="credibility-item credibility-brand-item"
      aria-label={`${signal.name}: ${signal.detail}`}
      role="img"
      tabIndex={duplicate ? -1 : 0}
      data-brand-card={signal.brand}
      data-organization={signal.name}
      title={signal.name}
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
}: {
  duplicate: boolean;
  sourceRepeats: number;
  groupRef?: React.Ref<HTMLDivElement>;
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
            />
          );
        },
      )}
    </div>
  );
}

export function CredibilityMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [sourceRepeats, setSourceRepeats] = useState(1);
  const [loopWidth, setLoopWidth] = useState(0);

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
        />
        <CredibilitySequence duplicate sourceRepeats={sourceRepeats} />
      </div>
    </div>
  );
}
