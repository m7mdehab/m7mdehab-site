import { FloatingNav } from "@/components/floating-nav";

const links = [
  ["الأعمال", "/ar#work"],
  ["التخصصات", "/ar#expertise"],
  ["الخبرة", "/ar#experience"],
  ["الكتابة", "/ar/writing"],
  ["عني", "/ar#about"],
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
