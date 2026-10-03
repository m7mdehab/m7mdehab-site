import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getHomepageWriting, writingSectionCopy } from "@/data/writing";
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
          <h2>{writingSectionCopy.heading}</h2>
          <p>{writingSectionCopy.subtitle}</p>
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
