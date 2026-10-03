import { WritingAudioPlayer } from "@/components/writing-audio-player";
import type { WritingArticle, WritingBlock } from "@/data/writing";

function blockSpeechText(block: WritingBlock) {
  switch (block.type) {
    case "paragraph":
      return block.text;
    case "bullets":
      return block.items.join(". ");
    case "quote":
      return [block.text, block.attribution ? `Quote attribution: ${block.attribution}` : ""].filter(Boolean).join(". ");
    case "image":
      return block.caption ?? "";
    case "code":
      return "";
    case "callout":
      return [block.title ?? "", block.text].filter(Boolean).join(". ");
  }
}

function articleSpeechChunks(article: WritingArticle) {
  const chunks = [
    article.title,
    article.description,
    ...(article.thesis ? [`Key idea. ${article.thesis}`] : []),
    ...article.sections.flatMap((section) => [
      ...(section.title ? [section.title] : []),
      ...(section.paragraphs ?? []),
      ...((section.bullets ?? []).map((bullet) => `Bullet point. ${bullet}`)),
      ...((section.blocks ?? []).map(blockSpeechText).filter(Boolean)),
    ]),
    ...(article.takeaways?.length
      ? [
          article.takeawaysTitle ?? "Key takeaways",
          ...article.takeaways.map((takeaway) => `Takeaway. ${takeaway}`),
        ]
      : []),
  ];

  return chunks.map((chunk) => chunk.trim()).filter(Boolean);
}

export function WritingListen({ article }: { article: WritingArticle }) {
  return (
    <WritingAudioPlayer
      title={article.title}
      chunks={articleSpeechChunks(article)}
      listenMinutes={article.listenMinutes}
    />
  );
}