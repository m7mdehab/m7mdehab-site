import Link from "next/link";
import { WritingSystemCover } from "@/components/writing-system-cover";
import {
  writingSystemTimingLabel,
  writingSystemTopicLabel,
  type PublishedWritingSystemArticle,
} from "@/components/writing-system-contract";

export function WritingSystemCard({
  article,
  context,
}: {
  article: PublishedWritingSystemArticle;
  context: "home" | "archive";
}) {
  const summary = article.cardDescription ?? article.description;

  return (
    <Link
      href={`/writing/${article.slug}`}
      className="writing-system-card"
      data-writing-card
      data-writing-context={context}
      data-writing-slug={article.slug}
    >
      <div className="writing-system-cover-frame">
        <WritingSystemCover article={article} />
        <div className="writing-system-cover-meta" aria-hidden="true">
          <span>{writingSystemTopicLabel(article)}</span>
          <span>{writingSystemTimingLabel(article)}</span>
        </div>
      </div>

      {context === "home" ? (
        <h3 className="writing-system-title">{article.title}</h3>
      ) : (
        <h2 className="writing-system-title">{article.title}</h2>
      )}

      <p className="writing-system-excerpt">{summary}</p>
    </Link>
  );
}
