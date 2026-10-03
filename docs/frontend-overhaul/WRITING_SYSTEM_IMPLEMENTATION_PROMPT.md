> **SUPERSEDED FOR EXECUTION:** Read `WRITING_SYSTEM_FINAL_EXECUTION_PROMPT.md` and `WRITING_SYSTEM_REFINEMENT_PACKET.md` first. They contain the latest locked heading, in-cover metadata, two-line-title and read/listen/audio requirements. This file remains supporting context only.

# Codex / Luna Execution Prompt — Writing System Rebuild

> **v1.1 note:** The final consolidated executor handoff is `WRITING_SYSTEM_V11_EXECUTION_PROMPT.md`. Use that document for implementation; this file remains supporting detail.

Implement the Writing System Rebuild for `m7mdehab/m7mdehab-site`.

The product definition, editorial scope, visual grammar, data-model direction, responsive model, SEO/discovery contract, accessibility contract and acceptance criteria are already decided.

Do not propose alternative art directions and do not reinterpret Writing back into a project-only section.

## Read first

1. `AGENTS.md`
2. `docs/LOCALIZATION_POLICY.md`
3. `docs/frontend-overhaul/WRITING_SYSTEM_EXECUTION_PACKET.md`
4. `design/writing-system/writing-system.spec.json`
5. `design/writing-system/WRITING_SYSTEM_BLUEPRINT.html`
6. `docs/frontend-overhaul/WRITING_SYSTEM_INTEGRATION_PATCH.md`
7. `docs/frontend-overhaul/WRITING_SYSTEM_VISUAL_QA.md`
8. `docs/frontend-overhaul/WRITING_SYSTEM_DATA_MIGRATION_PATCH.md`
9. `docs/frontend-overhaul/WRITING_SYSTEM_ROUTE_ACTIVATION_PATCH.md`
10. `docs/frontend-overhaul/WRITING_SYSTEM_SEO_AI_CONTRACT.md`
11. `docs/frontend-overhaul/WRITING_SYSTEM_TEST_MATRIX.md`
12. `docs/frontend-overhaul/WRITING_SYSTEM_REPO_AUDIT.md`
13. `docs/frontend-overhaul/WRITING_SYSTEM_PREFABRICATED_SCAFFOLD.md`
14. `docs/frontend-overhaul/WRITING_SYSTEM_AUTHORING_GUIDE.md`

Read the local Next.js 16 documentation mandated by `AGENTS.md` before modifying metadata APIs.

## Repository-state rule

Refresh GitHub/main before coding.

The groundwork audit recorded concurrent Method Story and Selected Work work. Do not assume the recorded SHA is still current.

Do not use stale draft PR #25 as the Writing implementation base.

Prefer the latest accepted `main`. If concurrent work remains open, rebase the Writing branch before final rendered QA and merge.

**PR #31 is a direct integration conflict** because it changes `home-closing.tsx`, Opportunity, Phase G/mobile tests and the English layout. Do not activate Writing on an older HomeClosing snapshot. If PR #31 is accepted, merge/rebase it first, then remove only the Writing-specific parts from that newest closing implementation while preserving its accepted Opportunity/Footer/mobile behavior.

PR #29 also changes the English layout and Method. Preserve its accepted result if/when it lands.

## Locked outcome

Home:

- H2: `What I’m thinking through.`;
- no supporting lede under/alongside the Home heading;
- CTA: `All writing`, placed after the grid at the bottom-right;
- current three published posts;
- maximum six curated posts via `homeRank`;
- 3 columns desktop / 2 tablet / 1 mobile;
- no placeholder cards;
- no carousel;
- no dots;
- no autoplay;
- no horizontal Writing swipe.

`/writing`:

- eyebrow: `Writing`;
- H1: `What I’m thinking through.`;
- no redundant archive lede;
- shared card grammar;
- every published post;
- no filters/search/pagination in this phase.

“What the Work Taught Me” is an optional series for the current project-derived essays, not the Writing umbrella.

## Architecture

Start from the prepared non-live files:

- `components/home-writing-section.tsx`;
- `components/writing-system-card.tsx`;
- `components/writing-system-cover.tsx`;
- `components/writing-system-index.tsx`;
- `components/writing-system-article-blocks.tsx`;
- `components/writing-system-article.tsx`;
- `components/writing-system-listen.tsx`;
- `components/writing-system-schema.ts`;
- `components/writing-system-contract.ts` (temporary; delete after canonical data migration);
- `app/writing-system.css`.

Do not create parallel `home-writing.tsx` / `writing-card.tsx` / `writing-cover.tsx` implementations. Integrate and, if desired, rename the prepared files once without leaving duplicate components.

Refactor:

- `data/writing.ts`;
- `components/home-closing.tsx`;
- `components/writing-authority.tsx`;
- `app/(en)/page.tsx`;
- `app/(en)/writing/page.tsx`;
- `app/(en)/writing/[slug]/page.tsx`;
- `app/writing.json/route.ts`;
- `data/discoverability.ts`;
- `app/llms.txt/route.ts`;
- affected tests/docs.

Delete `components/use-timed-carousel.ts` if final `rg` proves it is dead.

## Data contract

Generalize article data around:

- status;
- publishedAt / optional updatedAt;
- category;
- topics;
- optional series;
- readingMinutes;
- required listenMinutes;
- optional real audio asset metadata;
- optional concise cardDescription;
- optional homeRank;
- cover;
- origin = project | independent;
- optional thesis/evidence/takeaways/sources;
- sections.

Keep existing paragraphs/bullets compatible. Add typed blocks for future posts without mechanically rewriting the current essays.

Current three:

1. forecast → data → 9 min read / ~8 min listen → concise cardDescription → homeRank 1 → forecast-calibration → Presaira;
2. oil spill → data → 8 min read / ~8 min listen → concise cardDescription → homeRank 2 → oil-sar → Oil Spill Detection;
3. AI agent → ai → 9 min read / ~8 min listen → concise cardDescription → homeRank 3 → agent-provenance → OpportunityOS.

All three series:

`what-the-work-taught-me`.

Preserve their slugs and factual article bodies.

## Cover direction

Forecast:

- real Presaira reliability data;
- dark navy;
- editorial calibration curve;
- tiny label;
- not a dashboard.

Oil:

- real public SAR case-study imagery;
- restrained crop/overlay;
- no fabricated annotation.

AI agent:

- original public-safe provenance/authority diagram;
- graphite/mint;
- no fake UI/private information.

## Visual grammar

Minimal, clean, elegant, calm.

Card:

- 16:9 cover;
- category/topic at bottom-left **inside** the cover;
- read/listen timing at bottom-right **inside** the cover;
- dedicated dark bottom gradient behind metadata for contrast;
- no duplicated top taxonomy label;
- restrained Newsreader title with a **hard two-line maximum**;
- concise cardDescription with a **hard two-line maximum on desktop/tablet and hidden on mobile (<720px)**;
- transparent outer background;
- whole card is one link;
- no SaaS shell or heavy shadow.

Hover is tiny CSS-only motion. Reduced motion removes transform/cover zoom.

No new dependency.

## Homepage extraction

Target:

`SolveThinkBridge → HomeWriting → HomeClosing`

`HomeClosing` becomes Opportunity + Footer only.

Do not redesign Selected Work, Opportunity, Footer or Method while implementing Writing.

## SEO / discovery

Default JSON-LD: `BlogPosting`.

Use:

- canonical;
- headline;
- description;
- `datePublished`;
- optional `dateModified`;
- author;
- keywords/topics;
- image only if valid;
- citations only if present;
- project `about` only if applicable.

Generalize:

- `/writing.json`;
- writing discovery records;
- `llms.txt`.

Remove active Arabic Writing URL references while the English-only policy is current. Do not delete dormant Arabic source files.

## Tests

Update every stale Writing-carousel/project-only assertion.

Search:

`rg 'closing-note|closing-notes|Go to article|Read the field note|What the work taught me|writing carousel|two evidence'`

Add a non-production independent-post fixture proving project/evidence/source/takeaway/thesis are optional.

Keep Selected Work carousel behavior and tests intact.

## Execution order

1. sync/rebase repository state;
2. read governing docs/local Next docs;
3. migrate the temporary scaffold contract into canonical `data/writing.ts`;
4. repoint the prepared cover/card/index/block/article/schema components to canonical data types;
5. activate the refined prepared Home Writing section and isolated stylesheet;
6. keep the CTA below the grid and ensure the Home lede is absent;
7. extract Writing from HomeClosing;
8. update Home route;
9. activate the refined archive scaffold;
10. activate/tune the prepared conditional article renderer rather than rebuilding it;
11. wire the prepared Listen component so it renders only for real audio assets;
12. wire the prepared `BlogPosting` schema builder and optional `AudioObject`;
13. update JSON/discovery/llms;
14. update tests;
15. add/import isolated CSS;
16. typecheck/lint/build/static-export;
17. run focused browser tests;
18. run full browser suite;
19. render the full screenshot matrix;
20. inspect against the visual QA rubric;
21. fix objective visual defects in the same pass;
22. rerun validation;
23. reconcile governing docs;
24. commit/push/PR/check/merge/deploy per `AGENTS.md`;
25. verify live `/`, `/writing`, the three article URLs and `/writing.json`.

## Render targets

Home Writing:

- 1920×1080;
- 1440×1000;
- 1280×800;
- 1024×768;
- 430×932;
- 390×844;
- 320×568.

Archive:

- 1440×1000;
- 390×844.

Article:

- 1440×1000;
- 390×844.

Full Home:

- 1920×1080;
- 390×844.

Do not treat automated tests as visual acceptance.

## Do not

- preserve the old Writing carousel;
- keep article dots;
- put category/timing metadata below the thumbnail;
- allow any card title to exceed two visible lines;
- restore the removed explanatory Home lede;
- put All writing back in the header;
- render a disabled/fake audio player when no real audio source exists;
- omit listenMinutes on any article;
- restore card descriptions on mobile without a new explicit decision;
- add filter/search UI;
- fill a 3×3 with placeholders;
- show nine Home posts by default;
- make every article a project article;
- keep universal `TechArticle`;
- keep mandatory evidence/project footer;
- create fake screenshots;
- add GSAP/WebGL/carousel packages;
- edit unrelated sections for aesthetic preference;
- merge before screenshot review;
- claim live deployment until verified.

## Return only after delivery

Report:

- branch;
- files changed;
- data-model changes;
- current three article migration;
- tests run and exact results;
- screenshot artifacts reviewed;
- feature commit SHA(s);
- PR number;
- merge/main SHA;
- production workflow result;
- live verification for `/`, `/writing`, all three article routes and `/writing.json`;
- any genuine unresolved blocker.

If there is no blocker, do not stop at “ready for review.” Follow the repository delivery workflow through production.

## Prepared code: do not start from blank files

A non-live implementation scaffold is already present on the groundwork branch/main checkpoint:

- `components/writing-system-contract.ts`
- `components/writing-system-cover.tsx`
- `components/writing-system-card.tsx`
- `components/writing-system-index.tsx`
- `components/home-writing-section.tsx`
- `components/writing-system-article-blocks.tsx`
- `components/writing-system-article.tsx`
- `components/writing-system-listen.tsx`
- `components/writing-system-schema.ts`
- `app/writing-system.css`
- `docs/frontend-overhaul/WRITING_SYSTEM_PREFABRICATED_SCAFFOLD.md`

Use these files.

Do not replace them with a separate visual system unless a concrete compile/runtime defect requires it.

The temporary `writing-system-contract.ts` exists only to make the prefabricated non-live components self-contained. During integration, merge its types/helpers into `data/writing.ts`, import from the canonical data module, and delete the temporary contract.

The stylesheet is intentionally unimported until activation.

Before final QA, verify the scaffold has been fully collapsed into the canonical runtime architecture and no duplicate editorial model remains.


## Refinement authority

Also read and obey:

`docs/frontend-overhaul/WRITING_SYSTEM_REFINEMENT_2026-10-03.md`

It supersedes v1.0/v1.1 presentation details for the heading, lede, CTA placement, metadata placement, title clamp, mobile description visibility, SAR crop and audio-ready behavior.

Do not “restore” the previous screenshot merely because it already looked polished.
