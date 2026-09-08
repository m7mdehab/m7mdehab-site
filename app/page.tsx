import { About, AdditionalExperience, Contact, Credentials, Experience, Expertise, Hero, Services, Skills, Work, Writing } from "@/components/home-sections";
import { profile } from "@/data/public";

export default function Home() {
  return (
    <main id="main-content">
      <Hero /><Work /><Expertise /><Skills /><Experience /><Credentials /><AdditionalExperience /><About /><Services /><Writing /><Contact />
      <footer className="footer shell"><p>© {new Date().getFullYear()} {profile.name}</p><p>Built as a living professional web identity.</p></footer>
    </main>
  );
}
