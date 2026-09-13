"use client";

import {
  Binary,
  BrainCircuit,
  Braces,
  ChartNoAxesCombined,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Network,
  Sigma,
  Workflow,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

const iconPool = [Database, BrainCircuit, Binary, Code2, Network, Cpu, GitBranch, ChartNoAxesCombined, Workflow, Sigma, Braces] as const;

const iconNodes = [
  [2, 20, 0, 12, 10, 0.70, 24, true], [8, 54, 4, 15, 12, 0.92, 21, false],
  [13, 11, 7, 10, 9, 0.72, 19, false], [17, 76, 2, 17, 13, 0.84, 23, true],
  [22, 35, 9, 12, 15, 0.96, 20, false], [27, 62, 5, 14, 11, 0.68, 25, false],
  [31, 16, 1, 16, 12, 0.88, 21, true], [36, 83, 8, 11, 9, 0.76, 19, false],
  [40, 43, 3, 15, 13, 0.90, 24, false], [44, 8, 6, 12, 10, 0.72, 18, true],
  [48, 69, 10, 17, 12, 0.98, 22, false], [52, 28, 2, 10, 14, 0.78, 20, false],
  [56, 87, 7, 14, 10, 0.84, 22, true], [60, 13, 4, 16, 13, 0.91, 19, false],
  [64, 54, 0, 12, 9, 0.70, 24, false], [68, 34, 9, 15, 12, 0.96, 20, true],
  [72, 79, 5, 11, 14, 0.80, 23, false], [76, 17, 1, 17, 11, 0.88, 20, false],
  [80, 61, 8, 13, 10, 0.75, 19, true], [84, 39, 3, 15, 13, 0.94, 24, false],
  [88, 84, 6, 10, 12, 0.72, 21, false], [91, 23, 10, 16, 9, 0.87, 20, true],
  [94, 57, 4, 12, 14, 0.98, 23, false], [97, 74, 7, 15, 11, 0.76, 19, false],
  [6, 88, 1, 10, 9, 0.82, 18, false], [96, 9, 5, 13, 12, 0.88, 20, false],
] as const;

const codeNodes = [
  [5, 40, "SELECT *", 12, 10, 0.74], [11, 68, "0x01", 16, 12, 0.90],
  [24, 88, "P(y|x)", 10, 9, 0.76], [34, 29, "{ model }", 14, 11, 0.86],
  [46, 19, "Σ loss", 11, 14, 0.70], [58, 73, "JOIN", 16, 10, 0.94],
  [70, 9, "[0,1]", 12, 13, 0.80], [82, 91, "λ", 15, 11, 0.88],
  [90, 47, "{ AI }", 10, 14, 0.96], [97, 35, "O(n)", 13, 10, 0.72],
] as const;

type AmbientStyle = CSSProperties & Record<`--${string}`, string | number>;

function styleFor(x: number, y: number, radius: number, duration: number, strength: number, index: number): AmbientStyle {
  return {
    left: `${x}%`,
    top: `${y}%`,
    "--orbit-radius": `${radius}px`,
    "--orbit-radius-y": `${Math.max(6, Math.round(radius * 0.72))}px`,
    "--orbit-duration": `${duration}s`,
    "--orbit-delay": `${-(index * 1.37) % duration}s`,
    "--interaction-strength": strength,
  };
}

export function HeroAmbientField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const items = Array.from(field.querySelectorAll<HTMLElement>("[data-ambient-item]"));
    let frame = 0;
    let pointerX = -10_000;
    let pointerY = -10_000;

    const render = () => {
      for (const item of items) {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = centerX - pointerX;
        const dy = centerY - pointerY;
        const distance = Math.hypot(dx, dy);
        const influenceRadius = 205;
        const proximity = Math.max(0, 1 - distance / influenceRadius);
        const strength = Number(item.style.getPropertyValue("--interaction-strength") || 0.8);
        const force = Math.pow(proximity, 1.45) * 34 * strength;
        const divisor = Math.max(distance, 1);
        item.style.setProperty("--pointer-x", `${((dx / divisor) * force).toFixed(2)}px`);
        item.style.setProperty("--pointer-y", `${((dy / divisor) * force).toFixed(2)}px`);
        item.style.setProperty("--pointer-proximity", proximity.toFixed(3));
      }
    };

    const update = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(render);
    };

    const reset = () => {
      pointerX = -10_000;
      pointerY = -10_000;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        for (const item of items) {
          item.style.setProperty("--pointer-x", "0px");
          item.style.setProperty("--pointer-y", "0px");
          item.style.setProperty("--pointer-proximity", "0");
        }
      });
    };

    window.addEventListener("pointermove", update, { passive: true });
    window.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
    };
  }, []);

  return (
    <div ref={fieldRef} className="hero-ambient-field" aria-hidden="true">
      {iconNodes.map(([x, y, iconIndex, radius, duration, strength, size, boxed], index) => {
        const Icon = iconPool[iconIndex];
        return (
          <span
            className={`hero-ambient-item hero-ambient-icon${boxed ? " is-boxed" : " is-free"}`}
            data-ambient-item
            key={`icon-${index}`}
            style={styleFor(x, y, radius, duration, strength, index)}
          >
            <span className="hero-ambient-orbit">
              <span className="hero-ambient-surface"><Icon size={size} strokeWidth={1.25} /></span>
            </span>
          </span>
        );
      })}
      {codeNodes.map(([x, y, text, radius, duration, strength], index) => (
        <span
          className="hero-ambient-item hero-ambient-code"
          data-ambient-item
          key={`code-${text}-${index}`}
          style={styleFor(x, y, radius, duration, strength, index + iconNodes.length)}
        >
          <span className="hero-ambient-orbit"><span className="hero-ambient-surface">{text}</span></span>
        </span>
      ))}
    </div>
  );
}
