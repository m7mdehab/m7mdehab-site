import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/public";
import { publishedWritingArticles } from "@/data/writing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: profile.domain,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${profile.domain}/work`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${profile.domain}/about`,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    ...projects.map((project) => ({
      url: `${profile.domain}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${profile.domain}/services`,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${profile.domain}/writing`,
      lastModified: publishedWritingArticles.reduce(
        (latest, article) => {
          const candidate = article.updatedAt ?? article.publishedAt;
          return candidate > latest ? candidate : latest;
        },
        publishedWritingArticles[0]?.publishedAt ?? "2026-01-01",
      ),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...publishedWritingArticles.map((article) => ({
      url: `${profile.domain}/writing/${article.slug}`,
      lastModified: article.updatedAt ?? article.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
