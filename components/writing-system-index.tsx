import { WritingSystemCard } from "@/components/writing-system-card";
import type { PublishedWritingSystemArticle } from "@/components/writing-system-contract";

export function WritingSystemIndex({
  articles,
}: {
  articles: readonly PublishedWritingSystemArticle[];
}) {
  const ordered = [...articles].sort(
    (a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) ||
      a.slug.localeCompare(b.slug),
  );

  return (
    <main
      id="main-content"
      className="shell writing-system-index"
      data-writing-index
    >
      <header className="writing-system-index-head">
        <p className="eyebrow">Writing</p>
        <h1>What I’m thinking through.</h1>
      </header>

      <div className="writing-system-grid">
        {ordered.map((article) => (
          <WritingSystemCard
            key={article.slug}
            article={article}
            context="archive"
          />
        ))}
      </div>
    </main>
  );
}
