# Writing System Refinement v1.1 — 2026-10-03

**Status:** LOCKED
**Scope:** Home Writing, /writing cards, article timing/audio readiness
**Supersedes:** the first rendered Writing pass where the visible heading was “Writing.”, the explanatory lede sat in the header, taxonomy/timing sat below thumbnails, and card titles could occupy three lines.

## 1. Product intent

Writing is Mohammed’s personal publishing/thinking space.

The section should read as: Mohammed’s personal publication — what he is thinking through.

It must not read as a project evidence carousel converted into cards, a technical-project-only archive, or a generic corporate blog.

## 2. Locked visible copy

Home H2: **What I’m thinking through.**

Home lede: none.

Home CTA: **All writing ↗**, after the card grid at the bottom-right.

Archive eyebrow: **Writing**

Archive H1: **What I’m thinking through.**

Archive lede: none.

Route metadata may still use a broad descriptive sentence for search/social context.

## 3. Card anatomy

Final order:
1. 16:9 cover;
2. taxonomy/timing overlay inside the bottom edge of the cover;
3. title;
4. concise card description.

The whole card remains one semantic link.

Bottom-left overlay: category + first topic, e.g. DATA · FORECASTING.
Bottom-right overlay: read time + listen time, e.g. 9 MIN READ · ~8 MIN LISTEN.

A dedicated dark bottom gradient sits behind this metadata. Do not rely on image pixels or text-shadow alone for contrast.

## 4. Hard density rules

Title: maximum **two visible lines under every viewport condition**.

Implementation uses the WebKit-compatible two-line clamp plus standard line-clamp, overflow hidden, and a two-line max-height fallback. The full semantic title remains in the DOM. Do not rewrite or hard-break strong titles merely for the card.

Card description: keep for now while the archive is small. Use optional `cardDescription`, not a weakened canonical `description`. Maximum two visible lines.

Current concise values:
- Forecast: A practical test for knowing when a probabilistic forecast deserves trust.
- Oil: Why rare oil pixels make accuracy a weak headline metric.
- AI agent: How agents should handle missing evidence without inventing certainty.

## 5. Cover cleanup

The permanent top-left labels FORECAST / CALIBRATION, SAR / SEGMENTATION, and AI / GOVERNANCE are removed. Taxonomy has one consistent home in the shared bottom metadata overlay.

For Oil Spill, preserve the real public SAR evidence and crop/scale the source enough that the baked-in source header at the extreme top no longer competes. Do not fabricate a replacement image, boxes, or metrics.

## 6. Mobile refinement

Mobile remains one normal document-flow column.

Targets:
- smaller, less dominant section heading than first pass;
- no explanatory lede;
- metadata inside cover, eliminating one text row;
- title max two lines;
- description max two lines;
- inter-card gap about 32px;
- All writing only after the final card;
- no carousel, swipe rail, inactive cards or dots.

## 7. Read and listen time

Current articles:
- Forecast: 9 min read / ~8 min listen
- Oil spill: 8 min read / ~8 min listen
- AI agent: 9 min read / ~8 min listen

The current essay bodies are each roughly 1.1k words. At a restrained narration pace around 145–160 spoken words/minute, ~8 minutes is a reasonable initial estimate.

Optional data fields:
- cardDescription?: string
- listenMinutes?: number
- audio?: { src, mimeType, durationSeconds }

Display rule:
- listenMinutes + no audio: show ~ estimate, no player;
- real audio: remove ~, render Listen control, emit AudioObject.

Do not create a fake source to make the UI look complete.

## 8. Article Listen component

Only render when a real audio asset exists.

Use native audio controls with preload=metadata. No autoplay. Keep the full article text on the same page and label narration as an audio version of that article. Do not use browser speech synthesis as the production narration system.

## 9. Structured-data rule

Article remains BlogPosting. AudioObject is emitted only when a genuine audio asset exists. No real audio means no AudioObject and no fake URL. Canonical SEO description remains article.description, not cardDescription.

## 10. Prepared v1.1 implementation

Branch: `writing-system-v11-refinement`

Already prepared:
- canonical cardDescription/listenMinutes/audio fields;
- concise descriptions and ~8-minute estimates for the three current articles;
- timing/card-description helpers;
- thumbnail-bottom metadata overlay;
- personal Home heading and bottom CTA;
- cover-label removal and tighter Oil crop;
- archive personal H1;
- optional native Listen component;
- optional AudioObject projection;
- writing.json/discovery fields;
- hard card clamps and responsive CSS;
- render-matrix geometry assertions;
- independent-post/audio contract tests;
- v1.1 design spec and blueprint.

## 11. Research/standards basis

- Cross-browser clamping keeps the established WebKit-compatible pattern in addition to standard line-clamp.
- Small text over imagery gets a dedicated dark overlay for reliable contrast.
- Prerecorded narration is an alternative representation of the complete text already on the page.
- Schema AudioObject appears only for a real audio asset.

## 12. Rejection conditions

Reject if:
- Home reverts to “Writing.”;
- the explanatory Home lede returns;
- All writing returns to the header;
- taxonomy/timing returns below the cover;
- permanent top cover labels return;
- any card title exceeds two visible lines;
- card descriptions become long blocks;
- mobile returns to the tall first-pass rhythm;
- SAR source-header text visibly competes;
- an audio control appears without a real audio asset;
- a fake AudioObject is emitted;
- cards become boxed SaaS UI;
- Writing becomes project-only again.
