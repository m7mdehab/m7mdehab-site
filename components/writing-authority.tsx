/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { WritingCard } from "@/components/writing-card";
import { ArticleCover } from "@/components/writing-cover";
import { WritingListen } from "@/components/writing-listen";
import { projects } from "@/data/public";
import {
  getWritingArticleOptionalContent,
  writingTimingLabel,
  type WritingArticle,
  type WritingBlock,
} from "@/data/writing";
import styles from "@/components/writing-authority.module.css";

const categoryLabels = { ai: "AI", technology: "Technology", data: "Data", career: "Career", projects: "Projects", notes: "Notes" } as const;

function formattedDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, day, 12)));
}

export function WritingIndex({ articles }: { articles: readonly WritingArticle[] }) {
  const ordered = [...articles].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt) || left.slug.localeCompare(right.slug));
  return (
    <main id="main-content" className="writing-system-archive">
      <div className="writing-system-shell">
        <header className="writing-system-archive-header">
          <p className="writing-system-archive-kicker">Writing</p>
          <h1>What I’m thinking through.</h1>
        </header>
        <div className="writing-system-grid">
          {ordered.map((article) => <WritingCard key={article.slug} article={article} context="archive" />)}
        </div>
      </div>
    </main>
  );
}

function renderBlock(block: WritingBlock, index: number) {
  switch (block.type) {
    case "paragraph": return <p key={index}>{block.text}</p>;
    case "bullets": return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case "quote": return <blockquote key={index}><p>{block.text}</p>{block.attribution ? <cite>{block.attribution}</cite> : null}</blockquote>;
    case "image": return <figure key={index}><img src={block.src} alt={block.alt} loading="lazy" />{block.caption ? <figcaption>{block.caption}</figcaption> : null}</figure>;
    case "code": return <pre key={index}><code>{block.code}</code></pre>;
    case "callout": return <aside key={index}><strong>{block.title}</strong><p>{block.text}</p></aside>;
  }
}

export function WritingArticleBody({ article }: { article: WritingArticle }) {
  const optional = getWritingArticleOptionalContent(article);
  return (
    <article className={styles.articleBody}>
      {article.sections.map((section, sectionIndex) => (
        <section key={section.eyebrow ?? `${section.title}-${sectionIndex}`} className={styles.articleSection}>
          {section.eyebrow ? <p className={styles.sectionEyebrow}>{section.eyebrow}</p> : null}
          <h2>{section.title}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets?.length ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
          {section.blocks?.map(renderBlock)}
        </section>
      ))}

      {optional.takeaways.length ? (
        <section className={styles.takeaways} data-writing-takeaways>
          {optional.takeawaysTitle ? <p className={styles.sectionEyebrow}>{optional.takeawaysTitle}</p> : null}
          <h2>{optional.takeawaysTitle ?? "Key takeaways."}</h2>
          <ul>{optional.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul>
        </section>
      ) : null}

      {optional.sources.length ? (
        <section className={styles.sources} data-writing-sources>
          <p className={styles.sectionEyebrow}>Sources</p>
          <h2>Inspect the trail.</h2>
          <div className={styles.sourceList}>
            {optional.sources.map((source) => (
              <a key={source.href} className={styles.sourceLink} href={source.href} target="_blank" rel="noreferrer">
                <span className={styles.sourceText}><span>{source.label}</span><span className={styles.sourceKind}>{source.kind === "first-hand" ? "First-hand source" : "External reference"}</span></span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

export function WritingArticleView({ article }: { article: WritingArticle }) {
  const origin = article.origin;
  const optional = getWritingArticleOptionalContent(article);
  const project = optional.relatedProjectSlug ? projects.find((item) => item.slug === optional.relatedProjectSlug) : undefined;
  return (
    <main id="main-content" className={`shell ${styles.articleShell}`}>
      <header className={styles.articleHero}>
        <div className={styles.articleTopline}>
          <Link className={styles.backLink} href="/writing"><ArrowLeft size={16} aria-hidden="true" /> All writing</Link>
          <div className={styles.articleMetaGroup}>
            <time className={styles.articleMeta} dateTime={article.publishedAt}>{formattedDate(article.publishedAt)}</time>
            {article.updatedAt ? <time className={styles.articleMeta} dateTime={article.updatedAt}>Updated {formattedDate(article.updatedAt)}</time> : null}
            <span className={styles.articleMeta}>{writingTimingLabel(article)}</span>
          </div>
        </div>
        <p className="eyebrow">{categoryLabels[article.category]} · {article.topics.join(" · ")}</p>
        <h1>{article.title}</h1>
        <p className={styles.articleDeck}>{article.description}</p>
        <WritingListen article={article} />
        {article.cover ? <div className="writing-system-article-cover"><ArticleCover article={article} /></div> : null}
        {optional.thesis ? <p className={styles.articleThesis}>{optional.thesis}</p> : null}
        {optional.evidence.length ? (
          <div className={styles.evidenceGrid} aria-label="Article evidence anchors">
            {optional.evidence.map((item) => <div key={item.label} className={styles.evidenceCard}><p className={styles.evidenceLabel}>{item.label}</p><p className={styles.evidenceValue}><bdi>{item.value}</bdi></p><p className={styles.evidenceDetail}>{item.detail}</p></div>)}
          </div>
        ) : null}
      </header>
      <WritingArticleBody article={article} />
      <footer className={styles.articleEnd}>
        {origin.kind === "project" ? <p>This essay is informed by public project material. Project claims remain within the published evidence and ownership boundaries.</p> : <p>Writing reflects personal analysis and references where linked.</p>}
        {project ? <Link className={styles.projectLink} href={`/work/${project.slug}`} data-authority-link="article-to-project">{project.title} case study <ArrowUpRight size={15} aria-hidden="true" /></Link> : null}
        <Link className={styles.projectLink} href="/writing">All writing <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </footer>
    </main>
  );
}
