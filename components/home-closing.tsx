import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { OpportunityPaths } from "@/components/opportunity-paths";
import { emailComposeHref } from "@/data/contact-links";
import { profile } from "@/data/public";

export function HomeClosing() {
  return (
    <>
      <section id="contact" className="closing-opportunity">
        <div className="shell closing-opportunity-shell">
          <header className="closing-opportunity-head">
            <h2>Choose the right conversation.</h2>
          </header>
          <OpportunityPaths />
        </div>
      </section>

      <footer className="closing-directory">
        <div className="shell closing-directory-grid">
          <Link className="closing-directory-mark" href="/#top" aria-label="M7 — back to top">M7</Link>
          <nav className="closing-directory-nav" aria-label="Footer directory">
            <Link href="/#work">Work</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/writing">Writing</Link>
          </nav>
          <div className="closing-directory-end">
            <div className="closing-directory-icons" aria-label="Contact links">
              <a href={emailComposeHref()} target="_blank" rel="noreferrer" aria-label={`Email ${profile.name}`} data-conversion="footer-email"><Mail size={16} aria-hidden="true" /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label={`${profile.name} on LinkedIn`}><Linkedin size={16} aria-hidden="true" /></a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label={`${profile.name} on GitHub`}><Github size={16} aria-hidden="true" /></a>
            </div>
            <p>© {new Date().getFullYear()} · Built as a living professional web identity.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
