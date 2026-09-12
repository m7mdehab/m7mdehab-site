import type { Metadata } from "next";
import { ServicesAr } from "@/components/home-sections-ar";
import { profile } from "@/data/public";

export const metadata: Metadata = {
  title: "الخدمات",
  description: "سياق الخدمات في ترحيل البيانات والتحليلات والذكاء الاصطناعي وتطوير المنتجات، مع حدود واضحة للأدلة المنشورة.",
  alternates: {
    canonical: "/ar/services",
    languages: { en: "/services", ar: "/ar/services", "x-default": "/services" },
  },
  openGraph: {
    title: `الخدمات — ${profile.name}`,
    description: "ترحيل البيانات والتحليلات والذكاء الاصطناعي وتطوير المنتجات مع توضيح حدود الأدلة.",
    url: `${profile.domain}/ar/services`,
    type: "website",
    locale: "ar_EG",
  },
};

export default function ServicesPageAr() {
  return <main id="main-content"><ServicesAr /></main>;
}
