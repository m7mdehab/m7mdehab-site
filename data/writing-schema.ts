import { profile, projects } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";
import type { PublishedWritingArticle } from "@/data/writing";

export function writingAbsoluteMediaUrl(src: string) {
  if (/^https?:\/\//.test(src)) return src;
  return `${profile.domain}${src.startsWith("/") ? src : `/${src}`}`;
}

export function writingStableImage(article: PublishedWritingArticle) {
  if (article.cover.kind === "image") return article.cover.src;
  if (article.cover.visual === "oil-sar") {
    return projectVisuals["oil-spill-detection"].image;
  }
  return undefined;
}

export type RelatedWritingProject = {
  slug: string;
  title: string;
  caseStudyUrl: string;
};

export function getRelatedWritingProjects(article: PublishedWritingArticle): RelatedWritingProject[] {
  if (article.origin.kind !== "project") return [];

  return article.origin.projectSlugs.map((slug) => {
    const project = projects.find((item) => item.slug === slug);
    if (!project) throw new Error(`Unknown Writing project relationship: ${slug}`);
    return {
      slug: project.slug,
      title: project.title,
      caseStudyUrl: `${profile.domain}/work/${project.slug}`,
    };
  });
}

export function buildWritingBlogPostingSchema(article: PublishedWritingArticle) {
  const canonical = `${profile.domain}/writing/${article.slug}`;
  const image = writingStableImage(article);
  const relatedProjects = getRelatedWritingProjects(article);
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
    ...(relatedProjects.length
      ? {
          about: relatedProjects.map((project) => ({
            "@type": "CreativeWork",
            name: project.title,
            url: project.caseStudyUrl,
          })),
        }
      : {}),
    ...(article.sources?.length
      ? { citation: article.sources.map((source) => source.href) }
      : {}),
    ...(image ? { image: writingAbsoluteMediaUrl(image) } : {}),
    ...(audio ? { audio } : {}),
  };
}
