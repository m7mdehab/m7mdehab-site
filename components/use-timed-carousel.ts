"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const CAROUSEL_INTERVAL = 6000;

export function useTimedCarousel(count: number) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const select = useCallback(
    (index: number) => {
      setActive(Math.max(0, Math.min(count - 1, index)));
    },
    [count],
  );
  const paused =
    hovered || focused || dragging || !inView || !pageVisible || reducedMotion;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(motion.matches);
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncMotion();
    syncVisibility();
    motion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    const root = rootRef.current;
    const observer =
      root &&
      new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35);
        },
        { threshold: [0, 0.35, 0.6] },
      );
    if (root && observer) observer.observe(root);
    const releasePointer = () => setDragging(false);
    window.addEventListener("pointerup", releasePointer);
    window.addEventListener("pointercancel", releasePointer);
    return () => {
      motion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      observer?.disconnect();
      window.removeEventListener("pointerup", releasePointer);
      window.removeEventListener("pointercancel", releasePointer);
    };
  }, []);

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % count),
      CAROUSEL_INTERVAL,
    );
    return () => window.clearTimeout(timer);
  }, [
    active,
    paused,
    count,
    dragging,
    focused,
    hovered,
    inView,
    pageVisible,
    reducedMotion,
  ]);

  return {
    active,
    paused,
    setActive: select,
    rootRef,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocusCapture: () => setFocused(true),
    onBlurCapture: (event: React.FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null))
        setFocused(false);
    },
    onPointerDown: () => setDragging(true),
    onPointerUp: () => setDragging(false),
    onPointerCancel: () => setDragging(false),
  };
}
