import type { Metadata } from "next";
import { Italianno } from "next/font/google";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "../globals.css";
import "../hardening.css";
import "../refinement.css";
import "../refinement-fixes.css";
import "../frontend-overhaul.css";
import "../frontend-overhaul-fixes.css";
import "../frontend-overhaul-phase-e.css";
import "../frontend-overhaul-phase-e-fixes.css";
import "../frontend-overhaul-phase-f.css";
import "../frontend-overhaul-phase-f-fixes.css";
import "../frontend-overhaul-phase-g.css";
import "../frontend-overhaul-phase-g-fixes.css";
import "../frontend-overhaul-phase-h.css";
import "../frontend-overhaul-phase-h-fixes.css";
import "../frontend-overhaul-phase-i-fixes.css";
import "../frontend-overhaul-phase-j.css";
import "../frontend-overhaul-phase-l.css";
import "../frontend-overhaul-phase-m.css";
import "../frontend-overhaul-phase-m-fixes.css";
import "../frontend-overhaul-phase-n.css";
import "../contact-credibility-polish.css";
import "../frontend-overhaul-phase-o.css";
import "../frontend-overhaul-phase-o-fixes.css";
import "../sitewide-refinement.css";
import "../sitewide-refinement-fixes.css";
import "../not-found-refinement.css";
import { SiteNav } from "@/components/site-nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { projectRecords, serviceRecords } from "@/data/discoverability";
import { profile } from "@/data/public";

const signatureFont = Italianno({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--signature-font",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.domain),
  title: { default: `${profile.name} | Data, AI & Product`, template: `%s | ${profile.name}` },
  description: profile.proposition,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: profile.domain }],
  openGraph: {
    title: `${profile.name} | Data, AI & Product`,
    description: profile.proposition,
    url: profile.domain,
    siteName: profile.name,
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${profile.name} | Data, AI & Product`,
    description: profile.proposition,
  },
};

const personId = `${profile.domain}/#person`;
const profilePageId = `${profile.domain}/#profile-page`;

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: profile.domain,
      name: `${profile.name} | Data, AI & Product`,
      description: profile.proposition,
      inLanguage: "en",
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: profile.handle,
      url: profile.domain,
      jobTitle: profile.role,
      address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
      sameAs: [profile.github, profile.linkedin],
      worksFor: { "@type": "Organization", name: profile.employer },
      alumniOf: [
        { "@type": "EducationalOrganization", name: "Canadian International College" },
        { "@type": "EducationalOrganization", name: "ExploreAI Academy / ALX / African Leadership University" },
      ],
      knowsAbout: [
        "Data Engineering",
        "Data Migration",
        "Analytics",
        "Power BI",
        "Machine Learning",
        "AI Engineering",
        "Product Development",
      ],
      makesOffer: serviceRecords.map((service) => ({
        "@type": "Offer",
        url: service.url,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          serviceType: service.capability,
        },
      })),
    },
    ...projectRecords.map((project) => ({
      "@type": "CreativeWork",
      "@id": `${project.caseStudyUrl}#case-study`,
      url: project.caseStudyUrl,
      name: project.title,
      description: project.statement,
      inLanguage: "en",
      creator: { "@id": personId },
      keywords: project.proof.split(" · "),
    })),
  ],
};

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={signatureFont.variable}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
        <SmoothScroll />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
