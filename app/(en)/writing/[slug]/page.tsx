import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WritingArticleView } from "@/components/writing-authority";
import { profile } from "@/data/public";
import { getWritingArticle, publishedWritingArticles } from "@/data/writing";
import { projects } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";

function absoluteMediaUrl(value: string) {
  return new URL(value, `${profile.domain}/`).toString();
}

export function generateStaticParams() {
  return publishedWritingArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getWritingArticle(slug);
  if (!article) return {};

  const canonical = `${profile.domain}/writing/${article.slug}`;
  const rawImage = article.cover.kind === "image"
    ? article.cover.src
    : article.cover.kind === "visual" && article.cover.visual === "oil-sar"
      ? projectVisuals["oil-spill-detection"].image
      : undefined;
  const image = rawImage ? absoluteMediaUrl(rawImage) : undefined;

  return {
    title: article.title,
    description: article.description,
    keywords: [...article.topics],
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonical,
      siteName: profile.name,
      type: "article",
      locale: "en_US",
      publishedTime: article.publishedAt,
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
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

  const canonical = `${profile.domain}/writing/${article.slug}`;
  const rawImage = article.cover.kind === "image"
    ? article.cover.src
    : article.cover.kind === "visual" && article.cover.visual === "oil-sar"
      ? projectVisuals["oil-spill-detection"].image
      : undefined;
  const image = rawImage ? absoluteMediaUrl(rawImage) : undefined;
  const origin = article.origin;
  const project = origin.kind === "project" ? projects.find((item) => item.slug === origin.projectSlug) : undefined;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    url: canonical,
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    keywords: article.topics,
    inLanguage: "en",
    author: {
      "@id": `${profile.domain}/#person`,
      "@type": "Person",
      name: profile.name,
      url: profile.domain,
    },
    mainEntityOfPage: canonical,
    ...(project ? { about: {
      "@type": "CreativeWork",
      name: project.title,
      url: `${profile.domain}/work/${project.slug}`,
    } } : {}),
    ...(article.sources?.length ? { citation: article.sources.map((source) => source.href) } : {}),
    ...(image ? { image } : {}),
    ...(article.audio ? {
      audio: {
        "@type": "AudioObject",
        contentUrl: absoluteMediaUrl(article.audio.src),
        encodingFormat: article.audio.mimeType,
        duration: `PT${Math.round(article.audio.durationSeconds)}S`,
        caption: "Audio narration of this article",
      },
    } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WritingArticleView article={article} />
    </>
  );
}
