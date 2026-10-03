import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getHomepageWriting } from "@/data/writing";
import { WritingCard } from "@/components/writing-card";

export function HomeWriting() {
  const articles = getHomepageWriting(6);

  return (
    <section
      id="writing"
      className="writing-system-home"
      data-writing-home
      data-writing-count={articles.length}
    >
      <div className="writing-system-shell">
        <header className="writing-system-home-header">
          <h2>What I’m thinking through.</h2>
          <p>Ideas, experiments, and the things I’m exploring.</p>
        </header>

        <div className="writing-system-grid">
          {articles.map((article) => (
            <WritingCard key={article.slug} article={article} context="home" />
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
