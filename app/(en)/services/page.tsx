import type { Metadata } from "next";
import { Services } from "@/components/home-sections";
import { profile } from "@/data/public";

export const metadata: Metadata = {
  title: "Services",
  description: "Governed service context for data migration, analytics, ML/AI and product development, with explicit evidence boundaries.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services — ${profile.name}`,
    description: "Data migration, analytics, ML/AI and product-development service context with evidence boundaries.",
    url: `${profile.domain}/services`,
    type: "website",
  },
};

export default function ServicesPage() {
  return <main id="main-content"><Services /></main>;
}
