import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/public";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [{ url: profile.domain, lastModified: now, changeFrequency: "monthly", priority: 1 }, ...projects.map((project) => ({ url: `${profile.domain}/work/${project.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 }))];
}
