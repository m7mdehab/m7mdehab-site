# Localization Policy

Arabic is an intentional localized presentation of the same governed public truth, not a parallel fact store.

## Canonical languages and routes

- English remains the primary/default language at `/` and `/work/<slug>`.
- Arabic lives at `/ar` and `/ar/work/<slug>`.
- English is the `x-default` alternate.
- Every indexable English/Arabic pair must self-canonicalize and expose reciprocal `hreflang` links.
- The sitemap includes both language variants and must not add build-time `lastmod` timestamps.

## Identity and truth

- Canonical public identity remains **Mohammed Ehab ElNomany**.
- Do not invent an Arabic legal/public spelling of the name. Use a different Arabic rendering only after Mohammed explicitly supplies or approves it.
- Arabic runtime projections are subordinate to `data/source-of-truth.public.yaml`, `data/project-evidence.public.yaml` and the governed English runtime projection.
- Translating a claim never widens its publication permission, ownership wording, evidence strength or confidentiality boundary.

## Technical language

Keep product names, company names, model/API names, code identifiers and established metrics in their conventional form when Arabic translation would reduce precision. Mark English fragments with appropriate language/direction semantics where practical.

## RTL and accessibility

- Arabic document roots must use `lang="ar" dir="rtl"`.
- Arabic typography must not depend on Latin-only display fonts.
- Avoid English uppercase/letter-spacing treatments on Arabic text.
- All Arabic launch routes must remain usable at 390px, pass the same strict axe policy, preserve reduced-motion behavior and remain readable without JavaScript.
- Evidence visuals should localize explanatory captions and accessibility descriptions while preserving evidence values.

## Conversion and analytics

Do not fork provider-neutral analytics semantics by language. `data-conversion` and `data-service-id` identifiers remain stable; only visible labels and localized destinations change.

## Deployment

Staging remains `noindex` in every language. Adding Arabic does not authorize public promotion or search-engine submission of the `workers.dev` host. Production Search Console/Bing/indexing operations wait for the canonical custom domain and production live-origin gate.
