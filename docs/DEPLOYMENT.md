# Deployment

Updated: 2026-09-11

## Production target

The production target is **Cloudflare Workers Static Assets** on the canonical host:

`https://m7mdehab.com`

The application source remains a normal Next.js application. Cloudflare deployment uses an explicit static-export lane rather than making the repository's local/runtime architecture depend on a Cloudflare-specific framework adapter.

Why this path is selected for the current site:

- all launch routes are statically prerenderable;
- the static export has been built and packaged successfully in CI;
- it has fewer moving parts than adopting a beta Next.js compatibility layer for a site that currently needs no server runtime;
- the source remains portable and can move back to a server deployment later without rewriting the content system;
- Cloudflare's current vinext compatibility probe can remain a future migration signal if server-side features become justified.

## Language routes

English remains the primary/default language:

- `/`
- `/work/<slug>`

Arabic is published as a separate RTL route family:

- `/ar`
- `/ar/work/<slug>`

The production gate treats both language variants as first-class indexable HTML. Reciprocal `hreflang`/canonical behavior is part of acceptance; English remains `x-default`.

## Build modes

### Normal Next.js development / validation

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run start
```

This remains the canonical development and production-behavior validation path.

### Cloudflare static export

```bash
CLOUDFLARE_STATIC_EXPORT=1 npm run build
```

`next.config.ts` enables `output: "export"` only for this explicit mode. The export is written to `out/`.

The deployment-readiness workflow verifies that the export contains the English and Arabic homepage/case-study surfaces, machine-readable resources, robots, sitemap and Cloudflare `_headers` policy before Wrangler packaging is accepted.

## Cloudflare configuration

### Staging / preview config

`wrangler.static.jsonc`

Purpose:

- CI dry-run packaging;
- permanent-account pre-domain staging at `https://m7mdehab-site.m7mdehab.workers.dev`;
- temporary preview infrastructure.

The configuration intentionally leaves `workers_dev` and preview URLs available. `public/_headers` applies `X-Robots-Tag: noindex` to matching `workers.dev` hosts so staging validation endpoints are not intended to become search-result duplicates.

The accepted English staging baseline and deployment behavior are documented in `docs/ITERATION_10_CLOUDFLARE_STAGING_ACCEPTANCE_2026-09-11.md` and `docs/STAGING_DEPLOYMENT.md`.

### Production config

`wrangler.production.jsonc`

Purpose:

- production deployment to `m7mdehab.com`;
- `workers_dev: false`;
- preview URLs disabled;
- apex host configured as a Cloudflare Worker Custom Domain;
- exported `out/` directory served as static assets;
- HTML routing uses `drop-trailing-slash`, matching the site's canonical URL policy.

Cloudflare Custom Domains require the domain to be an active zone in the target Cloudflare account. Once the Worker Custom Domain is created, Cloudflare manages the Worker-origin DNS record and certificate for that host.

## Production deployment workflow

Workflow:

`.github/workflows/deploy-cloudflare-production.yml`

It is intentionally **manual** (`workflow_dispatch`) and runs in the GitHub `production` environment. It does not deploy on every push to `main`.

Required GitHub environment/repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The token should use the minimum permissions required to deploy the Worker and attach the configured Custom Domain. Do not use a global API key when a scoped API token is sufficient.

Before the deployment step the workflow performs:

1. checkout of `main`;
2. deterministic `npm ci`;
3. TypeScript validation;
4. ESLint;
5. Cloudflare static export;
6. required English/Arabic artifact assertions;
7. Wrangler production deployment.

A successful GitHub build is not evidence that the custom domain is live. The deployed origin must still pass the post-deployment checks below.

## Canonical hostname policy

Canonical public host:

`m7mdehab.com`

The `www` hostname must not serve a second independently indexable copy.

Target behavior:

`https://www.m7mdehab.com/<path>?<query>`

→ **301**

`https://m7mdehab.com/<path>?<query>`

Use a Cloudflare Redirect/Bulk Redirect rule for the `www` → apex redirect with path suffix and query string preservation. Domain-level canonical-host redirecting is an edge/DNS concern; do not fake it with an application-relative `_redirects` rule.

The `www` hostname needs an appropriate proxied DNS record for the redirect rule to receive traffic. Verify the redirect with `curl --head` after DNS propagation.

## HTTPS and transport security

The production host must be HTTPS-only.

Verify before launch:

- valid certificate for `m7mdehab.com`;
- HTTP → HTTPS redirect;
- `www` → apex 301 behavior;
- no mixed-content requests;
- no certificate errors on English or Arabic case-study routes or machine-readable resources.

Do **not** enable HSTS preload merely because HTTPS works once. HSTS/preload should be introduced only after the apex and all intended HTTPS subdomain behavior is stable and the operational consequences are understood.

## Response-security policy

Current static response baseline in `public/_headers`:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- restrictive camera/microphone/geolocation/browsing-topics `Permissions-Policy`
- `X-Robots-Tag: noindex` on matching `workers.dev` preview/staging hosts.

A Content Security Policy is not being guessed into production. Next.js emits inline runtime scripts, so CSP should be designed from actual production resource behavior and introduced deliberately, preferably report-only first, before enforcement.

## Soft-launch verification

The permanent-account `workers.dev` staging origin is a real deployed artifact that can be tested before the canonical domain is purchased or promoted. It remains noncanonical and `noindex`.

Staging verification covers:

- deployed HTTP reachability and propagation stabilization;
- English homepage + six English case studies;
- Arabic homepage + six Arabic case studies;
- `/profile.json`;
- `/projects.json`;
- `/services.json`;
- `/llms.txt`;
- `/robots.txt`;
- `/sitemap.xml`;
- canonical and Open Graph URLs;
- reciprocal English/Arabic alternates;
- preview `noindex` behavior;
- security headers;
- desktop/mobile browser suite;
- axe accessibility gate across both language route sets;
- reduced motion and JavaScript-disabled behavior;
- live Lighthouse baseline;
- missing assets/404s;
- outbound public-evidence links and contact intents.

## Production post-deployment gate

Do not call the site publicly launched until all of the following are verified on `https://m7mdehab.com`:

1. DNS resolves from independent networks/resolvers.
2. TLS is valid.
3. HTTP redirects to HTTPS.
4. `www` redirects once to apex with path/query preservation.
5. English homepage and all six English case-study URLs return the intended 200 response.
6. Arabic homepage and all six Arabic case-study URLs return the intended 200 response.
7. English uses `lang="en"`; Arabic uses `lang="ar" dir="rtl"`.
8. Every English/Arabic pair self-canonicalizes and exposes reciprocal language alternates.
9. `robots.txt` is reachable and advertises the canonical sitemap.
10. `sitemap.xml` contains exactly the intended indexable HTML routes in both languages.
11. machine-readable public resources are reachable and preserve publication boundaries.
12. production is **not** carrying the preview-only `X-Robots-Tag: noindex` header.
13. security headers are present.
14. browser/accessibility/mobile/reduced-motion/no-JS regression suite passes against the public origin.
15. deployed Lighthouse is recorded as a lab baseline for the English homepage, Presaira and Arabic homepage.
16. no confidential or private data is exposed by HTML, JSON, source maps, headers or build artifacts.
17. the production deployment SHA is recorded.

Only after this gate should Search Console/Bing sitemap submission and public-launch promotion proceed.

## Search / analytics boundary

Deployment does not automatically mean indexing or measurement is configured.

Still external/setup-dependent until directly verified:

- Google Search Console ownership;
- Bing Webmaster ownership;
- production analytics provider/property;
- any required consent/privacy configuration for the selected analytics provider and launch jurisdictions.

The site exposes provider-neutral conversion semantics shared across English and Arabic. Production analytics should bind to those semantics rather than changing the visible conversion architecture.

## Rollback

If a production deployment introduces a launch-blocking defect:

1. identify the last verified production git SHA / Cloudflare Worker version;
2. roll back the Worker deployment or redeploy the last verified git state;
3. re-run public-origin smoke checks in both languages;
4. keep the domain canonical and avoid exposing an alternate duplicate host;
5. correct the defect on a branch and pass the full CI/browser/deployment-readiness gates before redeploying.

Do not make an unvalidated hotfix directly on the live Worker that is absent from Git history.

## Future server-runtime path

Cloudflare currently provides a vinext path for Next.js-compatible Workers. The repository probes current compatibility, but the launch does not require it.

If a future feature genuinely requires request-time server execution, first re-run compatibility against the then-current application and vinext release. Adopt the server-runtime path only when the feature benefit justifies the additional compatibility and operational surface.
