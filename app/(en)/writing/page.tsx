import type { Metadata } from "next";
import { WritingIndex } from "@/components/writing-authority";
import { profile } from "@/data/public";
import { writingArticles } from "@/data/writing";

const canonical = `${profile.domain}/writing`;
const description = "Technical essays, project lessons, experiments and field notes from Mohammed Ehab ElNomany on data, AI, systems and product decisions.";

export const metadata: Metadata = {
  title: "Writing | Data, AI & Product field notes",
  description,
  alternates: { canonical },
  openGraph: {
    title: `Writing | ${profile.name}`,
    description,
    url: canonical,
    siteName: profile.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `Writing | ${profile.name}`,
    description,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${canonical}#collection`,
  url: canonical,
  name: `Writing | ${profile.name}`,
  description,
  inLanguage: "en",
  author: { "@id": `${profile.domain}/#person`, "@type": "Person", name: profile.name, url: profile.domain },
  hasPart: writingArticles.map((article) => ({
    "@type": "TechArticle",
    "@id": `${profile.domain}/writing/${article.slug}#article`,
    url: `${profile.domain}/writing/${article.slug}`,
    headline: article.title.replaceAll("—", "·"),
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
