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
  WritingAr,
} from "@/components/home-sections-ar";
import { profile } from "@/data/public";

export default function ArabicHome() {
  return (
    <main id="main-content">
      <HeroAr /><WorkAr /><ExpertiseAr /><SkillsAr /><ExperienceAr /><CredentialsAr /><AdditionalExperienceAr /><AboutAr /><ServicesAr /><WritingAr /><ContactAr />
      <footer className="footer shell"><p>© {new Date().getFullYear()} {profile.name}</p><p>هوية مهنية رقمية تتطور مع العمل.</p></footer>
    </main>
  );
}
