import type { Metadata } from "next";
import { WorkIndex } from "@/components/work-index";
import { profile } from "@/data/public";

const canonical = `${profile.domain}/work`;

export const metadata: Metadata = {
  title: "Work — Project Directory",
  description: "Six public projects across forecasting, governed AI, ecommerce, computer vision, geospatial decision systems and mobile product delivery.",
  alternates: { canonical },
  openGraph: {
    title: `Work — ${profile.name}`,
    description: "Six public projects with project-specific evidence and case studies.",
    url: canonical,
    siteName: profile.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `Work — ${profile.name}`,
    description: "Six public projects with project-specific evidence and case studies.",
  },
};

export default function WorkPage() {
  return <WorkIndex locale="en" />;
}
