import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getHomepageWriting } from "@/data/writing";
import { WritingCard } from "@/components/writing-card";

const lede = "Notes on AI, technology, work, projects, and whatever else I’m thinking through.";

export function HomeWriting() {
  const articles = getHomepageWriting(6);
  return (
    <section id="writing" className="writing-system-home" data-writing-home data-writing-count={articles.length}>
      <div className="writing-system-shell">
        <header className="writing-system-home-header">
          <h2>Writing.</h2>
          <div className="writing-system-home-intro">
            <p>{lede}</p>
            <Link href="/writing">All writing <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
        </header>
        <div className="writing-system-grid">
          {articles.map((article) => <WritingCard key={article.slug} article={article} context="home" />)}
        </div>
      </div>
    </section>
  );
}
