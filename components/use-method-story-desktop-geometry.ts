"use client";

import {
  useEffect,
  useMemo,
  useSyncExternalStore,
  type RefObject,
} from "react";
import type { MotionValue } from "motion/react";
import {
  measureMethodStoryDesktopGeometry,
  type MethodStoryConnectorGeometry,
} from "@/components/method-story-connector-geometry";

type GeometrySnapshot = MethodStoryConnectorGeometry | null;

type GeometryStore = {
  getSnapshot: () => GeometrySnapshot;
  subscribe: (listener: () => void) => () => void;
  update: (value: GeometrySnapshot) => void;
};

function createGeometryStore(): GeometryStore {
  let snapshot: GeometrySnapshot = null;
  const listeners = new Set<() => void>();

  return {
    getSnapshot: () => snapshot,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    update(value) {
      snapshot = value;
      for (const listener of listeners) listener();
    },
  };
}

export function useMethodStoryDesktopGeometry(
  rootRef: RefObject<HTMLDivElement | null>,
  progress: MotionValue<number>,
  enabled: boolean,
): GeometrySnapshot {
  const store = useMemo(() => createGeometryStore(), []);

  useEffect(() => {
    if (!enabled) {
      store.update(null);
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    let animationFrame = 0;

    const measure = () => {
      animationFrame = 0;
      store.update(measureMethodStoryDesktopGeometry(root));
    };

    const scheduleMeasure = () => {
      if (animationFrame !== 0) return;
      animationFrame = window.requestAnimationFrame(measure);
    };

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(root);
    for (const anchor of root.querySelectorAll<HTMLElement>(
      "[data-method-anchor]",
    )) {
      resizeObserver.observe(anchor);
    }

    const unsubscribeProgress = progress.on("change", scheduleMeasure);
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    window.addEventListener("orientationchange", scheduleMeasure, {
      passive: true,
    });

    scheduleMeasure();

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
      resizeObserver.disconnect();
      unsubscribeProgress();
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("orientationchange", scheduleMeasure);
    };
  }, [enabled, progress, rootRef, store]);

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => null,
  );
}
