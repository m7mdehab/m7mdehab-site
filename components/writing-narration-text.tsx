import { Fragment } from "react";

export function WritingNarrationText({
  segmentId,
  text,
  className,
}: {
  segmentId: string;
  text: string;
  className?: string;
}) {
  const parts = text.split(/(\s+)/u);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        if (/^\s+$/u.test(part)) {
          return <Fragment key={`space-${index}`}>{part}</Fragment>;
        }

        const wordIndex = parts
          .slice(0, index)
          .filter((candidate) => candidate && !/^\s+$/u.test(candidate))
          .length;
        const cueId = `${segmentId}:${wordIndex}`;

        return (
          <span
            key={cueId}
            className={className}
            data-narration-cue={cueId}
          >
            {part}
          </span>
        );
      })}
    </>
  );
}
