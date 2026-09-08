"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps, ElementType, ReactNode } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  delay?: number;
  className?: string;
} & Omit<ComponentProps<T>, "as" | "children" | "className">;

export function Reveal<T extends ElementType = "div">({ as, children, delay = 0, className, ...props }: RevealProps<T>) {
  const reduce = useReducedMotion();
  const Component = motion.create((as ?? "div") as ElementType);

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(7px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}
