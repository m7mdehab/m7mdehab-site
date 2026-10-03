import { profile } from "@/data/public";
import { getWritingWordCount, publishedWritingArticles } from "@/data/writing";
import { projectVisuals } from "@/data/project-visuals";
import { getRelatedWritingProjects } from "@/data/writing-schema";

export const dynamic = "force-static";

function stableCoverImage(article: (typeof publishedWritingArticles)[number]) {
  if (article.cover.kind === "image") return article.cover.src;
  if (article.cover.visual === "oil-sar") return projectVisuals["oil-spill-detection"].image;
  return undefined;
}

export function GET() {
  const records = publishedWritingArticles.map((article) => {
    const coverImage = stableCoverImage(article);
    return ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    cardDescription: article.cardDescription ?? null,
    format: article.format,
    category: article.category,
    topics: article.topics,
    series: article.series ?? null,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt ?? null,
    readingMinutes: article.readingMinutes,
    listenMinutes: article.listenMinutes,
    wordCount: getWritingWordCount(article),
    ...(article.audio
      ? { audio: {
          url: article.audio.src.startsWith("http")
            ? article.audio.src
            : `${profile.domain}${article.audio.src.startsWith("/") ? article.audio.src : `/${article.audio.src}`}`,
          mimeType: article.audio.mimeType,
          durationSeconds: article.audio.durationSeconds,
        } }
      : {}),
    url: `${profile.domain}/writing/${article.slug}`,
    relatedProjects: getRelatedWritingProjects(article),
    sourceLinks: (article.sources ?? []).map((source) => ({
      label: source.label,
      url: source.href,
      kind: source.kind,
    })),
    ...(coverImage ? { coverImage } : {}),
  });
  });

  return Response.json(records);
}
