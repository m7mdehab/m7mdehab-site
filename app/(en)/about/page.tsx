import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";
import { profile } from "@/data/public";

const description = "Professional history, education, credentials, technical stack and working principles behind Mohammed Ehab ElNomany's data, AI and product work.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${profile.name}`,
    description,
    url: `${profile.domain}/about`,
    type: "profile",
    locale: "en_US",
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
