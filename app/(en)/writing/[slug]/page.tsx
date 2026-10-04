import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WritingArticleView } from "@/components/writing-authority";
import { profile } from "@/data/public";
import {
  getRelatedWritingArticles,
  getWritingArticle,
  publishedWritingArticles,
} from "@/data/writing";
import {
  buildWritingBlogPostingSchema,
  buildWritingBreadcrumbSchema,
  getRelatedWritingProjects,
  writingStableImage,
} from "@/data/writing-schema";

export function generateStaticParams() {
  return publishedWritingArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getWritingArticle(slug);
  if (!article) return {};
  const canonical = `${profile.domain}/writing/${article.slug}`;
  const image = writingStableImage(article);
  return {
    title: article.title,
    description: article.description,
    keywords: [article.category, ...article.topics],
    authors: [{ name: profile.name, url: `${profile.domain}/about` }],
    creator: profile.name,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonical,
      siteName: profile.name,
      type: "article",
      locale: "en_US",
      publishedTime: article.publishedAt,
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
      tags: [...article.topics],
      ...(image ? { images: [{ url: image, alt: article.title }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: article.title,
      description: article.description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function WritingArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getWritingArticle(slug);
  if (!article) notFound();
  const articleSchema = buildWritingBlogPostingSchema(article);
  const breadcrumbSchema = buildWritingBreadcrumbSchema(article);
  const relatedProjects = getRelatedWritingProjects(article);
  const relatedArticles = getRelatedWritingArticles(article, 2);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WritingArticleView article={article} relatedProjects={relatedProjects} relatedArticles={relatedArticles} />
    </>
  );
}