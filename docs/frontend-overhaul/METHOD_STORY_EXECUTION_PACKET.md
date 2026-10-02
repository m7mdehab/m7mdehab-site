# Method Story Rebuild — Execution Packet

**Date:** 2026-10-03  
**Authority:** Mohammed Ehab ElNomany  
**Status:** DESIGN LOCKED / READY FOR IMPLEMENTATION  
**Scope:** English homepage method chapter currently rendered by `SolveThinkBridge`

## 0. Directive

Replace the current “I like the messy part.” board with one authored transformation story that is understandable before the visitor reads the supporting copy.

The visual must communicate, at a glance:

> **messy reality → expose the truth → reduce ambiguity → build the system → reliable outcomes**

This is a rebuild, not a polish pass. The existing board/grid, tabs, three unrelated glyphs, output list treatment, and looping tracer are not design constraints.

Do not redesign this brief during implementation. Do not introduce alternative art directions. Execute this packet, render it, and refine only against the acceptance criteria below.

## 1. Repository facts already verified

- Framework: Next.js 16.3.7 / React 19.2.7.
- Existing motion dependency: `motion@13.4.4`.
- Existing smooth-scroll layer: Lenis via `components/smooth-scroll.tsx`.
- Existing method implementation:
  - `components/home-solve-think.tsx`
  - `app/frontend-overhaul-phase-f.css`
  - `app/frontend-overhaul-phase-f-fixes.css`
  - later phase CSS files also contain legacy `.solve-think*` overrides.
- Existing browser gate:
  - `tests/frontend-overhaul-phase-f.spec.ts`
- English Home currently inserts `<SolveThinkBridge />` after Selected Work.
- No new animation package is required.

### Dependency decision

**Use `motion/react`. Do not add GSAP.**

Reason: Motion already exists in the production dependency graph, is used in project artboards, supports scroll progress/path animation, and avoids shipping a second animation runtime for one chapter.

## 2. Locked copy

### Eyebrow

`APPROACH`

### Headline

**I turn messy reality into reliable systems.**

The phrase **reliable systems** may receive the restrained mint emphasis. Do not gradient-fill the entire headline.

### Supporting line

**I make unclear problems legible, reduce ambiguity, then build the smallest system that can carry the job.**

### Journey labels and explanations

1. **Messy reality**  
   Fragmented, inconsistent and unclear.

2. **Expose the truth**  
   Surface evidence, constraints and unknowns.

3. **Reduce ambiguity**  
   Turn fuzzy questions into explicit mappings and decisions.

4. **Build the system**  
   Create the smallest reliable system that works in practice.

5. **Reliable outcomes**  
   Validated, usable and ready for real use.

### Input fragments

- Fragmented data
- Conflicting definitions
- Missing context
- Incomplete evidence

### Expose tags

- Evidence
- Constraints
- Unknowns

### Output rows

- Validated migration
- Decision-ready analytics
- Evaluated model
- Governed AI workflow
- Usable product

### Status

`DECISION-READY`

### CTA

**Inspect the evidence ↗** → `/work`

Do not add a second CTA that goes to the same destination.

## 3. Composition

### Desktop: >= 1100px

The section is one compact narrative canvas, not a table.

1. Header occupies the top ~30–34%:
   - eyebrow top-left;
   - headline left, roughly 58% width;
   - supporting sentence right, roughly 34–38% width;
   - vertical alignment is optical, with support copy aligned near the second headline line.

2. Story occupies the lower ~56–60%:
   - five visible states across one horizontal field;
   - no enclosing spreadsheet border;
   - no strong column borders;
   - one shared connector system visually binds all stages.

3. Footer/CTA occupies the remaining ~8–10%.

Recommended outer metrics at a 1440px viewport:
- shell: inherit existing `.shell` width;
- section padding: 96px top / 88px bottom;
- header gap to story: 54–64px;
- story min-height: 410px;
- story max-height: 470px;
- CTA margin-top: 26px.

Story column proportions:
- messy: 18%
- expose: 20%
- reduce: 18%
- build: 18%
- outcomes: 26%

The stages must read as a single left-to-right transformation, not five cards.

### Tablet: 720–1099px

Do not squeeze five equal columns.

Use:
- one-column intro;
- a three-zone story:
  - input zone;
  - center transformation zone containing Expose → Reduce → Build;
  - outcome zone;
- center transformation remains horizontal inside its zone;
- story height around 520–600px;
- output rows remain fully readable.

### Mobile: < 720px

Do not use tabs. Do not hide stages.

Recompose as a vertical journey:

`Messy reality`
↓
`Expose the truth`
↓
`Reduce ambiguity`
↓
`Build the system`
↓
`Reliable outcomes`

Requirements:
- one vertical mint spine;
- each stage enters once as it approaches the viewport;
- input fragments remain visibly disordered;
- stages progressively become more regular;
- output list is the calmest/most ordered state;
- all copy remains visible without interaction;
- no horizontal scroll;
- no desktop diagram scaled down.

## 4. Visual language

### Background

Use a deep near-black green field, not pure black:

- `--method-bg: #08110f`
- `--method-bg-2: #0b1512`
- `--method-surface: #0e1915`
- `--method-surface-raised: #111f1a`

Atmosphere:
- one restrained radial wash centered near Build/Outcomes;
- subtle edge vignette;
- optional two extremely faint contour arcs at the outer corners;
- no particle field across the whole section;
- no generic glowing orbs;
- no research-grid dominating the composition.

Suggested section background:

`radial-gradient(circle at 69% 56%, rgba(125, 226, 185, .075), transparent 28%), linear-gradient(180deg, #08110f 0%, #0a1311 100%)`

### Typography

Use the current Manrope/Newsreader system already loaded by the site.

- Headline: Manrope, 650–700, compact tracking.
- Stage titles: Manrope, 680.
- Supporting copy/body: Manrope, 450–520.
- Do not use serif for stage titles; the system should feel engineered and calm.
- Small labels: uppercase, 0.12–0.16em tracking.

Desktop headline target:
- `clamp(58px, 5.4vw, 88px)`
- line-height `.94`
- tracking around `-0.055em`
- max-width ~780px.

### Palette

- primary text: `#F2F4EF`
- secondary text: `#A9B3AD`
- tertiary text: `#75827B`
- line: `rgba(186, 226, 205, .14)`
- stronger line: `rgba(186, 226, 205, .28)`
- mint accent: `#91E1BD`
- mint bright: `#B8F2D5`
- blue-green secondary line only: `#9ACFD3`
- unknown/warning accent only: `#D6A25E`

Do not introduce purple, electric blue, red, or multicolor gradients.

### Surfaces

Use shallow translucent dark surfaces with fine borders.

Preferred:
- background `rgba(17, 31, 26, .72)`
- border `1px solid rgba(190, 229, 208, .16)`
- small shadow `0 16px 46px rgba(0,0,0,.16)`

Avoid large blurred glass panels. Blur is optional only on small cards and must not be required for the look.

## 5. Stage-by-stage visual specification

### A. Messy reality

Purpose: immediate visual disorder without looking ugly.

Use four floating dark fragments:
- 170–190px wide desktop;
- slight rotations between -5° and +5°;
- uneven vertical rhythm;
- fine icons at left;
- a few detached nodes/squares around them.

Card order:
1. Fragmented data — database-stack icon
2. Conflicting definitions — warning/branch icon
3. Missing context — document icon
4. Incomplete evidence — question-circle icon

Icons are custom inline SVG, 1.35px stroke, round caps/joins. Do not use Lucide for the main story.

Animation:
- fragments resolve from ±8–16px offset and ±2–4° extra rotation into their final intentionally imperfect positions;
- detached nodes fade/translate in;
- no endless jitter.

### B. Expose the truth

Purpose: visual reveal/inspection.

Use 4–5 thin “evidence sheets” layered in depth:
- progressively aligned from left to right;
- each sheet contains only abstract horizontal evidence marks;
- three small chips float around the stack:
  - Evidence — mint
  - Constraints — muted teal
  - Unknowns — warm amber

Animation:
- sheets reveal back-to-front;
- irrelevant/noisy nodes from stage A fade to ~25%;
- chips appear after sheets;
- connector path becomes cleaner.

No fake dashboard, chart, or metric.

### C. Reduce ambiguity

Purpose: show many interpretations converging into explicit decisions.

Use:
- 6–8 incoming thin curves/lines;
- lines converge into one bright nucleus;
- nucleus feeds a compact “decision rules” module with three rows;
- only the top/selected row receives a resolved check.

Animation:
- branch lines draw toward the nucleus;
- opacity of unused alternatives drops;
- the chosen path brightens;
- decision module rises 4–6px and reaches full opacity.

The visual must make “many possibilities → explicit choice” obvious without reading the paragraph.

### D. Build the system

Purpose: turn resolved logic into an operating system.

Use three stacked modules, drawn as custom SVG perspective blocks:
1. data/storage layer
2. logic/analytics layer
3. delivery/operations layer

Each block:
- front face + top face + right side face;
- subtle mint transparency;
- one simple symbol centered on front face;
- thin vertical bus on the right.

Animation:
- bottom block locks first, then middle, then top;
- each moves 8–12px into place while opacity rises;
- connectors illuminate after the stack is complete;
- avoid 3D spin.

### E. Reliable outcomes

Purpose: visual calm and payoff.

Five aligned rows, equal geometry:
- icon;
- label;
- small resolved check at the left edge/connector junction.

Rows are cleaner, brighter, and more evenly spaced than anything on the left.

Animation:
- rows activate top-to-bottom with ~70–90ms stagger;
- check rings draw once;
- status dot and `DECISION-READY` resolve last.

This final zone should feel materially calmer than the input zone.

## 6. Connector system

Use one absolute SVG overlay spanning the story.

Desktop viewBox:
`0 0 1500 410`

Reference x zones:
- input: 0–270
- expose: 300–575
- reduce: 610–865
- build: 900–1130
- outcomes: 1160–1500

Main semantic flow:
- disordered thin paths from input fragments converge toward expose;
- cleaner paths leave expose;
- multiple paths converge to reduce nucleus;
- one primary path leaves reduce toward build;
- build fan-outs to five outputs.

Stroke rules:
- default: `rgba(172, 221, 197, .22)`
- active: `#91E1BD`
- width: 1–1.4px
- round caps
- no dashed “tech” decoration except one optional short evidence boundary.

The connector SVG is decorative: `aria-hidden="true"`. Meaning remains in semantic HTML.

## 7. Component architecture

Do not keep the whole section as one client component.

### `components/home-solve-think.tsx`

Make this the semantic/server wrapper.

Responsibilities:
- section landmark;
- eyebrow/headline/support copy;
- stage headings and visible explanatory copy;
- input/output semantic lists;
- CTA;
- import the client visual island.

It should not manage active tabs or local state.

Suggested shape:

```tsx
export function SolveThinkBridge() {
  return (
    <section id="method" className="method-story" data-method-story>
      <div className="shell method-story__shell">
        <header className="method-story__intro">...</header>
        <MethodStoryCanvas />
        <footer className="method-story__footer">...</footer>
      </div>
    </section>
  );
}
```

### `components/method-story-canvas.tsx`

Client island.

Responsibilities:
- `useScroll` progress;
- `useTransform` mappings;
- motion wrappers;
- SVG connector path drawing;
- reduced-motion branch;
- stage visual groups only.

No business copy should live only inside this client file.

### `components/method-story-icons.tsx`

Pure inline SVG primitives:
- database
- conflict
- document
- unknown
- evidence sheet marks
- decision check
- analytics line
- nodes
- cube/system

Use one stroke language.

### `app/method-story.css`

New stylesheet with entirely new `.method-story*` class names.

Import it **last** in `app/(en)/layout.tsx` after the current frontend-overhaul/mobile/selected-work CSS imports.

Reason: the repository contains many historical `.solve-think*` overrides. New class names prevent cascade archaeology and keep this rebuild isolated.

Do not delete legacy phase-F CSS in the same implementation pass. The Arabic composition still references legacy method classes and should not be collateral damage.

## 8. Motion implementation

### Library

Import from `motion/react` only.

Recommended APIs:
- `motion`
- `useScroll`
- `useTransform`
- optionally `useSpring` for the primary progress only
- existing `usePrefersReducedMotion` helper

### Scroll model

No pinned scroll. No scroll hijack.

Use:

```ts
const { scrollYProgress } = useScroll({
  target: rootRef,
  offset: ["start 78%", "end 28%"],
});
```

Optional:
```ts
const progress = useSpring(scrollYProgress, {
  stiffness: 115,
  damping: 28,
  mass: 0.35,
});
```

Do not spring every child independently.

### Locked progress windows

- `0.00–0.18` — messy fragments resolve into visible disorder
- `0.16–0.38` — expose sheets + tags reveal; background noise dims
- `0.34–0.60` — ambiguity lines converge; decision row resolves
- `0.56–0.80` — system blocks assemble; bus/connectors activate
- `0.76–1.00` — output rows + checks + decision-ready status resolve

Overlap is intentional. It prevents the sequence from feeling like five separate slides.

### Allowed animated properties

Prefer:
- transform
- opacity
- SVG pathLength/pathOffset
- stroke opacity
- very small scale changes

Avoid animating:
- blur radius
- box-shadow
- width/height
- large filters
- background-position on large surfaces

### Idle state

After progress reaches 1, the composition stays calm.

Do not add infinite tracer loops, continuous card drift, or perpetual pulsing across the section.

A single subtle status-dot breathing loop is acceptable only if it is nearly imperceptible and automatically disabled for reduced motion.

## 9. Progressive enhancement

The fully understandable final composition must exist in server-rendered markup.

Never render substantive text at opacity 0 as the semantic default.

Implementation rule:
- base CSS = final static state;
- hydrated JS adds a `data-motion-ready` attribute/class;
- motion initial states activate only after hydration and only when reduced motion is false.

If JavaScript is disabled, the visitor sees the final complete story.

## 10. Reduced motion

When `prefers-reduced-motion: reduce`:
- no scroll-driven transforms;
- no path drawing;
- no staged reveal;
- all stages show their final static state immediately;
- no status pulse;
- CTA and focus states remain intact.

Expose a deterministic test hook:
`data-motion-mode="reduced" | "enhanced"`

## 11. Accessibility

- section uses an H2 for the headline;
- stages are semantic ordered content, ideally an `ol`;
- input fragments and outcomes are semantic lists;
- custom visual SVGs are `aria-hidden` unless they contain unique information;
- no information depends on color alone;
- warning/unknown state includes text;
- CTA retains visible focus;
- contrast must meet WCAG AA;
- mobile touch targets >= 44px only where interactive; the story itself should not require taps.

No tabs. No keyboard-only hidden state. No carousel.

## 12. Performance budget

- no new runtime dependency;
- no canvas/WebGL;
- no raster background required;
- SVG/HTML composition only;
- connector SVG preferably < 40 paths;
- total decorative SVG node count target < 220;
- do not animate large CSS filters;
- keep client boundary isolated to the canvas;
- preserve current no-JS and Core Web Vitals posture.

## 13. CSS token contract

Define locally on `.method-story`:

```css
.method-story {
  --method-bg: #08110f;
  --method-bg-2: #0b1512;
  --method-surface: #0e1915;
  --method-surface-raised: #111f1a;
  --method-text: #f2f4ef;
  --method-muted: #a9b3ad;
  --method-dim: #75827b;
  --method-line: rgba(186, 226, 205, .14);
  --method-line-strong: rgba(186, 226, 205, .28);
  --method-accent: #91e1bd;
  --method-accent-bright: #b8f2d5;
  --method-secondary: #9acfd3;
  --method-unknown: #d6a25e;
}
```

Corner radii:
- input fragments: 10–14px
- evidence sheets: 8–10px
- output rows: 10–12px
- do not use oversized 24–32px SaaS-card radii.

## 14. Exact implementation order

1. Read this packet, `AGENTS.md`, and the current `home-solve-think.tsx`.
2. Do not iterate on the design concept.
3. Create `components/method-story-icons.tsx`.
4. Create `components/method-story-canvas.tsx`.
5. Rewrite `components/home-solve-think.tsx` as the semantic wrapper.
6. Create `app/method-story.css`.
7. Import `method-story.css` last in the English layout.
8. Update `tests/frontend-overhaul-phase-f.spec.ts` to the new contract.
9. Run format/check, typecheck, lint, build.
10. Run the Phase F browser tests first.
11. Run the full `npm run test:browser` suite.
12. Render screenshots at:
    - 1440×1000
    - 1920×1080
    - 1024×768
    - 390×844
13. Compare against `design/method-story/METHOD_STORY_BLUEPRINT.svg` and this packet.
14. Refine only geometry, spacing, typography, contrast and motion timing.
15. Do not change the narrative/copy/art direction without a new explicit Mohammed decision.
16. Commit the completed checkpoint, push, PR/check/merge/deploy per repository delivery workflow.

## 15. Test contract

Update the Phase F Playwright test to assert:

- `[data-method-story]` is visible;
- headline text is exactly present;
- 4 input fragments;
- 3 transformation stages:
  - Expose the truth
  - Reduce ambiguity
  - Build the system
- 5 output rows;
- `DECISION-READY` status;
- CTA `Inspect the evidence` points to `/work`;
- old capability/skills/about homepage blocks remain absent;
- old method tabs are absent;
- desktop and 390px no horizontal overflow;
- section passes axe;
- reduced-motion mode exposes `data-motion-mode="reduced"`;
- all narrative text remains visible under reduced motion;
- JavaScript-disabled full-suite acceptance remains green.

Screenshot names:
- `method-story-1440.png`
- `method-story-1920.png`
- `method-story-1024.png`
- `method-story-390.png`

## 16. Visual acceptance criteria

The section is accepted only if all are true:

1. A visitor can infer “chaos becomes a reliable system” without reading the body copy.
2. The left side is visibly less ordered than the right side.
3. The center visibly demonstrates reveal → convergence → assembly.
4. All five stages feel part of one continuous system.
5. Main visuals use one custom line/icon language.
6. Output is visually more decisive than input.
7. The section does not look like a spreadsheet, process table, dashboard, or five-card SaaS feature row.
8. No stage requires clicking.
9. Motion explains state change instead of decorating empty space.
10. The final static composition is attractive with animation disabled.
11. Mobile reads naturally as a vertical story.
12. The chapter remains approximately one desktop viewport of perceived travel.
13. No new dependency is added.
14. Axe, no-overflow, reduced-motion, build, lint and full browser suite pass.

## 17. Explicitly forbidden implementation drift

Do not:
- preserve the old grid because it already exists;
- keep the old tab UX on mobile;
- reuse three unrelated legacy glyphs;
- add a generic icon library to the main canvas;
- install GSAP;
- use a raster screenshot as the production visual;
- add fake data, charts or metrics;
- add particle-field decoration;
- add random glow balls;
- add WebGL/Three.js;
- pin/hijack scrolling;
- add a second redundant CTA;
- hide semantic text behind animation;
- make the user read paragraphs to understand the process;
- interpret the blueprint as permission to copy every generated-image artifact literally.

## 18. Design-reference files

- `design/method-story/METHOD_STORY_BLUEPRINT.svg` — static composition blueprint; reference only, never ship as the production visual.
- `design/method-story/method-story.spec.json` — machine-readable copy/layout/motion contract.
- This document — authoritative execution narrative.

The production result should reproduce the **clarity, hierarchy, progression, darkness, mint restraint, layered depth, and visual payoff** of the blueprint while remaining native HTML/SVG and consistent with the real site.
