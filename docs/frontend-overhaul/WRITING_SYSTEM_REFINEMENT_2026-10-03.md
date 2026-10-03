# Writing System Refinement — 2026-10-03

**Status:** LOCKED v1.2 / supersedes the earlier Writing v1.0/v1.1 presentation details
**Scope:** Home Writing + archive card grammar + future article audio

## Decision summary

The first rendered pass established the right grid architecture but still carried too much explanatory copy and too much metadata below the thumbnail.

The refined system is denser and more personal.

### Section identity

Home H2:

> **What I’m thinking through.**

Remove the Home supporting sentence completely.

The route/nav concept remains **Writing**, but the visible section title carries more personality.

Archive:
- eyebrow: Writing
- H1: What I’m thinking through.
- no redundant lede

### CTA

All writing ↗

Move it from the header to the **bottom-right of the section**, after the card grid.

### Card hierarchy

Final order:

1. 16:9 cover
2. metadata overlaid inside the cover at the bottom
3. title — **maximum two lines**
4. concise card description — **maximum two lines**

Do not place taxonomy/read time beneath the cover.

### Cover metadata

Bottom-left:
- category + first topic
- examples: DATA · FORECASTING / DATA · COMPUTER VISION / AI · AI AGENTS

Bottom-right:
- read time
- listen time when configured
- example: 9 MIN READ · ~8 MIN LISTEN

Until an actual audio asset exists, listen time is an editorial estimate and is prefixed with ~.

Once an audio file exists, the same number is displayed without ~ and the article page exposes the real player.

Do not render a fake/disabled player for planned audio.

### Current estimated listen times

The current three article bodies are each approximately 1.1k words in the repository source.

At a restrained narration pace around 150 words/minute, each is approximately 8 minutes.

Use:
- forecast: 9 min read / ~8 min listen
- oil spill: 8 min read / ~8 min listen
- AI agent: 9 min read / ~8 min listen

Replace estimates with actual duration-derived values once audio files exist.

### Card descriptions

Keep descriptions for now because the archive is still small, but shorten them specifically for card browsing.

Forecast:
> A practical test for knowing when a probabilistic forecast deserves trust.

Oil spill:
> Why rare oil pixels make accuracy a weak headline metric.

AI agent:
> How agents should handle missing evidence without inventing certainty.

Do not shorten the canonical article description just to satisfy card layout. Use cardDescription.

### Title rule

Two lines is a hard maximum on Home and /writing.

Use CSS line clamping with the WebKit-compatible pattern in addition to standard line-clamp; do not rely on the still-incomplete unprefixed implementation alone.

Do not reduce a title’s semantic text or insert manual line breaks merely to pass the clamp.

### Description rule

Desktop/tablet:
- keep the concise cardDescription for now while the inventory is small;
- hard maximum two visual lines.

Mobile:
- hide the card description below 720px;
- the thumbnail + metadata + two-line title are the complete browse unit.

This is deliberate density, not missing content. Canonical description remains available to metadata/discovery and on the article route.

### Cover cleanup

The old top-left cover labels (FORECAST / CALIBRATION, SAR / SEGMENTATION, AI / GOVERNANCE) are removed because taxonomy now lives in the bottom metadata rail.

For the SAR image, crop/scale the source enough that the baked-in source header at the extreme top no longer competes with the editorial card.

### Overlay accessibility

Metadata is white/light text over a dedicated dark bottom gradient, not directly over arbitrary image pixels.

The final rendered overlay must maintain WCAG text contrast against every cover.

### Audio architecture

Prepared fields:
- listenMinutes: number (required for every article)
- audio?: { src; mimeType; durationSeconds }

Prepared article behavior:
- card may show estimated listen time without an audio asset using ~
- article page renders the Listen block only when audio exists
- player is native <audio controls preload="metadata">
- the full article text on the same route is the equivalent textual content
- JSON-LD adds AudioObject only when a real audio asset exists

No client-side speech synthesis is introduced.

### Mobile density

Mobile is normal one-column document flow.

Refinement targets:
- smaller section title than v1.0
- ~30px inter-card rhythm rather than 38px+
- metadata inside cover
- two-line title hard cap
- card description hidden
- CTA only after the final card

No horizontal Writing carousel returns.

## References checked

- MDN line-clamp: use the compatible -webkit-line-clamp + -webkit-box pattern alongside the standard property.
- WCAG 1.4.3 / W3C techniques: text over varying image backgrounds needs sufficient contrast; a dedicated dark overlay is used.
- WCAG 1.2.1: prerecorded audio-only content needs equivalent text unless it is explicitly an alternative for existing text; article narration is an alternative representation of the article text.
- Schema.org: BlogPosting inherits CreativeWork audio; a real narration may be represented as AudioObject.

## Acceptance test

The section must read, within a few seconds, as:

> Mohammed’s personal publication / thinking space.

Not:

> a project-evidence carousel converted into three cards.


## Final v1.2 density decision

The first mobile render was still too tall because each card carried thumbnail + metadata + title + multi-line description. v1.2 removes the description from mobile browse surfaces while retaining concise descriptions on larger viewports.

The cover itself now carries both orientation and effort:
- bottom-left answers **what is this about?**
- bottom-right answers **how long will reading/listening take?**
- the title answers **why should I open it?**

Nothing else is required in the mobile scan path.
