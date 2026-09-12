# Cloudflare Staging Deployment

Updated: 2026-09-12

## Purpose

The permanent pre-domain staging origin is:

`https://m7mdehab-site.m7mdehab.workers.dev`

It exists to validate the real Cloudflare-hosted artifact before `m7mdehab.com` is purchased and activated. It is never a canonical production surface and must remain excluded from indexing.

## Deployment workflow

Workflow:

`.github/workflows/deploy-cloudflare-staging.yml`

The workflow supports both manual dispatch and automatic deployment after code/configuration changes are merged to `main`. Documentation-only pushes are ignored. This keeps the visible workers.dev staging surface synchronized with accepted `main` without turning read-only CI into a deployment job.

It checks out `main`, performs one deterministic install, typecheck, lint and static export, deploys through `wrangler.static.jsonc`, waits for three consecutive healthy origin responses, then reuses that same runner for live-origin acceptance. A staging concurrency group cancels an older in-progress staging run if a newer `main` deployment supersedes it.

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

## Accepted staging history

The last pre-overhaul staging run before this synchronization change was run `34659894124`, which deployed source SHA `6588607698140c82435b4fe5197ff54957ba9f44` (Iteration 13). That explains why the publicly visible workers.dev site could lag behind the later frontend-overhaul merges even though those merges had already passed CI.

After this operational change is merged, code/configuration pushes to `main` automatically run the same stateful staging deployment and deployed-origin acceptance gate. The staging URL therefore becomes the current visible review surface for completed work while production-domain activation remains separately gated.

## CI efficiency

Automatic staging is intentionally limited to non-documentation pushes to `main`; it is not part of pull-request CI and is not used for speculative branch work. Ordinary application defects should still be caught by Application CI and Deployment Readiness before merge.

Do not merge this stateful deployment into read-only Application CI or Deployment Readiness merely to save hosted minutes.

## Final-domain transition

After responsive/mobile, Arabic art direction, and final staging acceptance are complete:

1. purchase/activate `m7mdehab.com` in Cloudflare;
2. use the separately gated production deployment workflow and `wrangler.production.jsonc`;
3. verify DNS, TLS, HTTP→HTTPS and `www`→apex behavior;
4. rerun the bilingual production live-origin acceptance gate;
5. only then proceed to Search Console, Bing, production analytics verification and public launch.
