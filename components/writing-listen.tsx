import type { WritingArticle } from "@/data/writing";
import styles from "@/components/writing-authority.module.css";

export function WritingListen({ article }: { article: WritingArticle }) {
  if (!article.audio) return null;

  return (
    <section
      className={styles.writingListen}
      data-writing-listen
      aria-label="Listen to this article"
    >
      <div className={styles.writingListenCopy}>
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
