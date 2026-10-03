import { HomeClosing } from "@/components/home-closing";
import { HomeWriting } from "@/components/home-writing";
import { CredibilityRail, SystemHero } from "@/components/home-overhaul-foundation";
import { SelectedWorkGallery } from "@/components/home-selected-work";
import { SolveThinkBridge } from "@/components/home-solve-think";

export default function Home() {
  return (
    <main id="main-content">
      <SystemHero />
      <CredibilityRail />
      <SelectedWorkGallery />
      <SolveThinkBridge />
      <HomeWriting />
      <HomeClosing />
    </main>
  );
}
