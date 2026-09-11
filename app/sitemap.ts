import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/public";
import { writingArticles } from "@/data/writing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const englishHome = profile.domain;
  const arabicHome = `${profile.domain}/ar`;
  const englishWriting = `${profile.domain}/writing`;
  const arabicWriting = `${profile.domain}/ar/writing`;

  const englishRoutes: MetadataRoute.Sitemap = [
    {
      url: englishHome,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: englishHome, ar: arabicHome } },
    },
    ...projects.map((project) => {
      const english = `${profile.domain}/work/${project.slug}`;
      const arabic = `${profile.domain}/ar/work/${project.slug}`;
      return {
        url: english,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages: { en: english, ar: arabic } },
      };
    }),
    {
      url: englishWriting,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: englishWriting, ar: arabicWriting } },
    },
    ...writingArticles.map((article) => {
      const english = `${profile.domain}/writing/${article.slug}`;
      const arabic = `${profile.domain}/ar/writing/${article.slug}`;
      return {
        url: english,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: { languages: { en: english, ar: arabic } },
      };
    }),
  ];

  const arabicRoutes: MetadataRoute.Sitemap = [
    {
      url: arabicHome,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: englishHome, ar: arabicHome } },
    },
    ...projects.map((project) => {
      const english = `${profile.domain}/work/${project.slug}`;
      const arabic = `${profile.domain}/ar/work/${project.slug}`;
      return {
        url: arabic,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: { en: english, ar: arabic } },
      };
    }),
    {
      url: arabicWriting,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { en: englishWriting, ar: arabicWriting } },
    },
    ...writingArticles.map((article) => {
      const english = `${profile.domain}/writing/${article.slug}`;
      const arabic = `${profile.domain}/ar/writing/${article.slug}`;
      return {
        url: arabic,
        changeFrequency: "monthly" as const,
        priority: 0.65,
        alternates: { languages: { en: english, ar: arabic } },
      };
    }),
  ];

  return [...englishRoutes, ...arabicRoutes];
}