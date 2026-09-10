import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/public";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.domain, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${profile.domain}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
