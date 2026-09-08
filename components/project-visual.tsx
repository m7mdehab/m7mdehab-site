import type { ProjectTone } from "@/data/public";

export function ProjectVisual({ tone, label }: { tone: ProjectTone; label: string }) {
  return (
    <div className={`project-visual tone-${tone}`} aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-orbit visual-orbit-a" />
      <div className="visual-orbit visual-orbit-b" />
      <div className="visual-panel">
        <span>{label}</span>
        <div className="visual-sparkline"><i /><i /><i /><i /><i /><i /><i /></div>
      </div>
      <div className="visual-dot visual-dot-a" />
      <div className="visual-dot visual-dot-b" />
    </div>
  );
}
