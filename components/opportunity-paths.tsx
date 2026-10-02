"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Linkedin, Mail, Search, Wrench } from "lucide-react";
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
  {
    key: "question",
    label: "QUESTION",
    title: "Have a question or idea?",
    description:
      "If it does not fit a role or project brief, email me or start a conversation on LinkedIn.",
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
        aria-label="Choose a conversation type"
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
          className={`closing-path closing-path-${path.key}${active === index ? " is-active" : " is-inactive"}`}
          data-opportunity-path={path.key}
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
            <div className="closing-path-actions closing-path-actions-three">
              <a
                className="closing-action-link"
                href={emailComposeHref("Technical role opportunity")}
                target="_blank"
                rel="noreferrer"
                data-conversion="contact-role-email"
              >
                <span className="closing-action-icon" aria-hidden="true">
                  <Mail size={18} />
                </span>
                <span>Email</span>
              </a>
              <a
                className="closing-action-link"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                data-conversion="contact-role-linkedin"
              >
                <span className="closing-action-icon" aria-hidden="true">
                  <Linkedin size={18} />
                </span>
                <span>LinkedIn</span>
              </a>
              <Link
                className="closing-action-link"
                href="/work"
                aria-label="Inspect work"
              >
                <span className="closing-action-icon" aria-hidden="true">
                  <Search size={18} />
                </span>
                <span>Work</span>
              </Link>
            </div>
          ) : path.key === "project" ? (
            <div className="closing-path-actions closing-path-actions-three">
              <a
                className="closing-action-link"
                href={emailComposeHref("Project or system opportunity")}
                target="_blank"
                rel="noreferrer"
                data-conversion="contact-project-email"
              >
                <span className="closing-action-icon" aria-hidden="true">
                  <Mail size={18} />
                </span>
                <span>Email</span>
              </a>
              <a
                className="closing-action-link"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                data-conversion="contact-project-linkedin"
              >
                <span className="closing-action-icon" aria-hidden="true">
                  <Linkedin size={18} />
                </span>
                <span>LinkedIn</span>
              </a>
              <Link
                className="closing-action-link"
                href="/services"
                data-conversion="home-to-services"
              >
                <span className="closing-action-icon" aria-hidden="true">
                  <Wrench size={18} />
                </span>
                <span>Services</span>
              </Link>
            </div>
          ) : (
            <div className="closing-path-actions closing-path-actions-two">
              <a
                className="closing-action-link"
                href={emailComposeHref("Question or idea")}
                target="_blank"
                rel="noreferrer"
                data-conversion="contact-question-email"
              >
                <span className="closing-action-icon" aria-hidden="true">
                  <Mail size={18} />
                </span>
                <span>Email</span>
              </a>
              <a
                className="closing-action-link"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                data-conversion="contact-question-linkedin"
              >
                <span className="closing-action-icon" aria-hidden="true">
                  <Linkedin size={18} />
                </span>
                <span>LinkedIn</span>
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
