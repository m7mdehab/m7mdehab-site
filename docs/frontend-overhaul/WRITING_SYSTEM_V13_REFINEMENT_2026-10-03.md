# Writing System Refinement v1.3 — One-line Identity + Two-column Phones

**Date:** 2026-10-03
**Status:** LOCKED FOR IMPLEMENTATION / RENDERED QA
**Supersedes:** v1.2 only where this document explicitly conflicts

## 1. Why this refinement exists

The v1.2 desktop composition is accepted.

The remaining problem is phone density. A one-column feed makes each article preview too dominant and scales poorly as the archive grows.

v1.3 changes the mobile browse surface from a stacked reading feed into a compact visual index.

## 2. Section identity

Visible heading remains:

> **What I’m thinking through.**

New subtitle:

> **Ideas, experiments, and everything that piques my curiosity as I navigate my career.**

Both are **one visual line only** on desktop and phone.

The heading must not wrap. The subtitle must not wrap.

Do not reintroduce the old “Notes on AI…” sentence.

## 3. Desktop

Desktop structure remains otherwise unchanged:

- 3-column card grid;
- 16:9 covers;
- in-cover taxonomy + read/listen timing;
- up to 2-line titles;
- concise 2-line descriptions;
- All writing CTA after the grid at bottom-right.

The heading now spans one line rather than being constrained by a narrow max-width.

The subtitle sits immediately below it in muted Manrope.

## 4. Phone layout

Below 720px:

- **2 columns**, not 1;
- Writing shell uses 12px side gutters on phones to preserve card and subtitle width;
- 12px column gap;
- approximately 24px row gap;
- 16:9 covers remain;
- card descriptions remain hidden;
- card title is **one visible line only**;
- use ellipsis for visual overflow;
- full semantic title remains in the link DOM and accessible name;
- final odd card stays in normal left-column grid flow;
- do not make the final odd card span both columns.

This is deliberate future-proofing for a larger archive.

## 5. Phone card title

Phone title is a hard one-line maximum.

Do not insert manual line breaks, shorten stored titles, create a separate mobile title field, or allow 2 lines.

Use CSS overflow + text-overflow ellipsis / one-line clamp.

## 6. Phone cover metadata

The existing full desktop timing string is too wide for a roughly 140–190px mobile card.

Therefore phone metadata recomposes without losing information.

Bottom-left:
- category + first topic;
- one line;
- may ellipsize only if a future topic is unusually long.

Bottom-right:
- read time on line 1;
- listen time on line 2;
- example: `9 min read` / `~8 min listen`.

Desktop/tablet keeps both timings on one line with a dot separator.

This is the same metadata hierarchy; only the phone geometry changes.

## 7. Phone typography

At phone widths:

- Heading: approximately 25–34px responsive; one line; no horizontal overflow.
- Subtitle: approximately 7.75–11.5px responsive across the 320–719px range; one line; no horizontal overflow. The 320px endpoint is intentionally compact and must still pass rendered legibility review.
- Card title: approximately 16–19px responsive; one line.
- Metadata: approximately 6.25–7.2px; high contrast; compact letter spacing.

Do not reduce typography below readable rendered QA merely to satisfy tests.

## 8. Cover graphics on smaller cards

Because the card width is halved on phones, forecast/agent SVG insets must tighten.

Phone SVG target:
- approximately 8px side/top inset;
- reserve lower area for metadata.

Oil SAR remains the real public-safe evidence crop.

No visual may become illegible at 320px.

## 9. Archive consistency

The /writing archive uses the same card grid rules:

- 3 desktop;
- 2 tablet;
- 2 phone.

Archive identity:

- small eyebrow: Writing
- H1: What I’m thinking through.
- subtitle: Ideas, experiments, and everything that piques my curiosity as I navigate my career.

Heading and subtitle are one line.

## 10. Acceptance geometry

At 320, 390, 430:

- grid columns = 2;
- no horizontal document overflow;
- heading height <= 1.1 line-heights;
- subtitle height <= 1.1 line-heights;
- heading scrollWidth <= clientWidth + 1;
- subtitle scrollWidth <= clientWidth + 1;
- each card title height <= 1.15 line-heights;
- cover ratio remains approximately 16:9;
- metadata remains entirely inside cover bounds;
- metadata scrollWidth <= clientWidth + 1;
- descriptions compute to display:none.

At >=720:

- existing v1.2 2/3-column behavior remains;
- card titles remain <=2 lines;
- descriptions remain <=2 lines.

## 11. Visual acceptance

Desktop should look almost identical to accepted v1.2, except the heading is one line and the compact subtitle is present.

Phone should feel materially denser: two visual cards per row, no long title blocks, no descriptions, faster scanning, and a substantially shorter section.

Reject if the phone result looks like miniaturized desktop without legibility.

## 12. CTA

All writing remains after the card grid at bottom-right.

With three current articles, the third card naturally occupies the left cell of row two and the CTA below the grid provides useful visual counterweight.

Do not center or stretch the orphan card.

## 13. Scope

Do not touch Selected Work, Method, Opportunity/contact, Footer, Hero, credibility rail, article-body typography, or Writing data/audio/SEO architecture except tests/docs required by this refinement.

## 14. Current prototype branch

Prepared branch: `writing-system-v13-two-column-groundwork`

It already contains subtitle markup, one-line heading/subtitle CSS, a two-column phone grid prototype, one-line phone title behavior, mobile timing-stack markup, tightened SVG/card geometry, and updated rendered-geometry tests.

Luna/Codex should refine and validate this work, not restart it.
