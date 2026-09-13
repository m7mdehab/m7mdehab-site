# Phase L — Final EN/AR/Responsive Production Hardening & Acceptance

**Status:** ACTIVE / HOSTED EXECUTION BLOCKED  
**Date:** 2026-09-13  
**Base:** `6848e6ade3e025adaa369a1eaf1d7eab1e3f0a06`  
**Branch:** `frontend-overhaul-phase-l`  
**PR:** #22

## Purpose

Phase L is the final hardening and acceptance phase for the already-live bilingual website. It is not a redesign phase and it is not a pre-domain activation phase.

Production already exists at `https://m7mdehab.com`. The objective is to prove that the accepted English desktop, English mobile and authored Arabic system survive together across the complete public surface and the real Cloudflare origins.

## Accepted inputs

Phase J — Responsive / Mobile Art Direction:

- COMPLETE / ACCEPTED;
- PR #20 merged to `main` at `d7de991cd53895b5d6c883a7f2f0d1e6fff60893`;
- accepted 390px and 430px English mobile composition;
- successful post-merge Cloudflare production acceptance run `34726081377`.

Phase K — Arabic Art Direction + Editorial Rewrite:

- COMPLETE / ACCEPTED;
- PR #21 final source head `bfc352e14861f6cc54b1a5a22a964a9f63cfb142`;
- merged to `main` at `6848e6ade3e025adaa369a1eaf1d7eab1e3f0a06`;
- final PR browser suite `88/88` PASS;
- Arabic Home Lighthouse `93 / 100 / 100 / 100 / 100`;
- final rendered artifact `10308581669`;
- artifact SHA-256 `05f1bcd5490f576243f956e0c118bfc37e0f4f0fe18f7f82729856b7a608104c`;
- final Arabic Home and About renders explicitly accepted by Mohammed.

## Phase L acceptance contract

### Automated repository validation

- typecheck;
- lint;
- build/static export;
- complete public-route smoke coverage;
- full rendered browser regression suite;
- full-page accessibility on top-level launch surfaces;
- route/canonical/hreflang/x-default parity;
- structured-data presence;
- reduced-motion behavior;
- no-JS semantic fallback;
- zero horizontal overflow;
- Lighthouse lab review.

### Final cross-language render matrix

Home:

- English — 1920×1080;
- English — 430×932;
- English — 390×844;
- Arabic — 1920×1080;
- Arabic — 430×932;
- Arabic — 390×844.

About:

- English — 1920×1080;
- English — 390×844;
- Arabic — 1920×1080;
- Arabic — 390×844.

### Real staging acceptance

- static artifact includes English/Arabic Home, About, Work, Services, Writing and representative articles;
- workers.dev remains `noindex`;
- security headers remain present;
- staging never becomes canonical;
- complete live route surface returns successfully;
- deployed-origin Playwright/axe runs against staging;
- final hosted EN/AR screenshots are captured;
- staging Lighthouse evidence is retained.

### Real production acceptance

- deploy accepted source to the production Cloudflare configuration;
- verify apex production is indexable and does not emit `noindex`;
- verify security headers and canonical apex;
- verify all English/Arabic HTML routes, support JSON, `llms.txt`, `robots.txt` and `sitemap.xml`;
- run the full browser/accessibility suite against `https://m7mdehab.com`;
- capture the final production screenshot matrix;
- collect Home / Presaira / Arabic Home Lighthouse evidence;
- emit a machine-readable release-evidence manifest.

## Implemented hardening on PR #22

- new `tests/frontend-overhaul-phase-l.spec.ts` consolidates bilingual route parity, accessibility, responsive screenshot, reduced-motion and no-JS acceptance;
- Application CI smoke coverage now includes the complete public route/discovery surface;
- staging acceptance now verifies the missing English/Arabic About, Work-index and Services surfaces and captures hosted EN/AR Home screenshots;
- production route verification now includes every Arabic authority essay;
- production screenshots now cover EN/AR Home at 1920/430/390 and EN/AR About at 1920/390;
- production workflow now writes `production-verification/release-evidence.json`;
- `docs/FRONTEND_OVERHAUL_MASTER_PLAN.md` has been reconciled with the actual accepted J/K/L state and the already-live domain.

## Hosted execution blocker

Immediately after Phase K was merged, GitHub Actions stopped allocating hosted runners for this repository's workflows.

Main merge commit `6848e6ade3e025adaa369a1eaf1d7eab1e3f0a06`:

- Application CI `34742485690` — failed before runner acquisition;
- Cloudflare staging `34742485634` — failed before runner acquisition;
- Cloudflare production `34742485611` — failed before runner acquisition.

Observed job shape:

- no job steps (`steps: []` / `null`);
- `runner_id: 0` where exposed;
- no executable logs because the runner never started;
- reproduced on both `ubuntu-latest` and `ubuntu-24.04`;
- staging/production retry reproduced the same condition.

Phase L PR #22 reproduces the same condition:

- head `3a28a497305fef850bc927dae2222a6e850f3f0a`: Application CI `34742710653`, Deployment Readiness `34742710659`;
- head `c62ff3d5c5e401edf670ea8ba3720a2ff3604c80`: Application CI `34742821249`, Deployment Readiness `34742821302`;
- one explicit retry of both final-head runs again failed before any step executed.

This differs materially from Phase J production run `34726081377`, where GitHub allocated a normal hosted runner and every build/deploy/live-acceptance step completed successfully.

The available GitHub API does not expose the repository/account reason for the runner refusal. GitHub's public status page currently reports Actions operational, so this record does not attribute the failure to a public GitHub incident, billing, quota or any other unproven cause.

## Gate discipline

- Do not mutate runner labels merely to make the red status disappear.
- Do not weaken tests, accessibility, route or hosted-origin requirements.
- Do not claim Phase K is newly deployed while the production workflow has not executed.
- Do not merge PR #22 while hosted execution is unavailable.
- Once GitHub can allocate a runner, run the complete Phase L contract, inspect the resulting artifact/render matrix, verify real production, and only then close Phase L.
