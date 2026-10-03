import { WritingAudioPlayer } from "@/components/writing-audio-player";
import { getWritingListenDetails, type WritingArticle } from "@/data/writing";

export function WritingListen({ article }: { article: WritingArticle }) {
  const listen = getWritingListenDetails(article);
  if (!listen) return null;

  return (
    <WritingAudioPlayer
      title={article.title}
      src={listen.src}
      mimeType={listen.mimeType}
      durationSeconds={article.audio?.durationSeconds ?? article.listenMinutes * 60}
      listenMinutes={listen.listenMinutes}
    />
  );
}