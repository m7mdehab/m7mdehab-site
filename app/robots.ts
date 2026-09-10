import type { MetadataRoute } from "next";
import { profile } from "@/data/public";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
    ],
    sitemap: `${profile.domain}/sitemap.xml`,
    host: profile.domain,
  };
}
