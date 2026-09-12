import type { Metadata } from "next";
import { WorkIndex } from "@/components/work-index";
import { profile } from "@/data/public";

const canonical = `${profile.domain}/ar/work`;
const english = `${profile.domain}/work`;

export const metadata: Metadata = {
  title: "الأعمال — دليل المشاريع",
  description: "ستة مشاريع عامة في التنبؤ، والذكاء الاصطناعي المحكوم، والتجارة الإلكترونية، والرؤية الحاسوبية، وأنظمة القرار الجغرافي، وتطوير منتجات الموبايل.",
  alternates: {
    canonical,
    languages: { en: english, ar: canonical, "x-default": english },
  },
  openGraph: {
    title: `الأعمال — ${profile.name}`,
    description: "ستة مشاريع عامة مع أدلة ودراسات حالة تختلف باختلاف طبيعة كل مشروع.",
    url: canonical,
    siteName: profile.name,
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary",
    title: `الأعمال — ${profile.name}`,
    description: "ستة مشاريع عامة مع أدلة ودراسات حالة تختلف باختلاف طبيعة كل مشروع.",
  },
};

export default function ArabicWorkPage() {
  return <WorkIndex locale="ar" />;
}
