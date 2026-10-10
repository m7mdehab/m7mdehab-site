# Provider-neutral CI + Cloudflare automation handoff (2026-10-11)

**Status: DOCUMENTED / NOT IMPLEMENTED for this website.** Read this first when resuming work on lowering CI costs or migrating from GitHub Actions. This is a reusable operating blueprint, **not** evidence that CircleCI was connected to this repository, Cloudflare diagnostic webhooks were deployed for this repository, or any required checks were migrated. No current website build, deployment, GitHub ruleset or agent policy may be bypassed on the basis of this document.

## Website-specific starting point

- Repository: `m7mdehab/m7mdehab-site` (PUBLIC). Public source and public website artifacts are intentionally distinguishable from any unrelated PRIVATE project's secrets and CI metadata. **Never copy private tokens, private failure logs, job IDs, private webhook URLs, private repository configurations or raw proprietary source across repos.**
- Agent authority: root `AGENTS.md`, `docs/CI_EFFICIENCY_POLICY.md` and `docs/DEPLOYMENT.md` take precedence for current website behavior. If this handoff conflicts with more recent instructions, verify and reconcile explicitly.
- Existing CI: `.github/workflows/ci.yml` runs Node 22, locked `npm ci`, typecheck, lint, narration integrity, production build, all public-route smoke checks, actual Playwright browser/accessibility suites and Lighthouse/QA evidence. `.github/workflows/deployment-readiness.yml` validates Cloudflare static export and Wrangler **dry-runs** with a separate audit and advisory runtime compatibility probe.
- Existing Cloudflare: website already targets Cloudflare Workers **Static Assets** with `wrangler.static.jsonc`, `wrangler.production.jsonc` and manually gated deployment workflows. **Do not replace this live deployment lane with an event diagnostic Worker**; use distinct project, Worker name, secrets, host and audience.
- Deployment is not authorized by a successful documentation PR or by a new CI provider. Preserve manual staging and production promotion boundaries and live-origin checks. Site remains public, but any new PR-based diagnostic integration should use minimally scoped permissions.

## Outcome to replicate — reusable patterns only

A separate project established and locally verified the following architecture; it is **NOT yet wired to this website**:
1. An authenticated GitHub App-based CircleCI connection running cheap docs/security/context checks on narrowly configured PR events, with all costly acceptance jobs kept OFF for ordinary edits.
2. An explicitly labeled `run-ci` event acting as the **deliberate full-suite trigger** on review-ready PRs, with an exact-source SHA and requires-all final verdict. Draft PRs use inexpensive checks; never assume that already-attached labels retrigger.
3. A tiny event-driven Cloudflare Worker receiving signed `job-completed` events and fetching only **read-only CircleCI job metadata**, a matching GitHub commit/PR, and no more than two failing-step excerpts. The Worker may publish only highly sanitized allowlisted error classes/test IDs, only on an exact matching open PR HEAD, with a job-ID de-duplication marker. It must never dispatch CI, deploy, alter PR state, handle untrusted raw log publication or reach production credentials.
4. Tests for signature authentication, wrong/foreign repo, wrong SHA, wrong CircleCI project/job references, replay/duplicate events, success/nonfailed paths, response safety, and real provider payload shape. A historical signed request that fetches private provider metadata without commenting proved authenticated read access; **it did not prove real provider webhook delivery**. A genuine failure comment still requires independent evidence after a naturally occurring failure, not an intentionally wasted CI run.
5. Conservative budget controls across providers: verified live Free balances, local preflight, batched pushes, no duplicate or blind reruns, same-SHA job attribution, stop discretionary compute at ~75% monthly usable quota and seek specific authorization for nonessential compute at ~90%, no paid upgrades/billing changes by default. Report the measured source SHA, actual suites executed and credits consumed; never claim migrated CI from source-only or mock tests.
6. GitHub server-side protection as the final step, not the first: retain branch PR requirements/no force push/no deletion/no bypass, and require trusted, source-pinned CircleCI check contexts **only after full verified parallel parity**. Existing GitHub Actions remains authoritative until migrated checks and provider event mappings are proven.

**Distinguish evidence levels:** `staged` (source), `merged`, `locally tested`, `hosted same-SHA PASS`, `deployed`, `live authenticated read`, `genuine outbound webhook delivery`, `required-check enforced`. Never collapse these.

## Cloudflare is not free Linux CI just because the quota is large

| Surface | Free-plan example / meaning | What it could do for this site |
| --- | --- | --- |
| Workers runtime | 100,000 HTTP requests/day; ~10 ms CPU / request; 50 external subrequests/request, subject to change | Event webhooks, auth-limited status endpoints, lightweight metadata transforms, edge health checks |
| Workers Builds | 3,000 **build minutes/month**, **one concurrent build**, **20-minute max per build** in 2026 docs; a *different* quota from runtime requests | Explore small isolated build/static-export checks, only after evaluating checkout/permissions, exact SHA, logs, test runtime and status reporting |
| CircleCI | Separate hosted compute credit balance; depends on each organization's own plan and usage | Potential full independent browser/Node/security acceptance if all current assertions and deployment boundaries can be reproduced |
| GitHub Actions | Separately metered; website's **current authoritative gates** | Keep existing CI/deployment lanes until exact parity and server-side enforcement are achieved |

References reviewed: https://developers.cloudflare.com/workers/platform/limits/ ; https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/ . **Re-read current limits before making a decision.** A Cloudflare HTTP Worker **cannot replace** a Node 22 + Playwright + Lighthouse CI runner. Workers Builds may handle bounded build tasks but the free cap, concurrency, isolation and tooling may make full browser acceptance unsuitable.

## Website-specific step-by-step implementation brief for the next agent

**Stage A: baseline and secrets inventory (READ-ONLY, no hosted runs)**
1. Read `AGENTS.md`, this playbook, `docs/CI_EFFICIENCY_POLICY.md`, `docs/DEPLOYMENT.md`, `.github/workflows/ci.yml` and `.github/workflows/deployment-readiness.yml`. Inspect actual current main and existing open PRs; avoid using old docs that still refer to retired routes/locales.
2. Capture GitHub Actions actual usable balance, CircleCI account/plan Free credits (may not exist for this repo), Cloudflare Workers runtime usage and Workers Builds remaining build minutes. Do not infer availability from another repository's account screenshots.
3. Map every current required website assertion: Node 22/lockfile install; typecheck; lint; audio file-integrity; production Next build; actual live route + retired-route 404 smoke; Chromium/WebKit Playwright + axe, mobile overflow, reduced-motion/no-JS, writing/article cases; Lighthouse QA; Cloudflare static export and Wrangler dry-run/audit. Include trigger conditions and artifacts. Keep manually authorized staging/production deploy separate.
4. Audit existing GitHub branch rulesets and required checks *before* proposing any migration. No changes to the production environment, DNS, `wrangler.production.jsonc`, cookies, content governance, or website build output.

**Stage B: minimal CircleCI pilot (requires provider/account onboarding; NOT configured)**
5. Decide whether native CircleCI GitHub App can connect to this PUBLIC website repo with least privilege, and whether this setup actually saves credits compared with existing GitHub Actions. If worthwhile, create a `.circleci/config.yml` **on a separate PR**; preserve Node 22, lockfile, all route/browser tests and provenance checks. Use a cheap, static, read-only job for first compilation and test of trigger semantics.
6. Prefer scoped event triggers, automatic cancellation of superseded read-only branches where supported, finite timeouts, artifact retention and no automatic costly PR pushes. Set the expensive acceptance mode only on a deliberate `run-ci` labeled **review-ready** PR. Real-world label, CircleCI config source, checkout source and exact SHA must all match. Avoid duplicate triggers and unexpectedly expensive browser jobs.
7. Implement one full requires-all acceptance workflow only after local/static diagnostics pass. Prove every incumbent gate actually ran in new provider, including browser/mobile/accessibility and deployment readiness equivalent, on identical SHA. Negative controls must fail when gates are removed; missing tests cannot be treated as success.
8. Check Free credit usage again before each rare full acceptance. No plan upgrades, paid credits, public-to-private source mirroring, or quota assumptions.

**Stage C: optional failure-report Worker (distinct from website production Worker)**
9. Use a unique `workers.dev` subdomain/Worker name under the correct authorized Cloudflare account. Do not modify the live `m7mdehab-site` Worker or production custom domain. Create a separate directory like `infra/ci-failure-bridge/` with HMAC-verified handlers and mock tests. Never copy environment values or token files from other projects.
10. Bind CircleCI webhook signing secret to **the same secret used by the CircleCI subscription**; use restricted read-only CircleCI access and a GitHub token restricted to this repository with minimum PR read/comment permissions. A CircleCI personal token may grant broader account access, so document risk and revoke on removal. Secrets go in Cloudflare protected secrets, not GitHub commits, PR bodies or logs.
11. Fail closed on malformed/unsigned/replayed or unrelated repository/project events. CircleCI GitHub App webhook can use `pipeline.git.revision` and `pipeline.event.github.repository.url` (GitHub REST API URL); accept only exact expected repo URL variants, never partial/prefix matching. Verify local signed byte payload and serialized PowerShell JSON through actual parser before deploying. Include fixed build-version response headers without echoing raw request content.
12. One owner-authorized historical no-comment signed preflight can verify live HMAC, read access and repository selection without starting builds or writing PR comments. **Do not confuse that with real CircleCI-originated delivery.** Verify the first *naturally* failed job, its genuine webhook receipt and one sanitized matching PR comment (or classify `PENDING`). No polling, scheduled task, production deployment rights or synthetic failures.

**Stage D: GitHub enforcement and rollout**
13. Compare exact HEAD statuses with the **correct CircleCI App source**, full coverage and browser QA, then and only then add mandatory checks to the existing GitHub ruleset, preserving previously required approvals/rules. Verify server-side rules were applied and reject incomplete/missing statuses.
14. Prove automatic non-draft PR and main behavior. Retire old Actions quality gates only after equivalent new gates are routinely enforced. Keep site production deployment manual and independent; verify live-origin behavior after any actual deployment.
15. Update this document with link to the actual new website PR, exact SHAs, measured quotas, job counts, results, rule IDs, rollback and unresolved approvals. Until then **all provider-migration work is a future proposal**.

## Immediate current decision / owner guardrails

**No website CircleCI project is claimed installed here. No website diagnostic Worker is claimed installed here. No new Cloudflare Workers Builds pipeline is claimed configured.** This file and an `AGENTS.md` pointer are a handoff, not the implementation.

Do not copy credentials, CircleCI IDs, private ruleset details or private job logs from any other project into this public repo. Do not use the site's Cloudflare deployment account or production environment for CI diagnostics without a separate security review. Keep existing website code and runtime unchanged in this documentation checkpoint.

**Success for the next agent:** return an adoption proposal and equivalence map, measured *this repository's* available provider quotas, one narrowly scoped testable pilot and its explicit owner/automation approvals. No plan activation or provider migration should occur by assumption.
