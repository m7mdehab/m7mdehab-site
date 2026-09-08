import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { profile } from "@/data/public";

export const metadata: Metadata = {
  metadataBase: new URL(profile.domain),
  title: { default: `${profile.name} — Data, AI & Product`, template: `%s — ${profile.name}` },
  description: profile.proposition,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: profile.domain }],
  openGraph: { title: `${profile.name} — Data, AI & Product`, description: profile.proposition, url: profile.domain, siteName: profile.name, type: "profile" },
  twitter: { card: "summary_large_image", title: `${profile.name} — Data, AI & Product`, description: profile.proposition },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: profile.domain,
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    alternateName: profile.handle,
    url: profile.domain,
    jobTitle: profile.role,
    address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
    sameAs: [profile.github, profile.linkedin, "https://presaira.com"],
    worksFor: { "@type": "Organization", name: profile.employer },
    alumniOf: [
      { "@type": "EducationalOrganization", name: "Canadian International College" },
      { "@type": "EducationalOrganization", name: "ExploreAI Academy / ALX / African Leadership University" }
    ],
    knowsAbout: ["Data Engineering", "Data Migration", "Analytics", "Power BI", "Machine Learning", "AI Engineering", "Product Development"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <SmoothScroll><SiteNav />{children}</SmoothScroll>
      </body>
    </html>
  );
}
