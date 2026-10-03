# Writing System — Render Review Rubric

> **v1.1 supersession:** the earlier first-pass acceptance record remains historical. New acceptance is governed by `WRITING_SYSTEM_REFINEMENT_2026-10-03.md`: visible heading **What I’m thinking through.**, no visible lede, metadata inside the cover bottom, two-line maximum title/description, post-grid bottom-right CTA, tighter mobile rhythm, and real-audio-only Listen UI.

Review in this order:

1. Home Writing — 1440×1000;
2. Home Writing — 390×844;
3. `/writing` — 1440×1000;
4. `/writing` — 390×844;
5. full Home — 1920×1080;
6. full Home — 320×568.

## 1440 Home Writing

Pass only if:

- `Writing.` is the first visual anchor;
- support copy is clearly secondary;
- all three covers have equal 16:9 geometry;
- three cards form one calm row;
- cards are generous but not poster-sized;
- no outer SaaS box dominates;
- covers are distinct but feel like one editorial system;
- titles are readable without being oversized;
- card bottoms are not artificially forced into rigid equal-height boxes;
- section feels lighter than Selected Work;
- All writing is obvious without becoming a primary CTA.

Immediate rejection:

- SaaS feature-grid look;
- project-case-study-card look;
- heavy shadows;
- giant titles;
- cover labels/metrics overpower article titles;
- one cover is dramatically louder;
- carousel/slider behavior returns.

## 390 Home Writing

Pass only if:

- one natural column;
- no horizontal scrolling;
- all three current posts are visible in document flow;
- cover remains wide and legible;
- title does not become a five-line wall;
- metadata is legible;
- excerpt remains secondary;
- vertical rhythm separates cards without excessive emptiness;
- Writing anchor clears the mobile dock.

Reject:

- horizontal swipe;
- dots;
- hidden inactive cards;
- miniature 3-column desktop layout;
- excessive height caused by typography.

## `/writing` desktop

Pass only if:

- archive header is compact;
- H1 is simply `Writing.`;
- lede communicates broad personal scope;
- same card grammar as Home;
- archive reads as a publication, not project directory;
- 3-column rhythm survives;
- only published posts appear;
- no premature filter/search chrome.

## `/writing` mobile

Pass only if:

- H1/lede resolve quickly;
- first cover appears without a large dead gap;
- cards are normal vertical reading units;
- no overflow;
- no filter/search UI;
- no carousel behavior.

## Cover review

Forecast:

- calibration is recognizable;
- dark navy;
- restrained line work;
- no KPI wall/dashboard chrome.

Oil:

- real case-study imagery;
- meaningful crop;
- overlay preserves evidence;
- no fabricated annotation.

Agent:

- evidence → known/unknown → claim → authority logic is recognizable;
- public-safe;
- no fake UI;
- no private OpportunityOS data.

## Hover/focus

Pass:

- hover movement is barely perceptible;
- focus is obvious;
- card remains fully understandable without hover;
- reduced motion removes lift/cover zoom.

Reject glow, tilt, bouncing or cursor effects.

## Article page

Existing technical essay:

- evidence remains strong;
- sources remain inspectable;
- project link remains visible;
- article wording is unchanged except mechanical metadata terminology.

Independent fixture/component contract:

- no blank evidence area;
- no blank sources area;
- no empty project link;
- no project disclaimer;
- neutral ending.

## Full-page rhythm

At 1920:

- Writing bridges Method and Opportunity rather than dominating both;
- current three-card section is materially more compact than the old carousel composition;
- warm Writing → dark Opportunity transition remains clean.

At mobile:

- Home remains consistent with the compact architecture;
- Writing does not recreate three giant carousel panels.

## 3-second test

Ignore excerpts and look only at heading, covers and article titles.

Pass if it reads as:

> personal writing / publication

Reject if it reads as:

> three technical project case studies

If it fails, reduce project-specific chrome rather than adding explanatory copy.

## Reviewed render record — 2026-10-03

The required render matrix was captured against the production build and inspected at all 13 targets: Home Writing (1920×1080, 1440×1000, 1280×800, 1024×768, 430×932, 390×844, 320×568), archive (1440×1000, 390×844), article (1440×1000, 390×844), and full Home (1920×1080, 390×844).

Review passed. The Home grid resolves to three columns at desktop widths, two at tablet width, and one on phones; all three curated posts appear without placeholders or horizontal Writing scroll. The forecast curve, public SAR case image, and provenance diagram remain visually distinct. Archive/article reading columns fit mobile, and the full-Home transitions retain the existing Opportunity and Footer composition. The 13 PNGs and contact sheet are preserved in the task output folder under `outputs/writing-system/screenshots/`.


## v1.1 required visual review

- Home heading is personal and materially less generic than “Writing.”.
- There is no explanatory Home lede consuming header space.
- `All writing` appears only after the grid at bottom-right.
- Category/topic is inside cover bottom-left; read/listen timing is inside cover bottom-right.
- Small overlay text remains readable on all three covers.
- No old top-left taxonomy labels remain.
- Every card title is two lines maximum at all requested widths.
- Every card description is two lines maximum and visibly secondary.
- Oil SAR baked source-header text no longer competes with the editorial layer.
- Mobile row rhythm is compact; the section scans as a feed rather than three long previews.
- Before real narration exists, ~ listen times may show but no player is visible.
- Once real narration exists, the Listen block fits cleanly on desktop/mobile and never autoplays.
