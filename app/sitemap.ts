import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/public";
import { writingArticles } from "@/data/writing";

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
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...writingArticles.map((article) => ({
      url: `${profile.domain}/writing/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
