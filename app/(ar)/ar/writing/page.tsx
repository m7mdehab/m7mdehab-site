import type { Metadata } from "next";
import { WritingIndex } from "@/components/writing-authority";
import { profile } from "@/data/public";
import { writingArticlesAr } from "@/data/writing-ar";

const canonical = `${profile.domain}/ar/writing`;
const english = `${profile.domain}/writing`;

export const metadata: Metadata = {
  title: "الكتابة — ملاحظات تقنية من العمل",
  description: "مقالات تقنية مبنية على مشروعات فعلية لمحمد إيهاب النعماني حول التنبؤ الاحتمالي وتقييم تعلم الآلة وحوكمة وكلاء الذكاء الاصطناعي.",
  alternates: {
    canonical,
    languages: { en: english, ar: canonical, "x-default": english },
  },
  openGraph: {
    title: `الكتابة — ${profile.name}`,
    description: "مقالات تقنية من داخل مشروعات يمكن فحص أدلتها العامة.",
    url: canonical,
    siteName: profile.name,
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary",
    title: `الكتابة — ${profile.name}`,
    description: "مقالات تقنية من داخل مشروعات يمكن فحص أدلتها العامة.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${canonical}#collection`,
  url: canonical,
  name: `الكتابة — ${profile.name}`,
  description: "مقالات تقنية من داخل مشروعات يمكن فحص أدلتها العامة.",
  inLanguage: "ar",
  author: { "@id": `${profile.domain}/#person`, "@type": "Person", name: profile.name, url: profile.domain },
  hasPart: writingArticlesAr.map((article) => ({
    "@type": "TechArticle",
    "@id": `${profile.domain}/ar/writing/${article.slug}#article`,
    url: `${profile.domain}/ar/writing/${article.slug}`,
    headline: article.title,
  })),
};

export default function ArabicWritingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WritingIndex articles={writingArticlesAr} locale="ar" />
    </>
  );
}
