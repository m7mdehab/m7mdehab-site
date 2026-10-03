import type { WritingArticle } from "@/data/writing";

export function WritingListen({ article }: { article: WritingArticle }) {
  if (!article.audio) return null;

  return (
    <section
      className="writing-listen"
      data-writing-listen
      aria-label="Listen to this article"
    >
      <div className="writing-listen-copy">
        <strong>Listen to this article</strong>
        <span>Audio narration · {article.listenMinutes} min</span>
      </div>
      <audio
        controls
        preload="metadata"
        aria-label={`Audio narration of ${article.title}`}
      >
        <source src={article.audio.src} type={article.audio.mimeType} />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
}
