import type { Metadata } from "next";
import { WritingIndex } from "@/components/writing-authority";
import { profile } from "@/data/public";
import { writingArticles } from "@/data/writing";

const canonical = `${profile.domain}/writing`;
const arabic = `${profile.domain}/ar/writing`;

export const metadata: Metadata = {
  title: "Writing — Data, AI & Product field notes",
  description: "First-hand technical essays from Mohammed Ehab ElNomany on probabilistic forecasting, production ML evaluation and governed AI agents.",
  alternates: {
    canonical,
    languages: { en: canonical, ar: arabic, "x-default": canonical },
  },
  openGraph: {
    title: `Writing — ${profile.name}`,
    description: "First-hand technical essays derived from inspectable project evidence.",
    url: canonical,
    siteName: profile.name,
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
  },
  twitter: {
    card: "summary",
    title: `Writing — ${profile.name}`,
    description: "First-hand technical essays derived from inspectable project evidence.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${canonical}#collection`,
  url: canonical,
  name: `Writing — ${profile.name}`,
  description: "First-hand technical essays derived from inspectable project evidence.",
  inLanguage: "en",
  author: { "@id": `${profile.domain}/#person`, "@type": "Person", name: profile.name, url: profile.domain },
  hasPart: writingArticles.map((article) => ({
    "@type": "TechArticle",
    "@id": `${profile.domain}/writing/${article.slug}#article`,
    url: `${profile.domain}/writing/${article.slug}`,
    headline: article.title,
  })),
};

export default function WritingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WritingIndex articles={writingArticles} locale="en" />
    </>
  );
}
