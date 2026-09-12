/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/public";
import { projectVisuals } from "@/data/project-visuals";
import type { WritingArticle } from "@/data/writing";

const calibration = projectVisuals.presaira.reliability;
const calibrationPoints = calibration
  .map(({ predicted, observed }) => {
    const x = 20 + predicted * 250;
    const y = 145 - observed * 112;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  })
  .join(" ");

function ForecastNoteVisual() {
  return (
    <div className="closing-note-visual closing-note-forecast" aria-label="Presaira probability calibration evidence">
      <div className="closing-note-visual-head"><span>FORECAST / CALIBRATION</span><strong>104 / 104</strong></div>
      <svg viewBox="0 0 290 165" role="img" aria-label="Observed outcomes compared with forecast probabilities">
        <line className="closing-note-reference" x1="20" x2="270" y1="145" y2="33" />
        {[48, 80, 112, 145].map((y) => <line className="closing-note-guide" key={y} x1="20" x2="270" y1={y} y2={y} />)}
        <polyline className="closing-note-curve" points={calibrationPoints} />
        {calibration.map(({ predicted, observed }) => (
          <circle key={`${predicted}-${observed}`} cx={20 + predicted * 250} cy={145 - observed * 112} r="4" />
        ))}
      </svg>
      <div className="closing-note-proof"><span>Proper scoring</span><span>Coverage</span><span>Reliability</span></div>
    </div>
  );
}

function OilNoteVisual() {
  const visual = projectVisuals["oil-spill-detection"];
  return (
    <div className="closing-note-visual closing-note-oil" aria-label="Oil Spill Detection SAR evidence">
      <img src={visual.image} alt={visual.imageAlt} width={1024} height={640} loading="lazy" />
      <div className="closing-note-oil-overlay" aria-hidden="true" />
      <div className="closing-note-visual-head"><span>SAR / SEGMENTATION</span><strong>Oil IoU 0.566</strong></div>
      <div className="closing-note-proof"><span>Recall 0.764</span><span>5 classes</span><span>Sentinel-1</span></div>
    </div>
  );
}

function noteVisual(article: WritingArticle) {
  if (article.projectSlug === "presaira") return <ForecastNoteVisual />;
  if (article.projectSlug === "oil-spill-detection") return <OilNoteVisual />;
  return null;
}

export function HomeClosing({ articles }: { articles: readonly WritingArticle[] }) {
  const featured = [
    articles.find((article) => article.slug === "when-to-trust-a-probabilistic-forecast"),
    articles.find((article) => article.slug === "why-accuracy-is-not-enough-for-oil-spill-detection"),
  ].filter((article): article is WritingArticle => Boolean(article));

  return (
    <>
      <section id="writing" className="closing-thinking">
        <div className="shell closing-thinking-shell">
          <header className="closing-heading">
            <div>
              <p className="closing-eyebrow">Thinking · 03</p>
              <h2>What the work taught me.</h2>
            </div>
            <div className="closing-heading-side">
              <p>Two evidence-backed notes. The full trail stays in the essays and underlying case studies.</p>
              <Link href="/writing">All writing <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
          </header>

          <div className="closing-notes">
            {featured.map((article, index) => (
              <Link
                key={article.slug}
                className="closing-note"
                href={`/writing/${article.slug}`}
                data-authority-link="article"
              >
                <div className="closing-note-copy">
                  <div className="closing-note-meta"><span>0{index + 1}</span><span>{article.topic}</span><span>{article.readingMinutes} min</span></div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <span className="closing-note-action">Read the field note <ArrowUpRight size={15} aria-hidden="true" /></span>
                </div>
                {noteVisual(article)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="closing-opportunity">
        <div className="shell closing-opportunity-shell">
          <header className="closing-opportunity-head">
            <p className="closing-eyebrow">Opportunity · 04</p>
            <h2>Choose the conversation that fits.</h2>
            <p>Role, project or system problem — the fastest route is the one with the right context attached.</p>
          </header>

          <div className="closing-paths">
            <article className="closing-path">
              <div className="closing-path-index"><span>01</span><i aria-hidden="true" /></div>
              <p className="closing-path-kicker">HIRING / ROLE</p>
              <h3>Hiring for a technical, data or product role?</h3>
              <p>Start with the work, then reach me directly with the role and the problem space.</p>
              <div className="closing-path-actions">
                <a href={`mailto:${profile.email}?subject=${encodeURIComponent("Technical role opportunity")}`} data-conversion="contact-role-email">Email about a role <Mail size={15} aria-hidden="true" /></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" data-conversion="contact-role-linkedin">LinkedIn <Linkedin size={15} aria-hidden="true" /></a>
                <Link href="/work">Inspect work <ArrowUpRight size={15} aria-hidden="true" /></Link>
              </div>
            </article>

            <article className="closing-path closing-path-project">
              <div className="closing-path-index"><span>02</span><i aria-hidden="true" /></div>
              <p className="closing-path-kicker">PROJECT / SYSTEM</p>
              <h3>Have a system or product problem worth solving?</h3>
              <p>Migration, analytics, ML/AI or product delivery — use the service context to see what is supported by public proof and what stays experience-backed.</p>
              <div className="closing-path-actions">
                <Link href="/services" data-conversion="home-to-services">Service context <ArrowRight size={15} aria-hidden="true" /></Link>
                <a href={`mailto:${profile.email}?subject=${encodeURIComponent("Project or system opportunity")}`} data-conversion="contact-project-email">Discuss the problem <Mail size={15} aria-hidden="true" /></a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer className="closing-directory">
        <div className="shell closing-directory-grid">
          <div className="closing-directory-brand">
            <Link className="closing-directory-mark" href="/#top" aria-label="M7 — back to top">M7</Link>
            <div><strong>{profile.name}</strong><span>Data · AI · Product</span></div>
          </div>

          <nav className="closing-directory-nav" aria-label="Footer directory">
            <div><p>Explore</p><Link href="/#work">Work</Link><Link href="/#method">How I work</Link><Link href="/services">Services</Link><Link href="/writing">Writing</Link></div>
            <div><p>Connect</p><a href={`mailto:${profile.email}`} data-conversion="footer-email">Email</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></div>
          </nav>

          <div className="closing-directory-end">
            <a className="closing-directory-email" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={14} aria-hidden="true" /></a>
            <p>© {new Date().getFullYear()} {profile.name}. Built as a living professional web identity.</p>
            <div className="closing-directory-icons" aria-hidden="true"><Mail size={14} /><Linkedin size={14} /><Github size={14} /></div>
          </div>
        </div>
      </footer>
    </>
  );
}
