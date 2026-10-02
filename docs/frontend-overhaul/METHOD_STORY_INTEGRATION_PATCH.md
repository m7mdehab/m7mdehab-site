# Method Story — Zero-Ambiguity Integration Patch

**Purpose:** make the remaining implementation mechanical. No design decisions should be made while applying this patch.

## 1. Activate the prepared section

Replace the contents of `components/home-solve-think.tsx` with:

```tsx
export { MethodStorySection as SolveThinkBridge } from "@/components/method-story-section";
```

This preserves the existing homepage import and route composition while swapping the implementation.

## 2. Activate the prepared stylesheet

In `app/(en)/layout.tsx`, add this import **after every current frontend/mobile/selected-work stylesheet**:

```tsx
import "../method-story.css";
```

Keep it last. The old `.solve-think*` styles may remain loaded temporarily because the rebuild uses the isolated `.method-story*` namespace.

## 3. Do not delete legacy Phase F files during integration

Do not delete or refactor:
- `app/frontend-overhaul-phase-f.css`
- `app/frontend-overhaul-phase-f-fixes.css`
- later phase CSS that contains `.solve-think*` rules
- Arabic method composition

Reason: removal is separate cleanup work and may affect historical/Arabic surfaces. New namespace isolation makes deletion unnecessary for this implementation.

## 4. Replace the Phase F browser-test contract

The existing test asserts the rejected board. Update `tests/frontend-overhaul-phase-f.spec.ts` to this behavioral contract.

Required assertions:

```ts
const section = page.locator("[data-method-story]");
await expect(section).toBeVisible();
await expect(
  section.getByRole("heading", {
    level: 2,
    name: "I turn messy reality into reliable systems.",
  }),
).toBeVisible();

await expect(section.locator("[data-method-input]")).toHaveCount(4);
await expect(section.locator("[data-method-stage]")).toHaveCount(5);
await expect(section.locator('[data-method-stage="expose"]')).toContainText("Expose the truth");
await expect(section.locator('[data-method-stage="reduce"]')).toContainText("Reduce ambiguity");
await expect(section.locator('[data-method-stage="build"]')).toContainText("Build the system");
await expect(section.locator("[data-method-output]")).toHaveCount(5);
await expect(section).toContainText("DECISION-READY");

const cta = section.getByRole("link", { name: /Inspect the evidence/i });
await expect(cta).toHaveAttribute("href", "/work");

await expect(section.locator('[role="tab"]')).toHaveCount(0);
await expect(page.locator(".capability-list")).toHaveCount(0);
await expect(page.locator(".skills-section")).toHaveCount(0);
await expect(page.locator(".about-section")).toHaveCount(0);
```

Retain:
- desktop axe check;
- no-horizontal-overflow helper;
- mobile 390px screenshot;
- reduced-motion test.

Update reduced motion to:

```ts
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto("/");
await settle(page);

const section = page.locator("[data-method-story]");
await expect(section).toBeVisible();
await expect(section.locator("[data-method-canvas]")).toHaveAttribute(
  "data-motion-mode",
  "reduced",
);
await expect(section.locator("[data-method-stage]")).toHaveCount(5);
await expect(section.locator("[data-method-output]")).toHaveCount(5);
```

Add screenshot passes:
- 1440×1000 → `method-story-1440.png`
- 1920×1080 → `method-story-1920.png`
- 1024×768 → `method-story-1024.png`
- 390×844 → `method-story-390.png`

## 5. First render: only fix objective defects

On the first render, fix only:
- clipping;
- overlap;
- text wrapping that breaks hierarchy;
- connector misses;
- illegible contrast;
- viewport overflow;
- responsive collapse defects;
- animation timing that prevents comprehension.

Do not redesign because the first render is imperfect.

## 6. Visual tuning sequence

Tune in this exact order:

1. overall section height;
2. headline/support alignment;
3. five-stage horizontal geometry;
4. input-card disorder without collisions;
5. evidence-stack depth;
6. convergence center;
7. system-block geometry;
8. output-row alignment;
9. connector routing;
10. contrast hierarchy;
11. animation timing;
12. mobile vertical spacing.

Do not tune glow/shadow before geometry is correct.

## 7. Motion tuning sequence

Verify one normal scroll from above the section to below it.

Expected order:
1. input fragments settle;
2. evidence surfaces;
3. branches converge;
4. system blocks lock;
5. outputs validate;
6. status resolves.

Reject if:
- two unrelated stages animate strongly at the same time;
- the section keeps moving after it is complete;
- animation begins before the user can see the section;
- animation completes before the user reaches the middle;
- the user needs to reverse-scroll to understand it.

## 8. Responsive acceptance

### 1920×1080
- shell remains visually centered;
- section does not spread into excessive empty space;
- headline stays two lines;
- outcomes remain clearly readable;
- story feels like one composition.

### 1440×1000
This is the primary tuning viewport.

### 1024×768
- tablet composition must not simulate five compressed desktop columns;
- no input/output collision;
- center transformations remain recognizable.

### 390×844
- all five stages visible sequentially;
- no tabs;
- no horizontal scroll;
- vertical spine is continuous;
- output rows fit without abbreviation;
- no stage becomes a miniature desktop diagram.

## 9. No-JavaScript check

The component is designed so the server-rendered/static state is the completed story.

With JavaScript disabled:
- H2 remains visible;
- all five stage titles/details remain visible;
- all four input labels remain visible;
- all five outputs remain visible;
- CTA works;
- final visual state remains coherent.

Any hidden semantic content is a regression.

## 10. Pre-existing deployment caveat

A staging run **before activation of this method story** successfully:
- installed;
- typechecked;
- linted;
- built the static export;
- verified `out/writing.json` existed;
- deployed to Cloudflare.

Its live-origin verification then returned persistent `404` for `/writing.json` while the other checked routes were returning `200`.

Therefore, if that exact staging failure persists after method-story integration, do **not** assume the method story caused it. Compare against the baseline run and isolate the deployment/static-asset issue separately.

Baseline evidence:
- commit before method-story activation: `a5cb3cb2f33efa7317119d97b1ae1f6616404a71`
- staging run: `37075734416`
- failing route: `/writing.json`
- artifact verification had already confirmed `out/writing.json` existed.

Do not weaken the staging contract merely to make the workflow green.

## 11. Definition of implementation-complete

Implementation is not complete until:
- prepared section is wired into Home;
- stylesheet is imported last;
- updated Phase F contract passes;
- full browser suite passes;
- screenshots at all four target viewports are inspected;
- rendered output matches the visual story, not merely the DOM structure;
- production delivery workflow is completed per `AGENTS.md`.
