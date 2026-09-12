import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/public";
import { writingArticles } from "@/data/writing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const englishHome = profile.domain;
  const arabicHome = `${profile.domain}/ar`;
  const englishWork = `${profile.domain}/work`;
  const arabicWork = `${profile.domain}/ar/work`;
  const englishAbout = `${profile.domain}/about`;
  const arabicAbout = `${profile.domain}/ar/about`;
  const englishWriting = `${profile.domain}/writing`;
  const arabicWriting = `${profile.domain}/ar/writing`;
  const englishServices = `${profile.domain}/services`;
  const arabicServices = `${profile.domain}/ar/services`;

  const englishRoutes: MetadataRoute.Sitemap = [
    {
      url: englishHome,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: englishHome, ar: arabicHome } },
    },
    {
      url: englishWork,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: { languages: { en: englishWork, ar: arabicWork } },
    },
    {
      url: englishAbout,
      changeFrequency: "monthly",
      priority: 0.82,
      alternates: { languages: { en: englishAbout, ar: arabicAbout } },
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
      url: englishServices,
      changeFrequency: "monthly",
      priority: 0.78,
      alternates: { languages: { en: englishServices, ar: arabicServices } },
    },
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
    {
      url: arabicWork,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: { languages: { en: englishWork, ar: arabicWork } },
    },
    {
      url: arabicAbout,
      changeFrequency: "monthly",
      priority: 0.72,
      alternates: { languages: { en: englishAbout, ar: arabicAbout } },
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
      url: arabicServices,
      changeFrequency: "monthly",
      priority: 0.68,
      alternates: { languages: { en: englishServices, ar: arabicServices } },
    },
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
