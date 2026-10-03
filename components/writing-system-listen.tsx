import type { PublishedWritingSystemArticle } from "@/components/writing-system-contract";

export function WritingSystemListen({
  article,
}: {
  article: Pick<
    PublishedWritingSystemArticle,
    "title" | "listenMinutes" | "audio"
  >;
}) {
  if (!article.audio) return null;

  return (
    <section
      className="writing-system-listen"
      data-writing-listen
      aria-label="Listen to this article"
    >
      <div className="writing-system-listen-head">
        <div>
          <strong>Listen to this article</strong>
          <span>
            Audio narration · {article.listenMinutes ?? 1} min
          </span>
        </div>
      </div>

      <audio
        controls
        preload="metadata"
        aria-label={`Audio narration of ${article.title}`}
      >
        <source src={article.audio.src} type={article.audio.mimeType} />
        Your browser does not support the audio element.
      </audio>

      <p>
        The narration is an audio version of the article. The full text is
        available on this page.
      </p>
    </section>
  );
}
