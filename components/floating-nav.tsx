"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = readonly [label: string, href: string];

type FloatingNavProps = {
  links: readonly NavItem[];
  localeHref: string;
  localeLabel: string;
  localeAriaLabel: string;
  localeLang: "en" | "ar";
  localeDir: "ltr" | "rtl";
  ariaLabel: string;
  markHref: string;
  markAriaLabel: string;
};

export function FloatingNav({
  links,
  localeHref,
  localeLabel,
  localeAriaLabel,
  localeLang,
  localeDir,
  ariaLabel,
  markHref,
  markAriaLabel,
}: FloatingNavProps) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (y < 120) setHidden(false);
        else if (delta > 9) setHidden(true);
        else if (delta < -7) setHidden(false);
        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links
      .map(([, href]) => href.includes("#") ? href.split("#")[1] : null)
      .filter((value): value is string => Boolean(value));
    const elements = ids.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.01, 0.2] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [links, pathname]);

  return (
    <header className={`site-nav-wrap${hidden ? " nav-hidden" : ""}`} data-nav-hidden={hidden ? "true" : "false"}>
      <nav
        className="site-nav"
        aria-label={ariaLabel}
        onFocusCapture={() => setHidden(false)}
        onMouseEnter={() => setHidden(false)}
      >
        <Link className="nav-mark" href={markHref} aria-label={markAriaLabel}>M7</Link>
        <div className="nav-links">
          {links.map(([label, href]) => {
            const section = href.includes("#") ? href.split("#")[1] : null;
            const writingActive = href.includes("writing") && pathname.includes("writing");
            const active = writingActive || Boolean(section && activeSection === section);
            return <Link key={href} href={href} aria-current={active ? "location" : undefined}>{label}</Link>;
          })}
          <Link className="locale-link" href={localeHref} hrefLang={localeLang} lang={localeLang} dir={localeDir} aria-label={localeAriaLabel}>{localeLabel}</Link>
        </div>
      </nav>
    </header>
  );
}
