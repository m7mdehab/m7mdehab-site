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
  let wordIndex = 0;
  return (
    <>
      {text.split(/(\s+)/u).map((part, index) => {
        if (!part) return null;
        if (/^\s+$/u.test(part)) {
          return <Fragment key={`space-${index}`}>{part}</Fragment>;
        }
        const cueId = `${segmentId}:${wordIndex}`;
        wordIndex += 1;
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
