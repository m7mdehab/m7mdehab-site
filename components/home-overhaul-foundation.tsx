import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CredibilityMarquee } from "@/components/credibility-marquee";
import { HeroAmbientField } from "@/components/hero-ambient-field";
import { emailComposeHref } from "@/data/contact-links";
import { profile } from "@/data/public";

const heroRoles = [
  "Data Engineer",
  "AI Engineer",
  "Data Scientist",
  "Business Analyst",
  "Data Analyst",
] as const;
const identityParts = profile.name.trim().split(/\s+/);

export function SystemHero() {
  return (
    <section id="top" className="hero overhaul-hero">
      <HeroAmbientField />
      <div className="overhaul-hero-shell shell">
        <div className="overhaul-hero-meta">
          <span>CAIRO, EGYPT · REMOTE WORLDWIDE</span>
        </div>

        <div className="overhaul-hero-copy">
          <h1 className="overhaul-hero-title">
            <span className="overhaul-hero-signature">
              <span>{identityParts.slice(0, -1).join(" ")}</span>{" "}
              <span>{identityParts[identityParts.length - 1]}</span>
            </span>
          </h1>
          <p className="overhaul-hero-roles" aria-label={heroRoles.join(" · ")}>
            {heroRoles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </p>
          <p className="overhaul-hero-proposition">{profile.proposition}</p>
          <div className="overhaul-hero-actions">
            <a className="overhaul-action overhaul-action-primary" href="#work">
              Explore selected work{" "}
              <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <a
              className="overhaul-action overhaul-action-secondary"
              href={emailComposeHref("Role or project opportunity")}
              target="_blank"
              rel="noreferrer"
              data-conversion="hero-contact"
            >
              Discuss an opportunity{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CredibilityRail() {
  return (
    <section
      className="credibility-rail"
      aria-label="Selected experience, education and credentials"
    >
      <HeroAmbientField variant="rail" />
      <CredibilityMarquee />
    </section>
  );
}
