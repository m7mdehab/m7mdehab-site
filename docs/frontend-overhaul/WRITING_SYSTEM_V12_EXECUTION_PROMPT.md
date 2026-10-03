# Luna / Codex Final Execution Prompt — Writing System v1.2

Implement and ship the Writing System rebuild for `m7mdehab/m7mdehab-site`.

This is an execution task. Product definition, editorial scope, design direction, responsive behavior, data architecture, audio architecture, SEO/discovery behavior and acceptance criteria are already decided.

Do not redesign the section or reopen decisions that are locked below.

## 1. Start state

Use the existing `writing-system-groundwork` work as the implementation foundation. It contains prepared non-live components, CSS, tests, blueprint and governing docs.

Before editing:
1. `git fetch --all --prune`;
2. inspect current `main` and open PRs;
3. reconcile/rebase the groundwork onto the latest accepted `main` if concurrent Method/Selected Work work has landed;
4. preserve unrelated accepted changes;
5. do not use stale draft PR #25 as the Writing implementation;
6. read the local Next.js 16 docs required by `AGENTS.md` before metadata-route edits.

## 2. Read these authorities in order

1. `AGENTS.md`
2. `docs/LOCALIZATION_POLICY.md`
3. `docs/frontend-overhaul/WRITING_SYSTEM_REFINEMENT_2026-10-03.md`
4. `docs/frontend-overhaul/WRITING_SYSTEM_EXECUTION_PACKET.md`
5. `design/writing-system/writing-system.spec.json`
6. `design/writing-system/WRITING_SYSTEM_BLUEPRINT.html`
7. `docs/frontend-overhaul/WRITING_SYSTEM_DATA_MIGRATION_PATCH.md`
8. `docs/frontend-overhaul/WRITING_SYSTEM_INTEGRATION_PATCH.md`
9. `docs/frontend-overhaul/WRITING_SYSTEM_ROUTE_ACTIVATION_PATCH.md`
10. `docs/frontend-overhaul/WRITING_SYSTEM_VISUAL_QA.md`
11. `docs/frontend-overhaul/WRITING_SYSTEM_TEST_MATRIX.md`
12. `docs/frontend-overhaul/WRITING_SYSTEM_SEO_AI_CONTRACT.md`
13. `docs/frontend-overhaul/WRITING_SYSTEM_AUTHORING_GUIDE.md`
14. `docs/frontend-overhaul/WRITING_SYSTEM_PREFABRICATED_SCAFFOLD.md`

Newest explicit v1.2 refinement decisions override earlier v1.0/v1.1 presentation details.

## 3. Locked visible result

### Home

- section id stays `writing`;
- H2: **What I’m thinking through.**;
- no supporting Home lede/subtitle;
- grid: 3 desktop / 2 tablet / 1 mobile;
- current three published posts all render;
- future Home maximum remains six curated by `homeRank`;
- `All writing ↗` appears **after the grid, aligned bottom-right**;
- no carousel, autoplay, horizontal swipe, dots or placeholders.

### Archive

- route remains `/writing`;
- eyebrow: `Writing`;
- H1: **What I’m thinking through.**;
- no redundant archive lede;
- same shared card grammar as Home;
- all and only published posts;
- no filter/search/category UI yet.

## 4. Locked card anatomy

Each card is one semantic Link.

Order:
1. 16:9 cover;
2. metadata overlaid **inside the bottom edge of the cover**;
3. title;
4. concise card description.

Bottom-left overlay:
- primary category + first topic;
- examples: `DATA · FORECASTING`, `DATA · COMPUTER VISION`, `AI · AI AGENTS`.

Bottom-right overlay:
- reading time;
- listen time when configured;
- current examples: `9 MIN READ · ~8 MIN LISTEN`.

The overlay uses a dedicated dark bottom gradient so the small text remains readable over every cover. Do not position small light text directly on uncontrolled image pixels.

### Hard text limits

- title: **maximum two visible lines, no exceptions**;
- card description: maximum two visible lines on desktop/tablet and hidden below 720px;
- preserve the full semantic title/description in the DOM;
- use standard `line-clamp: 2` plus the WebKit compatibility pattern;
- do not manually insert title line breaks just to satisfy layout.

Keep concise card descriptions on desktop/tablet only. Hide `.writing-system-excerpt` below 720px. Use the dedicated `cardDescription`; do not weaken canonical metadata `description`.

## 5. Current concise card copy

Forecast:
`A practical test for knowing when a probabilistic forecast deserves trust.`

Oil spill:
`Why rare oil pixels make accuracy a weak headline metric.`

AI agent:
`How agents should handle missing evidence without inventing certainty.`

## 6. Cover cleanup

Use the prepared `writing-system-cover.tsx` rather than inventing new art.

Forecast:
- real Presaira reliability data;
- no top taxonomy label.

Oil:
- real public SAR case-study image;
- crop/scale the source so the baked-in technical header at the extreme top does not compete;
- no top taxonomy label;
- do not fabricate annotations.

AI agent:
- public-safe provenance/authority diagram;
- no top taxonomy label;
- no fake product UI/private data.

Taxonomy belongs in the shared bottom metadata overlay, not duplicated inside the visual.

## 7. Canonical data migration

Move the prepared temporary contract into `data/writing.ts` and delete `components/writing-system-contract.ts` after every prepared component imports canonical types/helpers.

Canonical article model includes:
- status (`draft | published`);
- slug/title/description;
- optional `cardDescription`;
- category/topics;
- optional series;
- publishedAt / optional updatedAt;
- readingMinutes;
- required listenMinutes;
- optional real `audio: { src, mimeType, durationSeconds }`;
- optional homeRank;
- cover;
- origin (`project | independent`);
- optional thesis/evidence/takeaways/takeawaysTitle/sources;
- sections with legacy paragraphs/bullets + future typed blocks.

Drafts must not leak into routes, static params, Home, archive, sitemap, JSON, llms or schema.

Resolve project titles/URLs from canonical project data; do not keep duplicate mandatory `projectTitle` fields.

## 8. Current three migration

Preserve all slugs and article body claims.

Forecast:
- category data;
- topics Forecasting / Calibration / Evaluation;
- cardDescription from section 5;
- readingMinutes 9;
- listenMinutes 8;
- no audio object yet unless a real narration file has been supplied;
- series what-the-work-taught-me;
- homeRank 1;
- cover forecast-calibration;
- project origin Presaira.

Oil:
- category data;
- topics Computer vision / Metrics / Validation;
- cardDescription from section 5;
- readingMinutes 8;
- listenMinutes 8;
- no audio object yet unless real file exists;
- series what-the-work-taught-me;
- homeRank 2;
- cover oil-sar;
- project origin Oil Spill Detection.

AI agent:
- category ai;
- topics AI agents / Provenance / Governance;
- cardDescription from section 5;
- readingMinutes 9;
- listenMinutes 8;
- no audio object yet unless real file exists;
- series what-the-work-taught-me;
- homeRank 3;
- cover agent-provenance;
- project origin OpportunityOS.

The ~8 minute listen estimates are justified by the current ~1.1k-word article bodies at a restrained narration pace. They are estimates until actual audio duration exists.

## 9. Audio-ready behavior

The audio architecture is prepared now. Do not fake audio availability.

Card:
- `listenMinutes` without real `audio` => render `~8 min listen`;
- real `audio` => render exact `8 min listen` without tilde.

Article:
- no real audio => no player;
- real audio => render prepared `WritingSystemListen` near the top, before the cover;
- native `<audio controls preload="metadata">`;
- no autoplay;
- article text remains fully available on the same page.

Schema:
- no real audio => omit AudioObject completely;
- real audio => include AudioObject with canonical contentUrl, MIME type and ISO duration.

Do not use browser speech synthesis as a substitute for authored narration.

## 10. Prepared implementation files

Do not start from blank components.

Use and integrate:
- `components/home-writing-section.tsx`;
- `components/writing-system-card.tsx`;
- `components/writing-system-cover.tsx`;
- `components/writing-system-index.tsx`;
- `components/writing-system-article-blocks.tsx`;
- `components/writing-system-article.tsx`;
- `components/writing-system-listen.tsx`;
- `components/writing-system-schema.ts`;
- `components/writing-system-contract.ts` (temporary; migrate then delete);
- `app/writing-system.css`;
- scaffold tests.

Do not create parallel alternate components with different names unless a concrete integration defect requires a controlled rename. Leave one final implementation.

## 11. Home extraction

Target composition:
`SystemHero → CredibilityRail → SelectedWorkGallery → SolveThinkBridge → HomeWritingSection → HomeClosing`

Refactor `HomeClosing` to Opportunity + Footer only.

Remove Writing-specific:
- parent client directive if unnecessary;
- writing article prop;
- useEffect/useRef carousel code;
- `useTimedCarousel`;
- old Writing visual functions;
- old Writing markup/dots.

If `rg "useTimedCarousel|CAROUSEL_INTERVAL"` is zero after extraction, delete `components/use-timed-carousel.ts`.

Do not modify Selected Work’s independent carousel system.

## 12. Route activation

### `/writing`
- use prepared WritingSystemIndex;
- published-only projection;
- route metadata title can remain `Writing` for document/search clarity;
- visible H1 is the locked personal heading;
- CollectionPage hasPart = published BlogPosting nodes.

### `/writing/[slug]`
- published-only static params;
- notFound unknown/draft;
- use WritingSystemArticleView;
- related projects only when project origin;
- optional sections render conditionally;
- BlogPosting JSON-LD;
- real audio optionally adds AudioObject.

## 13. Discovery surfaces

Generalize all of these from project-only assumptions:
- `/writing.json`;
- `data/discoverability.ts`;
- `/llms.txt`;
- sitemap;
- profile writing projection.

Add where appropriate:
- category/topics;
- cardDescription if useful in the public JSON projection;
- publishedAt/updatedAt;
- readingMinutes/listenMinutes;
- optional real audio metadata;
- relatedProjects array.

Remove:
- mandatory singular project;
- `derivedFromProject` universal assumption;
- stale active `/ar/writing/*` references under current English-only policy;
- universal TechArticle semantics.

Do not delete dormant Arabic source files.

## 14. SEO/schema

Default article type: `BlogPosting`.

Canonical metadata uses the canonical article `description`, not cardDescription.

Per article:
- canonical URL;
- headline;
- description;
- datePublished;
- optional dateModified;
- author;
- topics/keywords;
- stable image only when real;
- citations only when present;
- related-project about only when applicable;
- AudioObject only when real audio exists.

## 15. Required test surgery

Search all repository tests for:
`closing-note|closing-notes|Go to article|Read the field note|What the work taught me|writing carousel|two evidence|Writing\.`

Update all stale Writing expectations.

Mandatory assertions:
- Home heading exact;
- Home lede absent;
- current Home card count = 3;
- max Home count contract = 6;
- CTA below final grid row;
- desktop/tablet/mobile column counts 3/2/1;
- metadata overlay fully contained inside cover;
- no legacy metadata row below cover;
- title rendered height <= ~2.1 computed lines;
- desktop/tablet excerpt rendered height <= ~2.1 computed lines;
- 390px excerpt computes to `display: none`;
- no old cover taxonomy labels;
- no Writing dots/carousel/autoplay;
- 390px no overflow;
- reduced motion removes card transforms;
- axe clean;
- no-JS cards/links remain visible;
- independent fixture renders without project/evidence/source/takeaways/thesis;
- no real audio fixture => no player/AudioObject;
- real audio fixture => player + AudioObject;
- current article URLs unchanged;
- archive/discovery/sitemap contain only published entries.

Keep Selected Work and Opportunity tests intact.

## 16. Validation

Run in order:
`npm ci`
`npm run typecheck`
`npm run lint`
`npm run build`
`CLOUDFLARE_STATIC_EXPORT=1 npm run build`

Focused browser suites for Writing/discoverability/Phase G/mobile, then:
`npm run test:browser`
`git diff --check`

Do not weaken failing predicates to get green.

## 17. Rendered QA matrix

Home Writing:
- 1920×1080
- 1440×1000
- 1280×800
- 1024×768
- 430×932
- 390×844
- 320×568

Archive:
- 1440×1000
- 390×844

Article:
- 1440×1000
- 390×844

Full Home:
- 1920×1080
- 390×844

Inspect manually against WRITING_SYSTEM_VISUAL_QA.md.

Primary mobile question: does the section now scan as a compact article feed instead of three long article previews?

Primary desktop question: does it remain elegant while becoming denser and more editorial?

## 18. Rejection conditions

Reject the implementation if any of these are true:
- Home still says only `Writing.`;
- explanatory Home lede remains;
- All writing is still in the header;
- metadata remains below the cover;
- old top cover labels remain;
- any card title exceeds two lines;
- card descriptions are long blocks;
- mobile vertical gaps remain unnecessarily large;
- card descriptions remain visible on mobile;
- the SAR source header visibly competes;
- a fake/disabled listen player is shown;
- cards become boxed SaaS panels;
- project relationship remains mandatory;
- every post remains TechArticle;
- Arabic Writing routes are accidentally republished;
- implementation passes DOM tests but fails visual review.

## 19. Documentation

After implementation, update governing historical/status docs so this v1.2 decision supersedes the v1.0 rendered pass. Do not rewrite historical records as if they never existed; add clear supersession notes.

## 20. Delivery

Follow `AGENTS.md` delivery workflow end-to-end.

Do not stop at local implementation or “ready for review” if validation is green.

Required:
1. coherent commits;
2. push branch;
3. update/create PR;
4. wait for required checks;
5. merge accepted result into main;
6. production workflow runs;
7. verify live `/`, `/writing`, all three article routes and `/writing.json`;
8. verify the live screenshots/behavior match accepted v1.2.

Final report must include:
- branch;
- files changed;
- architecture/data changes;
- audio readiness status;
- exact tests/results;
- screenshots reviewed;
- feature commit SHA(s);
- PR;
- merge/main SHA;
- production workflow result;
- live verification;
- genuine blockers only.

Do not return with alternative design proposals. Execute the locked system, tune only objective geometry/contrast/responsive defects, validate, and ship.
