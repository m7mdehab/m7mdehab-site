# Iteration 10 — Cloudflare Staging Acceptance

Date: 2026-09-11
Status: **COMPLETE**

## Purpose

Establish a durable pre-domain Cloudflare staging origin so the real hosted artifact can be validated before `m7mdehab.com` is purchased and activated.

Staging origin:

`https://m7mdehab-site.m7mdehab.workers.dev`

The staging origin is deliberately noncanonical and carries `X-Robots-Tag: noindex`.

## Implementation

- Added a manual, stateful `Deploy Cloudflare Staging` workflow.
- Reused the existing static-export path and `wrangler.static.jsonc`.
- Kept deployment separate from read-only CI because deployment ordering and real-origin verification are acceptance requirements.
- Reused the same deployment runner for post-deploy route/header checks, Chromium installation, Playwright/axe QA and Lighthouse instead of allocating duplicate hosted jobs.
- Added a bounded post-deployment stabilization gate after the first real run exposed an edge-propagation race.

## First real-account run — defect discovery

Run: `34539408669`

The application build and Cloudflare deployment both succeeded. Wrangler deployed Worker version:

`24b4156d-513c-4fd6-a2a6-954713d023dc`

The immediate live-origin verifier then observed HTTP 404 before browser QA began. The verifier had accepted a single successful readiness probe and immediately issued another fetch, allowing a newly deployed version to be judged before edge convergence was stable.

The repair did **not** weaken any acceptance predicate. It changed readiness to require three consecutive HTTP 200 responses, reused the stabilized response for header/canonical checks, and stopped Lighthouse from running after a failed live gate.

Repair PR: `#8`
Repair merge: `2a3b0b6622b689788427663cf73fdfb4942e9e73`

## Accepted staging run

Run: `34540399932`
Job: `103081533716`
Source SHA: `2a3b0b6622b689788427663cf73fdfb4942e9e73`
Cloudflare Worker version: `25bc7cfa-cbc7-44a0-ac55-0089dd21e3fb`

Observed readiness:

- readiness attempt 1: HTTP 200;
- readiness attempt 2: HTTP 200;
- readiness attempt 3: HTTP 200;
- all intended English launch routes and support endpoints returned success;
- staging `X-Robots-Tag: noindex` passed;
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` and the intended referrer policy passed;
- homepage canonical remained `https://m7mdehab.com` and did not switch to the staging host.

## Rendered acceptance

Playwright suite against the real Cloudflare staging origin:

**27 / 27 PASS** in 54.3s.

This retained the existing desktop/mobile, axe, reduced-motion, keyboard, no-JavaScript, conversion and discoverability assertions.

Staging Lighthouse lab baseline:

| Route | Performance | Accessibility | Best practices | SEO | Agentic browsing | benchmarkIndex |
|---|---:|---:|---:|---:|---:|---:|
| Homepage | 97 | 100 | 100 | 69 | 100 | 3207 |
| Presaira | 97 | 100 | 100 | 66 | 100 | 3214 |

The staging SEO scores are intentionally not comparable to production SEO scores because the staging origin is explicitly `noindex`. That reduction is evidence that the staging protection is active, not an SEO regression in the canonical application.

## Artifact evidence

Artifact ID: `10177098869`

Name:

`cloudflare-staging-acceptance-2a3b0b6622b689788427663cf73fdfb4942e9e73`

SHA-256:

`6a537e53868237740a1abde161fc7547a07e7934538bc0d06f639b9a4e46b94f`

Retention was deliberately short under the CI efficiency policy.

## Actions-efficiency observations

The first genuine post-policy development cycle also validated the consolidated CI shape naturally:

- Application CI reused one runner for install, typecheck, lint, build, production server, route smoke, Chromium, Playwright/axe and Lighthouse.
- Deployment Readiness reused one full runner for static export, preview and production Wrangler dry-runs, dependency audit and the advisory Vinext probe.
- No synthetic benchmark runs were created.
- The failed first staging run revealed that `if: always()` on Lighthouse was wasteful after origin failure; that was corrected as part of the demonstrated defect repair.

## Boundary carried forward

Staging acceptance is **not** production-domain acceptance. Do not submit this `workers.dev` origin to Search Console/Bing or publicly promote it as the canonical site. Permanent launch still requires domain ownership, Custom Domain activation, DNS/TLS, `www` redirect, production crawler checks and a final public-origin acceptance gate.
