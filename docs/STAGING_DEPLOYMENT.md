# Cloudflare Staging Deployment

Updated: 2026-09-11

## Purpose

The permanent pre-domain staging origin is:

`https://m7mdehab-site.m7mdehab.workers.dev`

It exists to validate the real Cloudflare-hosted artifact before `m7mdehab.com` is purchased and activated. It is never a canonical production surface and must remain excluded from indexing.

## Deployment workflow

Use the manual workflow:

`.github/workflows/deploy-cloudflare-staging.yml`

It intentionally remains stateful and separate from read-only CI. It checks out `main`, performs one deterministic install, typecheck, lint and static export, deploys through `wrangler.static.jsonc`, waits for three consecutive healthy origin responses, then reuses that same runner for live-origin acceptance.

Required repository/Actions secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Do not commit or print secret values.

## Staging invariants

- Worker name: `m7mdehab-site`.
- Cloudflare account subdomain: `m7mdehab.workers.dev`.
- Staging URL: `m7mdehab-site.m7mdehab.workers.dev`.
- `workers.dev` remains enabled only for staging/preview use.
- `public/_headers` must apply `X-Robots-Tag: noindex` to the staging hostname.
- Canonical HTML metadata continues to point to production URLs under `https://m7mdehab.com`, never to the staging hostname.
- English and Arabic pages share the same staging-origin noindex policy.
- Staging deployment does not authorize Search Console/Bing submission or public promotion.

## Live acceptance gate

A staging deployment is accepted only if the workflow verifies:

1. the static export includes English and Arabic launch HTML plus machine-readable surfaces;
2. the staging origin stabilizes with three consecutive HTTP 200 responses;
3. `X-Robots-Tag: noindex` is present;
4. baseline security headers are present;
5. homepage canonical remains `https://m7mdehab.com`;
6. all English and Arabic homepage/case-study routes plus support endpoints return success;
7. the full Playwright rendered/accessibility/mobile/reduced-motion/no-JS/discoverability/localization suite passes against the deployed staging origin;
8. deployed-origin Lighthouse lab baselines are captured for the English homepage, Presaira and Arabic homepage.

The workflow uploads short-retention staging acceptance artifacts for auditability.

## Accepted English staging baseline

Run `34540399932` accepted source SHA `2a3b0b6622b689788427663cf73fdfb4942e9e73` on Cloudflare Worker version `25bc7cfa-cbc7-44a0-ac55-0089dd21e3fb`.

That run passed three consecutive HTTP 200 readiness checks, all intended English/support routes, security/noindex/canonical checks, **27/27** browser tests and the deployed Lighthouse baseline. See `docs/ITERATION_10_CLOUDFLARE_STAGING_ACCEPTANCE_2026-09-11.md`.

## CI efficiency

This workflow is manual only. Do not dispatch it merely to benchmark runner changes or debug speculative edits. Reproduce ordinary application defects locally/Codespaces first when possible, then use this workflow for a coherent staging checkpoint that genuinely needs real Cloudflare deployment and deployed-origin verification.

Do not merge this stateful deployment into read-only Application CI or Deployment Readiness merely to save hosted minutes.

## Final-domain transition

After bilingual staging is accepted and the remaining pre-domain project work is complete:

1. purchase/activate `m7mdehab.com` in Cloudflare;
2. use the separately gated production deployment workflow and `wrangler.production.jsonc`;
3. verify DNS, TLS, HTTP→HTTPS and `www`→apex behavior;
4. rerun the bilingual production live-origin acceptance gate;
5. only then proceed to Search Console, Bing, production analytics verification and public launch.
