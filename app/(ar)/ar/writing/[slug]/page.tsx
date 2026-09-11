import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WritingArticleView } from "@/components/writing-authority";
import { profile } from "@/data/public";
import { getWritingArticleAr, writingArticlesAr } from "@/data/writing-ar";

export function generateStaticParams() {
  return writingArticlesAr.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getWritingArticleAr(slug);
  if (!article) return {};

  const canonical = `${profile.domain}/ar/writing/${article.slug}`;
  const english = `${profile.domain}/writing/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical,
      languages: { en: english, ar: canonical, "x-default": english },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonical,
      siteName: profile.name,
      type: "article",
      locale: "ar_EG",
      alternateLocale: ["en_US"],
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArabicWritingArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getWritingArticleAr(slug);
  if (!article) notFound();

  const canonical = `${profile.domain}/ar/writing/${article.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${canonical}#article`,
    url: canonical,
    headline: article.title,
    description: article.description,
    dateCreated: article.createdAt,
    inLanguage: "ar",
    author: {
      "@id": `${profile.domain}/#person`,
      "@type": "Person",
      name: profile.name,
      url: profile.domain,
    },
    mainEntityOfPage: canonical,
    about: {
      "@type": "CreativeWork",
      name: article.projectTitle,
      url: `${profile.domain}/ar/work/${article.projectSlug}`,
    },
    citation: article.sources.map((source) => source.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WritingArticleView article={article} locale="ar" />
    </>
  );
}
