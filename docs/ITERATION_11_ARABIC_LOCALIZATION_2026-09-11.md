# Iteration 11 — Arabic Localization

Date: 2026-09-11
Status: **COMPLETE — merged and accepted on permanent Cloudflare staging**

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

Validation preserves:

- zero axe violations across `/ar` and all six Arabic case studies;
- no horizontal overflow at 390px on all seven Arabic launch routes;
- core narrative and conversion paths without JavaScript;
- reduced-motion behavior;
- language-switch accessibility;
- existing English behavior unchanged.

The first consolidated rendered checkpoint exposed one real RTL defect: the mixed-direction English identity line on the Arabic homepage widened the 390px document to 411px. The defect was fixed at the source with constrained wrapping/break behavior; global overflow concealment was not used. The Arabic overflow assertion was also upgraded to report exact offending elements if the condition regresses.

## Deployment integration

The existing Application CI, Deployment Readiness, staging deploy and production deploy workflows were expanded in place. No standalone localization QA runner was added.

The permanent pre-domain staging origin remains:

`https://m7mdehab-site.m7mdehab.workers.dev`

It remains explicitly noncanonical and `noindex`.

## Final validation record

### Pull-request validation

PR #9: `Iteration 11: Arabic localization and bilingual launch contract`

Final source head: `5671f9e61000e50b08e79ff56a7cad9ac6160417`

- Deployment Readiness run `34544290314`: **PASS**.
- Application CI run `34544290334`: **PASS**.
- Consolidated browser suite: **35/35 PASS**.
- Arabic homepage, all six Arabic case studies, reciprocal canonical/hreflang, Arabic structured identity, stable service/conversion semantics, desktop axe, 390px mobile overflow, reduced motion and JavaScript-disabled progressive enhancement all passed.
- Local Lighthouse baseline on final PR runner:
  - homepage: **90 performance / 100 accessibility / 100 best practices / 100 SEO / 100 agentic browsing**;
  - Presaira: **97 / 100 / 100 / 100 / 100**;
  - Arabic homepage: **96 / 100 / 100 / 100 / 100**.
- Rendered QA artifact ID `10178527121`; SHA-256 `187dd2282a065b543a9123d4cfd91b3ca46988b31c7181f68103a065fa9726ed`.

PR #9 was squash-merged to `main` at:

`1488287d38f78e0005be68415d26cf0a3ea3c7c3`

Post-merge Application CI run `34544612077`: **PASS**.

### Permanent Cloudflare staging acceptance

Manual staging run `34546300690`: **SUCCESS**.

- Source SHA: `1488287d38f78e0005be68415d26cf0a3ea3c7c3`.
- Cloudflare Worker version: `68bd21b7-bc2e-4a9f-9352-e7bb2b5ec540`.
- Static export produced the Arabic homepage and all localized case-study assets.
- Wrangler uploaded **66 new or modified assets** and deployed the Worker successfully.
- Readiness gate observed three consecutive HTTP 200 responses.
- English homepage + six English case studies passed live route checks.
- Arabic homepage + six Arabic case studies passed live route checks.
- `/profile.json`, `/projects.json`, `/services.json`, `/llms.txt`, `/robots.txt` and `/sitemap.xml` passed live route checks.
- Staging `X-Robots-Tag: noindex`, security headers and production-canonical isolation passed.
- Deployed-origin Playwright/axe suite: **35/35 PASS**.
- Staging Lighthouse:
  - homepage: **93 performance / 100 accessibility / 100 best practices / 69 SEO / 100 agentic browsing**;
  - Presaira: **93 / 100 / 100 / 66 / 100**;
  - Arabic homepage: **99 / 100 / 100 / 69 / 100**.
- Lower staging SEO scores are expected because the `workers.dev` staging origin is deliberately `noindex`; this is a staging-protection success, not a production SEO regression.
- Staging acceptance artifact ID `10179218001`; SHA-256 `30ce16c236f4b5b1d30c09e1876cb3979784c5a80637487eedc03d283a06aea5`.

## Closure criteria

Iteration 11 is closed because:

1. typecheck, lint and normal Next production build pass;
2. static Cloudflare export includes Arabic homepage and case-study artifacts;
3. the full consolidated browser suite passes, including Arabic axe/mobile/no-JS/reduced-motion assertions;
4. reciprocal canonical/hreflang/sitemap behavior passes;
5. the post-merge staging deployment verifies the Arabic routes on the real permanent-account Cloudflare staging origin;
6. no public-truth or confidentiality boundary was widened by translation.

No domain purchase, Search Console/Bing activation, production analytics provider or canonical production deployment was performed in this iteration.