import Link from "next/link";
import type { WritingArticle, WritingCategory } from "@/data/writing";
import { WritingCover } from "@/components/writing-cover";

const categoryLabels: Record<WritingCategory, string> = {
  ai: "AI",
  technology: "Technology",
  data: "Data",
  career: "Career",
  projects: "Projects",
  notes: "Notes",
};

function timingLabel(article: WritingArticle) {
  const estimate = article.audio ? "" : "~";
  return `${article.readingMinutes} min read · ${estimate}${article.listenMinutes} min listen`;
}

export function WritingCard({
  article,
  context,
}: {
  article: WritingArticle;
  context: "home" | "archive";
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
        <WritingCover cover={article.cover} title={article.title} />
        <div className="writing-system-cover-meta">
          <span>{taxonomy}</span>
          <span>{timingLabel(article)}</span>
        </div>
      </div>

      <h2>{article.title}</h2>
      <p>{description}</p>
    </Link>
  );
}
