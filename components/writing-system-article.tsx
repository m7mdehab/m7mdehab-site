import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  writingSystemCategoryLabel,
  writingSystemSeriesLabel,
  type PublishedWritingSystemArticle,
} from "@/components/writing-system-contract";
import { WritingSystemCover } from "@/components/writing-system-cover";
import { WritingSystemSectionBody } from "@/components/writing-system-article-blocks";
import type { WritingSystemRelatedProject } from "@/components/writing-system-schema";

function readableDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function WritingSystemArticleView({
  article,
  relatedProjects = [],
}: {
  article: PublishedWritingSystemArticle;
  relatedProjects?: readonly WritingSystemRelatedProject[];
}) {
  const series = writingSystemSeriesLabel(article.series);
  const disclosure =
    article.origin.kind === "project" ? article.origin.disclosure : undefined;

  return (
    <main
      id="main-content"
      className="shell writing-system-article"
      data-writing-article
      data-writing-slug={article.slug}
    >
      <header className="writing-system-article-head">
        <Link className="writing-system-article-back" href="/writing">
          <ArrowLeft size={15} aria-hidden="true" />
          All writing
        </Link>

        <div className="writing-system-article-meta">
          <span>{writingSystemCategoryLabel(article.category)}</span>
          <span>{article.topics.join(" · ")}</span>
          <span>{article.readingMinutes} min</span>
        </div>

        {series ? (
          <p className="writing-system-article-series">{series}</p>
        ) : null}

        <h1>{article.title}</h1>
        <p className="writing-system-article-deck">{article.description}</p>

        <div className="writing-system-article-dates">
          <time dateTime={article.publishedAt}>
            Published {readableDate(article.publishedAt)}
          </time>
          {article.updatedAt ? (
            <time dateTime={article.updatedAt}>
              Updated {readableDate(article.updatedAt)}
            </time>
          ) : null}
        </div>

        <WritingSystemCover article={article} />

        {article.thesis ? (
          <p className="writing-system-article-thesis">{article.thesis}</p>
        ) : null}

        {article.evidence?.length ? (
          <div
            className="writing-system-article-evidence"
            aria-label="Article evidence"
          >
            {article.evidence.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        ) : null}
      </header>

      <article className="writing-system-article-body">
        {article.sections.map((section) => (
          <section key={section.id} id={section.id}>
            {section.eyebrow ? <p>{section.eyebrow}</p> : null}
            {section.title ? <h2>{section.title}</h2> : null}
            <WritingSystemSectionBody section={section} />
          </section>
        ))}

        {article.takeaways?.length ? (
          <section className="writing-system-article-takeaways">
            <h2>{article.takeawaysTitle ?? "Key takeaways"}</h2>
            <ul>
              {article.takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {article.sources?.length ? (
          <section className="writing-system-article-sources">
            <h2>Sources</h2>
            <div>
              {article.sources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{source.label}</span>
                  <small>
                    {source.kind === "first-hand"
                      ? "First-hand evidence"
                      : "Reference"}
                  </small>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {relatedProjects.length ? (
          <section className="writing-system-article-related">
            <h2>
              {relatedProjects.length === 1
                ? "Related project"
                : "Related projects"}
            </h2>
            <div>
              {relatedProjects.map((project) => (
                <Link key={project.slug} href={project.url}>
                  {project.title}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {disclosure ? (
          <p className="writing-system-article-disclosure">{disclosure}</p>
        ) : null}
      </article>
    </main>
  );
}
