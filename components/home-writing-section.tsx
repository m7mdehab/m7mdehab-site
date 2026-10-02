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
          <h2>Writing.</h2>
          <div className="writing-system-head-side">
            <p>
              Notes on AI, technology, work, projects, and whatever else I’m
              thinking through.
            </p>
            <Link href="/writing">
              All writing <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
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
      </div>
    </section>
  );
}
