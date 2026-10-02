"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

export const CAROUSEL_INTERVAL = 6000;

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribePageVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function getPageVisibility() {
  return !document.hidden;
}

export function useSelectedWorkCarousel() {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: CAROUSEL_INTERVAL,
        playOnInit: false,
        stopOnInteraction: false,
        stopOnFocusIn: false,
        stopOnMouseEnter: false,
        stopOnLastSnap: false,
      }),
    [],
  );
  const [viewportRef, api] = useEmblaCarousel(
    {
      align: "start",
      containScroll: false,
      loop: true,
      watchDrag: (_emblaApi, event) => !(event.target instanceof Element && event.target.closest("a, button")),
    },
    [autoplay],
  );
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const pageVisible = useSyncExternalStore(subscribePageVisibility, getPageVisibility, () => true);
  const rootRef = useRef<HTMLDivElement>(null);
  const paused = hovered || focused || dragging || !inView || !pageVisible || reducedMotion;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!api) return;
    const plugin = api.plugins().autoplay;
    const onDragStart = () => setDragging(true);
    const onDragEnd = () => setDragging(false);
    const syncActive = () => {
      setActive(api.selectedScrollSnap());
      rootRef.current
        ?.querySelectorAll<HTMLElement>(".carousel-dot")
        .forEach((dot) => dot.style.setProperty("--carousel-progress", "0%"));
      plugin.reset();
    };
    api.on("select", syncActive).on("reInit", syncActive);
    api.on("pointerDown", onDragStart).on("pointerUp", onDragEnd);
    syncActive();
    return () => {
      api.off("select", syncActive).off("reInit", syncActive);
      api.off("pointerDown", onDragStart).off("pointerUp", onDragEnd);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const plugin = api.plugins().autoplay;
    if (paused) plugin.stop();
    else plugin.play();
  }, [api, paused]);

  useEffect(() => {
    if (!api || paused) return;
    const plugin = api.plugins().autoplay;
    let frame = 0;
    const updateProgress = () => {
      const remaining = plugin.timeUntilNext();
      if (remaining !== null) {
        const elapsed = Math.max(0, Math.min(1, 1 - remaining / CAROUSEL_INTERVAL));
        rootRef.current
          ?.querySelector<HTMLElement>(".carousel-dot.is-active")
          ?.style.setProperty("--carousel-progress", `${elapsed * 100}%`);
      }
      frame = window.requestAnimationFrame(updateProgress);
    };
    frame = window.requestAnimationFrame(updateProgress);
    return () => window.cancelAnimationFrame(frame);
  }, [api, active, paused]);

  const select = useCallback((index: number) => api?.scrollTo(index), [api]);
  const onBlurCapture = useCallback((event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  }, []);

  return {
    active,
    paused,
    api,
    select,
    rootRef,
    viewportRef,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocusCapture: () => setFocused(true),
    onBlurCapture,
    onPointerDown: () => setDragging(true),
    onPointerUp: () => setDragging(false),
    onPointerCancel: () => setDragging(false),
  };
}
