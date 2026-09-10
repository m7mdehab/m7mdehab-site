# Iteration 9 — Production Deployment & Soft Launch Readiness

Date: 2026-09-10
Status: **COMPLETE — REPOSITORY / DEPLOYMENT CONTRACT; PERMANENT ORIGIN SETUP-DEPENDENT**
Branch: `iteration-9-production-deployment-soft-launch`
Base: verified Iteration 8 merge `1727d522356cd23c96d6020e1a358bb2ee502f2e`

## Objective

Convert the production-ready repository into a concrete, testable deployment system without pretending that an external Cloudflare account, DNS zone or canonical production origin already exists.

Iteration 9 covers:

- current deployment-platform research;
- a security patch to the React production baseline;
- a reversible Cloudflare build lane;
- preview and production Wrangler contracts;
- static security/indexing headers;
- deployment-specific CI;
- a real temporary Cloudflare deployment as soft-launch deployment proof;
- production deployment automation that remains intentionally account-gated;
- canonical-host, TLS, redirect, security, rollback and live-origin validation rules.

It does **not** claim that `m7mdehab.com` is currently live.

## Starting state

Iteration 8 was fully closed before this branch:

- PR #4 squash merged to `main` at `1727d522356cd23c96d6020e1a358bb2ee502f2e`;
- push-triggered Application CI run `34419894925` passed deterministic install, typecheck, lint, Next.js production build and route smoke tests on that exact merge commit.

The repository already had:

- Next.js 16.3.4;
- a committed lockfile and deterministic Node 22 `npm ci`;
- 27 browser/discoverability tests;
- strict axe gating;
- zero known production dependency vulnerabilities at Iteration 8 closure;
- canonical/robots/sitemap/machine-readable launch architecture;
- explicit launch-readiness and analytics contracts.

The missing layer was an actual production deployment contract.

## Current-platform research and decisions

### Cloudflare path

Current Cloudflare documentation supports Next.js through a vinext compatibility path, but that path remains an additional compatibility/runtime layer. The current site does not require request-time server execution: its homepage, six case studies and machine-readable support routes are all statically prerenderable.

Iteration 9 therefore selects:

> **Next.js source → explicit static export → Cloudflare Workers Static Assets → `m7mdehab.com` Custom Domain**

This minimizes operational surface while keeping the source application portable.

Vinext remains a future migration option if a later feature genuinely requires server execution.

### React security patch

The branch raised:

- React `19.2.3` → **`19.2.7`**;
- React DOM `19.2.3` → **`19.2.7`**.

The lockfile was refreshed in GitHub's Node 22 environment through a one-shot write-capable workflow. That temporary workflow was removed after the lockfile update.

Next.js remains **16.3.4**.

## Reversible static-export architecture

`next.config.ts` now detects only the explicit environment flag:

`CLOUDFLARE_STATIC_EXPORT=1`

In that mode it enables:

- `output: "export"`;
- unoptimized Next images for static portability.

Ordinary development and CI continue to use the stock Next.js application path. Cloudflare-specific deployment does not own local development or normal production-behavior testing.

The stale `motion` package optimization entry was also removed because Motion was retired in Iteration 6.

## Export compatibility defect found and fixed

The first Cloudflare static-export gate correctly failed because Next.js export mode requires deterministic metadata routes to declare static behavior explicitly.

The affected routes were already deterministic; the missing declaration was architectural rather than content-related.

Fix:

- `app/robots.ts` → `export const dynamic = "force-static"`;
- `app/sitemap.ts` → `export const dynamic = "force-static"`.

After the correction, the static export generated all intended application and machine-readable routes successfully.

## Cloudflare configuration

### Preview config — `wrangler.static.jsonc`

Purpose:

- dry-run package validation;
- temporary soft-launch deployment experiments;
- `workers.dev` preview infrastructure only.

It serves `./out`, uses a 404 page for not-found handling and `drop-trailing-slash` HTML routing to match canonical URL policy.

### Production config — `wrangler.production.jsonc`

Production contract:

- Worker name `m7mdehab-site`;
- `workers_dev: false`;
- `preview_urls: false`;
- Custom Domain route for apex **`m7mdehab.com`**;
- static assets from `./out`;
- `drop-trailing-slash` HTML routing.

The production Custom Domain remains external/account-dependent until the domain is an active zone in the authorized Cloudflare account.

### `www` policy

The apex is canonical.

`www.m7mdehab.com` must be redirect-only, using a Cloudflare edge redirect that preserves path and query string. It must not become a second independently indexable content host.

## Static response-security baseline

`public/_headers` now establishes:

- `X-Frame-Options: DENY`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- restrictive camera, microphone, geolocation and browsing-topics Permissions Policy;
- `X-Robots-Tag: noindex` for matching `workers.dev` preview hosts.

Two controls are deliberately **not** guessed into production:

- no HSTS preload until HTTPS and subdomain behavior are stable;
- no speculative CSP, because Next.js emits inline/runtime scripts and an enforcement policy should be derived from real production resource behavior, preferably beginning report-only.

## Durable deployment workflows

### Deployment Readiness

`.github/workflows/deployment-readiness.yml`

The durable gate checks:

1. deterministic `npm ci`;
2. Cloudflare static export;
3. required exported launch surfaces;
4. preview Wrangler dry-run packaging;
5. **production Wrangler config dry run**;
6. production `npm audit --omit=dev --audit-level=low`;
7. an advisory vinext future-runtime compatibility probe.

The vinext job is explicitly advisory and does not define current production readiness.

Earlier vinext probing reported the application largely compatible but noted that a Vite/vinext migration would want package ESM semantics (`"type": "module"`). That change is intentionally not made merely to satisfy an unused beta path.

### Production deployment

`.github/workflows/deploy-cloudflare-production.yml`

Production deployment is intentionally manual (`workflow_dispatch`) and uses the GitHub `production` environment.

It checks out `main`, performs deterministic install/typecheck/lint/static build/artifact assertions, then deploys with `wrangler.production.jsonc`.

Required authorized secrets:

- `CLOUDFLARE_API_TOKEN`;
- `CLOUDFLARE_ACCOUNT_ID`.

No Cloudflare credential is committed to the repository.

## Real temporary soft-launch deployment

Iteration 9 did not stop at a dry run.

A one-shot workflow used Wrangler `deploy --temporary` after building the exact static artifact and asserting the preview no-index policy.

Evidence:

- workflow run: **`34441321391`**;
- job: `102756780721`;
- conclusion: **SUCCESS**;
- Wrangler version: `4.130.0`;
- 94 static files discovered;
- 62 new/modified assets uploaded in that temporary environment;
- a temporary Worker version was created successfully.

The temporary account's claim credential was transient secret material printed by Wrangler. It is intentionally **not** copied into repository documentation or user-facing status.

This proves that the selected static artifact can be accepted and deployed by Cloudflare Workers Static Assets.

It does **not** prove the permanent `m7mdehab.com` origin.

## Temporary-account edge challenge finding

Live checks against the temporary `workers.dev` hostname from GitHub-hosted runners did not reach application content.

Observed response:

- HTTP 403;
- `cf-mitigated: challenge`;
- Cloudflare challenge-specific CSP;
- `Just a moment...` challenge page;
- challenge-owned response headers.

This happened before the Worker response and therefore cannot be attributed to the application or the repository `_headers` policy.

A second curl/browser-UA attempt and a real headless Chromium probe were used to distinguish bot-UA behavior from a general hosted-runner challenge. Chromium also remained behind Cloudflare's temporary-account Managed Challenge.

Relevant one-shot runs included:

- `34441447778` — initial live endpoint probe;
- `34441591568` — diagnostic browser-UA probe;
- `34441722839` — real Chromium challenge probe.

Those one-shot workflows were removed after the finding was established.

Conclusion:

> **The temporary deployment is valid deployment proof, but Cloudflare's temporary-account edge is not a deterministic CI environment for live application QA.**

Actual live-origin browser/Lighthouse/security/crawler validation remains a production custom-domain gate after authorized account/domain setup.

## Documentation and governance

Added/updated:

- `docs/DEPLOYMENT.md`;
- `README.md` deployment lane;
- `AGENTS.md` deployment architecture and safety rules;
- production and preview Wrangler configs;
- durable deployment-readiness and manual production-deploy workflows.

Locked rules include:

- apex `m7mdehab.com` is canonical;
- `www` is redirect-only;
- `workers.dev` is preview-only and noncanonical;
- stock Next.js remains the source architecture;
- static export is explicit and reversible;
- production deploy requires authorized Cloudflare credentials;
- no production/indexing claim without direct live-origin verification;
- no HSTS preload or CSP checklist theater;
- live-origin QA precedes Search Console/Bing/public promotion.

## Production post-deployment gate

The permanent origin must still prove:

1. public DNS resolution;
2. valid TLS;
3. HTTP → HTTPS;
4. `www` → apex single 301 with path/query preservation;
5. homepage + six case-study 200 responses;
6. apex canonicals/OG URLs;
7. reachable robots and sitemap;
8. reachable machine-readable public resources;
9. absence of preview `X-Robots-Tag: noindex` on production;
10. expected security headers;
11. full browser/a11y/mobile/reduced-motion/no-JS suite against the public origin;
12. deployed Lighthouse baseline;
13. no leaked private/confidential material or credentials;
14. recorded production git SHA / Cloudflare version.

Only then should search-engine submission and public-launch promotion proceed.

## Repository-scope closure classification

Iteration 9 is complete for every autonomous/repository-controlled component.

The remaining production-origin work is a genuine setup dependency:

- control of `m7mdehab.com` in the intended Cloudflare account/zone;
- authorized Cloudflare deployment credentials;
- production Custom Domain deployment;
- `www` redirect/DNS configuration;
- live-origin verification using the gate above.

Search Console, Bing Webmaster and production analytics remain subsequent external/account-dependent phases rather than reasons to weaken or delay the completed repository deployment system.
