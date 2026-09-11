# Iteration 11 — Arabic Localization

Date: 2026-09-11
Status: **IMPLEMENTED — validation required before closure**

## Goal

Add an intentional Arabic version of the professional web identity after the English system had stabilized on a real Cloudflare staging origin. This is a localization and information-architecture phase, not a machine-translation overlay.

## Route architecture

English remains the primary root:

- `/`
- `/work/<slug>`

Arabic is an explicit localized route family:

- `/ar`
- `/ar/work/<slug>`

The application uses separate root layouts through Next.js route groups so the document-level semantics are correct:

- English: `<html lang="en">`
- Arabic: `<html lang="ar" dir="rtl">`

English public URLs do not change.

## Truth and publication model

`data/public-ar.ts` and `data/case-studies-ar.ts` are localized presentation projections only. They do not become independent truth sources.

Stable facts, project slugs, URLs, metrics, evidence relationships and confidentiality/publication boundaries remain subordinate to:

1. newest explicit instruction from Mohammed;
2. `data/source-of-truth.public.yaml`;
3. `data/project-evidence.public.yaml`;
4. the English governed runtime projections.

No preferred Arabic rendering of Mohammed's full legal/public name has been explicitly supplied. The localized site therefore preserves the canonical verified identity spelling **Mohammed Ehab ElNomany** rather than inventing an Arabic legal-name spelling. This can change only through explicit user instruction.

## Localized surfaces

Arabic localization covers:

- homepage proposition and biography;
- selected work descriptions and proof labels;
- capabilities and service propositions;
- experience, education and additional experience roles/descriptions;
- writing inventory labels;
- contact and conversion copy;
- all six full case-study narratives;
- project-evidence visual captions/stages/accessibility descriptions where translation improves comprehension;
- navigation and language switching;
- metadata and Open Graph descriptions;
- Arabic JSON-LD ProfilePage/Person/Offer/Service/CreativeWork projection;
- reciprocal English/Arabic alternates.

Technical product names, model names, APIs and metrics remain in their conventional notation where translating them would reduce precision.

## SEO / alternate-language contract

Every localized HTML page must:

- self-canonicalize to its Arabic production URL;
- expose reciprocal `hreflang` links for English and Arabic;
- use English as `x-default`;
- publish an Arabic Open Graph locale and matching `og:url`;
- remain represented in the canonical sitemap alongside its English equivalent.

The sitemap expands from seven to fourteen indexable HTML routes while machine-readable support routes remain excluded.

## Conversion contract

Localization must not fork analytics semantics. Existing provider-neutral values remain identical across languages:

- `capability-to-service`
- `service-to-project`
- `service-to-contact`
- `project-to-service`
- `project-service-to-contact`
- `contact-email`
- `contact-linkedin`
- `contact-github`

Arabic navigation targets Arabic project/service context, but `data-service-id` values remain stable.

## RTL / accessibility contract

Arabic uses a dedicated RTL typography layer rather than forcing the English display serif onto Arabic glyphs. English technical tokens are isolated with appropriate language/direction markup where useful.

Validation must preserve:

- zero axe violations across `/ar` and all six Arabic case studies;
- no horizontal overflow at 390px on all seven Arabic launch routes;
- core narrative and conversion paths without JavaScript;
- reduced-motion behavior;
- language-switch accessibility;
- existing English behavior unchanged.

## Deployment integration

The existing Application CI, Deployment Readiness, staging deploy and production deploy workflows are expanded in place. No standalone localization QA runner is added.

The next real Cloudflare staging deployment after merge must verify the Arabic static export and all Arabic launch routes on the same accepted `workers.dev` origin before this iteration is considered fully staged.

## Closure criteria

Iteration 11 closes only after:

1. typecheck, lint and normal Next production build pass;
2. static Cloudflare export includes Arabic homepage and case-study artifacts;
3. the full consolidated browser suite passes, including the new Arabic axe/mobile/no-JS/reduced-motion assertions;
4. reciprocal canonical/hreflang/sitemap behavior passes;
5. a post-merge staging deployment verifies the Arabic routes on the real Cloudflare origin;
6. no public-truth or confidentiality boundary is widened by translation.
