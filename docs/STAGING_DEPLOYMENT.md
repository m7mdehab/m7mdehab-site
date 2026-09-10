# Cloudflare Staging Deployment

Updated: 2026-09-11

## Purpose

The permanent pre-domain staging origin is:

`https://m7mdehab-site.m7mdehab.workers.dev`

It exists to validate the real Cloudflare-hosted artifact before `m7mdehab.com` is purchased and activated. It is never a canonical production surface and must remain excluded from indexing.

## Deployment workflow

Use the manual workflow:

`.github/workflows/deploy-cloudflare-staging.yml`

It intentionally remains stateful and separate from read-only CI. It checks out `main`, performs one deterministic install, typecheck, lint and static export, deploys through `wrangler.static.jsonc`, then reuses that same runner for live-origin acceptance.

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
- Canonical HTML metadata continues to point to the future production apex `https://m7mdehab.com`, never to the staging hostname.
- Staging deployment does not authorize Search Console/Bing submission or public promotion.

## Live acceptance gate

A staging deployment is accepted only if the workflow verifies:

1. the static export includes the launch HTML and machine-readable surfaces;
2. the staging origin becomes reachable;
3. `X-Robots-Tag: noindex` is present;
4. baseline security headers are present;
5. homepage canonical remains `https://m7mdehab.com`;
6. all six case studies and support endpoints return success;
7. the full Playwright rendered/accessibility/mobile/reduced-motion/no-JS/discoverability suite passes against the deployed staging origin;
8. a deployed-origin Lighthouse lab baseline is captured as evidence.

The workflow uploads short-retention staging acceptance artifacts for auditability.

## CI efficiency

This workflow is manual only. Do not dispatch it merely to benchmark runner changes or debug speculative edits. Reproduce ordinary application defects locally/Codespaces first when possible, then use this workflow for a coherent staging checkpoint that genuinely needs real Cloudflare deployment and deployed-origin verification.

Do not merge this stateful deployment into read-only Application CI or Deployment Readiness merely to save hosted minutes.

## Final-domain transition

After staging is accepted and the remaining pre-domain project work is complete:

1. purchase/activate `m7mdehab.com` in Cloudflare;
2. use the separately gated production deployment workflow and `wrangler.production.jsonc`;
3. verify DNS, TLS, HTTP→HTTPS and `www`→apex behavior;
4. rerun the production live-origin acceptance gate;
5. only then proceed to Search Console, Bing, production analytics verification and public launch.
