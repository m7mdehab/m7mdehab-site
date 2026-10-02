import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WritingSystemCover } from "@/components/writing-system-cover";
import {
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
  const title = (
    <>
      {article.title}
      <ArrowUpRight
        className="writing-system-title-arrow"
        size={16}
        aria-hidden="true"
      />
    </>
  );

  return (
    <Link
      href={`/writing/${article.slug}`}
      className="writing-system-card"
      data-writing-card
      data-writing-context={context}
      data-writing-slug={article.slug}
    >
      <WritingSystemCover article={article} />
      <div className="writing-system-meta">
        <span>{writingSystemTopicLabel(article)}</span>
        <span>{article.readingMinutes} min</span>
      </div>
      {context === "home" ? (
        <h3 className="writing-system-title">{title}</h3>
      ) : (
        <h2 className="writing-system-title">{title}</h2>
      )}
      <p className="writing-system-excerpt">{article.description}</p>
    </Link>
  );
}
