import type { Metadata } from "next";
import { WorkIndex } from "@/components/work-index";
import { profile } from "@/data/public";

const canonical = `${profile.domain}/work`;
const description = "Public project case studies across forecasting, governed AI, ecommerce, computer vision, geospatial decision systems and mobile product delivery.";

export const metadata: Metadata = {
  title: "Work | Project Index",
  description,
  alternates: { canonical },
  openGraph: {
    title: `Work | ${profile.name}`,
    description,
    url: canonical,
    siteName: profile.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `Work | ${profile.name}`,
    description,
  },
};

export default function WorkPage() {
  return <WorkIndex locale="en" />;
}
