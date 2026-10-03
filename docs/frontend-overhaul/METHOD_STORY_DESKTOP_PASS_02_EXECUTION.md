# Method Story — Desktop Pass 02 Execution Packet

**Status:** heavy setup complete / final execution + visual tuning remain  
**Branch:** `method-story-desktop-pass-02-setup`  
**Draft PR:** #50  
**Scope:** desktop only, `min-width: 1100px`

## Locked outcome

The five stages must read as clearly separate parts of one coherent system:

1. Messy reality
2. Expose the truth
3. Reduce ambiguity
4. Build the system
5. Reliable outcomes

The stages connect through exact edge-to-edge geometry. A connector that starts or ends even a few pixels away from its intended boundary is a defect.

## Locked desktop intro

Already staged in CSS:

- `APPROACH` hidden on desktop;
- eyebrow rule hidden with it;
- `I turn messy reality into reliable systems.` stays on one line;
- support copy sits directly below on one smaller line;
- tablet/mobile are not redesigned in this pass.

## Precision model already built

Do **not** rebuild this architecture.

### Exact DOM ports

`components/method-story-canvas.tsx` already exposes exact transformed edge ports:

- `messy-1-out` through `messy-4-out`;
- five measured evidence sheets;
- `reduce-in` and `reduce-out`;
- `build-in` and `build-out`;
- `outcome-1-in` through `outcome-5-in`.

The ports are zero-size invisible edge points so rotated/transformed cards can be measured precisely instead of using axis-aligned approximations.

### Geometry engine

`components/method-story-connector-geometry.ts` already computes:

- 4 Messy → Expose paths;
- 10 Expose → Reduce paths;
- 1 Reduce → Build path;
- Build → bus entry;
- vertical bus;
- 5 bus nodes aligned to the 5 outcome centers;
- 5 bus → Outcome paths.

It uses live `getBoundingClientRect()` measurements in canvas-local coordinates.

Important mapping:

- the 4 Messy paths terminate on four separated sheet edges;
- the 10 Expose paths use two right-edge sources per evidence sheet;
- all 10 converge on the exact `reduce-in` point;
- Reduce → Build uses exact `reduce-out` → `build-in`;
- the Build bus is derived from live outcome centers;
- every outcome path terminates on its exact left-center port.

### Live measurement subscription

`components/use-method-story-desktop-geometry.ts` already:

- measures only on desktop;
- watches layout changes with `ResizeObserver`;
- follows Motion progress;
- follows resize/orientation changes;
- batches reads through `requestAnimationFrame`;
- exposes geometry through `useSyncExternalStore`.

Do not add a second measurement system.

### Measured connector renderer

`components/method-story-desktop-connectors.tsx` already renders the measured SVG paths and preserves the existing Motion sequence.

### Integration

The measured connector system is already integrated into `MethodStoryCanvas`.

Desktop:
- uses the measured connector renderer.

Tablet/mobile:
- retain the legacy connector SVG.

The legacy CSS Build bus remains in the DOM for non-desktop behavior but is hidden on desktop.

## Desktop geometry already staged

`app/method-story.css` already contains:

- one-line intro treatment;
- smaller Messy cards;
- less-cramped Expose stack;
- taller centered Reduce card;
- centered Build system;
- five-node bus baseline;
- measured SVG styling;
- exact port positioning.

Treat these values as a prepared baseline. Tune them; do not redesign the composition.

## Test groundwork already built

`tests/helpers/method-story-geometry.ts` already provides path/rect/endpoint measurement helpers.

`tests/frontend-overhaul-phase-f.spec.ts` already includes:

- anchor/port presence;
- five bus-node count;
- single-line intro check;
- 4 input connector count;
- 10 Expose → Reduce connector count;
- centered-section animation completion;
- Reduce/Build centering;
- exact measured endpoint test;
- maximum endpoint tolerance: **2px**.

## Acceptance contract

`METHOD_STORY_DESKTOP_PASS_02` in `components/method-story-contract.ts` is authoritative.

Required counts:

- Messy → Expose: 4
- Expose → Reduce: 10
- Reduce → Build: 1
- Build → Outcomes: 5
- Build bus nodes: 5

Required tolerances:

- connector endpoint error: <= 2px
- Reduce/Build center alignment: <= 10px

## What remains for Luna

Do this in order.

### 1. Validate immediately

Run:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

Then run Phase F first.

If a failure is caused by the prepared implementation, fix the concrete defect without replacing the architecture.

### 2. Review normal-motion desktop renders

Primary:
- 1440×1000

Secondary:
- 1920×1080

Do not approve only from reduced-motion screenshots.

### 3. Tune geometry visually

Only tune where the render proves it is needed:

1. title size so it remains one line without crowding;
2. support-line size/spacing;
3. breathing room between the five stage zones;
4. Messy card scale/spacing;
5. Expose sheet scale/offsets;
6. Evidence / Constraints / Unknowns placement;
7. Reduce card height and vertical center;
8. Build visual center;
9. bus horizontal offset;
10. curve tension/brightness.

Do **not** hand-edit connector endpoints. Endpoints come from measured ports.

### 4. Confirm precision

The exact endpoint test must remain <= 2px.

If an endpoint looks wrong:
- inspect the port placement first;
- fix the port or the visual container geometry;
- do not compensate with an arbitrary SVG coordinate.

### 5. Full validation

After tuning:

- Phase F passes;
- full browser suite passes;
- no horizontal overflow;
- axe passes;
- reduced motion remains complete;
- tablet/mobile behavior remains unchanged;
- Application CI passes;
- Deployment Readiness passes;
- staging acceptance passes unless blocked by a documented unrelated platform issue.

## Explicitly forbidden

- no GSAP;
- no new dependency;
- no hand-authored replacement desktop path strings;
- no mobile redesign;
- no tablet redesign;
- no new stage copy;
- no thicker/glowing lines used to hide endpoint errors;
- no merging before visual review.

## Completion report

Return:

1. files changed;
2. commit SHA(s);
3. Phase F result;
4. full browser-suite result;
5. 1440×1000 findings;
6. 1920×1080 findings;
7. maximum measured endpoint error in pixels;
8. remaining desktop defects, if any;
9. whether PR #50 is ready to leave draft;
10. confirmation that tablet/mobile were not redesigned.
