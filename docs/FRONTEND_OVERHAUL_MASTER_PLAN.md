# Frontend Overhaul Master Plan

**Program:** Frontend Rebuild — Visual Identity & Homepage Architecture  
**Status:** ACTIVE  
**Current phase:** Phase H — accepted design, September truth refresh validation before merge  
**Next phase:** Phase I — English Desktop Visual Acceptance  
**Created:** 2026-09-12  
**Authority:** Mohammed Ehab ElNomany

## Governing decision

Iteration 13 is technically complete but rejected as final visual acceptance. The homepage must not become a CV rendered as a long editorial page. Frontend structure may be replaced radically wherever it is not working.

The homepage is a **maximal filter for noise and nonsense**. Only information that earns prime attention belongs there; deeper professional history belongs on dedicated routes, the footer, machine-readable surfaces or the CV.

Whenever several paragraphs can truthfully become one graphic, interaction, image, diagram, credibility rail or meaningful number, prefer the stronger visual communication.

## Current truth baseline

Career/profile facts are governed by Mohammed's newest explicit instruction and the **September 2026 CV**. That source supersedes the older June/August CV wording when they conflict.

Important 2026-09-12 corrections now locked into the runtime/source model:

- current role: **Data Engineer — Network International**;
- Al Tayseer International: **Business Analyst Team Lead**;
- Guksu: **Data Analyst & Supply Chain Analyst**;
- credential: **Databricks Certified Data Engineer Associate — 2026**;
- current skill framing is data-engineering-first and includes Databricks;
- **WordPress is not part of the current public implementation/skill model**; Mohammed explicitly confirmed the relevant websites/products were built using code;
- Ghareeb Oglu is treated as an end-to-end coded commerce product;
- English, Arabic factual projection, visible About, credibility rail and machine-readable data must remain synchronized with this baseline.

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

Built `/prototypes/cinematic`, `/prototypes/spatial` and `/prototypes/kinetic` using real content/evidence. Selected the production hybrid:

> **Cinematic Systems × Spatial Evidence × Kinetic Density**

Validation: Deployment Readiness `34663301936` PASS; Application CI `34663301934` PASS; Playwright `50/50` PASS.

## Phase D — Visual Foundation + Hero + Nav + Credibility Rail — COMPLETE / ACCEPTED

Delivered the evidence atlas hero, reduced navigation and semantically truthful credibility rail. User visually accepted the corrected desktop/mobile result. PR #13 merged.

## Phase E — Selected Work — COMPLETE / ACCEPTED

Replaced the six-card wall with three differentiated flagships: Presaira, OpportunityOS and Ghareeb Oglu Commerce. Added complete `/work` directories for the remaining project discovery. User visually accepted; PR #14 merged.

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

Replaced the old Services + Writing + Contact + utility-footer stack with:

- two evidence-led essays;
- two explicit opportunity paths;
- an intentional dark route directory footer;
- detailed service proof on `/services` and `/ar/services`.

Final Phase G browser suite: `66/66` PASS. User visually accepted. PR #16 merged at `5450fe00b8c1f98e1f7ce46d44142fa0e61aeb9b`.

## Phase H — About / Professional History — DESIGN ACCEPTED / FINAL TRUTH VALIDATION

The English Home no longer renders Experience, Certifications/Education or Additional Experience chapters. `/about` is the dedicated professional-history route and uses multiple visual grammars rather than résumé cards.

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

Mohammed visually accepted the Phase H design.

After acceptance, Phase H was refreshed against the September 2026 CV and explicit implementation correction. The branch now updates the governed truth model, runtime data, About, credibility rail, Arabic factual projection, project evidence registry and regression tests so older titles and WordPress cannot silently return.

Phase H closes when the **latest post-refresh** Application CI + Deployment Readiness runs pass and the corrected render shows no wrapping/regression caused by the factual changes. Then PR #17 may merge.

Decision record: `docs/frontend-overhaul/PHASE_H_ABOUT_ARCHITECTURE.md`.

## Phase I — English Desktop Visual Acceptance — NEXT

This is a whole-page acceptance pass, not another content-building phase.

Required execution:

1. capture the complete English Home at a large desktop review viewport (target `1920 × 1080`);
2. measure total page height as viewport equivalents;
3. inspect Hero, credibility rail, Selected Work, Solve/Think, Writing, Opportunity and Footer as one continuous experience;
4. verify no CV-dump structure has returned;
5. verify typography wraps deliberately and no ordinary heading falls into uncontrolled 3–5 line display treatment;
6. verify graphics/evidence and text carry balanced visual weight;
7. verify chapter transitions create variety without fragmentation;
8. inspect navigation at top, middle and closing states;
9. verify opportunity/conversion paths remain immediately understandable;
10. correct defects, rerender and only then accept/reject the desktop system.

Target: **5–7 desktop viewport heights, preferably ~6**. CI alone cannot close Phase I.

## Phase J — Responsive / Mobile Art Direction

Mobile is not a shrunken desktop. Recompose hero, project browsing, credibility rail, method chapter, writing, opportunity and navigation. Validate touch, overflow, performance and reduced motion.

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
| H — about route | **DESIGN ACCEPTED / FINAL TRUTH VALIDATION** |
| I — English desktop acceptance | NEXT |
| J — responsive/mobile | Not started |
| K — Arabic design/editorial | Not started |
| L — final staging / production readiness | Not started |

Domain purchase remains deferred until the final visual acceptance gate.
