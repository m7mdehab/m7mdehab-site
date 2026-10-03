import { profile, projects } from "@/data/public";
import { publishedWritingArticles } from "@/data/writing";
import { projectVisuals } from "@/data/project-visuals";

export const dynamic = "force-static";

function absoluteMediaUrl(value: string) {
  return new URL(value, `${profile.domain}/`).toString();
}

function stableCoverImage(article: (typeof publishedWritingArticles)[number]) {
  if (article.cover.kind === "image") return article.cover.src;
  if (article.cover.visual === "oil-sar") return projectVisuals["oil-spill-detection"].image;
  return undefined;
}

export function GET() {
  const records = publishedWritingArticles.map((article) => {
    const origin = article.origin;
    const coverImage = stableCoverImage(article);
    return ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    cardDescription: article.cardDescription ?? article.description,
    category: article.category,
    topics: article.topics,
    series: article.series ?? null,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt ?? null,
    readingMinutes: article.readingMinutes,
    listenMinutes: article.listenMinutes ?? null,
    url: `${profile.domain}/writing/${article.slug}`,
    ...(article.audio ? {
      audio: {
        url: absoluteMediaUrl(article.audio.src),
        mimeType: article.audio.mimeType,
        durationSeconds: article.audio.durationSeconds,
      },
    } : {}),
    relatedProjects: origin.kind === "project"
      ? projects.flatMap((project) => project.slug === origin.projectSlug ? [{ slug: project.slug, title: project.title, caseStudyUrl: `${profile.domain}/work/${project.slug}` }] : [])
      : [],
    sourceLinks: (article.sources ?? []).map((source) => ({
      label: source.label,
      url: source.href,
      kind: source.kind,
    })),
    ...(coverImage ? { coverImage: absoluteMediaUrl(coverImage) } : {}),
  });
  });

  return Response.json(records);
}
