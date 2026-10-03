import { profile, projects } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";
import type { WritingArticle } from "@/data/writing";

export function writingAbsoluteMediaUrl(src: string) {
  if (/^https?:\/\//.test(src)) return src;
  return `${profile.domain}${src.startsWith("/") ? src : `/${src}`}`;
}

export function writingStableImage(article: WritingArticle) {
  if (article.cover.kind === "image") return article.cover.src;
  if (article.cover.visual === "oil-sar") {
    return projectVisuals["oil-spill-detection"].image;
  }
  return undefined;
}

export function buildWritingBlogPostingSchema(article: WritingArticle) {
  const canonical = `${profile.domain}/writing/${article.slug}`;
  const image = writingStableImage(article);
  const project = article.origin.kind === "project"
    ? projects.find((item) => item.slug === article.origin.projectSlug)
    : undefined;
  const audio = article.audio
    ? {
        "@type": "AudioObject",
        contentUrl: writingAbsoluteMediaUrl(article.audio.src),
        encodingFormat: article.audio.mimeType,
        duration: `PT${Math.round(article.audio.durationSeconds)}S`,
        caption: "Audio narration of this article",
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    url: canonical,
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    keywords: article.topics,
    timeRequired: `PT${article.readingMinutes}M`,
    inLanguage: "en",
    author: {
      "@id": `${profile.domain}/#person`,
      "@type": "Person",
      name: profile.name,
      url: profile.domain,
    },
    mainEntityOfPage: canonical,
    ...(project
      ? {
          about: {
            "@type": "CreativeWork",
            name: project.title,
            url: `${profile.domain}/work/${project.slug}`,
          },
        }
      : {}),
    ...(article.sources?.length
      ? { citation: article.sources.map((source) => source.href) }
      : {}),
    ...(image ? { image: writingAbsoluteMediaUrl(image) } : {}),
    ...(audio ? { audio } : {}),
  };
}
