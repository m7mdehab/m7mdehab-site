import { AdditionalExperience, Contact, Credentials, Experience, Services } from "@/components/home-sections";
import { CredibilityRail, SystemHero } from "@/components/home-overhaul-foundation";
import { SelectedWorkGallery } from "@/components/home-selected-work";
import { SolveThinkBridge } from "@/components/home-solve-think";
import { WritingPreview } from "@/components/writing-authority";
import { profile } from "@/data/public";
import { writingArticles } from "@/data/writing";

export default function Home() {
  return (
    <main id="main-content">
      <SystemHero />
      <CredibilityRail />
      <SelectedWorkGallery />
      <SolveThinkBridge />
      <Experience /><Credentials /><AdditionalExperience /><Services /><WritingPreview articles={writingArticles} locale="en" /><Contact />
      <footer className="footer shell"><p>© {new Date().getFullYear()} {profile.name}</p><p>Built as a living professional web identity.</p></footer>
    </main>
  );
}
