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
import { useEffect, useRef } from "react";

const ambientNodes = [
  { Icon: Database, className: "hero-ambient-node-a", depth: 0.48 },
  { Icon: BrainCircuit, className: "hero-ambient-node-b", depth: 0.75 },
  { Icon: Binary, className: "hero-ambient-node-c", depth: 0.36 },
  { Icon: Code2, className: "hero-ambient-node-d", depth: 0.62 },
  { Icon: Network, className: "hero-ambient-node-e", depth: 0.84 },
  { Icon: Cpu, className: "hero-ambient-node-f", depth: 0.44 },
  { Icon: GitBranch, className: "hero-ambient-node-g", depth: 0.7 },
  { Icon: ChartNoAxesCombined, className: "hero-ambient-node-h", depth: 0.52 },
  { Icon: Workflow, className: "hero-ambient-node-i", depth: 0.8 },
  { Icon: Sigma, className: "hero-ambient-node-j", depth: 0.4 },
  { Icon: Braces, className: "hero-ambient-node-k", depth: 0.66 },
] as const;

const codeFragments = [
  { text: "SELECT *", className: "hero-ambient-code-a", depth: 0.38 },
  { text: "{ AI }", className: "hero-ambient-code-b", depth: 0.58 },
  { text: "0x01", className: "hero-ambient-code-c", depth: 0.3 },
  { text: "P(y|x)", className: "hero-ambient-code-d", depth: 0.72 },
] as const;

export function HeroAmbientField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const nodes = Array.from(field.querySelectorAll<HTMLElement>("[data-depth]"));
    let frame = 0;

    const update = (event: PointerEvent) => {
      const x = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      const y = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        for (const node of nodes) {
          const depth = Number(node.dataset.depth ?? 0.5);
          node.style.setProperty("--parallax-x", `${(x * depth * 18).toFixed(2)}px`);
          node.style.setProperty("--parallax-y", `${(y * depth * 14).toFixed(2)}px`);
        }
      });
    };

    const reset = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        for (const node of nodes) {
          node.style.setProperty("--parallax-x", "0px");
          node.style.setProperty("--parallax-y", "0px");
        }
      });
    };

    window.addEventListener("pointermove", update, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", update);
      window.removeEventListener("blur", reset);
    };
  }, []);

  return (
    <div ref={fieldRef} className="hero-ambient-field" aria-hidden="true">
      {ambientNodes.map(({ Icon, className, depth }) => (
        <span className={`hero-ambient-node ${className}`} data-depth={depth} key={className}>
          <span className="hero-ambient-float"><Icon strokeWidth={1.25} /></span>
        </span>
      ))}
      {codeFragments.map(({ text, className, depth }) => (
        <span className={`hero-ambient-code ${className}`} data-depth={depth} key={className}>
          <span className="hero-ambient-float">{text}</span>
        </span>
      ))}
    </div>
  );
}
