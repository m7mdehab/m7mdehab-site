import Link from "next/link";
import {
  writingCardDescription,
  writingTimingLabel,
  type WritingArticle,
  type WritingCategory,
} from "@/data/writing";
import { WritingCover } from "@/components/writing-cover";

const categoryLabels: Record<WritingCategory, string> = {
  ai: "AI",
  technology: "Technology",
  data: "Data",
  career: "Career",
  projects: "Projects",
  notes: "Notes",
};

export function WritingCard({
  article,
  context,
}: {
  article: WritingArticle;
  context: "home" | "archive";
}) {
  const topic = article.topics[0]
    ? `${categoryLabels[article.category]} · ${article.topics[0]}`
    : categoryLabels[article.category];

  return (
    <Link
      className="writing-system-card"
      href={`/writing/${article.slug}`}
      data-writing-card
      data-writing-context={context}
      data-writing-slug={article.slug}
    >
      <div className="writing-system-cover-frame">
        <WritingCover cover={article.cover} title={article.title} />
        <div className="writing-system-card-overlay">
          <span>{topic}</span>
          <span>{writingTimingLabel(article)}</span>
        </div>
      </div>

      {context === "home" ? (
        <h3 className="writing-system-card-title">{article.title}</h3>
      ) : (
        <h2 className="writing-system-card-title">{article.title}</h2>
      )}

      <p className="writing-system-card-description">
        {writingCardDescription(article)}
      </p>
    </Link>
  );
}
