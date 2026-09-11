# Iteration 12 — Content Authority and Evidence-Backed Writing

Date: 2026-09-11
Status: **COMPLETE**

## Objective

Turn the governed project evidence already present in the site into substantive first-hand technical authority without creating a generic SEO blog, fabricating publication history, widening confidentiality boundaries or treating thin content as expertise.

The governing authority chain is:

`Mohammed Ehab ElNomany → inspectable project evidence → first-hand technical reasoning → relevant capability → opportunity`

## Delivered

Iteration 12 ships a real bilingual writing system rather than a title inventory:

- three substantive English technical essays anchored to Presaira, Oil Spill Detection and OpportunityOS;
- three intentional Arabic counterparts, not machine-translated placeholders;
- English `/writing` and Arabic `/ar/writing` hubs;
- six static article routes across the two language families;
- homepage writing previews and primary-navigation access;
- article → case-study proof pathways and inspectable public source links;
- `TechArticle` structured data on articles and `CollectionPage` semantics on writing hubs;
- reciprocal English/Arabic canonicals and hreflang;
- `/writing.json` as a governed machine-readable editorial projection;
- expanded `/llms.txt` and profile discoverability surfaces;
- a canonical sitemap expanded to 22 indexable HTML URLs;
- staging/production export and route gates extended to cover the writing system;
- Iteration 12 Playwright coverage for canonical/hreflang integrity, schema/provenance, homepage promotion, axe, 390px layout and no-JavaScript readability.

The editorial standard and authority boundaries are documented in `docs/CONTENT_AUTHORITY_STRATEGY_2026-09-11.md`.

## Publication boundaries preserved

The iteration does not expose Network International customer, bank, platform, schema, mapping, cutover or reconciliation detail. OpportunityOS remains bounded to the allowlisted public architecture/product framing. Ghareeb Oglu and Makhbazy internal materials remain non-public by default. No Power BI artifact, commercial outcome, adoption metric, client metric, traffic metric or backlink claim was fabricated.

The permanent `workers.dev` origin remains staging-only and deliberately `noindex`. This iteration does **not** claim that `m7mdehab.com` is deployed, indexed or publicly launched.

## Pull-request validation

PR #10: **Iteration 12: content authority and evidence-backed writing**.

The first hosted checkpoint, Application CI run `34572417626`, found one selector ambiguity in the new writing navigation test: `getByRole("link", { name: "Writing" })` also matched the homepage `All writing` CTA. Product behavior was correct and the other 40/41 browser tests passed. The selector was narrowed to an exact accessible-name match in commit `fb833a143b259c87ac9077f39ae3d215d52d9d2e`.

Final verified PR head:

- Deployment Readiness `34572845580`: **PASS**;
- Application CI `34572845590`: **PASS**;
- consolidated browser/axe suite: **41/41 PASS**;
- PR Lighthouse lab: English homepage **92 / 100 / 100 / 100 / 100**; Presaira **96 / 100 / 100 / 100 / 100**; Arabic homepage **96 / 100 / 100 / 100 / 100**;
- rendered QA artifact `10188531145`;
- rendered QA artifact SHA-256 `89a4df50395d75d129800eae35295d0ff18de0fdbda6c38d10863bf547d0389e`.

PR #10 was squash-merged to `main` at `7339fb72aa1c4f835c738f55732f109b8bf1db00` with title **Complete Iteration 12 content authority and evidence-backed writing**.

Post-merge Application CI `34573257308`: **PASS**.

## Permanent Cloudflare staging acceptance

Manual staging workflow run `34574845145` completed with **SUCCESS** against exact source SHA `7339fb72aa1c4f835c738f55732f109b8bf1db00`.

Cloudflare deployment evidence:

- staging origin: `https://m7mdehab-site.m7mdehab.workers.dev`;
- Worker version: `80cf992a-f282-421b-ad53-855a6eeeaf0a`;
- the Worker read 201 static assets and uploaded 101 new or modified assets;
- readiness reached three consecutive HTTP 200 responses;
- all 22 canonical HTML surfaces and all seven support resources used by the acceptance gate passed live HTTP checks;
- support resources included `/profile.json`, `/projects.json`, `/services.json`, `/writing.json`, `/llms.txt`, `/robots.txt` and `/sitemap.xml`;
- live staging `X-Robots-Tag: noindex` passed;
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin` passed;
- homepage canonical remained `https://m7mdehab.com` and the staging Worker URL did not become canonical;
- deployed-origin Playwright/browser/axe suite: **41/41 PASS**.

Staging Lighthouse lab:

- English homepage: **86 performance / 100 accessibility / 100 best practices / 69 SEO / 100 agentic browsing**, benchmarkIndex 1786.5;
- Presaira: **93 / 100 / 100 / 66 / 100**, benchmarkIndex 2214.5;
- Arabic homepage: **97 / 100 / 100 / 69 / 100**, benchmarkIndex 2281.5.

The lower staging SEO scores are expected because the staging origin is intentionally `noindex`; they are not interpreted as a production SEO regression.

Staging acceptance artifact:

- artifact ID `10189310025`;
- name `cloudflare-staging-acceptance-7339fb72aa1c4f835c738f55732f109b8bf1db00`;
- SHA-256 `7fee7ab4ee2c492721133ffaed42ac39daf23be6e4c66b34b7ee3f6e2357ecc6`.

## CI-efficiency observation

The initial failed PR checkpoint demonstrated that the non-gating Lighthouse baseline still executes after a required Playwright failure because it currently uses `always()`. That cost is recorded as measured maintenance evidence, but no extra workflow-only checkpoint was spent during Iteration 12 to optimize it. Future workflow maintenance may gate Lighthouse behind required rendered-QA success while preserving artifact capture on failure.

## Acceptance conclusion

Iteration 12 is complete. The repository, bilingual writing authority system and permanent Cloudflare staging deployment are all accepted. The next intentional external boundary is canonical production activation: acquire/activate `m7mdehab.com`, bind the production Cloudflare route, verify DNS/TLS/redirect/security/crawlability and only then proceed to Search Console, Bing, authorized analytics and public authority distribution.
