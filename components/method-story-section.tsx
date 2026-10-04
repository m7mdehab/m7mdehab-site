import Link from "next/link";
import { METHOD_STORY } from "@/components/method-story-contract";
import { MethodStoryCanvas } from "@/components/method-story-canvas";

export function MethodStorySection() {
  return (
    <section id="method" className="method-story" data-method-story>
      <div className="shell method-story__shell">
        <header className="method-story__intro">
          <div className="method-story__intro-main">
            <p className="method-story__eyebrow">{METHOD_STORY.eyebrow}</p>
            <h2>
              I turn messy reality into{" "}
              <br className="method-story__mobile-title-break" aria-hidden="true" />
              <span>reliable systems.</span>
            </h2>
          </div>
          <p className="method-story__support">{METHOD_STORY.support}</p>
        </header>

        <MethodStoryCanvas />

        <footer className="method-story__footer">
          <Link href={METHOD_STORY.cta.href} data-conversion="method-to-work">
            {METHOD_STORY.cta.label}
            <span aria-hidden="true">↗</span>
          </Link>
          <p className="method-story__status-copy">
            <i aria-hidden="true" />
            {METHOD_STORY.status}
          </p>
        </footer>
      </div>
    </section>
  );
}
