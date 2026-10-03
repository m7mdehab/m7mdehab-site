# Method Story — Desktop Pass 02 Execution Packet

**Status:** setup complete / execution remains  
**Branch:** `method-story-desktop-pass-02-setup`  
**Scope:** desktop only, `min-width: 1100px`  
**Do not redesign the mobile/tablet composition in this pass.**

## Locked visual brief

Five stages must read as clearly separate parts of one system:

1. Messy reality
2. Expose the truth
3. Reduce ambiguity
4. Build the system
5. Reliable outcomes

The stages remain visually connected only through exact edge-to-edge connector geometry.

The primary quality bar is **geometric precision**. A connector that stops a few pixels short of a card, starts in empty space, or misses a center point is a failure.

## Intro — locked

Desktop only:

- hide `APPROACH`;
- hide the eyebrow rule;
- title stays `I turn messy reality into reliable systems.`;
- title is one line;
- support copy stays `I make unclear problems legible, reduce ambiguity, then build the smallest system that can carry the job.`;
- support copy is one smaller line directly under the title.

The desktop CSS for this has already been staged in `app/method-story.css`.

## Geometry — locked

### Messy → Expose

- exactly 4 paths;
- source = right-center edge of each messy card;
- destination = left edge of the Expose stack;
- destinations are distributed vertically across the Expose stack.

### Expose → Reduce

- exactly 10 paths;
- sources are evenly distributed across the full right edge of the Expose stack;
- all 10 paths converge to the left-center edge of the Reduce card;
- the final path endpoints must physically touch the Reduce card.

### Reduce

- one tall decision card;
- centered under the stage heading;
- taller than the previous implementation;
- outgoing path starts at exact right-center edge.

### Reduce → Build

- one connector;
- exact right-center of Reduce card → exact left-center of Build system.

### Build → Outcomes

- one build entry line into a vertical bus;
- exactly 5 bus nodes;
- each node shares the exact Y center of one outcome row;
- exactly 5 output paths;
- each path starts at its bus node and terminates at exact left-center edge of its corresponding outcome row.

Outcome order is locked:

1. Validated migration
2. Decision-ready analytics
3. Evaluated model
4. Governed AI workflow
5. Usable product

## Work already completed

Do not redo this work.

### DOM anchors

`components/method-story-canvas.tsx` already exposes:

- `data-method-anchor="messy-1"`
- `data-method-anchor="messy-2"`
- `data-method-anchor="messy-3"`
- `data-method-anchor="messy-4"`
- `data-method-anchor="expose-stack"`
- `data-method-anchor="reduce-card"`
- `data-method-anchor="build-system"`
- `data-method-anchor="build-bus"`
- `data-method-anchor="outcome-1"` through `outcome-5`
- five `data-method-bus-node` elements

### Measured geometry engine

`components/method-story-connector-geometry.ts` is complete.

It already:

- reads actual transformed DOM bounds with `getBoundingClientRect()`;
- converts them into canvas-local coordinates;
- computes 4 exact Messy → Expose paths;
- computes 10 Expose → Reduce paths;
- computes Reduce → Build;
- computes Build → bus;
- computes the bus line;
- computes 5 outcome-aligned bus nodes;
- computes 5 bus → Outcome paths;
- exports final anchor coordinates for geometric tests.

Do not replace this with new hand-authored SVG path strings.

### Geometry subscription

`components/use-method-story-desktop-geometry.ts` is complete.

It already:

- measures only when enabled;
- watches anchor sizing with `ResizeObserver`;
- remeasures on desktop animation progress;
- remeasures on resize/orientation changes;
- batches measurement into `requestAnimationFrame`;
- exposes the measured geometry through `useSyncExternalStore`.

Do not implement a second measurement system.

### Measured SVG renderer

`components/method-story-desktop-connectors.tsx` is complete.

It already renders:

- 4 input paths;
- 10 convergence paths;
- Reduce → Build;
- Build → bus;
- vertical bus;
- 5 nodes;
- 5 bus → Outcome paths;
- existing Motion progress windows.

Use this component. Do not reproduce the logic inside `method-story-canvas.tsx`.

### CSS groundwork

`app/method-story.css` already contains the desktop Pass 02 scaffold:

- one-line intro;
- hidden eyebrow;
- smaller Messy cards;
- less-cramped Expose stack;
- taller centered Reduce card;
- 5-node bus baseline;
- measured connector styles.

Tune values only after integrating the measured geometry.

### Contract

`components/method-story-contract.ts` already defines:

`METHOD_STORY_DESKTOP_PASS_02`

Acceptance counts:

- Messy → Expose: 4
- Expose → Reduce: 10
- Reduce → Build: 1
- Build → Outcomes: 5
- edge-touch tolerance: 2px
- center tolerance: 10px

## Remaining execution

The remaining engineering should be mechanical.

### 1. Integrate measured geometry in `MethodStoryCanvas`

Import:

```tsx
import { MethodStoryDesktopConnectors } from "@/components/method-story-desktop-connectors";
import { useMethodStoryDesktopGeometry } from "@/components/use-method-story-desktop-geometry";
```

After `progress` exists:

```tsx
const desktopGeometry = useMethodStoryDesktopGeometry(
  rootRef,
  progress,
  isDesktop,
);
```

Render the prepared measured connector component inside the canvas:

```tsx
{isDesktop ? (
  <MethodStoryDesktopConnectors
    geometry={desktopGeometry}
    progress={progress}
    enhanced={enhanced}
  />
) : (
  /* current legacy connector SVG for tablet/mobile */
)}
```

### 2. Preserve legacy connector system below 1100px

Do not remove tablet/mobile legacy geometry in this pass.

The existing static SVG should remain the non-desktop fallback.

Do not alter the current mobile vertical story.

### 3. Desktop build bus

Once measured connectors are live:

- hide the old CSS bus on desktop;
- measured SVG bus + measured SVG nodes become the desktop source of truth;
- retain CSS bus below 1100px.

Suggested desktop CSS:

```css
@media (min-width: 1100px) {
  .method-story__system-bus {
    visibility: hidden;
  }
}
```

Do not delete the DOM bus because it remains useful for tablet/mobile and acceptance semantics.

### 4. Remove duplicate desktop connector rendering

Mark the current connector SVG as legacy, for example:

```tsx
className="method-story__connectors method-story__connectors--legacy"
```

Then render it only for non-desktop, or hide it on desktop after measured connectors exist.

There must never be two connector systems visible on desktop.

## Visual tuning order

After integration, tune in this order:

1. one-line title size;
2. one-line support size;
3. overall stage breathing room;
4. Messy card size/spacing;
5. Expose stack scale;
6. Expose tag placement;
7. Reduce card height/vertical center;
8. Build system center;
9. bus horizontal offset;
10. connector curvature;
11. connector brightness.

Do not move anchor endpoints manually. The endpoints come from DOM geometry.

## Connector style

Use restrained curves.

- no decorative flourishes;
- no floating endpoint circles except the 5 explicit build bus nodes;
- source/destination edges are the visual anchors;
- convergence lines may vary in brightness, but all physically terminate at Reduce;
- primary flow can be brighter than secondary lines;
- no thick lines.

## Required desktop screenshots

Review:

- 1440×1000 — primary
- 1920×1080 — large desktop

Do not approve using reduced-motion screenshots only. Review the normal animated state with the section centered.

## Acceptance tests to add

Keep the existing setup test.

Add one live measured-geometry test at 1440×1000:

1. center the Method Story in the viewport;
2. wait for geometry to settle;
3. assert:
   - 4 `input-expose` measured paths;
   - 10 `expose-reduce` measured paths;
   - 1 Reduce → Build path;
   - 5 measured bus nodes;
   - 5 `build-outcome` measured paths;
4. read the geometry or SVG endpoints;
5. compare them to live DOM bounds;
6. endpoint error must be <= 2px.

Also assert:

- Reduce card center X is within 10px of Reduce stage center X;
- Build system center X is within 10px of Build stage center X;
- when the section is centered in the viewport, every stage/output opacity is >= 0.99.

## Do not

- do not hand-tune endpoint coordinates;
- do not reintroduce static desktop connector path strings;
- do not redesign mobile;
- do not add a dependency;
- do not add GSAP;
- do not change the five-stage narrative;
- do not merge if endpoint tests fail;
- do not compensate for bad geometry with thicker lines or glow.

## Validation

Run:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

Then:

- Phase F Playwright tests;
- full browser suite;
- 1440×1000 animated visual review;
- 1920×1080 animated visual review;
- reduced-motion regression;
- no horizontal overflow.

## Completion report

Report only:

1. files changed;
2. commit SHA(s);
3. test results;
4. 1440/1920 visual findings;
5. exact maximum connector endpoint error in pixels;
6. remaining desktop defects, if any;
7. whether desktop Pass 02 is ready to merge;
8. confirm mobile/tablet were not redesigned.
