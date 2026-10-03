import type { PublishedWritingSystemArticle } from "@/components/writing-system-contract";

export type WritingSystemRelatedProject = {
  slug: string;
  title: string;
  url: string;
};

export function writingSystemArticleUrl(slug: string) {
  return `https://m7mdehab.com/writing/${slug}`;
}

export function writingSystemStableImage(
  article: PublishedWritingSystemArticle,
) {
  if (article.cover.socialImage) return article.cover.socialImage;
  if (article.cover.kind === "image") return article.cover.src;
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
        contentUrl: article.audio.src,
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
