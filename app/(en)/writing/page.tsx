import type { Metadata } from "next";
import { WritingIndex } from "@/components/writing-authority";
import { profile } from "@/data/public";
import { publishedWritingArticles } from "@/data/writing";

const canonical = `${profile.domain}/writing`;

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes and essays from Mohammed Ehab ElNomany on AI, technology, data, work, projects and ideas worth thinking through.",
  alternates: { canonical },
  openGraph: {
    title: `Writing — ${profile.name}`,
    description: "Notes and essays from Mohammed Ehab ElNomany on AI, technology, data, work, projects and ideas worth thinking through.",
    url: canonical,
    siteName: profile.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `Writing — ${profile.name}`,
    description: "Notes and essays from Mohammed Ehab ElNomany on AI, technology, data, work, projects and ideas worth thinking through.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${canonical}#collection`,
  url: canonical,
  name: `Writing — ${profile.name}`,
  description: "Notes and essays from Mohammed Ehab ElNomany on AI, technology, data, work, projects and ideas worth thinking through.",
  inLanguage: "en",
  author: { "@id": `${profile.domain}/#person`, "@type": "Person", name: profile.name, url: profile.domain },
  hasPart: publishedWritingArticles.map((article) => ({
    "@type": "BlogPosting",
    "@id": `${profile.domain}/writing/${article.slug}#article`,
    url: `${profile.domain}/writing/${article.slug}`,
    headline: article.title,
  })),
};

export default function WritingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WritingIndex articles={publishedWritingArticles} />
    </>
  );
}
