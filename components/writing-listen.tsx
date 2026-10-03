import { getWritingListenDetails, type WritingArticle } from "@/data/writing";

export function WritingListen({ article }: { article: WritingArticle }) {
  const listen = getWritingListenDetails(article);
  if (!listen) return null;

  return (
    <section
      className="writing-system-listen"
      data-writing-listen
      aria-label={listen.sectionLabel}
    >
      <div className="writing-system-listen-copy">
        <strong>Listen to this article</strong>
        <span>Audio narration · {listen.listenMinutes} min</span>
      </div>
      <audio
        controls={listen.controls}
        preload={listen.preload}
        aria-label={listen.playerLabel}
      >
        <source src={listen.src} type={listen.mimeType} />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
}
