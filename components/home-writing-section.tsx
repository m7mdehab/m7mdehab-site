import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WritingSystemCard } from "@/components/writing-system-card";
import {
  getHomepageWritingSystemArticles,
  type PublishedWritingSystemArticle,
} from "@/components/writing-system-contract";

export function HomeWritingSection({
  articles,
}: {
  articles: readonly PublishedWritingSystemArticle[];
}) {
  const featured = getHomepageWritingSystemArticles(articles, 6);
  if (!featured.length) return null;

  return (
    <section
      id="writing"
      className="writing-system-home"
      data-writing-home
      data-writing-count={featured.length}
    >
      <div className="shell">
        <header className="writing-system-head">
          <h2>What I’m thinking through.</h2>
        </header>

        <div className="writing-system-grid">
          {featured.map((article) => (
            <WritingSystemCard
              key={article.slug}
              article={article}
              context="home"
            />
          ))}
        </div>

        <footer className="writing-system-footer">
          <Link href="/writing">
            All writing <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </section>
  );
}
