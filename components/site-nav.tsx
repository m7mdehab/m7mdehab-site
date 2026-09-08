"use client";

import { motion } from "motion/react";
import Link from "next/link";

const links = [["Work", "#work"], ["Expertise", "#expertise"], ["Experience", "#experience"], ["About", "#about"], ["Contact", "#contact"]] as const;

export function SiteNav() {
  return (
    <header className="site-nav-wrap">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link className="nav-mark" href="#top" aria-label="Back to top">M7</Link>
        <div className="nav-links">
          {links.map(([label, href]) => (
            <motion.a key={href} href={href} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>{label}</motion.a>
          ))}
        </div>
      </nav>
    </header>
  );
}
