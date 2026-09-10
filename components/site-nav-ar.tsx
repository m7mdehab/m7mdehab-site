import Link from "next/link";

const links = [
  ["الأعمال", "/ar#work"],
  ["التخصصات", "/ar#expertise"],
  ["الخبرة", "/ar#experience"],
  ["عني", "/ar#about"],
  ["تواصل", "/ar#contact"],
] as const;

export function SiteNavAr() {
  return (
    <header className="site-nav-wrap">
      <nav className="site-nav" aria-label="التنقل الرئيسي">
        <Link className="nav-mark" href="/ar#top" aria-label="M7 — العودة إلى أعلى الصفحة">M7</Link>
        <div className="nav-links">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
          <Link className="locale-link" href="/" hrefLang="en" lang="en" dir="ltr" aria-label="English">EN</Link>
        </div>
      </nav>
    </header>
  );
}
