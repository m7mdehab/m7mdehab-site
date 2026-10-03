> **v1.3 supersession:** Phone acceptance now uses a two-column Writing grid and one-line card titles. Heading/subtitle are each one line. See `WRITING_SYSTEM_V13_REFINEMENT_2026-10-03.md`.

# Writing System — Test Matrix

## Data/model

- current three articles are published;
- drafts are excluded from every public projection;
- Home maximum is six;
- Home order is `homeRank`;
- current ranks are 1/2/3;
- current slugs remain unchanged;
- current cardDescriptions are <= 140 characters;
- current listenMinutes are 8 and every published article requires listenMinutes;
- real audio metadata, when present, has src/mimeType/positive duration.

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
- section heading is exactly `What I’m thinking through.`;
- no Home supporting lede exists;
- metadata is inside each cover, not below it;
- every card title is clamped to <= 2 lines;
- every card description is clamped to <= 2 lines;
- All writing points to `/writing` and appears after the grid.

At 1024:

- computed grid columns = 2.

At 320/390/430:

- computed grid columns = 2;
- every .writing-system-excerpt is display:none;
- all three links visible;
- no horizontal overflow;
- 16:9 cover ratio within tolerance;
- title line-box height is <= 2 × computed line-height (+ tolerance);
- description line-box height is <= 2 × computed line-height (+ tolerance);
- metadata overlay is inside cover bounds;
- section anchor clears mobile dock.

## Archive

- `/writing` self-canonical;
- no Arabic alternate;
- all and only published articles;
- shared WritingCard;
- archive context test hook;
- eyebrow `Writing` + H1 `What I’m thinking through.`;
- no archive lede;
- no project-only hero copy;
- card metadata remains inside covers;
- card titles/descriptions remain <= 2 lines;
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
- no Arabic alternate;
- reading time remains present;
- required listen time remains present.

Independent fixture:

- project link absent;
- evidence section absent;
- source section absent;
- takeaways absent when omitted;
- body remains valid.

## Discovery

`/writing.json`:

- returns three current published articles;
- exposes cardDescription/listenMinutes when part of the public projection;
- exposes real audio metadata only when an asset actually exists;
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

Audio:

- no real audio asset => no `[data-writing-listen]` player;
- a test fixture with real audio => player renders;
- audio never autoplays;
- BlogPosting schema omits AudioObject without audio;
- BlogPosting schema includes AudioObject with real src/mime/duration.

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

## Card geometry assertions

At 1440 and 390:
- compute title line-height and bounding-box height; fail if height exceeds 2.1 lines;
- verify `.writing-system-cover-meta` is fully contained inside `.writing-system-cover-frame`;
- verify cover metadata bottom edge aligns with cover bottom within 1px;
- verify no legacy `.writing-system-meta` row is rendered;
- verify `All writing` is vertically below the bottom edge of the final card row.

At 1440:
- compute excerpt line-height and bounding-box height; fail if height exceeds 2.1 lines.

At 390:
- verify every `.writing-system-excerpt` computes to `display: none`.

## Copy regression assertions

Home must not contain:
- `Notes on AI, technology, work, projects, and whatever else I’m thinking through.`
- a top/header `All writing` CTA
- old cover labels `FORECAST / CALIBRATION`, `SAR / SEGMENTATION`, `AI / GOVERNANCE`

The taxonomy/timing values should instead be discoverable inside the cover overlay.


## v1.3 additional geometry assertions

At 320 / 390 / 430:

- Home and archive heading height <= 1.1 × computed line-height;
- Home and archive heading scrollWidth <= clientWidth + 1;
- subtitle height <= 1.1 × computed line-height;
- subtitle scrollWidth <= clientWidth + 1;
- grid columns = 2;
- each card title height <= 1.15 × computed line-height;
- card descriptions remain display:none;
- cover ratio remains ~16:9;
- cover metadata remains inside the cover;
- cover metadata scrollWidth <= clientWidth + 1;
- no horizontal document overflow.
