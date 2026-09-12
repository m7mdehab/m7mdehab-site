import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "../globals.css";
import "../hardening.css";
import "../arabic.css";
import "../refinement.css";
import "../refinement-fixes.css";
import "../frontend-overhaul-phase-e.css";
import "../frontend-overhaul-phase-e-fixes.css";
import { SiteNavAr } from "@/components/site-nav-ar";
import { SmoothScroll } from "@/components/smooth-scroll";
import { profile } from "@/data/public";
import { profileAr, projectsAr, servicesAr } from "@/data/public-ar";

const arabicHome = `${profile.domain}/ar`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.domain),
  title: {
    default: `${profile.name} — البيانات والذكاء الاصطناعي والمنتجات`,
    template: `%s — ${profile.name}`,
  },
  description: profileAr.proposition,
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar", "x-default": "/" },
  },
  authors: [{ name: profile.name, url: profile.domain }],
  openGraph: {
    title: `${profile.name} — البيانات والذكاء الاصطناعي والمنتجات`,
    description: profileAr.proposition,
    url: arabicHome,
    siteName: profile.name,
    type: "profile",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — البيانات والذكاء الاصطناعي والمنتجات`,
    description: profileAr.proposition,
  },
};

const personId = `${profile.domain}/#person`;
const profilePageId = `${arabicHome}#profile-page`;

const siteSchemaAr = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: arabicHome,
      name: `${profile.name} — البيانات والذكاء الاصطناعي والمنتجات`,
      description: profileAr.proposition,
      inLanguage: "ar",
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: profile.handle,
      url: profile.domain,
      jobTitle: profileAr.role,
      address: { "@type": "PostalAddress", addressLocality: "القاهرة", addressCountry: "EG" },
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
      makesOffer: servicesAr.map((service) => ({
        "@type": "Offer",
        url: `${arabicHome}#service-${service.id}`,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          serviceType: service.capability,
          inLanguage: "ar",
        },
      })),
    },
    ...projectsAr.map((project) => ({
      "@type": "CreativeWork",
      "@id": `${arabicHome}/work/${project.slug}#case-study`,
      url: `${arabicHome}/work/${project.slug}`,
      name: project.title,
      description: project.statement,
      inLanguage: "ar",
      creator: { "@id": personId },
      keywords: project.proof.split(" · "),
    })),
  ],
};

export default function ArabicRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="arabic-site">
        <a className="skip-link" href="#main-content">انتقل إلى المحتوى</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchemaAr) }} />
        <SmoothScroll />
        <SiteNavAr />
        {children}
      </body>
    </html>
  );
}
