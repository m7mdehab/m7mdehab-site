# Frontend Overhaul Master Plan

**Program:** Frontend Rebuild — Visual Identity & Homepage Architecture  
**Status:** ACTIVE  
**Current phase:** Phase L — Final EN/AR/Responsive Production Hardening & Acceptance  
**Previous phase:** Phase K — COMPLETE / ACCEPTED  
**Created:** 2026-09-12  
**Updated:** 2026-09-13  
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
- `/writing` — writing archive;
- `/ar` and reciprocal Arabic supporting routes — authored RTL counterparts with meaning/quality parity rather than mechanical geometry parity.

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

The first acceptance run was intentionally rejected by the hierarchy gate because two ordinary H2 headings wrapped to three lines. The gate was not weakened. Copy was tightened to:

- **`Three ways into the work. One standard.`**
- **`Choose the right conversation.`**

A final desktop hierarchy refinement reduced the selected-work display scale and widened the opportunity composition rather than returning to oversized editorial typography.

The final code-bearing production render measures:

- **5585 px** total height;
- **5.17 viewport heights** at 1920 × 1080;
- **0 px horizontal overflow**;
- all ordinary H2 headings at **1–2 lines**;
- final opportunity heading at **1 line**.

Human inspection accepted the complete rhythm: dark evidence hero → shallow credibility rail → warm work → dark method → warm writing → dark opportunity/footer. No CV-dump structure, blocking navigation collision, giant dead zone or uncontrolled display-heading regression remains.

Final code-bearing validation:

- Deployment Readiness `34709324487` PASS;
- Application CI `34709324523` PASS;
- Playwright `79/79` PASS;
- English Home Lighthouse **87 / 100 / 100 / 100 / 100**;
- Presaira **96 / 100 / 100 / 100 / 100**;
- Arabic Home **97 / 100 / 100 / 100 / 100**;
- rendered artifact `10302757601`;
- artifact SHA-256 `fa938bea0ae5dca388d7c0b0840b2c388c4f68c03a4de2253955187b5abab4eb`.

A final documentation-only verification rerun also passed Deployment Readiness `34709645925`, Application CI `34709646098`, and all `79/79` browser tests. Its Lighthouse performance variance is runner-dependent; accessibility, best-practices, SEO and agentic-browsing remained 100.

Decision record: `docs/frontend-overhaul/PHASE_I_ENGLISH_DESKTOP_ACCEPTANCE.md`.

## Phase J — Responsive / Mobile Art Direction — COMPLETE / ACCEPTED

Phase J intentionally recomposed mobile rather than shrinking desktop. It hardened the 390px and 430px Home compositions, visible navigation tap-target instrumentation, credibility-rail touch/reduced-motion behavior, project evidence weighting, method, writing, opportunity and overall mobile density.

Final accepted candidate:

- PR #20;
- final head `77b12ce5297f303cdde635a4da213fa5f959a317`;
- merged to `main` at **`d7de991cd53895b5d6c883a7f2f0d1e6fff60893`**;
- final Application CI + Deployment Readiness PASS;
- final Home Lighthouse **88 / 100 / 100 / 100 / 100**;
- 390px Home: **6440 px / 7.63 viewport heights / zero overflow**;
- 430px Home: **6409 px / 6.88 viewport heights / zero overflow**;
- visible mobile nav targets **≥36px**.

Production deployment after the Phase J merge completed successfully, including live-route verification, production Playwright/accessibility, real production screenshots and Lighthouse.

## Phase K — Arabic Art Direction + Editorial Rewrite — COMPLETE / ACCEPTED

Phase K replaced the stale Arabic CV-style Home with an authored RTL version of the accepted selective architecture. It is not a translated mirror of English.

Implemented and accepted:

- selective Arabic Home: Hero → credibility rail → three flagship work systems → method → writing → opportunity/footer;
- new `/ar/about` for detailed professional history, education, credentials, operating stack and working principles;
- Arabic navigation reduced to Work / About / Writing / Contact;
- authored RTL geometry, evidence-atlas positioning, typography and responsive rhythm;
- reciprocal `/about` ↔ `/ar/about` metadata/sitemap behavior;
- complete Arabic mobile acceptance at 390px and 430px;
- Arabic services semantic heading chain corrected without changing visual hierarchy;
- reduced-motion, no-JS, overflow and accessibility coverage.

Final accepted candidate:

- PR #21;
- head `bfc352e14861f6cc54b1a5a22a964a9f63cfb142`;
- Deployment Readiness `34727957835` PASS;
- Application CI `34727957841` PASS;
- browser suite **88/88 PASS**;
- Arabic Home Lighthouse **93 / 100 / 100 / 100 / 100**;
- artifact `10308581669`;
- artifact SHA-256 `05f1bcd5490f576243f956e0c118bfc37e0f4f0fe18f7f82729856b7a608104c`;
- merged to `main` at **`6848e6ade3e025adaa369a1eaf1d7eab1e3f0a06`** after explicit visual acceptance.

The automatic post-merge GitHub Actions runs for Application CI, staging and production then failed before runner acquisition (`steps: []` / `runner_id: 0`). This is an external hosted-execution gate, not evidence of a code/test regression. Phase K therefore must not be described as newly deployed to production until hosted deployment succeeds.

## Phase L — Final EN/AR/Responsive Production Hardening & Acceptance — ACTIVE

Phase L is the final cross-language production hardening phase. The old description as “staging/production readiness before domain activation” is obsolete because **`m7mdehab.com` is already purchased, configured and live**.

Required acceptance contract:

- typecheck;
- lint;
- build/static export;
- complete public-route smoke coverage;
- full browser regression suite;
- top-level full-page accessibility;
- English desktop regression;
- English 390px/430px mobile regression;
- Arabic desktop regression;
- Arabic 390px/430px mobile regression;
- reciprocal routing/canonical/hreflang/x-default verification;
- structured-data presence/consistency;
- reduced-motion fallback;
- no-JS semantic fallback;
- real Cloudflare staging noindex/security/canonical isolation;
- real production route/security/canonical QA;
- hosted Playwright against staging and production;
- Lighthouse performance review;
- final EN/AR Home + About screenshot matrix;
- machine-readable final release evidence.

Phase L must not redesign already accepted surfaces unless hardening exposes a genuine regression. It must not use CI alone as proof of visual quality.

Current Phase L branch/PR:

- branch `frontend-overhaul-phase-l`;
- draft PR #22;
- base `6848e6ade3e025adaa369a1eaf1d7eab1e3f0a06`.

Current external execution issue:

- Application CI, Deployment Readiness, staging and production workflows are currently failing before any hosted runner starts;
- the same condition appears across `ubuntu-latest` and `ubuntu-24.04`;
- do not weaken validation or mutate runner labels merely to hide the platform-level condition;
- once hosted execution resumes, Phase L must run the complete contract and produce final hosted artifacts before merge/final closure.

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
| I — English desktop acceptance | COMPLETE / ACCEPTED |
| J — responsive/mobile | **COMPLETE / ACCEPTED** |
| K — Arabic design/editorial | **COMPLETE / ACCEPTED** |
| L — final EN/AR/responsive production hardening | **ACTIVE** |

Production already exists at **`https://m7mdehab.com`**. No domain purchase or activation step remains in the frontend-overhaul acceptance sequence.
