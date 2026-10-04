import { profile, projects } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";
import {
  getWritingNarrationSources,
  getWritingWordCount,
  writingCategories,
  type PublishedWritingArticle,
} from "@/data/writing";

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

const formatLabels = {
  note: "Note",
  analysis: "Analysis",
  "deep-dive": "Deep dive",
  "project-reflection": "Project reflection",
} as const;

export function buildWritingBlogPostingSchema(article: PublishedWritingArticle) {
  const canonical = `${profile.domain}/writing/${article.slug}`;
  const image = writingStableImage(article);
  const relatedProjects = getRelatedWritingProjects(article);
  const sectionNames = article.sections.flatMap((section) => section.title ? [section.title] : []);
  const audio = getWritingNarrationSources(article).map((source) => ({
    "@type": "AudioObject",
    name: `${article.title} — ${source.label} narration`,
    contentUrl: writingAbsoluteMediaUrl(source.src),
    encodingFormat: source.mimeType,
    caption: `${source.label} AI narration of this article`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    url: canonical,
    headline: article.title,
    description: article.description,
    ...(article.thesis ? { abstract: article.thesis } : {}),
    datePublished: article.publishedAt,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    keywords: [writingCategories[article.category].label, ...article.topics],
    genre: formatLabels[article.format],
    ...(sectionNames.length ? { articleSection: sectionNames } : {}),
    wordCount: getWritingWordCount(article),
    timeRequired: `PT${article.readingMinutes}M`,
    inLanguage: "en",
    author: {
      "@id": `${profile.domain}/#person`,
      "@type": "Person",
      name: profile.name,
      url: `${profile.domain}/about`,
      sameAs: [profile.github, profile.linkedin],
    },
    publisher: { "@id": `${profile.domain}/#person` },
    isPartOf: {
      "@type": "Blog",
      "@id": `${profile.domain}/writing#blog`,
      name: "Writing",
      url: `${profile.domain}/writing`,
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
    audio,
  };
}

export function buildWritingBreadcrumbSchema(article: PublishedWritingArticle) {
  const canonical = `${profile.domain}/writing/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: profile.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Writing",
        item: `${profile.domain}/writing`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonical,
      },
    ],
  };
}