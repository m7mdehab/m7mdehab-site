# English-only public surface — 2026-09-13

## Decision

The owner has paused public Arabic localization. The live website is to remain English-only while it is used in the real world for a few months and until actual audience demand demonstrates that Arabic adds enough value to justify a second public language surface.

## Public contract

- Publish English HTML only.
- Do not expose an `AR` locale switch.
- Do not publish `/ar` or any `/ar/*` route.
- Do not emit Arabic `hreflang`, Arabic Open Graph locale alternates, Arabic sitemap URLs, or Arabic discovery links.
- Keep the canonical English content, accessibility, mobile, reduced-motion, no-JS, structured-data and deployment gates intact.
- CI, staging and production acceptance must verify representative `/ar*` URLs return `404` so retained source cannot be re-published accidentally.

## What is retained

The authored Phase K Arabic components, data projections and RTL styling remain in source control as dormant implementation assets. This preserves the option to restore localization later without rebuilding it from scratch. They are not part of the routed or indexed application while this decision is active.

## Reactivation gate

Arabic must not be re-enabled as routine maintenance. Reactivation requires an explicit owner decision after observing real usage/demand. At that point, re-run truth reconciliation, editorial review, RTL/responsive QA, accessibility, canonical/hreflang, sitemap, staging and production acceptance before publishing it again.
