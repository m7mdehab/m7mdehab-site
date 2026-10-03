# Writing System — Test Matrix

## Data/model

- current three articles are published;
- drafts are excluded from every public projection;
- Home maximum is six;
- Home order is `homeRank`;
- current ranks are 1/2/3;
- current slugs remain unchanged.

### Independent-post contract

Use a test-only fixture with:

- `origin.kind = independent`;
- no thesis;
- no evidence;
- no takeaways;
- no sources.

It must render/normalize without project-only fields and must never enter production routes/sitemap/JSON.

## Home

At 1440/1920:

- `[data-writing-home]` visible;
- exactly three current `[data-writing-card]`;
- computed grid columns = 3;
- no Writing carousel dots;
- no `.closing-notes`;
- all hrefs point to `/writing/<slug>`;
- All writing points to `/writing`.

At 1024:

- computed grid columns = 2.

At 390:

- computed grid columns = 1;
- all three links visible;
- no horizontal overflow;
- 16:9 cover ratio within tolerance;
- section anchor clears mobile dock.

## Archive

- `/writing` self-canonical;
- no Arabic alternate;
- all and only published articles;
- shared WritingCard;
- archive context test hook;
- no project-only hero copy;
- axe clean;
- no 390px overflow.

## Articles

For each current article:

- route 200;
- self-canonical;
- OG URL matches canonical;
- JSON-LD type `BlogPosting`;
- correct author;
- correct `datePublished`;
- current evidence preserved;
- current sources preserved;
- related project link preserved;
- no Arabic alternate.

Independent fixture:

- project link absent;
- evidence section absent;
- source section absent;
- takeaways absent when omitted;
- body remains valid.

## Discovery

`/writing.json`:

- returns three current published articles;
- contains no `/ar`;
- contains category/topics;
- uses `relatedProjects[]`;
- canonical URLs correct.

`profile.json`:

- Writing count matches published set.

`llms.txt`:

- includes Writing;
- includes all three article links;
- does not claim all writing is project-derived;
- contains no `/ar`.

`sitemap.xml`:

- archive + all three articles;
- no drafts;
- no JSON;
- no `/ar`.

## Progressive enhancement

JavaScript disabled:

- Home Writing heading/cards/links visible;
- archive cards visible;
- article readable;
- evidence/source/project links work on current technical essays.

Reduced motion:

- no Writing lift/cover zoom;
- information unchanged.

## Accessibility

Run axe on:

- `/`;
- `/writing`;
- all three article routes.

Keyboard:

- each Home card reachable;
- focus obvious;
- no nested card focus target;
- All writing reachable.

## Regression

Selected Work carousel unchanged.

Opportunity mobile tabs unchanged.

Footer unchanged.

Method remains the currently accepted/active implementation.

## Render capture set

Home Writing:

- 1920×1080;
- 1440×1000;
- 1280×800;
- 1024×768;
- 430×932;
- 390×844;
- 320×568.

Routes:

- `/writing`: 1440, 390;
- forecast article: 1440, 390.

Full Home:

- 1920;
- 390.

## Build gate

Run:

- `npm ci`;
- `npm run typecheck`;
- `npm run lint`;
- `npm run build`;
- `CLOUDFLARE_STATIC_EXPORT=1 npm run build`;
- focused Playwright suites;
- full `npm run test:browser`;
- `git diff --check`.

CI is necessary, not sufficient. Rendered visual QA is a separate acceptance gate.

## Local execution record — 2026-10-03

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed on the current rebased branch.
- `CLOUDFLARE_STATIC_EXPORT=1 npm run build`: passed on the current rebased branch.
- Focused Writing, discovery, Phase G, mobile-composition, independent-fixture, and render-matrix suites: 29 passed.
- Full `npm run test:browser` on the final rebased branch: **169 passed**. Selected Work carousel tests remain in this gate and passed.
- Focused Phase I/Phase J and Writing render-matrix recheck: 7 passed before the full final-base run.
- `git diff --check`: passed before delivery.
- All 13 requested screenshot targets were manually reviewed; the dated record and output paths are in `WRITING_SYSTEM_VISUAL_QA.md`.
