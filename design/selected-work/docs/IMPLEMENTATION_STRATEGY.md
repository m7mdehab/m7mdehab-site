# Selected Work artboard implementation strategy

## Goal

Replace the current split visual/copy selected-work carousel with six brand-specific rounded landscape artboards that faithfully reconstruct the approved references using:

- the supplied clean background plates;
- real supplied logos;
- live HTML text;
- SVG/vector foreground systems;
- project-specific, restrained motion;
- a robust carousel;
- progressive card-to-case-study transitions;
- a deliberate mobile adaptation.

The finished full-card PNGs are references only. Production must remain semantic, responsive, accessible and truthful.

## Phase 0 — preflight and safety

1. Confirm current branch/PR state. Expected at handoff: `feat/mobile-composition-pass`, PR #26 draft, head `0b88bc26404192654abff31ee8d3b5f2f89ebe54`.
2. Read repository agent instructions and current selected-work implementation before editing.
3. Run the existing green baseline (`typecheck`, `lint`, `build`, focused browser suite if available) before changing dependencies.
4. Check the current Next 16.3.x security patch from official sources. If a required patch newer than 16.3.4 exists, perform it as a separate prerequisite commit and prove the existing suite still passes. Do not upgrade React merely for ViewTransition.
5. Preserve all completed hero/credibility work and all lower homepage sections.

## Phase 1 — ingest prepared assets

1. Copy `source/backgrounds/*.png` into a non-public design/source directory if long-term canonical sources are desired.
2. Copy `reference/full/*.png` and `reference/grid/*.png` into a non-public `design/selected-work/reference/` directory. These must never be used as production card rasters.
3. Copy `runtime/backgrounds/*.webp` to `public/selected-work/backgrounds/`.
4. Copy `runtime/logos/*` to `public/selected-work/logos/`.
5. Preserve file names and checksums unless there is a documented reason to change them.
6. Do not commit the original duplicate 53 MB ZIP or duplicate JPG card exports.

Commit checkpoint: `chore(work): ingest selected-work artboard sources`

## Phase 2 — formal artboard data model and debug tooling

1. Add `data/selected-work-artboards.ts`, starting from `manifest/selected-work-artboards.seed.ts`.
2. Keep canonical dimensions `1683×935` and stable node IDs.
3. Add a reusable source-coordinate placement helper.
4. Build a dev-only overlay/debug mode, e.g. `/?cardDebug=presaira` or `?cardDebug=1`, supporting:
   - reference only;
   - implementation only;
   - 50/50 opacity overlay;
   - optional 100 px coordinate grid;
   - pointer coordinate readout if practical.
5. Never ship the full reference PNG as a visible production layer.

Commit checkpoint: `feat(work): add selected-work artboard system`

## Phase 3 — Presaira static calibration card

Presaira is the architecture proving ground. Do not implement the other five until Presaira proves the artboard approach.

Build:

- clean Presaira background plate;
- live `PRESAIRA` wordmark using the prepared Space Grotesk treatment;
- tagline and publish/score statement;
- supplied World Cup, Champions League, F1 and NBA logos;
- competition timeline/orbit SVG;
- reliability/calibration chart using repository-backed points;
- `104 / 104` proof record;
- responsive typography and rounded artboard shell.

No Motion and no carousel rewrite yet. Static only.

Acceptance:

- at 1440 and 1920 desktop viewports, overlay hierarchy and group placement closely match the approved reference;
- no AI-raster text remains;
- no project claim regresses to World Cup-only framing;
- no logo is redrawn or filtered.

Commit checkpoint: `feat(work): reconstruct Presaira artboard`

## Phase 4 — remaining five static artboards

Implement in this order so architectural complexity grows gradually:

1. OpportunityOS — HTML + SVG flow/gate system.
2. Ghareeb Oglu — official logo + SVG commerce journey.
3. Oil Spill Detection — editorial typography + conceptual detection overlay.
4. Solar Site Selection — title/process/metrics + suitability overlay/legend with truth-corrected callouts.
5. Makhbazy — official logo + public-safe phone/journey illustration.

Each project must look intentionally different. Do not collapse them into one repeated template beyond the shared artboard shell.

Truth rule: `manifest/source-truth.json` and repository evidence override generated reference wording.

Commit checkpoint after each card or one coherent pair; do not wait for all five to push a giant batch.

## Phase 5 — replace the carousel

Install/pin:

- `embla-carousel-react@8.6.0`
- `embla-carousel-autoplay@8.6.0`

Replace the current custom timer/track logic only after six static cards are accepted.

Required behavior:

- one active project at a time on desktop;
- manual drag/swipe;
- dot selection;
- hover pauses autoplay;
- focus within pauses autoplay;
- after hover/focus/drag ends, autoplay resumes from the current project;
- reduced motion becomes manual/static;
- no seams/blank gaps;
- active dot contains or drives a real timer based on actual autoplay state, not a disconnected decorative CSS loop.

Keep the card itself a normal link to `/work/[slug]`.

Commit checkpoint: `feat(work): move selected work to Embla carousel`

## Phase 6 — project-specific motion

Install/pin `motion@13.4.4` only now.

Use `motion/react` and SVG path drawing sparingly:

- Presaira: calibration line draws once; active competition node pulses subtly.
- OpportunityOS: a signal travels Source → Evidence → Claim → Generate → Authority Gate; controlled submit gets the final restrained activation.
- Ghareeb Oglu: commerce path travels Browse → Product → Cart → Fulfillment.
- Oil Spill Detection: cyan contour/detection line resolves or traces in once.
- Solar Site Selection: AOI/criteria → suitability → rank progression; top candidate pulses once.
- Makhbazy: journey connector moves through Discover → Order → Track → Receive.

Rules:

- motion begins on active slide/section entry, not continuously everywhere;
- no layout-affecting animation;
- no infinite distracting loops except a very subtle active-node pulse if justified;
- full `prefers-reduced-motion` static fallback.

Commit checkpoint: `feat(work): animate selected-work evidence paths`

## Phase 7 — card to case-study transition

Do a compatibility spike before implementation.

Preferred path:

- use native same-origin View Transition API progressively;
- give active card artwork and destination case-study hero a stable project-specific `view-transition-name` only during navigation;
- use normal navigation in unsupported/reduced-motion contexts;
- do not upgrade React only to obtain React 19.3 `<ViewTransition>`.

If the existing Next 16.3 App Router/navigation behavior makes a reliable SPA transition awkward, use the native cross-document `@view-transition { navigation: auto; }` path where appropriate and keep the feature progressive.

Commit checkpoint: `feat(work): add project view transitions`

## Phase 8 — mobile art direction

Desktop artboard parity is the source of truth. Mobile is an adaptation using `docs/MOBILE_ADAPTATION.md` and each manifest's keep/simplify rules.

Required:

- landscape-biased cards;
- no black rail container;
- no return to tall stacked cards;
- readable text;
- intentional next-card peek only if useful;
- iPhone safe area + fixed bottom nav remain correct;
- no page-level horizontal overflow;
- same project identity, palette and evidence story as desktop.

Commit checkpoint: `fix(work): art-direct selected work for mobile`

## Phase 9 — QA, visual approval, and permanent goldens

1. Run all existing gates.
2. Run focused interaction/accessibility tests for selected work.
3. Capture desktop/mobile screenshots for all six active states.
4. Use reference overlay for manual/art-direction review.
5. After the user approves the coded implementation, commit Playwright screenshots of the coded render as the permanent regression goldens. Do not use the AI full-reference PNGs as automated whole-image goldens.
6. Verify Cloudflare/Vinext/workers.dev staging paths exactly as the branch already does.
7. Push each coherent checkpoint to the same PR branch.
8. Keep PR #26 draft/unmerged until explicit user instruction.

## Definition of done

The section is done only when:

- six cards are unmistakably the approved six designs;
- they use clean source backgrounds plus real live foreground UI/text;
- every supplied logo is faithful;
- copy is true and public-safe;
- desktop is visually reference-faithful;
- mobile is polished and landscape-biased;
- autoplay/manual carousel behavior is robust;
- project-specific motion is subtle and meaningful;
- card → case-study transition is progressive and safe;
- existing site sections and tests remain intact;
- production does not ship the reference PNG cards as a shortcut.
