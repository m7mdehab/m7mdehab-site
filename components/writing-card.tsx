import Link from "next/link";
import { getWritingTimingLabel, type PublishedWritingArticle, type WritingCategory } from "@/data/writing";
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
  article: PublishedWritingArticle;
  context: "home" | "archive" | "related";
}) {
  const taxonomy = `${categoryLabels[article.category]}${article.topics[0] ? ` · ${article.topics[0]}` : ""}`;
  const description = article.cardDescription ?? article.description;

  return (
    <Link
      className="writing-system-card"
      href={`/writing/${article.slug}`}
      data-writing-card
      data-writing-context={context}
      data-writing-slug={article.slug}
    >
      <div className="writing-system-cover-frame">
        <WritingCover cover={article.cover} title={article.title} decorative />
        <div className="writing-system-cover-meta">
          <span>{taxonomy}</span>
          <span>{getWritingTimingLabel(article)}</span>
        </div>
      </div>

      {context === "archive" ? <h2>{article.title}</h2> : <h3>{article.title}</h3>}
      <p className="writing-system-excerpt">{description}</p>
    </Link>
  );
}
