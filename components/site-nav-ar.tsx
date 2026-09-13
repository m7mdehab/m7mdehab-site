import { FloatingNav } from "@/components/floating-nav";

const links = [
  ["الأعمال", "/ar#work"],
  ["عني", "/ar/about"],
  ["الكتابة", "/ar/writing"],
  ["تواصل", "/ar#contact"],
] as const;

export function SiteNavAr() {
  return (
    <FloatingNav
      links={links}
      localeHref="/"
      localeLabel="EN"
      localeAriaLabel="English"
      localeLang="en"
      localeDir="ltr"
      ariaLabel="التنقل الرئيسي"
      markHref="/ar#top"
      markAriaLabel="M7 — العودة إلى أعلى الصفحة"
    />
  );
}
