import type { Metadata } from "next";
import { AboutPageAr } from "@/components/about-page-ar";
import { profile } from "@/data/public";

const description = "السيرة المهنية والتعليم والشهادات والأدوات ومبادئ العمل خلف أعمال محمد إيهاب النعماني في البيانات والذكاء الاصطناعي والمنتجات.";

export const metadata: Metadata = {
  title: "عني",
  description,
  alternates: {
    canonical: "/ar/about",
    languages: { en: "/about", ar: "/ar/about", "x-default": "/about" },
  },
  openGraph: {
    title: `عني — ${profile.name}`,
    description,
    url: `${profile.domain}/ar/about`,
    type: "profile",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
  },
};

export default function ArabicAboutRoute() {
  return <AboutPageAr />;
}
