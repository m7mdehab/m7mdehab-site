# Frontend Overhaul Master Plan

**Program:** Frontend Rebuild — Visual Identity & Homepage Architecture  
**Status:** ACTIVE  
**Current phase:** Phase J — Responsive / Mobile Art Direction  
**Previous phase:** Phase I — COMPLETE / ACCEPTED  
**Created:** 2026-09-12  
**Authority:** Mohammed Ehab ElNomany

## Governing decision

Iteration 13 is technically complete but rejected as final visual acceptance. The homepage must not become a CV rendered as a long editorial page. Frontend structure may be replaced radically wherever it is not working.

The homepage is a **maximal filter for noise and nonsense**. Only information that earns prime attention belongs there; deeper professional history belongs on dedicated routes, the footer, machine-readable surfaces or the CV.

Whenever several paragraphs can truthfully become one graphic, interaction, image, diagram, credibility rail or meaningful number, prefer the stronger visual communication.

## Current truth baseline

Career/profile facts are governed by Mohammed's newest explicit instruction and the **September 2026 CV**. That source supersedes older June/August CV wording where they conflict.

Locked corrections:

- current role: **Data Engineer — Network International**;
- Al Tayseer International: **Business Analyst Team Lead**;
- Guksu: **Data Analyst & Supply Chain Analyst**;
- credential: **Databricks Certified Data Engineer Associate — 2026**;
- current skill framing is data-engineering-first and includes Databricks;
- **WordPress is not part of the current public implementation/skill model**; Mohammed explicitly confirmed the relevant websites/products were built using code;
- Ghareeb Oglu is treated as an end-to-end coded commerce product;
- English, Arabic factual projection, About, credibility rail and machine-readable data must remain synchronized with this baseline.

## Success definition

The rebuild succeeds only when Home:

- no longer reads like a CV/resume;
- feels visual, creative, authored and recognizably personal;
- communicates Mohammed through real project systems/evidence, not typography alone;
- is materially shorter than the rejected ~15-screen experience;
- creates curiosity that drives visitors into project/supporting routes;
- keeps only essential content on Home;
- remains performant, accessible, crawlable, AI-readable, bilingual and mobile-usable;
- passes rendered visual review, not only CI.

Target large-desktop homepage length: approximately **5–7 viewport heights**, preferably about **6**. This is an attention budget, never a CSS `min-height` rule.

## Locked production art direction

> **Cinematic Systems × Spatial Evidence × Kinetic Density**

- **Cinematic Systems** owns identity, atmosphere, hero memory point and systems vocabulary.
- **Spatial Evidence** owns heterogeneous project composition and evidence weighting.
- **Kinetic Density** owns compression, navigation, secondary information, writing, conversion and mobile discipline.

## Target architecture

1. **Identity / Hero** — compact identity + real evidence atlas.
2. **Credibility rail** — shallow relationship-labelled signal loop.
3. **Selected Work** — three flagship projects only.
4. **What I Solve / How I Think** — graphical working-method chapter.
5. **Signal / Thinking** — compact evidence-led writing preview.
6. **Opportunity / Footer** — two conversion paths + intentional route directory.

Supporting routes:

- `/work` — all six projects;
- `/work/[slug]` — evidence-heavy case studies;
- `/about` — professional history, education, credentials, skills and working principles;
- `/services` — detailed service propositions/evidence;
- `/writing` — writing archive.

Do not create a duplicate HTML `/resume` route by default.

## Credibility rail — hard requirement

The credibility rail must never regress into stacked résumé sections.

Requirements:

- one shallow right-to-left loop with explicit semantic groups;
- employment, teaching, internship, credential, education and scholarship relationships remain distinct;
- no `Trusted by` framing;
- slow readable movement, seamless reset, hover/focus pause, edge masks;
- reduced-motion becomes static/touch-scrollable;
- typographic fallback is preferred when logo reuse rights are unclear;
- current learning signals must reflect the governing career source, including Databricks.

## Hard homepage removals

The following must not return as large standalone Home chapters:

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

---

## Phase A — Homepage IA Demolition & Content Triage — COMPLETE

Established the new selective IA, moved detail to dedicated routes, set the 5–7 viewport budget, restored the credibility rail as a hard requirement and verified machine-readable discoverability can remain complete while Home becomes aggressively shorter.

## Phase B — Reference Exploration & Pattern Extraction — COMPLETE

Re-audited React Bits, Motion Primitives, Aceternity, Kintarowwwards, MotionFolio, koloNatalie and supporting implementation references. Extracted interaction principles without inheriting their IA/template weaknesses.

## Phase C — Real-Content Direction Prototypes — COMPLETE / ACCEPTED

Built `/prototypes/cinematic`, `/prototypes/spatial` and `/prototypes/kinetic` using real content/evidence. Selected:

> **Cinematic Systems × Spatial Evidence × Kinetic Density**

Validation: Deployment Readiness `34663301936` PASS; Application CI `34663301934` PASS; Playwright `50/50` PASS.

## Phase D — Visual Foundation + Hero + Nav + Credibility Rail — COMPLETE / ACCEPTED

Delivered the evidence atlas hero, reduced navigation and semantically truthful credibility rail. User visually accepted the corrected desktop/mobile result. PR #13 merged.

## Phase E — Selected Work — COMPLETE / ACCEPTED

Replaced the six-card wall with Presaira, OpportunityOS and Ghareeb Oglu Commerce. Added complete `/work` directories for the remaining project discovery. User visually accepted; PR #14 merged.

## Phase F — What I Solve / How I Think — COMPLETE / ACCEPTED

Replaced Capabilities + Skills + oversized About on Home with one graphical `SEE → REDUCE → BUILD` chapter and the compact human statement **“I like the messy part.”**

Validation:

- Application CI `34667951677` PASS;
- Deployment Readiness `34667951673` PASS;
- Playwright `62/62` PASS;
- English Home Lighthouse `83 / 100 / 100 / 100 / 100`;
- Presaira `99 / 100 / 100 / 100 / 100`;
- Arabic Home `95 / 100 / 100 / 100 / 100`.

User visually accepted. PR #15 merged at `0f91ad846c7fa1fac9521daf0683b23ff55e9fef`.

## Phase G — Writing + Opportunity + Footer — COMPLETE / ACCEPTED

Replaced the old Services + Writing + Contact + utility-footer stack with two evidence-led essays, two explicit opportunity paths, an intentional dark directory footer, and dedicated service routes.

Final Phase G browser suite: `66/66` PASS. User visually accepted. PR #16 merged at `5450fe00b8c1f98e1f7ce46d44142fa0e61aeb9b`.

## Phase H — About / Professional History — COMPLETE / ACCEPTED

English Home no longer renders Experience, Certifications/Education or Additional Experience chapters. `/about` is the dedicated professional-history route and uses multiple visual grammars rather than résumé cards.

Implemented:

- through-line/current-role anchor;
- career map;
- parallel tutoring/freelance tracks;
- early technical placements;
- education/credential ledger;
- operating stack;
- working principles and next routes;
- navigation/credibility/footer routing to About;
- sitemap, static export and regression coverage.

After the initial visual acceptance, Phase H was refreshed against the September 2026 CV and Mohammed's explicit implementation correction. Runtime truth, About, credibility rail, Arabic factual projection and project-evidence governance were synchronized; stale WordPress assumptions were removed.

Final validation:

- Deployment Readiness `34707436770` PASS;
- Application CI `34707436799` PASS;
- Playwright `76/76` PASS;
- English Home Lighthouse `85 / 100 / 100 / 100 / 100`;
- rendered artifact `10302731419`.

PR #17 merged at `daec5ac797279f5004e7b796dbbea402461cbaa0`.

Decision record: `docs/frontend-overhaul/PHASE_H_ABOUT_ARCHITECTURE.md`.

## Phase I — English Desktop Visual Acceptance — COMPLETE / ACCEPTED

Phase I judged the complete English Home as one continuous 1920 × 1080 production render rather than as individually accepted sections.

The first acceptance run was intentionally rejected by the new hierarchy gate because two ordinary H2 headings wrapped to three lines. The gate was not weakened. Copy was tightened to:

- **`Three ways into the work. One standard.`**
- **`Choose the right conversation.`**

The final render measures:

- **5702 px** total height;
- **5.28 viewport heights** at 1920 × 1080;
- **0 px horizontal overflow**;
- all ordinary H2 headings at **1–2 lines**.

Human inspection accepted the complete rhythm: dark evidence hero → shallow credibility rail → warm work → dark method → warm writing → dark opportunity/footer. No CV-dump structure, blocking navigation collision, giant dead zone or uncontrolled display-heading regression remains.

Final validation:

- Deployment Readiness `34708286502` PASS;
- Application CI `34708286573` PASS;
- Playwright `79/79` PASS;
- English Home Lighthouse **92 / 100 / 100 / 100 / 100**;
- Presaira **98 / 100 / 100 / 100 / 100**;
- Arabic Home **95 / 100 / 100 / 100 / 100**;
- rendered artifact `10302891370`;
- artifact SHA-256 `c3a956b869fcd619386a945f7e42f43b542747ec574020c9531f292c0ae46748`.

Decision record: `docs/frontend-overhaul/PHASE_I_ENGLISH_DESKTOP_ACCEPTANCE.md`.

## Phase J — Responsive / Mobile Art Direction — ACTIVE / NEXT

Mobile is not a shrunken desktop. Phase J must intentionally recompose hero, project browsing, credibility rail, method chapter, writing, opportunity and navigation.

Required gates include:

- 390px and representative larger-phone renders;
- touch-target and interaction review;
- no horizontal overflow;
- deliberate reweighting of project evidence rather than desktop stacking;
- readable credibility rail with touch/reduced-motion fallback;
- motion/performance review on constrained viewport;
- no desktop-only layout assumptions;
- rendered visual acceptance before Phase K.

## Phase K — Arabic Art Direction + Editorial Rewrite

Factual Arabic data already inherits the September truth refresh. Phase K remains the intentional RTL **design/editorial** pass: restructure where needed for Arabic rhythm, then rewrite/polish Arabic copy without mechanically mirroring English geometry.

## Phase L — Final Staging Acceptance & Production Readiness

Run full typecheck/lint/build/browser/accessibility/reduced-motion/schema/canonical/Lighthouse gates, deploy real Cloudflare staging, verify `noindex`/security/canonical isolation and capture final EN/AR/responsive screenshots.

Only after final visual acceptance may domain purchase/production activation proceed.

## Hard regression tests

The redesign fails if:

- Home again contains full Experience + Certifications + Education stacks;
- Skills return as a large chip/logo wall;
- six giant project cards return;
- logos imply inaccurate client/endorsement relationships;
- graphics are decorative rather than evidence-bearing;
- every chapter shares the same giant-heading/paragraph/card grammar;
- desktop length returns toward the rejected ~15-screen experience;
- giant typography again becomes the main source of personality;
- Arabic becomes a mechanical mirror;
- September 2026 career facts drift back to older titles/credentials;
- WordPress returns as a skill or implementation claim;
- accessibility/crawlability are sacrificed for spectacle;
- CI is treated as proof of visual quality.

## Execution ledger

| Phase | Status |
|---|---|
| A — IA demolition | COMPLETE |
| B — reference exploration | COMPLETE |
| C — direction prototypes | COMPLETE / ACCEPTED |
| D — visual foundation / hero / nav / rail | COMPLETE / ACCEPTED |
| E — selected work | COMPLETE / ACCEPTED |
| F — solve/think bridge | COMPLETE / ACCEPTED |
| G — writing / opportunity / footer | COMPLETE / ACCEPTED |
| H — about route | COMPLETE / ACCEPTED |
| I — English desktop acceptance | **COMPLETE / ACCEPTED** |
| J — responsive/mobile | **ACTIVE / NEXT** |
| K — Arabic design/editorial | Not started |
| L — final staging / production readiness | Not started |

Domain purchase remains deferred until the final visual acceptance gate.
