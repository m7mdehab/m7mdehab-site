# Luna / Codex Final Execution Prompt — Writing System v1.1

Implement, validate, visually tune, and ship the Writing System v1.1 refinement for `m7mdehab/m7mdehab-site`.

This is execution, not design exploration. Product scope, visual hierarchy, data contract, audio behavior, responsive layout, SEO/discovery rules, and acceptance criteria are locked.

## 1. Start from the prepared branch

Primary implementation branch: `writing-system-v11-refinement`.

Before touching code:
1. fetch/prune remotes;
2. inspect latest main and open PRs;
3. rebase this branch onto the latest accepted main if main moved;
4. preserve unrelated accepted Method / Selected Work / Closing changes;
5. do not use stale draft PR #25 or old `writing-system-groundwork` as the implementation base;
6. read the local Next.js 16 docs required by AGENTS.md before changing metadata APIs.

## 2. Read these authorities in order

1. `AGENTS.md`
2. `docs/LOCALIZATION_POLICY.md`
3. `docs/frontend-overhaul/WRITING_SYSTEM_REFINEMENT_2026-10-03.md`
4. `design/writing-system/writing-system.spec.json`
5. `design/writing-system/WRITING_SYSTEM_BLUEPRINT.html`
6. `docs/frontend-overhaul/WRITING_SYSTEM_EXECUTION_PACKET.md`
7. `docs/frontend-overhaul/WRITING_SYSTEM_INTEGRATION_PATCH.md`
8. `docs/frontend-overhaul/WRITING_SYSTEM_VISUAL_QA.md`
9. `docs/frontend-overhaul/WRITING_SYSTEM_TEST_MATRIX.md`
10. `docs/frontend-overhaul/WRITING_SYSTEM_SEO_AI_CONTRACT.md`

The 2026-10-03 refinement supersedes older presentation details when they conflict.

## 3. Locked Home result

- H2: `What I’m thinking through.`
- no explanatory Home lede;
- current 3 curated posts;
- future maximum 6 by homeRank;
- 3 columns >=1120px;
- 2 columns 720–1119px;
- 1 column <720px;
- no placeholders;
- no Writing carousel/dots/autoplay/horizontal swipe;
- `All writing ↗` only after the grid, aligned bottom-right.

## 4. Locked archive result

- route stays `/writing`;
- eyebrow: `Writing`;
- visible H1: `What I’m thinking through.`;
- no redundant visible lede;
- same shared card system;
- all and only published articles;
- no filters/search/pagination/category routes in this pass.

## 5. Locked card hierarchy

Every card is one semantic link.

Order:
1. 16:9 cover;
2. metadata overlay inside cover bottom;
3. title;
4. concise card description.

Bottom-left overlay = category + first topic.
Bottom-right overlay = read time + listen time.

Current examples:
- DATA · FORECASTING | 9 MIN READ · ~8 MIN LISTEN
- DATA · COMPUTER VISION | 8 MIN READ · ~8 MIN LISTEN
- AI · AI AGENTS | 9 MIN READ · ~8 MIN LISTEN

Overlay must use the prepared dark bottom gradient and remain readable on every cover.

## 6. Hard card density contract

Title:
- maximum 2 visible lines at every viewport;
- full title remains semantically present;
- use standard line-clamp plus the WebKit-compatible clamp and max-height fallback;
- do not manually insert line breaks or weaken titles just to fit.

Description:
- keep it for now;
- use `cardDescription` when supplied;
- maximum 2 visible lines;
- canonical metadata must continue using full `description`.

Current cardDescription values are already prepared in data/writing.ts.

## 7. Cover contract

Use the existing real/public-safe visual sources.

Forecast:
- actual Presaira reliability data;
- dark navy calibration visual;
- no top taxonomy label.

Oil:
- real public SAR case-study image;
- source cropped/scaled so the baked-in technical header at the extreme top does not compete;
- no duplicate taxonomy label;
- no fabricated boxes/metrics.

AI agent:
- public-safe evidence/unknown/claim/authority diagram;
- no fake product UI or private data;
- no duplicate taxonomy label.

## 8. Audio-ready contract

Prepared article fields:
- `listenMinutes?: number`;
- `audio?: { src, mimeType, durationSeconds }`.

Current three have listenMinutes=8 and NO fake audio object.

Behavior:
- listenMinutes but no audio => card/article timing uses `~8 min listen`;
- no audio => no Listen player and no AudioObject;
- real audio => remove estimate marker, render `WritingListen` near article top, emit AudioObject;
- native `<audio controls preload="metadata">`;
- never autoplay;
- keep full article text on the same route;
- do not substitute browser speech synthesis for real narration.

## 9. Prepared implementation already on branch

Do not start from blank files. The branch already contains or modifies:
- `data/writing.ts` — cardDescription/listenMinutes/audio + helpers;
- `components/writing-card.tsx` — in-cover metadata overlay;
- `components/home-writing.tsx` — personal heading + post-grid CTA;
- `components/writing-cover.tsx` — duplicate cover labels removed;
- `components/writing-authority.tsx` — archive heading + listen timing;
- `components/writing-listen.tsx` — real-audio-only native player;
- `app/writing-system.css` — refined desktop/mobile hierarchy and hard clamps;
- article BlogPosting AudioObject projection;
- writing.json/discovery listen/card fields;
- focused v1.1 test assertions;
- updated design spec and blueprint.

Treat these as the starting implementation. Fix defects; do not rebuild a parallel system.

## 10. Required code review before running tests

Audit the branch for:
- TypeScript compile correctness;
- selectors that still reference `.writing-system-card-meta` or `.writing-system-cover-label`;
- tests still expecting H1/H2 `Writing.`;
- stale visible lede expectations;
- relative/absolute media URL correctness;
- audio schema emitted only when audio exists;
- oil crop effectiveness;
- reduced-motion static crop preservation;
- no regressions to Selected Work or Opportunity.

Use repository search:
`rg 'writing-system-card-meta|writing-system-cover-label|Writing\\.|Notes on AI, technology|Go to article|closing-note|writing carousel'`

Only historical/docs references explicitly marked superseded may remain.

## 11. Tests that must be updated/passing

At minimum:
- `tests/writing-visual-matrix.spec.ts`;
- `tests/iteration12.writing-authority.spec.ts`;
- `tests/iteration8.discoverability.spec.ts`;
- `tests/mobile-composition.spec.ts`;
- `tests/frontend-overhaul-phase-g.spec.ts`;
- `tests/frontend-overhaul-phase-i.spec.ts` where comments/limits are stale;
- `tests/writing-independent-fixture.spec.ts`.

Mandatory v1.1 assertions:
- exact Home H2;
- Home lede absent;
- 3 current Home cards;
- CTA after grid;
- 3/2/1 computed columns;
- metadata overlay contained inside cover;
- no separate metadata row;
- no top cover taxonomy labels;
- card title <=2.1 computed line heights;
- card description <=2.1 computed line heights;
- 16:9 cover ratio;
- current listen estimates visible;
- no player/AudioObject without real audio;
- fixture with real audio generates exact timing and AudioObject projection;
- no Writing horizontal overflow at 320/390/430;
- no Writing carousel/dots/autoplay;
- no-JS readability;
- reduced-motion correctness;
- axe clean;
- all current slugs/canonicals unchanged;
- writing.json/discovery include concise/listen fields and no fake audio;
- drafts remain absent.

## 12. Validation order

Run from a clean install with repository-required Node version:
1. `npm ci`
2. `npm run typecheck`
3. `npm run lint`
4. `npm run build`
5. `CLOUDFLARE_STATIC_EXPORT=1 npm run build`
6. focused Writing/discovery/Phase G/mobile tests
7. `npm run test:browser`
8. `git diff --check`

Do not weaken an acceptance predicate merely to make CI green.

## 13. Render and inspect

Capture Home Writing:
- 1920×1080
- 1440×1000
- 1280×800
- 1024×768
- 430×932
- 390×844
- 320×568

Capture `/writing`: 1440×1000 and 390×844.
Capture forecast article: 1440×1000 and 390×844.
Capture full Home: 1920×1080 and 390×844.

Inspect screenshots manually. Automated geometry does not replace visual acceptance.

Primary desktop question: is the system still elegant while denser and more editorial?
Primary mobile question: does it scan like a compact article feed rather than three long previews?

## 14. Allowed visual tuning

Within this pass you may tune:
- heading size/line breaks;
- vertical gaps;
- overlay padding/gradient strength;
- card title size within the hard two-line contract;
- card description size/line-height;
- oil image crop;
- small metadata size/spacing;
- CTA spacing;
- article Listen-control spacing.

Do not change:
- section title wording;
- CTA placement;
- metadata placement;
- two-line card-title rule;
- 3/2/1 grid;
- descriptions being present for now;
- current article slugs/body claims;
- no-fake-audio rule.

## 15. Documentation after acceptance

Update existing Writing execution/QA/status docs with a v1.1 supersession note instead of erasing the historical first pass.

Update AGENTS.md so future agents cannot restore the old heading/lede/metadata placement.

## 16. Delivery

Follow AGENTS.md end-to-end. Do not stop at local green tests.

Required:
1. coherent commits;
2. push/update the v1.1 PR;
3. required checks green;
4. merge accepted result to main;
5. production workflow completes;
6. verify live `/`, `/writing`, the three article routes, and `/writing.json`;
7. verify the live visual result still matches v1.1.

Final report:
- branch;
- files changed;
- data/audio changes;
- exact validation results;
- screenshot set reviewed;
- feature SHA(s);
- PR;
- merge/main SHA;
- production workflow;
- live route verification;
- genuine blockers only.

Do not return alternative design concepts. Execute the prepared v1.1 system, tune objective defects, validate, and ship.
