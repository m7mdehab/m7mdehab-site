# Writing System Rebuild — Execution Packet

**Date:** 2026-10-03  
**Authority:** Mohammed Ehab ElNomany  
**Status:** DESIGN / PRODUCT / ARCHITECTURE LOCKED  
**Scope:** English Home Writing, `/writing`, `/writing/[slug]`, editorial data/discovery/schema/tests

## 0. Directive

Rebuild Writing as Mohammed's general personal publishing surface.

The result must read as:

> **This is where Mohammed writes.**

It must not read as:

> This is where Mohammed only explains portfolio projects.

Project-derived technical essays remain valid and keep their evidence boundaries, but they become one optional series rather than the definition of Writing.

This packet supersedes the old Phase G assumption that Home must show exactly two evidence-led project essays.

## 1. Locked public copy

Home heading:

**Writing.**

Home supporting copy:

**Notes on AI, technology, work, projects, and whatever else I’m thinking through.**

Home CTA:

**All writing**

`/writing` H1:

**Writing.**

`/writing` lede:

**Notes on AI, technology, work, projects, and whatever else I’m thinking through.**

“What the Work Taught Me” survives only as an optional series name.

## 2. Editorial model

Writing may cover:

- AI;
- technology;
- data;
- career;
- projects;
- product;
- personal observations;
- experiments;
- tutorials;
- research-backed arguments;
- opinions;
- topics with no project relationship.

A post does **not** require a project, evidence grid, external citation list, practical checklist, technical conclusion, or “lesson learned.”

Initial categories:

- `ai` → AI
- `technology` → Technology
- `data` → Data
- `career` → Career
- `projects` → Projects
- `notes` → Notes

Initial series:

- `what-the-work-taught-me` → What the Work Taught Me

Do not build category routes, filters, search or pagination in this phase.

## 3. Publication state

Add an explicit `published | draft` state.

Drafts must never leak into:

- Home;
- `/writing`;
- generated static params;
- sitemap;
- `/writing.json`;
- profile/discoverability;
- `llms.txt`;
- JSON-LD.

All current three essays are published.

## 4. Homepage composition

Current inventory: three published essays. Render all three.

Future Home maximum: six explicitly curated posts through `homeRank`.

Do not default Home to newest-first. Editorial curation and publication chronology are separate.

Responsive model:

- >= 1120px: 3 columns;
- 720–1119px: 2 columns;
- < 720px: 1 column.

No masonry. No carousel. No horizontal Writing rail. No swipe. No dots. No placeholders.

## 5. Card grammar

The card is a premium editorial / thumbnail-led unit, not a SaaS box.

Anatomy:

1. 16:9 cover;
2. compact metadata;
3. restrained Newsreader title;
4. short muted excerpt.

Outer card:

- transparent background;
- no permanent outer border;
- no heavy shadow;
- no oversized radius container;
- whole card is one link;
- no nested interactive controls.

Cover:

- `aspect-ratio: 16 / 9`;
- 12–16px radius;
- subtle 1px line if needed;
- overflow hidden;
- primary visual shape.

Title target:

- roughly 26–34px desktop;
- line-height about 1.02–1.07;
- Home visual clamp target 2–3 lines;
- full title remains in semantic DOM.

Excerpt:

- 13–14px Manrope;
- muted;
- line-height roughly 1.55–1.62;
- Home visual clamp target 2–3 lines.

Hover/focus:

- inner cover scale about 1.015–1.025;
- optional 1–2px lift;
- slightly stronger line;
- obvious keyboard focus.

Reject tilt, glow, large shadow, spring bounce, cursor-follow, autoplay and perpetual motion.

Reduced motion removes transform/zoom.

## 6. Cover system

Every published article has a cover specification.

### Forecasting — `forecast-calibration`

Use actual `projectVisuals.presaira.reliability` data:

- dark navy field;
- guide lines;
- calibration reference diagonal;
- observed calibration curve;
- tiny `FORECAST / CALIBRATION` label;
- no dashboard chrome or KPI-pill wall.

### Oil spill — `oil-sar`

Use the real public-safe Wakashio/Sentinel-1 case-study image:

- meaningful crop;
- restrained overlay;
- tiny `SAR / SEGMENTATION` label;
- no invented detection boxes or metrics.

### AI agent — `agent-provenance`

Create an original public-safe diagram from OpportunityOS public architecture:

- source/evidence;
- known vs unknown;
- traceable claim/provenance;
- authority boundary;
- graphite + restrained mint;
- no fake product UI;
- no private founder/application information.

Future covers may be original graphics, owned photography, illustrations, typographic compositions, project evidence or licensed images. General posts must not be forced to look like project dashboards.

## 7. Prepared component architecture

Do not start the Writing UI from blank files. The non-live scaffold already contains:

- `components/home-writing-section.tsx` — server-rendered Home Writing section;
- `components/writing-system-card.tsx` — shared Home/archive card;
- `components/writing-system-cover.tsx` — visual/image cover system;
- `components/writing-system-index.tsx` — archive grid/header;
- `components/writing-system-article-blocks.tsx` — legacy + typed body blocks;
- `components/writing-system-article.tsx` — conditional article renderer;
- `components/writing-system-schema.ts` — pure `BlogPosting` schema builder;
- `components/writing-system-contract.ts` — **temporary pre-integration contract only**;
- `app/writing-system.css` — isolated `.writing-system-*` visual system;
- `tests/writing-system-groundwork.spec.ts` and `tests/writing-system-schema.spec.ts` — scaffold invariants.

During activation, migrate the temporary contract into canonical `data/writing.ts`, repoint every prepared component/schema import to `data/writing.ts`, then delete `components/writing-system-contract.ts`. Do not create parallel `home-writing.tsx`, `writing-card.tsx` or `writing-cover.tsx` implementations.

Refactor `components/home-closing.tsx` so it contains only Opportunity + Footer.

Target Home order:

`SystemHero → CredibilityRail → SelectedWorkGallery → SolveThinkBridge → HomeWritingSection → HomeClosing`

Writing must no longer make `HomeClosing` a client component. `OpportunityPaths` may remain a client child.

Current repository search shows `useTimedCarousel` is used only by Home Writing. Delete `components/use-timed-carousel.ts` after a final repository search confirms zero consumers.

## 8. Data model

Generalize `WritingArticle` around:

- `status`;
- `publishedAt`;
- optional `updatedAt`;
- `category`;
- `topics[]`;
- optional `series`;
- `readingMinutes`;
- optional `homeRank`;
- `cover`;
- `origin: project | independent`;
- optional `thesis`;
- optional `evidence`;
- `sections`;
- optional `takeaways`;
- optional `takeawaysTitle`;
- optional `sources`.

Do not require `projectSlug` or duplicate `projectTitle`.

Resolve project title/case-study URL from the canonical project registry.

### Body migration rule

Do **not** mechanically rewrite all three long existing article bodies merely to adopt a new block model.

Keep current `paragraphs` / `bullets` valid while allowing future typed blocks such as paragraph, bullets, quote, image, code and callout.

This preserves current content exactly and reduces migration risk.

## 9. Public selectors

Create a published-only projection, a published-only `getWritingArticle`, and a `getHomepageWriting(limit = 6)` helper that:

1. takes only published entries;
2. keeps entries with `homeRank`;
3. sorts by `homeRank`;
4. returns at most six.

Static params, sitemap, archive, JSON and discovery surfaces use published entries only.

## 10. Current article metadata migration

Forecast article:

- status: published;
- publishedAt: 2026-09-11;
- category: data;
- topics: Forecasting, Calibration, Evaluation;
- series: what-the-work-taught-me;
- homeRank: 1;
- cover: forecast-calibration;
- origin project: Presaira.

Oil-spill article:

- status: published;
- publishedAt: 2026-09-11;
- category: data;
- topics: Computer vision, Metrics, Validation;
- series: what-the-work-taught-me;
- homeRank: 2;
- cover: oil-sar;
- origin project: Oil Spill Detection.

AI-agent article:

- status: published;
- publishedAt: 2026-09-11;
- category: ai;
- topics: AI agents, Provenance, Governance;
- series: what-the-work-taught-me;
- homeRank: 3;
- cover: agent-provenance;
- origin project: OpportunityOS.

Preserve all current slugs and factual article content.

## 11. `/writing`

The archive uses the same WritingCard component.

Archive order:

- newest `publishedAt` first;
- deterministic slug fallback for equal dates.

Keep small inventories visually honest: do not stretch one or two cards to fill a row and never render fake placeholders.

## 12. Article page

Always render:

- back to Writing;
- category/topics;
- title;
- description;
- publication date;
- reading time.

Render only when present:

- updated date;
- cover;
- thesis;
- evidence;
- takeaways;
- sources;
- related projects;
- project-origin disclosure.

Do not force “What I carry into the next system.” on unrelated writing. Use `takeawaysTitle` or a neutral default such as “Key takeaways.”

The current global project-evidence disclaimer becomes conditional to project-origin writing.

## 13. SEO / discovery

Default article schema becomes `BlogPosting`.

Use:

- canonical URL;
- headline;
- description;
- `datePublished`;
- optional `dateModified`;
- author;
- topics/keywords;
- image only when a stable crawlable image exists;
- citations only when present;
- project `about` only for relevant project-origin posts.

The archive remains a `CollectionPage` whose `hasPart` contains published `BlogPosting` entries only.

Generalize:

- `app/writing.json/route.ts`;
- `data/discoverability.ts`;
- `app/llms.txt/route.ts`.

Remove active English machine-readable `/ar/writing/*` references while the English-only localization policy is active.

## 14. Performance and progressive enhancement

The rebuild should reduce JavaScript.

Targets:

- Home Writing server rendered;
- no Writing state/effects/timers;
- no Writing scroll listener;
- no Writing `scrollTo`;
- no autoplay;
- no new dependency;
- CSS-only hover;
- below-fold raster covers lazy loaded;
- reserved cover geometry prevents layout shift;
- no canvas/WebGL.

No-JS state is the complete readable state.

## 15. Acceptance

Reject if:

- the section still reads as project lessons;
- Home H2 remains “What the work taught me”;
- Home remains a two-card carousel;
- dots remain;
- mobile still horizontally swipes Writing;
- cards look like SaaS features;
- cards become giant case-study posters;
- fake placeholders fill a 3×3;
- nine Home posts are rendered by default;
- a non-project post still requires project/evidence fields;
- every article is still `TechArticle`;
- project disclosure renders on independent writing;
- filters/search are added prematurely;
- dormant Arabic routes leak back into English machine-readable output.

## 16. Definition of done

The rebuild is complete only when:

1. Writing is a broad personal publication system;
2. current three essays appear in a 3/2/1 grid;
3. Home supports up to six curated posts;
4. Writing has no carousel code/state;
5. project linkage is optional;
6. current article URLs are unchanged;
7. an independent-post fixture proves the renderer requires no project/evidence/source/takeaway/thesis;
8. Home and archive share one card grammar;
9. article optional sections behave correctly;
10. SEO/discovery surfaces use the generalized model;
11. no active English output points at dormant Arabic routes;
12. typecheck/lint/build/static-export/browser/a11y/no-JS/reduced-motion/mobile gates pass;
13. rendered screenshot matrix is manually reviewed;
14. governing documentation records this decision so old project-only Writing does not return.

## 17. Prefabricated implementation status

This rebuild is no longer specification-only.

A non-live component/style scaffold is prepared:

- `components/writing-system-contract.ts` (temporary);
- `components/writing-system-cover.tsx`;
- `components/writing-system-card.tsx`;
- `components/writing-system-index.tsx`;
- `components/home-writing-section.tsx`;
- `components/writing-system-article-blocks.tsx`;
- `components/writing-system-article.tsx`;
- `components/writing-system-schema.ts`;
- `app/writing-system.css`;
- `tests/writing-system-groundwork.spec.ts`;
- `tests/writing-system-schema.spec.ts`;
- `docs/frontend-overhaul/WRITING_SYSTEM_PREFABRICATED_SCAFFOLD.md`;
- `docs/frontend-overhaul/WRITING_SYSTEM_DATA_MIGRATION_PATCH.md`.

The prepared files intentionally do **not** alter the live site yet.

The execution agent should use them as the starting implementation rather than rebuilding the card/cover/CSS system from scratch.

Important migration rule: `components/writing-system-contract.ts` is a temporary pre-integration type scaffold. During activation, move/reconcile that contract into the canonical `data/writing.ts`, repoint the prepared components to `data/writing.ts`, then delete the temporary contract file. Do not leave two long-term editorial models.

The remaining execution work is primarily:

1. canonical data migration;
2. component activation;
3. archive/article integration;
4. schema/discovery generalization;
5. test surgery;
6. rendered tuning;
7. documentation reconciliation;
8. merge/deploy/live verification.
