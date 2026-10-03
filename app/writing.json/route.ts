import { profile, projects } from "@/data/public";
import { publishedWritingArticles } from "@/data/writing";
import { projectVisuals } from "@/data/project-visuals";

export const dynamic = "force-static";

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
    cardDescription: article.cardDescription ?? null,
    category: article.category,
    topics: article.topics,
    series: article.series ?? null,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt ?? null,
    readingMinutes: article.readingMinutes,
    listenMinutes: article.listenMinutes,
    audio: article.audio
      ? {
          url: article.audio.src.startsWith("http")
            ? article.audio.src
            : `${profile.domain}${article.audio.src.startsWith("/") ? article.audio.src : `/${article.audio.src}`}`,
          mimeType: article.audio.mimeType,
          durationSeconds: article.audio.durationSeconds,
        }
      : null,
    url: `${profile.domain}/writing/${article.slug}`,
    relatedProjects: origin.kind === "project"
      ? projects.flatMap((project) => project.slug === origin.projectSlug ? [{ slug: project.slug, title: project.title, caseStudyUrl: `${profile.domain}/work/${project.slug}` }] : [])
      : [],
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
