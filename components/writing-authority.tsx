/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { WritingCard } from "@/components/writing-card";
import { WritingListen } from "@/components/writing-listen";
import { profile } from "@/data/public";
import {
  getWritingArticleOptionalContent,
  getWritingTocEntries,
  writingCategories,
  writingSectionAnchor,
  writingSectionCopy,
  type PublishedWritingArticle,
  type WritingBlock,
} from "@/data/writing";
import type { RelatedWritingProject } from "@/data/writing-schema";
import styles from "@/components/writing-authority.module.css";

function formatLabel(format: PublishedWritingArticle["format"]) {
  return {
    note: "Note",
    analysis: "Analysis",
    "deep-dive": "Deep dive",
    "project-reflection": "Project reflection",
  }[format];
}
function formattedDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, day, 12)));
}

export function WritingIndex({ articles }: { articles: readonly PublishedWritingArticle[] }) {
  const ordered = [...articles].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt) || left.slug.localeCompare(right.slug));
  return (
    <main id="main-content" className="writing-system-archive">
      <div className="writing-system-shell">
        <header className="writing-system-archive-header">
          <p className="writing-system-archive-kicker">Writing</p>
          <h1>{writingSectionCopy.heading}</h1>
          <p className="writing-system-archive-subtitle">{writingSectionCopy.subtitle}</p>
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
    case "code": return <pre key={index} data-language={block.language ?? undefined}><code>{block.code}</code></pre>;
    case "callout": return <div key={index} className={styles.callout} role="note">{block.title ? <strong>{block.title}</strong> : null}<p>{block.text}</p></div>;
  }
}

function ArticleToc({ article, mobile = false }: { article: PublishedWritingArticle; mobile?: boolean }) {
  const entries = getWritingTocEntries(article);
  if (entries.length < 4) return null;
  const list = (
    <ol>
      {entries.map((entry) => <li key={entry.id}><a href={`#${entry.id}`}>{entry.label}</a></li>)}
      {article.takeaways?.length ? <li><a href="#key-takeaways">Key takeaways</a></li> : null}
      {article.sources?.length ? <li><a href="#sources-and-further-reading">Sources & further reading</a></li> : null}
    </ol>
  );
  if (mobile) return <details className={styles.tocMobile}><summary>On this page</summary><nav aria-label="Article contents">{list}</nav></details>;
  return <nav className={styles.toc} aria-label="Article contents"><p>On this page</p>{list}</nav>;
}

export function WritingArticleBody({ article }: { article: PublishedWritingArticle }) {
  const optional = getWritingArticleOptionalContent(article);
  return (
    <article className={styles.articleBody}>
      {article.sections.map((section, sectionIndex) => (
        <section key={section.id ?? `${section.title ?? "section"}-${sectionIndex}`} id={writingSectionAnchor(section, sectionIndex)} className={styles.articleSection}>
          {section.eyebrow ? <p className={styles.sectionEyebrow}>{section.eyebrow}</p> : null}
          {section.title ? <h2>{section.title}</h2> : null}
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets?.length ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
          {section.blocks?.map(renderBlock)}
        </section>
      ))}

      {optional.takeaways.length ? (
        <section className={styles.takeaways} id="key-takeaways" data-writing-takeaways>
          <h2>{optional.takeawaysTitle ?? "Key takeaways."}</h2>
          <ul>{optional.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul>
        </section>
      ) : null}

      {optional.sources.length ? (
        <section className={styles.sources} id="sources-and-further-reading" data-writing-sources>
          <p className={styles.sectionEyebrow}>Sources</p>
          <h2>Sources & further reading.</h2>
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

export function WritingArticleView({
  article,
  relatedProjects,
  relatedArticles,
}: {
  article: PublishedWritingArticle;
  relatedProjects: readonly RelatedWritingProject[];
  relatedArticles: readonly PublishedWritingArticle[];
}) {
  const origin = article.origin;
  const optional = getWritingArticleOptionalContent(article);
  const category = writingCategories[article.category].label;
  return (
    <main id="main-content" className={styles.articleShell}><div className={styles.articleFrame}>
      <header className={styles.articleHero}>
        <div className={styles.articleTopline}>
          <Link className={styles.backLink} href="/writing"><ArrowLeft size={16} aria-hidden="true" /> All writing</Link>
          <span className={styles.articleFormat}>{formatLabel(article.format)}</span>
        </div>
        <p className={styles.articleEyebrow}>{category} · {article.topics.join(" · ")}</p>
        <h1>{article.title}</h1>
        <p className={styles.articleDeck}>{article.description}</p>
        <div className={styles.articleBylineRow}>
          <p className={styles.byline}>By <Link href="/about">{profile.name}</Link></p>
          <div className={styles.articleMetaGroup}>
            <time className={styles.articleMeta} dateTime={article.publishedAt}>{formattedDate(article.publishedAt)}</time>
            {article.updatedAt ? <time className={styles.articleMeta} dateTime={article.updatedAt}>Updated {formattedDate(article.updatedAt)}</time> : null}
            <span className={styles.articleMeta}>{article.readingMinutes} min read · {article.audio ? "" : "~"}{article.listenMinutes} min listen</span>
          </div>
        </div>
        <WritingListen article={article} />
        {optional.thesis ? <div className={styles.keyIdea} role="note"><span className={styles.keyIdeaLabel}>Key idea</span><p>{optional.thesis}</p></div> : null}
        {optional.evidence.length ? (
          <div className={styles.evidenceGrid} aria-label="Article evidence anchors">
            {optional.evidence.map((item) => <div key={item.label} className={styles.evidenceCard}><p className={styles.evidenceLabel}>{item.label}</p><p className={styles.evidenceValue}><bdi>{item.value}</bdi></p><p className={styles.evidenceDetail}>{item.detail}</p></div>)}
          </div>
        ) : null}
      </header>
      <div className={styles.readingLayout}><div className={styles.readingMain}><ArticleToc article={article} mobile /><WritingArticleBody article={article} /></div><div className={styles.tocRail}><ArticleToc article={article} /></div></div>
      {relatedArticles.length ? <section className={styles.relatedWriting} aria-labelledby="related-writing-title"><div className={styles.relatedHead}><p className={styles.sectionEyebrow}>Keep exploring</p><h2 id="related-writing-title">Related writing.</h2></div><div className={styles.relatedGrid}>{relatedArticles.map((related) => <WritingCard key={related.slug} article={related} context="related" />)}</div></section> : null}
      <footer className={styles.articleEnd}>
        <div>{origin.kind === "project" && origin.disclosure ? <p>{origin.disclosure}</p> : null}</div>
        <div className={styles.articleEndLinks}>
          {relatedProjects.map((project) => (
            <Link key={project.slug} className={styles.projectLink} href={project.caseStudyUrl} data-authority-link="article-to-project">
              {project.title} case study <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          ))}
          <Link className={styles.projectLink} href="/writing">All writing <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </footer>
      </div></main>
  );
}
