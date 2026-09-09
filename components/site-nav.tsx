import Link from "next/link";

const links = [["Work", "#work"], ["Expertise", "#expertise"], ["Experience", "#experience"], ["About", "#about"], ["Contact", "#contact"]] as const;

export function SiteNav() {
  return (
    <header className="site-nav-wrap">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link className="nav-mark" href="#top" aria-label="M7 — back to top">M7</Link>
        <div className="nav-links">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
      </nav>
    </header>
  );
}
