# Writing System — Zero-Ambiguity Integration Patch

This document turns the locked Writing design into mechanical repository work.

## 0. Before editing

1. `git fetch --all --prune`.
2. Refresh `main` and open PR state.
3. Do not base implementation on stale draft PR #25.
4. If the Method Story PR has merged, branch from that latest `main`.
5. If concurrent section work remains open, rebase before final rendered QA/merge.
6. Read the local Next.js 16 documentation required by `AGENTS.md` before changing Metadata APIs.

## 1. Data model first — `data/writing.ts`

Do not start with CSS.

Replace the mandatory project-only metadata model with the contract in `WRITING_SYSTEM_EXECUTION_PACKET.md`.

Keep existing essay body copy intact.

Support existing section `paragraphs` / `bullets` plus optional future typed blocks.

Add:

- `publishedWritingArticles`;
- published-only `getWritingArticle`;
- `getHomepageWriting(limit = 6)`.

All public routes/data use the published projection.

## 2. Build `components/writing-cover.tsx`

Implement:

- `forecast-calibration` from actual Presaira reliability data;
- `oil-sar` from the existing public SAR asset;
- `agent-provenance` from public-safe OpportunityOS stages/authority;
- generic image cover.

Do not fabricate metrics, UI or private system state.

## 3. Build `components/writing-card.tsx`

One whole-card Link.

Add deterministic test hooks:

- `data-writing-card`;
- `data-writing-context="home|archive"`;
- `data-writing-slug="<slug>"`.

The card contains cover → metadata → heading → excerpt. No nested Read link.

## 4. Build `components/home-writing.tsx`

Server component.

Add:

- `id="writing"`;
- `data-writing-home`;
- `data-writing-count`.

Use locked copy and `getHomepageWriting(6)`.

## 5. Refactor `components/home-closing.tsx`

Delete Writing-specific:

- `"use client"` if no longer needed by the parent;
- articles prop;
- `useEffect`;
- `useRef`;
- `useTimedCarousel`;
- calibration constants;
- Writing visual functions;
- Writing JSX;
- article dots.

Keep only Opportunity + Footer.

`OpportunityPaths` remains allowed as a nested client component.

## 6. Update `app/(en)/page.tsx`

Target:

`SystemHero → CredibilityRail → SelectedWorkGallery → SolveThinkBridge → HomeWriting → HomeClosing`.

Remove the Home `writingArticles` dependency.

## 7. Delete dead carousel helper

Run:

`rg "useTimedCarousel|CAROUSEL_INTERVAL"`

If the only former consumer was removed, delete `components/use-timed-carousel.ts`.

Do not disturb Selected Work; it has its own carousel implementation.

## 8. Create `app/writing-system.css`

Import after the historical frontend/mobile CSS in the English layout.

Use a new `.writing-system-*` namespace because legacy Writing selectors exist in Phase G/J/M/N and `mobile-composition.css`.

Core grid:

- desktop: 3 columns;
- tablet: 2;
- mobile: 1;
- 24px desktop column gap;
- roughly 42–52px row gap;
- 16:9 cover.

Do not spend the implementation pass deleting every historical selector. First remove all live dependencies on them. Dead CSS cleanup may be a separate housekeeping commit after acceptance.

## 9. Refactor `components/writing-authority.tsx`

Archive:

- H1 `Writing.`;
- broad locked lede;
- shared WritingCard;
- published entries only;
- no project-only manifesto.

Article:

- use `publishedAt`;
- optional updated date;
- optional cover/thesis/evidence/takeaways/sources;
- project links only for project-origin entries;
- conditional project disclosure;
- support future typed blocks and current paragraphs/bullets.

## 10. Metadata/schema

`app/(en)/writing/page.tsx`:

- broad editorial title/description;
- CollectionPage;
- published BlogPosting hasPart only.

`app/(en)/writing/[slug]/page.tsx`:

- published selector;
- canonical;
- OG article;
- published/modified time if supported by local Next.js 16 types/docs;
- JSON-LD `BlogPosting`;
- `datePublished`;
- optional `dateModified`;
- topics as keywords;
- image/citations/about only when applicable.

Do not emit a fake/broken social image.

## 11. Machine-readable outputs

`/writing.json`:

Remove:

- `alternateLanguageUrl`;
- mandatory `project`.

Add:

- category;
- topics;
- series or null;
- publishedAt;
- updatedAt or null;
- readingMinutes;
- canonical URL;
- relatedProjects[];
- sourceLinks[];
- optional stable cover image.

`data/discoverability.ts`:

Replace mandatory `derivedFromProject` and Arabic alternate with generalized fields and `relatedProjects[]`.

`llms.txt`:

Stop saying every article is “Derived from” a project. Use neutral article records and append related project only when present.

## 12. Duplicate inventory audit

`data/public.ts` currently contains a second writing inventory.

Search all consumers before changing it.

Prefer `data/writing.ts` as the single editorial source. If removing the duplicate expands scope or breaks dormant Arabic compilation, leave it temporarily with a clear deprecation comment and a drift test. Do not create another inventory.

## 13. Tests — required surgery

Search:

`rg 'closing-note|closing-notes|Go to article|Read the field note|What the work taught me|writing carousel|two evidence'`

Update at minimum:

- `tests/iteration12.writing-authority.spec.ts`;
- `tests/iteration8.discoverability.spec.ts`;
- `tests/frontend-overhaul-phase-g.spec.ts`;
- `tests/mobile-composition.spec.ts`;
- `tests/frontend-overhaul-phase-l.spec.ts` where affected.

Do not alter Selected Work carousel tests.

### Independent post contract

Add a test-only fixture representing a published independent note with:

- no project;
- no thesis;
- no evidence;
- no takeaways;
- no sources.

Prove renderer/normalizer works without those fields.

Do not add the fixture to production lists, routes, sitemap or JSON.

## 14. Mobile-test replacement

Remove Writing-specific:

- `.closing-notes` overflow exception;
- article-dot assertions;
- six-second Writing autoplay assertion;
- fixed `.closing-note` height contract.

Replace with:

- 1 grid column at 390px;
- exactly three current Home cards;
- all three links visible;
- no dots inside Writing;
- no horizontal overflow;
- 16:9 cover geometry within tolerance;
- Writing anchor clears the mobile dock.

## 15. Phase G test replacement

Assert:

- `[data-writing-home]` exists;
- three current `[data-writing-card]`;
- `data-writing-count="3"`;
- no Home service catalogue;
- Opportunity/Footer unchanged;
- no Writing dots;
- no `.closing-notes`;
- Writing + Opportunity + Footer axe clean;
- reduced-motion card transform/cover zoom removed.

## 16. Documentation reconciliation

After visual acceptance update:

- `docs/frontend-overhaul/PHASE_G_CLOSING_SYSTEM.md`;
- `docs/frontend-overhaul/PHASE_I_ENGLISH_DESKTOP_ACCEPTANCE.md` with a supersession note rather than rewriting history;
- `docs/FRONTEND_OVERHAUL_MASTER_PLAN.md`;
- `docs/EXECUTION_STATUS.md`;
- `docs/DECISIONS.md` if present;
- `AGENTS.md` if implementation contract changes.

Record:

> Writing is a broad personal publishing system. Project-derived evidence essays are an optional series. Home uses a non-carousel 3/2/1 card grid with up to six curated posts.

## 17. Validation order

Run:

`npm ci`

`npm run typecheck`

`npm run lint`

`npm run build`

`CLOUDFLARE_STATIC_EXPORT=1 npm run build`

Focused Playwright:

- writing authority;
- discoverability;
- Phase G;
- mobile composition.

Then:

`npm run test:browser`

`git diff --check`

Do not narrow the full suite because focused tests pass.

## 18. Render matrix

Home Writing:

- 1920×1080;
- 1440×1000;
- 1280×800;
- 1024×768;
- 430×932;
- 390×844;
- 320×568.

Also:

- `/writing` at 1440×1000 and 390×844;
- forecast article at 1440×1000 and 390×844;
- full Home at 1920×1080 and 390×844.

Review against `WRITING_SYSTEM_VISUAL_QA.md`.

## 19. Delivery

Follow `AGENTS.md`.

The implementation is not complete at local green tests.

After rendered acceptance:

1. commit coherent checkpoints;
2. push feature branch;
3. open/update PR;
4. wait for checks;
5. merge accepted work;
6. allow production deployment;
7. verify `/`, `/writing`, all three article routes and `/writing.json`;
8. report feature SHA, PR, merge SHA, deployment result and live verification.

If concurrent section work changes `main`, rebase before the final screenshot/merge gate.
