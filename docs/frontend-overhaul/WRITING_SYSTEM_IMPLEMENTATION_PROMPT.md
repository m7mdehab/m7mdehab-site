# Codex / Luna Execution Prompt — Writing System Rebuild

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
9. `docs/frontend-overhaul/WRITING_SYSTEM_SEO_AI_CONTRACT.md`
10. `docs/frontend-overhaul/WRITING_SYSTEM_TEST_MATRIX.md`
11. `docs/frontend-overhaul/WRITING_SYSTEM_REPO_AUDIT.md`
12. `docs/frontend-overhaul/WRITING_SYSTEM_PREFABRICATED_SCAFFOLD.md`

Read the local Next.js 16 documentation mandated by `AGENTS.md` before modifying metadata APIs.

## Repository-state rule

Refresh GitHub/main before coding.

The groundwork audit recorded concurrent Method Story and Selected Work work. Do not assume the recorded SHA is still current.

Do not use stale draft PR #25 as the Writing implementation base.

Prefer the latest accepted `main`. If concurrent work remains open, rebase the Writing branch before final rendered QA and merge.

## Locked outcome

Home:

- H2: `Writing.`;
- copy: `Notes on AI, technology, work, projects, and whatever else I’m thinking through.`;
- CTA: `All writing`;
- current three published posts;
- maximum six curated posts via `homeRank`;
- 3 columns desktop / 2 tablet / 1 mobile;
- no placeholder cards;
- no carousel;
- no dots;
- no autoplay;
- no horizontal Writing swipe.

`/writing`:

- H1: `Writing.`;
- same broad lede;
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
- optional homeRank;
- cover;
- origin = project | independent;
- optional thesis/evidence/takeaways/sources;
- sections.

Keep existing paragraphs/bullets compatible. Add typed blocks for future posts without mechanically rewriting the current essays.

Current three:

1. forecast → data → homeRank 1 → forecast-calibration → Presaira;
2. oil spill → data → homeRank 2 → oil-sar → Oil Spill Detection;
3. AI agent → ai → homeRank 3 → agent-provenance → OpportunityOS.

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
- compact metadata;
- restrained Newsreader title;
- muted excerpt;
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
5. activate the prepared Home Writing section and isolated stylesheet;
6. extract Writing from HomeClosing;
7. update Home route;
8. activate the prepared archive scaffold;
9. activate/tune the prepared conditional article renderer rather than rebuilding it;
10. wire the prepared `BlogPosting` schema builder into route metadata/JSON-LD;
11. update JSON/discovery/llms;
12. update tests;
13. add/import isolated CSS;
14. typecheck/lint/build/static-export;
15. run focused browser tests;
16. run full browser suite;
17. render the full screenshot matrix;
18. inspect against the visual QA rubric;
19. fix objective visual defects in the same pass;
20. rerun validation;
21. reconcile governing docs;
22. commit/push/PR/check/merge/deploy per `AGENTS.md`;
23. verify live `/`, `/writing`, the three article URLs and `/writing.json`.

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
- `components/writing-system-schema.ts`
- `app/writing-system.css`
- `docs/frontend-overhaul/WRITING_SYSTEM_PREFABRICATED_SCAFFOLD.md`

Use these files.

Do not replace them with a separate visual system unless a concrete compile/runtime defect requires it.

The temporary `writing-system-contract.ts` exists only to make the prefabricated non-live components self-contained. During integration, merge its types/helpers into `data/writing.ts`, import from the canonical data module, and delete the temporary contract.

The stylesheet is intentionally unimported until activation.

Before final QA, verify the scaffold has been fully collapsed into the canonical runtime architecture and no duplicate editorial model remains.
