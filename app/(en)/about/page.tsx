import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";
import { profile } from "@/data/public";

const description = "Professional history, education, credentials, technical stack and working principles behind Mohammed Ehab ElNomany's data, AI and product work.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${profile.name}`,
    description,
    url: `${profile.domain}/about`,
    type: "profile",
    locale: "en_US",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${profile.domain}/about#profile-page`,
  url: `${profile.domain}/about`,
  name: `About — ${profile.name}`,
  description,
  inLanguage: "en",
  mainEntity: {
    "@id": `${profile.domain}/#person`,
    "@type": "Person",
    name: profile.name,
    url: `${profile.domain}/about`,
    sameAs: [profile.github, profile.linkedin],
  },
};

export default function AboutRoute() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <AboutPage />
    </>
  );
}
