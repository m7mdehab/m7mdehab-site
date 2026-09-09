"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  as?: "div" | "h1";
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ as = "div", children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionElement = as === "h1" ? motion.h1 : motion.div;

  return (
    <MotionElement
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(7px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionElement>
  );
}
