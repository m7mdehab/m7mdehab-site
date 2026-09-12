import Link from "next/link";

const directions = [
  {
    href: "/prototypes/cinematic",
    label: "Direction 01",
    title: "Cinematic Systems Portfolio",
    copy: "Layered project-evidence atlas, darker atmosphere and the strongest identity/memorability push.",
  },
  {
    href: "/prototypes/spatial",
    label: "Direction 02",
    title: "Spatial Evidence Gallery",
    copy: "A curated technical exhibition with asymmetrical evidence fragments, spatial browsing and editorial rhythm.",
  },
  {
    href: "/prototypes/kinetic",
    label: "Direction 03",
    title: "Kinetic Editorial / Product",
    copy: "The fastest, shortest and most recruiter-friendly direction, with compact evidence and sharper product rhythm.",
  },
] as const;

export default function PrototypeIndex() {
  return (
    <main className="proto-index">
      <div className="proto-shell">
        <p className="proto-eyebrow">Phase C · real-content direction prototypes</p>
        <h1>Three directions. One future homepage.</h1>
        <p>
          These routes are intentionally isolated and noindex. They use Mohammed&apos;s real identity and public-safe project evidence to compare visual systems before production implementation.
        </p>
        <div className="proto-index-grid">
          {directions.map((direction) => (
            <Link className="proto-index-card" href={direction.href} key={direction.href}>
              <small>{direction.label}</small>
              <div>
                <h2>{direction.title}</h2>
                <p>{direction.copy}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
