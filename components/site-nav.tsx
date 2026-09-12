import { FloatingNav } from "@/components/floating-nav";

const links = [["Work", "/#work"], ["About", "/about"], ["Writing", "/writing"], ["Contact", "/#contact"]] as const;

export function SiteNav() {
  return (
    <FloatingNav
      links={links}
      localeHref="/ar"
      localeLabel="AR"
      localeAriaLabel="العربية"
      localeLang="ar"
      localeDir="rtl"
      ariaLabel="Primary navigation"
      markHref="/#top"
      markAriaLabel="M7 — back to top"
    />
  );
}
