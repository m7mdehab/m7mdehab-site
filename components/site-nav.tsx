import { FloatingNav } from "@/components/floating-nav";

const links = [["Work", "/#work"], ["About", "/about"], ["Writing", "/writing"], ["Contact", "/#contact"]] as const;

export function SiteNav() {
  return (
    <FloatingNav
      links={links}
      ariaLabel="Primary navigation"
      markHref="/#top"
      markAriaLabel="M7 — back to top"
    />
  );
}
