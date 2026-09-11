import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import type { WritingArticle } from "@/data/writing";
import styles from "@/components/writing-authority.module.css";

export type WritingLocale = "en" | "ar";

function articleHref(article: WritingArticle, locale: WritingLocale) {
  return locale === "ar" ? `/ar/writing/${article.slug}` : `/writing/${article.slug}`;
}

function writingHref(locale: WritingLocale) {
  return locale === "ar" ? "/ar/writing" : "/writing";
}

function projectHref(article: WritingArticle, locale: WritingLocale) {
  return locale === "ar" ? `/ar/work/${article.projectSlug}` : `/work/${article.projectSlug}`;
}

function formattedDate(date: string, locale: WritingLocale) {
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day, 12));
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}

export function WritingPreview({ articles, locale }: { articles: readonly WritingArticle[]; locale: WritingLocale }) {
  const isArabic = locale === "ar";
  const Arrow = isArabic ? ArrowUpLeft : ArrowUpRight;

  return (
    <section id="writing" className="section shell">
      <div className="section-intro">
        <div><p className="eyebrow">10 — {isArabic ? "الكتابة" : "Writing"}</p></div>
        <h2>{isArabic ? "مقالات من داخل العمل نفسه." : <>Field notes with <em className="display-script">evidence</em> behind them.</>}</h2>
        <p className="section-copy">
          {isArabic
            ? "كتابة تقنية مبنية على مشروعات يمكن فحص أدلتها، لا محتوى عام أُنشئ فقط لجذب الزيارات."
            : "Technical writing derived from projects whose evidence can be inspected — not generic content produced to fill a publishing calendar."}
        </p>
      </div>
      <div className={styles.previewList}>
        {articles.slice(0, 3).map((article) => (
          <Link key={article.slug} className={styles.previewRow} href={articleHref(article, locale)} data-authority-link="article">
            <div>
              <p className={styles.previewMeta}>{article.topic} · {article.readingMinutes} {isArabic ? "دقائق" : "min"}</p>
              <h3>{article.title}</h3>
            </div>
            <span className={styles.previewAction}>{isArabic ? "اقرأ المقال" : "Read essay"} <Arrow size={16} aria-hidden="true" /></span>
          </Link>
        ))}
      </div>
      <div className={styles.previewFooter}>
        <Link className={styles.hubAction} href={writingHref(locale)}>{isArabic ? "كل المقالات" : "All writing"} <Arrow size={15} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

export function WritingIndex({ articles, locale }: { articles: readonly WritingArticle[]; locale: WritingLocale }) {
  const isArabic = locale === "ar";
  const Arrow = isArabic ? ArrowUpLeft : ArrowUpRight;

  return (
    <main id="main-content" className={`shell ${styles.indexShell}`}>
      <header className={styles.indexHero}>
        <p className="eyebrow">{isArabic ? "كتابة · أدلة · قرارات" : "Writing · evidence · decisions"}</p>
        <h1>{isArabic ? "ما تعلّمته من بناء الأنظمة، لا من تلخيص الإنترنت." : <>What the <em className="display-script">work</em> taught me, not what the internet already summarized.</>}</h1>
        <p className={styles.indexLede}>
          {isArabic
            ? "كل مقال يبدأ من مشروع حقيقي ومن أثر يمكن مراجعته. المراجع الخارجية تضيف سياقاً، لكن الادعاءات الخاصة بالعمل تبقى مرتبطة بمصادر المشروع العامة وحدود النشر نفسها التي تحكم دراسات الحالة."
            : "Each essay starts with a real project and an inspectable artifact. External references add context, while claims about my work stay bound to the same public evidence and publication limits as the case studies."}
        </p>
      </header>
      <div className={styles.indexGrid}>
        {articles.map((article, index) => (
          <Link key={article.slug} href={articleHref(article, locale)} className={styles.indexCard}>
            <p className={styles.indexMeta}>0{index + 1} · {article.topic}</p>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <div className={styles.indexCardFooter}>
              <span>{formattedDate(article.createdAt, locale)} · {article.readingMinutes} {isArabic ? "دقائق" : "min read"}</span>
              <span>{isArabic ? "قراءة" : "Read"} <Arrow size={14} aria-hidden="true" /></span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export function WritingArticleView({ article, locale }: { article: WritingArticle; locale: WritingLocale }) {
  const isArabic = locale === "ar";
  const BackArrow = isArabic ? ArrowRight : ArrowLeft;
  const OutArrow = isArabic ? ArrowUpLeft : ArrowUpRight;

  return (
    <main id="main-content" className={`shell ${styles.articleShell}`}>
      <header className={styles.articleHero}>
        <div className={styles.articleTopline}>
          <Link className={styles.backLink} href={writingHref(locale)}><BackArrow size={16} aria-hidden="true" /> {isArabic ? "كل المقالات" : "All writing"}</Link>
          <div className={styles.articleMetaGroup}>
            <span className={styles.articleMeta}>{formattedDate(article.createdAt, locale)}</span>
            <span className={styles.articleMeta}>{article.readingMinutes} {isArabic ? "دقائق قراءة" : "min read"}</span>
          </div>
        </div>
        <p className="eyebrow">{article.topic}</p>
        <h1>{article.title}</h1>
        <p className={styles.articleDeck}>{article.description}</p>
        <p className={styles.articleThesis}>{article.thesis}</p>
        <div className={styles.evidenceGrid} aria-label={isArabic ? "أدلة مرتبطة بالمقال" : "Article evidence anchors"}>
          {article.evidence.map((item) => (
            <div key={item.label} className={styles.evidenceCard}>
              <p className={styles.evidenceLabel}>{item.label}</p>
              <p className={styles.evidenceValue}><bdi>{item.value}</bdi></p>
              <p className={styles.evidenceDetail}>{item.detail}</p>
            </div>
          ))}
        </div>
      </header>

      <article className={styles.articleBody}>
        {article.sections.map((section) => (
          <section key={section.eyebrow} className={styles.articleSection}>
            <p className={styles.sectionEyebrow}>{section.eyebrow}</p>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets?.length ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
          </section>
        ))}

        <section className={styles.takeaways}>
          <p className={styles.sectionEyebrow}>{isArabic ? "خلاصة عملية" : "Practical checklist"}</p>
          <h2>{isArabic ? "ما الذي أحتفظ به من هذا العمل؟" : "What I carry into the next system."}</h2>
          <ul>{article.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul>
        </section>

        <section className={styles.sources}>
          <p className={styles.sectionEyebrow}>{isArabic ? "المصادر" : "Evidence & references"}</p>
          <h2>{isArabic ? "ما الذي يمكن فحصه؟" : "Inspect the trail."}</h2>
          <div className={styles.sourceList}>
            {article.sources.map((source) => (
              <a key={source.href} className={styles.sourceLink} href={source.href} target="_blank" rel="noreferrer">
                <span className={styles.sourceText}>
                  <span>{source.label}</span>
                  <span className={styles.sourceKind}>{source.kind === "first-hand" ? (isArabic ? "دليل مشروع مباشر" : "First-hand project evidence") : (isArabic ? "مرجع خارجي" : "External reference")}</span>
                </span>
                <OutArrow size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <footer className={styles.articleEnd}>
          <p>{isArabic ? "هذا المقال مشتق من دليل مشروع عام ولا يوسّع حدود النشر أو الملكية في دراسة الحالة الأصلية." : "This essay is derived from public project evidence and does not widen the ownership or publication boundaries of the underlying case study."}</p>
          <Link className={styles.projectLink} href={projectHref(article, locale)} data-authority-link="article-to-project">
            {isArabic ? `دراسة حالة ${article.projectTitle}` : `${article.projectTitle} case study`} <OutArrow size={15} aria-hidden="true" />
          </Link>
        </footer>
      </article>
    </main>
  );
}
