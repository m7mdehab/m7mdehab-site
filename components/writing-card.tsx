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

export function WritingCard({ article, context }: { article: WritingArticle; context: "home" | "archive" }) {
  return (
    <Link
      className="writing-system-card"
      href={`/writing/${article.slug}`}
      data-writing-card
      data-writing-context={context}
      data-writing-slug={article.slug}
    >
      <WritingCover cover={article.cover} title={article.title} />
      <div className="writing-system-card-meta">
        <span>{categoryLabels[article.category]}{article.topics[0] ? ` · ${article.topics[0]}` : ""}</span>
        <span>{article.readingMinutes} min</span>
      </div>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
    </Link>
  );
}
