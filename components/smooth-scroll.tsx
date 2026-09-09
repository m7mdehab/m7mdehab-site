"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Progressive enhancement island for smooth scrolling.
 *
 * This component intentionally renders no children. Keeping the side effect as
 * a leaf client island prevents the server-rendered site tree from becoming the
 * payload of a client boundary merely to install Lenis.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
