import type { ReactNode } from "react";

type RevealProps = {
  as?: "div" | "h1";
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
};

/**
 * Semantic wrapper retained for the homepage composition API.
 *
 * Earlier versions applied an `initial: opacity: 0` Motion state to every
 * section. That made off-screen server-rendered content visually blank until
 * JavaScript + intersection observation ran. Evidence and copy now remain
 * visible by default; project-specific interactions provide progressive motion.
 */
export function Reveal({ as = "div", children, className, id }: RevealProps) {
  if (as === "h1") {
    return <h1 className={className} id={id}>{children}</h1>;
  }

  return <div className={className} id={id}>{children}</div>;
}
