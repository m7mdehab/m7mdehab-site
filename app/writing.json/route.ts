import { profile } from "@/data/public";
import { writingArticles } from "@/data/writing";

export const dynamic = "force-static";

export function GET() {
  const records = writingArticles.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    topic: article.topic,
    createdAt: article.createdAt,
    readingMinutes: article.readingMinutes,
    url: `${profile.domain}/writing/${article.slug}`,
    alternateLanguageUrl: `${profile.domain}/ar/writing/${article.slug}`,
    project: {
      slug: article.projectSlug,
      title: article.projectTitle,
      caseStudyUrl: `${profile.domain}/work/${article.projectSlug}`,
    },
    evidence: article.evidence,
    sourceLinks: article.sources.map((source) => ({
      label: source.label,
      url: source.href,
      kind: source.kind,
    })),
  }));

  return Response.json(records);
}
