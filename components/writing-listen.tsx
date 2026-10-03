import { WritingAudioPlayer } from "@/components/writing-audio-player";
import {
  getWritingListenDetails,
  type WritingArticle,
} from "@/data/writing";

export function WritingListen({ article }: { article: WritingArticle }) {
  const listen = getWritingListenDetails(article);

  return (
    <WritingAudioPlayer
      title={article.title}
      sources={listen.sources}
      listenMinutes={listen.listenMinutes}
    />
  );
}
