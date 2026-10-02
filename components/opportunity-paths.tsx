"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { emailComposeHref } from "@/data/contact-links";
import { profile } from "@/data/public";

const paths = [
  {
    key: "role",
    label: "ROLE",
    title: "Hiring for data, AI or product?",
    description:
      "Start with the work, then reach me with the role and problem space.",
  },
  {
    key: "project",
    label: "PROJECT",
    title: "Have a system or product problem?",
    description:
      "Start with the service context, then reach me with the system and outcome.",
  },
] as const;

export function OpportunityPaths() {
  const [active, setActive] = useState(0);
  const [mobileEnhanced, setMobileEnhanced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const sync = () => setMobileEnhanced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const select = (index: number) =>
    setActive((index + paths.length) % paths.length);

  return (
    <div
      className={`closing-paths${mobileEnhanced ? " is-mobile-enhanced" : ""}`}
    >
      <div
        className="closing-path-tabs"
        role="tablist"
        aria-label="Choose an opportunity path"
      >
        {paths.map((path, index) => (
          <button
            key={path.key}
            id={`opportunity-tab-${path.key}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`opportunity-panel-${path.key}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                const next =
                  (active +
                    (event.key === "ArrowRight" ? 1 : -1) +
                    paths.length) %
                  paths.length;
                select(next);
                document
                  .getElementById(`opportunity-tab-${paths[next].key}`)
                  ?.focus();
              }
              if (event.key === "Home") {
                event.preventDefault();
                select(0);
                document
                  .getElementById(`opportunity-tab-${paths[0].key}`)
                  ?.focus();
              }
              if (event.key === "End") {
                event.preventDefault();
                select(paths.length - 1);
                document
                  .getElementById(
                    `opportunity-tab-${paths[paths.length - 1].key}`,
                  )
                  ?.focus();
              }
            }}
          >
            {path.label}
          </button>
        ))}
      </div>

      {paths.map((path, index) => (
        <div
          className={`closing-path${index === 1 ? " closing-path-project" : ""}${active === index ? " is-active" : " is-inactive"}`}
          id={`opportunity-panel-${path.key}`}
          role={mobileEnhanced ? "tabpanel" : undefined}
          aria-labelledby={
            mobileEnhanced ? `opportunity-tab-${path.key}` : undefined
          }
          aria-hidden={mobileEnhanced && active !== index}
          key={path.key}
        >
          <h3>{path.title}</h3>
          <p>{path.description}</p>
          {path.key === "role" ? (
            <div className="closing-path-actions">
              <a
                href={emailComposeHref("Technical role opportunity")}
                target="_blank"
                rel="noreferrer"
                data-conversion="contact-role-email"
              >
                Email <Mail size={15} aria-hidden="true" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                data-conversion="contact-role-linkedin"
              >
                LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <Link href="/work">
                Inspect work <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="closing-path-actions">
              <a
                href={emailComposeHref("Project or system opportunity")}
                target="_blank"
                rel="noreferrer"
                data-conversion="contact-project-email"
              >
                Email <Mail size={15} aria-hidden="true" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                data-conversion="contact-project-linkedin"
              >
                LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <Link href="/services" data-conversion="home-to-services">
                Services <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
