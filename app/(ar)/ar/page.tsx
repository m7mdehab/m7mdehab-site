import {
  AboutAr,
  AdditionalExperienceAr,
  ContactAr,
  CredentialsAr,
  ExperienceAr,
  ExpertiseAr,
  HeroAr,
  ServicesAr,
  SkillsAr,
  WorkAr,
} from "@/components/home-sections-ar";
import { WritingPreview } from "@/components/writing-authority";
import { profile } from "@/data/public";
import { writingArticlesAr } from "@/data/writing-ar";

export default function ArabicHome() {
  return (
    <main id="main-content">
      <HeroAr /><WorkAr /><ExpertiseAr /><SkillsAr /><ExperienceAr /><CredentialsAr /><AdditionalExperienceAr /><AboutAr /><ServicesAr /><WritingPreview articles={writingArticlesAr} locale="ar" /><ContactAr />
      <footer className="footer shell"><p>© {new Date().getFullYear()} {profile.name}</p><p>هوية مهنية رقمية تتطور مع العمل.</p></footer>
    </main>
  );
}
