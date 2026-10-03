# Writing System — Card / Header / Audio Refinement Packet

**Date:** 2026-10-03  
**Status:** LOCKED REFINEMENT — supersedes the earlier card/header details where they conflict  
**Scope:** Home Writing section, /writing archive cards, article timing/audio affordance

## 1. Locked section identity

The public section title is now:

**What I’m thinking through.**

Reason:
- more personal than “Writing”;
- broad enough for AI, technology, career, projects, opinions and unrelated interests;
- still professional, minimal and editorial;
- does not imply that every article is a project lesson;
- does not require explanatory supporting copy.

The short explanatory sentence under/next to the old Writing heading is removed from Home.

The /writing archive may keep a small eyebrow “Writing” for navigational clarity, but its visible H1 is **What I’m thinking through.**

“What the Work Taught Me” remains only an optional series.

## 2. Home header composition

Home header contains only the H2.

Do not render:
- “Notes on AI, technology, work, projects, and whatever else I’m thinking through.”
- the All writing CTA in the header.

The All writing CTA moves to the **bottom-right of the section, after the card grid**.

This keeps the opening editorial and the exit action where the user naturally reaches it.

## 3. Card anatomy — locked

The order is:

1. 16:9 cover;
2. metadata overlay inside the bottom edge of the cover;
3. title — **maximum 2 visible lines under every viewport**;
4. optional concise description.

### Metadata overlay

Bottom-left:
- primary category + first topic
- examples:
  - DATA · FORECASTING
  - DATA · COMPUTER VISION
  - AI · AI AGENTS

Bottom-right:
- read time;
- listen time.

Until a real narration asset exists:
- show listen time as estimated with a leading ~;
- example: **9 min read · ~8 min listen**.

Once a real audio asset exists:
- remove ~;
- derive/verify duration from the asset;
- example: **9 min read · 8 min listen**.

Do not keep category/timing as a separate row beneath the cover.

Do not duplicate old top-left cover labels such as:
- FORECAST / CALIBRATION
- SAR / SEGMENTATION
- AI / GOVERNANCE

The new bottom overlay is the sole card metadata layer.

## 4. Title rule — hard acceptance requirement

Card titles may occupy **no more than two visible lines**.

This is not a soft target.

Implementation:
- CSS clamp to 2 lines;
- full title remains in semantic DOM/link;
- do not shorten article titles only to satisfy visual layout;
- test computed line height vs rendered height at every acceptance viewport.

The full article page H1 is not clamped.

## 5. Description rule

For now, keep descriptions on desktop/tablet because the archive is still sparse.

Use a separate optional `cardDescription` when the canonical article description is too long.

Card description:
- max 2 visible lines;
- target <= 140 characters;
- concise browse support only;
- not a replacement for metadata/SEO description.

Mobile:
- hide card descriptions for density;
- thumbnail + metadata + title are sufficient.

When the archive becomes denser, descriptions may be removed from card surfaces without changing article data.

## 6. Mobile density

The mobile version should behave like a fast browse feed.

Targets:
- one column;
- no horizontal rail;
- tighter header;
- tighter card-to-card rhythm;
- no descriptions;
- title 2 lines maximum;
- metadata stays within the cover;
- CTA after final card;
- no dots / carousel / hidden cards.

The section must not feel like three mini article pages stacked vertically.

## 7. Oil-spill cover cleanup

The SAR source image contains baked-in text near its top edge.

Adjust crop/scale/object-position so this source strip is minimized or removed from the visible cover where possible without fabricating or altering the underlying evidence.

Do not place a second taxonomy label over it.

The goal is to make the cover feel like an intentional editorial crop while preserving the real evidence image.

## 8. Audio / listen architecture

Every published article carries:
- `readingMinutes`;
- `listenMinutes`.

Audio asset is optional until narration exists.

Optional real audio shape:

```ts
audio: {
  src: "/media/writing/<slug>.mp3",
  mimeType: "audio/mpeg",
  durationSeconds: 463,
}
```

Rules:
- no fake audio file;
- no disabled player placeholder;
- no player if `audio` is absent;
- listen time may still be shown as an estimate;
- once `audio` exists, listen time becomes exact/no-tilde.

## 9. Article listen control

When real audio exists, render a Listen block near the top of the article, after title/deck/date metadata and before the main cover/body.

Current scaffold:
- `components/writing-system-listen.tsx`.

Use native HTML audio controls for this phase:
- keyboard accessible;
- browser-supported;
- no custom JS audio state;
- no dependency.

The article text remains fully readable; audio is an additional modality, never a replacement.

## 10. Current listen estimates

A repository-source prose count placed each current article at roughly 1.1k words.

Using a conservative spoken pace around 145–160 words/minute:
- forecast essay: ~8 min listen;
- oil-spill essay: ~8 min listen;
- AI-agent essay: ~8 min listen.

These are estimates only until narration exists.

## 11. Current short card descriptions

Forecast:
**A practical test for knowing when a probabilistic forecast deserves trust.**

Oil spill:
**Why rare oil pixels make accuracy a weak headline metric.**

AI agent:
**How agents should handle missing evidence without inventing certainty.**

## 12. Acceptance

Reject if any of the following remain:
- Home heading is just “Writing.”
- old explanatory lede is still visible on Home;
- All writing CTA is still top-right;
- category/read timing sits beneath the cover;
- old top-left technical label remains in addition to bottom metadata;
- any card title renders 3+ lines;
- mobile descriptions are still visible;
- mobile section remains excessively tall;
- listen time is omitted;
- a fake audio player appears without a real audio asset.
