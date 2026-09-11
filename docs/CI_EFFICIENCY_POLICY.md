# CI Efficiency Policy

Effective 2026-09-11. This is durable repository policy for keeping validation quality high while minimizing private GitHub-hosted Actions spend.

## Invariants

1. No substantive validation is removed for cost reasons.
2. GitHub Actions is the independent merge proof. Local development and Codespaces should absorb the iterative edit-test loop whenever the same toolchain is available there.
3. Read-only branch and pull-request workflows should cancel superseded runs.
4. Reuse checkout, dependency installation, build output, and a running test server inside one job when the checks do not require independent runner isolation.
5. Use `ubuntu-slim` only for genuinely lightweight jobs that fit the 15-minute ceiling and do not need browser installation, Docker, privileged operations, or heavyweight builds.
6. Do not create a new hosted job simply to repeat typecheck, lint, install, or build work already performed for the same SHA unless the isolation itself is an acceptance requirement.
7. Prefer event-driven automation over schedules. Where periodic external monitoring is required, preserve the detection SLA but use the least expensive independent execution surface that can provide it.
8. Keep artifact retention short unless longer retention has a concrete audit need.

## Current repository shape

- `.github/workflows/ci.yml` is the single pull-request validation lane for install, typecheck, lint, production build, production-route smoke tests, Playwright rendered/accessibility checks, Lighthouse evidence, and QA artifacts. Browser QA runs only on pull requests but reuses the same install, build, and production server. English, Arabic, project, conversion, discoverability, localization and authority-writing assertions share this lane.
- `.github/workflows/deployment-readiness.yml` performs the advisory Vinext compatibility probe and the mandatory Cloudflare static-export/readiness checks in one runner, reusing the same install and verifying English, Arabic, project, machine-readable and authority-writing launch surfaces.
- `.github/workflows/deploy-cloudflare-staging.yml` is a manual stateful deployment/real-origin acceptance lane. It remains separate because Cloudflare mutation, propagation stabilization and deployed-origin validation are acceptance requirements; within that job, setup/build/browser work is reused rather than split across duplicate runners.
- `.github/workflows/deploy-cloudflare-production.yml` remains manually gated production deployment and is not merged into CI merely to save minutes.

The previous standalone `browser-qa.yml` runner and separate Vinext runner were removed because they repeated setup for the same change without providing required independence.

## Measured observations

The first genuine development cycles after consolidation proved that Application CI can carry checkout → install → typecheck → lint → build → server → smoke → Chromium → Playwright/axe → Lighthouse on one full runner, while Deployment Readiness can carry static export → Wrangler preview/production dry-runs → dependency audit → advisory Vinext on one full runner.

The first permanent-account staging deployment also showed a cost-sensitive failure mode: running Lighthouse after an already-failed reachability gate only produced meaningless zero scores. The staging workflow now performs Lighthouse only after live/browser acceptance reaches that step normally.

Iteration 12 extends content and route assertions inside these existing lanes rather than creating a separate content, SEO or writing runner. Browser checks remain the appropriate full-runner workload because the new authority pages must preserve the same axe/mobile/no-JavaScript contract as project pages.

## Agent execution rule

Before pushing a change, run the narrowest relevant local or Codespaces checks first. Batch coherent edits into checkpoint pushes. Do not use hosted CI as a keystroke-by-keystroke debugging loop. Before modifying workflow boundaries, verify that every existing route, browser, accessibility, discovery, deployment, localization, authority-writing and security predicate still executes on the same protected event or a stronger one.
