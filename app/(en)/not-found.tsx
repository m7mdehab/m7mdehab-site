import Link from "next/link";
import { ArrowUpRight, Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-modern shell">
      <div className="not-found-orbit" aria-hidden="true"><Compass size={26} /></div>
      <p className="eyebrow">404 · Not found</p>
      <h1>This route is no longer part of the public site.</h1>
      <p>The page may have moved, been retired, or never been published. The current work, background and writing are still available from the main site.</p>
      <div className="not-found-actions">
        <Link href="/"><Home size={16} aria-hidden="true" /> Back home</Link>
        <Link href="/work">View work <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </main>
  );
}
