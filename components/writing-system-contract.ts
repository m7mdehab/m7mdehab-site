export const writingCategories = {
  ai: { label: "AI" },
  technology: { label: "Technology" },
  data: { label: "Data" },
  career: { label: "Career" },
  projects: { label: "Projects" },
  notes: { label: "Notes" },
} as const;

export const writingSeries = {
  "what-the-work-taught-me": { label: "What the Work Taught Me" },
} as const;

export type WritingSystemCategoryId = keyof typeof writingCategories;
export type WritingSystemSeriesId = keyof typeof writingSeries;

export type WritingSystemVisualId =
  | "forecast-calibration"
  | "oil-sar"
  | "agent-provenance";

export type WritingSystemCover =
  | {
      kind: "visual";
      visual: WritingSystemVisualId;
      alt: string;
      socialImage?: string;
    }
  | {
      kind: "image";
      src: string;
      alt: string;
      objectPosition?: string;
      socialImage?: string;
    };

export type WritingSystemOrigin =
  | {
      kind: "project";
      projectSlugs: readonly string[];
      disclosure?: string;
    }
  | {
      kind: "independent";
    };

export type WritingSystemEvidence = {
  label: string;
  value: string;
  detail: string;
};

export type WritingSystemSource = {
  label: string;
  href: string;
  kind: "first-hand" | "reference";
};

export type WritingSystemBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: readonly string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "code"; code: string; language?: string }
  | { type: "callout"; title?: string; text: string };

export type WritingSystemSection = {
  id: string;
  eyebrow?: string;
  title?: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  blocks?: readonly WritingSystemBlock[];
};

type WritingSystemArticleBase = {
  slug: string;
  title: string;
  description: string;
  category: WritingSystemCategoryId;
  topics: readonly string[];
  series?: WritingSystemSeriesId;
  updatedAt?: string;
  readingMinutes: number;
  homeRank?: number;
  cover: WritingSystemCover;
  origin: WritingSystemOrigin;
  thesis?: string;
  evidence?: readonly WritingSystemEvidence[];
  sections: readonly WritingSystemSection[];
  takeaways?: readonly string[];
  takeawaysTitle?: string;
  sources?: readonly WritingSystemSource[];
};

export type PublishedWritingSystemArticle = WritingSystemArticleBase & {
  status: "published";
  publishedAt: string;
};

export type DraftWritingSystemArticle = WritingSystemArticleBase & {
  status: "draft";
  publishedAt?: string;
};

export type WritingSystemArticle =
  | PublishedWritingSystemArticle
  | DraftWritingSystemArticle;

export function isPublishedWritingSystemArticle(
  article: WritingSystemArticle,
): article is PublishedWritingSystemArticle {
  return article.status === "published";
}

export function getPublishedWritingSystemArticles(
  articles: readonly WritingSystemArticle[],
) {
  return articles.filter(isPublishedWritingSystemArticle);
}

export function getHomepageWritingSystemArticles(
  articles: readonly PublishedWritingSystemArticle[],
  limit = 6,
) {
  return [...articles]
    .filter((article) => article.homeRank != null)
    .sort((a, b) => (a.homeRank ?? 999) - (b.homeRank ?? 999))
    .slice(0, limit);
}

export function writingSystemCategoryLabel(
  category: WritingSystemCategoryId,
) {
  return writingCategories[category].label;
}

export function writingSystemSeriesLabel(
  series?: WritingSystemSeriesId,
) {
  return series ? writingSeries[series].label : undefined;
}

export function writingSystemTopicLabel(
  article: Pick<PublishedWritingSystemArticle, "category" | "topics">,
) {
  const category = writingSystemCategoryLabel(article.category);
  const firstTopic = article.topics[0];
  return firstTopic ? `${category} · ${firstTopic}` : category;
}


export function assertWritingSystemIntegrity(
  articles: readonly WritingSystemArticle[],
) {
  const slugs = new Set<string>();
  const homeRanks = new Set<number>();

  for (const article of articles) {
    if (slugs.has(article.slug)) {
      throw new Error(`Duplicate writing slug: ${article.slug}`);
    }
    slugs.add(article.slug);

    if (article.homeRank != null) {
      if (article.homeRank < 1 || !Number.isInteger(article.homeRank)) {
        throw new Error(
          `Invalid homeRank for ${article.slug}: ${article.homeRank}`,
        );
      }
      if (homeRanks.has(article.homeRank)) {
        throw new Error(`Duplicate writing homeRank: ${article.homeRank}`);
      }
      homeRanks.add(article.homeRank);
    }

    if (!article.topics.length) {
      throw new Error(`Writing article has no topics: ${article.slug}`);
    }

    if (!article.cover.alt.trim()) {
      throw new Error(`Writing cover has empty alt text: ${article.slug}`);
    }

    if (
      article.status === "published" &&
      !/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt)
    ) {
      throw new Error(
        `Published article has invalid publishedAt: ${article.slug}`,
      );
    }
  }
}
