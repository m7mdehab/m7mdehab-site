import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/public";
import { projectsAr } from "@/data/public-ar";

type WorkLocale = "en" | "ar";

export function WorkIndex({ locale }: { locale: WorkLocale }) {
  const isArabic = locale === "ar";
  const list = isArabic ? projectsAr : projects;
  const BackIcon = isArabic ? ArrowRight : ArrowLeft;
  const OpenIcon = isArabic ? ArrowUpLeft : ArrowUpRight;

  return (
    <main id="main-content" className="work-index-page shell">
      <header className="work-index-header">
        <div>
          <p className="work-index-kicker">{isArabic ? "الأعمال · دليل المشاريع" : "Work · Project index"}</p>
          <h1>{isArabic ? <>ستة مشاريع، <em>ستة أنواع من الدليل.</em></> : <>Projects, evidence <em>and decisions.</em></>}</h1>
        </div>
        <div className="work-index-header-copy">
          <p>
            {isArabic
              ? "تجمع هذه الصفحة المشاريع العامة ودراسات الحالة في مكان واحد. تختلف الأدلة المتاحة لكل مشروع حسب المصدر وحقوق النشر وحدود السرية."
              : "A compact index of systems, models and products I have built. Each case study uses the evidence that best explains the problem, the decisions and the boundaries of the result."}
          </p>
          <Link className="work-index-back" href={isArabic ? "/ar#work" : "/#work"}>
            <BackIcon size={15} aria-hidden="true" /> {isArabic ? "العودة إلى الأعمال المختارة" : "Back to homepage work"}
          </Link>
        </div>
      </header>

      <div className="work-index-list" data-work-directory>
        {list.map((project, index) => (
          <Link
            className="work-index-row"
            href={isArabic ? `/ar/work/${project.slug}` : `/work/${project.slug}`}
            data-project-slug={project.slug}
            data-tone={project.tone}
            key={project.slug}
          >
            <span className="work-index-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="work-index-title">
              <small>{project.kicker}</small>
              <h2>{project.title}</h2>
            </div>
            <p className="work-index-statement">{project.statement}</p>
            <div className="work-index-proof">
              <span><small>{isArabic ? "مجال الدليل" : "Evidence"}</small>{project.proof}</span>
              <OpenIcon size={18} aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
