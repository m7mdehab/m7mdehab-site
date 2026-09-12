import { AdditionalExperience, Credentials, Experience } from "@/components/home-sections";
import { HomeClosing } from "@/components/home-closing";
import { CredibilityRail, SystemHero } from "@/components/home-overhaul-foundation";
import { SelectedWorkGallery } from "@/components/home-selected-work";
import { SolveThinkBridge } from "@/components/home-solve-think";
import { writingArticles } from "@/data/writing";

export default function Home() {
  return (
    <main id="main-content">
      <SystemHero />
      <CredibilityRail />
      <SelectedWorkGallery />
      <SolveThinkBridge />
      <Experience />
      <Credentials />
      <AdditionalExperience />
      <HomeClosing articles={writingArticles} />
    </main>
  );
}
