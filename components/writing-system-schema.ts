import type { PublishedWritingSystemArticle } from "@/components/writing-system-contract";

export type WritingSystemRelatedProject = {
  slug: string;
  title: string;
  url: string;
};

const SITE_URL = "https://m7mdehab.com";

export function writingSystemArticleUrl(slug: string) {
  return `${SITE_URL}/writing/${slug}`;
}

export function writingSystemAbsoluteMediaUrl(src: string) {
  if (/^https?:\/\//.test(src)) return src;
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

export function writingSystemStableImage(
  article: PublishedWritingSystemArticle,
) {
  if (article.cover.socialImage)
    return writingSystemAbsoluteMediaUrl(article.cover.socialImage);
  if (article.cover.kind === "image")
    return writingSystemAbsoluteMediaUrl(article.cover.src);
  return undefined;
}

export function buildWritingSystemBlogPostingSchema({
  article,
  authorName,
  authorId,
  relatedProjects = [],
}: {
  article: PublishedWritingSystemArticle;
  authorName: string;
  authorId: string;
  relatedProjects?: readonly WritingSystemRelatedProject[];
}) {
  const url = writingSystemArticleUrl(article.slug);
  const image = writingSystemStableImage(article);
  const citations = article.sources?.map((source) => source.href) ?? [];
  const audio = article.audio
    ? {
        "@type": "AudioObject",
        contentUrl: writingSystemAbsoluteMediaUrl(article.audio.src),
        encodingFormat: article.audio.mimeType,
        duration: `PT${Math.round(article.audio.durationSeconds)}S`,
        caption: "Audio narration of this article",
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: article.title,
    description: article.description,
    inLanguage: "en",
    datePublished: article.publishedAt,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    author: {
      "@type": "Person",
      "@id": authorId,
      name: authorName,
    },
    keywords: article.topics,
    ...(image ? { image } : {}),
    ...(audio ? { audio } : {}),
    ...(citations.length ? { citation: citations } : {}),
    ...(relatedProjects.length
      ? {
          about: relatedProjects.map((project) => ({
            "@type": "CreativeWork",
            name: project.title,
            url: project.url,
          })),
        }
      : {}),
  };
}
