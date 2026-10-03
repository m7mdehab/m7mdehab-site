import type { WritingArticle } from "@/data/writing";

export function WritingListen({ article }: { article: WritingArticle }) {
  if (!article.audio) return null;

  const listenMinutes =
    article.listenMinutes ?? Math.max(1, Math.round(article.audio.durationSeconds / 60));

  return (
    <section
      className="writing-system-listen"
      data-writing-listen
      aria-label="Listen to this article"
    >
      <div className="writing-system-listen-header">
        <strong>Listen to this article</strong>
        <span>Audio narration · {listenMinutes} min</span>
      </div>

      <audio
        controls
        preload="metadata"
        aria-label={`Audio narration of ${article.title}`}
      >
        <source src={article.audio.src} type={article.audio.mimeType} />
        Your browser does not support the audio element.
      </audio>

      <p>The narration is an audio version of the article. The full text is available below.</p>
    </section>
  );
}
