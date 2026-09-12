# Frontend Overhaul Master Plan

**Program:** Frontend Rebuild — Visual Identity & Homepage Architecture  
**Status:** ACTIVE  
**Current phase:** Phase C — Real-Content Direction Prototypes  
**Created:** 2026-09-12  
**Authority:** Mohammed Ehab ElNomany

## Governing decision

Iteration 13 is technically complete but is rejected as final visual acceptance. The current homepage still reads too much like a CV rendered as a long editorial page. The frontend may be replaced radically wherever the existing system is not working.

The homepage is a maximal filter for noise and nonsense. It should contain only what earns prime attention; detailed professional history belongs on dedicated routes, the footer, machine-readable surfaces, or the CV.

Whenever many paragraphs can truthfully become one graphic, interaction, image, diagram, logo rail, or meaningful number, prefer the stronger visual communication.

## Success definition

The rebuild succeeds only when Home:

- no longer reads like a CV/resume;
- feels visual, creative, authored and recognizably personal;
- communicates Mohammed through real project systems/evidence, not typography alone;
- is materially shorter than the current ~15-screen experience;
- creates curiosity that drives visitors into project/supporting routes;
- keeps only essential content on Home;
- remains performant, accessible, crawlable, AI-readable, bilingual and mobile-usable;
- passes rendered visual review, not only CI.

Target large-desktop homepage length: approximately **5–7 viewport heights**, preferably about **6**. This is an attention budget, never a CSS `min-height` rule.

## Preserve as infrastructure

Preserve the truth/provenance model, structured data, machine-readable exports, SEO/AI architecture, project evidence, case-study routes, writing routes, bilingual architecture, accessibility/reduced-motion requirements, CI/testing, staging and deployment infrastructure.

## Open to replacement

Homepage IA, section order/count, hero, navigation, typography scale/pairing, palette distribution, backgrounds, card system, project browsing, capabilities presentation, homepage experience/education/certification treatment, services treatment, writing treatment, motion grammar, graphical language, mobile composition and Arabic visual composition.

No frontend component is protected merely because it already exists.

## New homepage target architecture

1. **Identity / Hero** — compact identity + one strong visual system built from real project evidence.
2. **Credibility rail** — shallow right-to-left animated logo loop compressing employment/experience and education/credentials.
3. **Selected Work** — three flagship projects only; remaining work moves to `/work`.
4. **What I Solve / How I Think** — graphical replacement for Capabilities + Skills + oversized About.
5. **Signal / Thinking** — compact current-role/writing signal.
6. **Opportunity / Footer** — strong conversion + route/entity directory.

Detailed professional history moves to `/about`; detailed service propositions move to `/services`; all six projects are browsable at `/work`; writing remains at `/writing`.

## Credibility logo rail — hard requirement

The previously requested logo loop is restored as a non-negotiable requirement and must not be replaced by stacked resume sections again.

Prototype either:

- one mixed rail with explicit `EXPERIENCE` / `LEARNING` separators; or
- two shallow rails: `Experience` and `Education & credentials`.

Behavior:

- right-to-left seamless loop;
- slow readable pace;
- pause/slow on hover/focus;
- subtle edge masks;
- static or touch-scrollable reduced-motion fallback;
- correct alt/accessible relationship labels.

Never label the rail “Trusted by.” Employment, internships, teaching, education, scholarships, credentials and clients remain distinct relationship types. Logo assets must be official/publicly legitimate where possible; use typographic fallback when uncertain.

## Hard homepage removals

The following must not return as large standalone homepage chapters:

- full Skills & Stack taxonomy;
- full Experience timeline;
- Certifications list;
- Education list;
- Additional Experience cards;
- detailed Services catalogue;
- all six projects as giant consecutive cards.

## Execution method

Every visually consequential phase follows:

**Explore → Extract → Plan → Prototype → Compare → Implement → Render → Critique → Accept/Reject**

Automated tests are necessary but are not visual acceptance.

## Phase A — Homepage IA Demolition & Content Triage — COMPLETE

Completed:

- inventoried current 11-section homepage;
- classified every module as keep/rebuild, compress, move or remove from Home;
- removed Skills, full Experience, Credentials/Education and Additional Experience from planned Home;
- moved service detail to `/services`;
- selected `/about` as the primary detailed professional-history route;
- reduced Home work to three flagship slots in principle;
- established ~5–7 viewport height budget;
- restored credibility rail requirement;
- verified that machine-readable profile/discoverability data is independent from visible Home layout;
- identified that `serviceContextUrl()` must migrate from `/#service-*` to `/services#service-*`;
- identified required new `/work`, `/about`, `/services` routes and sitemap additions;
- defined typed credibility relationships so employer/credential semantics cannot be flattened.

## Phase B — Reference Exploration & Pattern Extraction — COMPLETE

Re-audited the existing pool: React Bits Portfolio, Motion Primitives, Aceternity, Kintarowwwards, MotionFolio, koloNatalie and the historical Aitezaz reference.

Key conclusions:

- React Bits: hero/interaction donor, **not** IA donor.
- Motion Primitives: primary micro-motion vocabulary.
- MotionFolio: GSAP/ScrollTrigger/Lenis implementation donor for short project transitions.
- koloNatalie: motion restraint/performance reference.
- Kintarowwwards: kinetic confidence, not roadmap/stack volume.
- Aceternity: selected composition ideas only; avoid SaaS hierarchy/trusted-by semantics.
- Magic UI marquee added as an implementation reference for the credibility rail; likely implement a small project-native version with reduced-motion safeguards rather than depend blindly on a drop-in component.
- Codrops spatial/Flip gallery mechanics added for project exploration; artificial scroll hijacking explicitly rejected.

Three prototype directions are now defined:

1. **Cinematic Systems Portfolio** — layered project-evidence atlas, strongest memorability, highest complexity.
2. **Spatial Evidence Gallery** — curated technical exhibition, asymmetrical evidence-led browsing.
3. **Kinetic Editorial / Product** — fastest/recruiter-friendly, compact, performance-simple but must retain enough personality.

## Phase C — Real-Content Direction Prototypes — ACTIVE

Each prototype slice must contain:

- hero;
- navigation;
- credibility rail;
- one flagship project state/transition;
- one capability/personality treatment;
- opportunity CTA fragment.

Use real Mohammed content and real public-safe project evidence. No lorem ipsum, invented metrics, fake logos or generic placeholder identity.

Render each at large desktop, laptop and mobile. Compare memorability, comprehension speed, evidence fit, motion quality, performance, accessibility and Arabic adaptability. Select the winner only after rendered comparison.

## Phase D — Visual Foundation + Hero + Nav + Credibility Rail

Define typography, palette, grid, spacing, border/radius rules, imagery/background treatment, focus/hover states and one coherent motion grammar. Rebuild hero from scratch. Implement reduced primary nav (`Work · About · Writing · Contact · AR` as current candidate). Acquire/verify logo assets and implement the rail.

## Phase E — Selected Work Rebuild

Select three Home flagships. Explore short sticky stage, spatial/asymmetric gallery, controlled carousel/project switcher or dominant-on-hover grid. Keep copy minimal and evidence dominant. Remaining projects move to `/work`.

## Phase F — What I Solve / How I Think

No skill-chip wall. Merge Capabilities + Skills + About philosophy into one graphical transformation chapter. Candidate working philosophy: `Make the truth visible → Reduce ambiguity → Build the smallest reliable system that carries the job.`

## Phase G — Writing + Opportunity + Footer

Preview only 2–3 strongest writings with subject-derived visuals. Keep Home service conversion to compact role/project paths, not detailed cards. Make the footer the intentional directory for omitted detail.

## Phase H — About Route Rebuild

Move complete experience, education, certifications, additional experience, internships, tutoring and skill taxonomy to `/about`. Do not create a separate HTML `/resume` by default; expose a downloadable CV from About when appropriate.

## Phase I — English Desktop Visual Acceptance

Capture and inspect the complete desktop experience. Reject any return of CV-dump structure, uncontrolled headline wrapping, repetitive giant cards, or excessive page length.

## Phase J — Responsive / Mobile Art Direction

Mobile is not a shrunken desktop. Recompose hero, work interaction, rail and navigation. Validate touch, overflow, performance and reduced motion.

## Phase K — Arabic Art Direction + Editorial Rewrite

Adapt structure intentionally for RTL, then perform the deferred Arabic linguistic/editorial rewrite. Equivalent quality and meaning are required; identical geometry is not.

## Phase L — Final Staging Acceptance & Production Readiness

Run typecheck/lint/build/browser/accessibility/reduced-motion/schema/canonical/Lighthouse gates; deploy real Cloudflare staging; verify noindex/security/canonical isolation; capture final EN/AR/responsive screenshots. Only after final visual acceptance may domain purchase/production activation proceed.

## Hard regression tests

The redesign fails if:

- Home again includes full Experience + Certifications + Education stacks;
- Skills return as a large chip/logo wall;
- six giant project cards return;
- logos imply “trusted by” or client relationships inaccurately;
- graphics are decorative rather than evidence-bearing;
- all chapters share the same giant-heading/paragraph/card grammar;
- desktop length remains near the current 15-screen experience;
- giant typography is still the primary source of personality;
- Arabic becomes a mechanical mirror;
- accessibility/crawlability are sacrificed for spectacle;
- CI is treated as proof of visual quality.

## Execution ledger

| Phase | Status |
|---|---|
| A — IA demolition | COMPLETE |
| B — reference exploration | COMPLETE |
| C — direction prototypes | **ACTIVE** |
| D — visual foundation / hero / nav / rail | Not started |
| E — selected work | Not started |
| F — solve/think bridge | Not started |
| G — writing / opportunity / footer | Not started |
| H — about route | Not started |
| I — desktop acceptance | Not started |
| J — responsive/mobile | Not started |
| K — Arabic | Not started |
| L — final staging / production readiness | Not started |

Domain purchase remains deferred until the final visual acceptance gate.