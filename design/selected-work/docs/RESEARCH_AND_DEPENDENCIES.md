# Research and implementation dependencies

Prepared against current official documentation on 2026-09-30.

## Carousel

Use:

- `embla-carousel-react@8.6.0`
- `embla-carousel-autoplay@8.6.0`

Why:

- 8.6.0 is the current stable Embla line; 9.x is still release-candidate.
- the autoplay plugin supports `stopOnMouseEnter`;
- with `stopOnInteraction: false`, autoplay restarts after drag/interaction;
- `playOnInit: false` is available when a custom timer needs explicit control.

Official references:

- https://www.embla-carousel.com/docs/v8/plugins/autoplay/
- https://www.npmjs.com/package/embla-carousel-react

## Motion

Use `motion@13.4.4` only after static visual parity is accepted.

Import React APIs from `motion/react`.

Use it for project-specific SVG behavior, especially `pathLength`, `pathOffset`, and `pathSpacing` on SVG paths/circles/lines. Do not use Motion to solve layout geometry that CSS/SVG can solve statically.

Official references:

- https://motion.dev/docs/react-svg-animation
- https://www.npmjs.com/package/motion

## View transitions

Use the native View Transition API as progressive enhancement for card → case-study navigation unless the repository has independently moved to React 19.3.

- same-document `document.startViewTransition()` is Baseline 2025 in current MDN guidance;
- cross-document same-origin transitions can opt in with `@view-transition { navigation: auto; }`;
- fallback navigation must remain normal when unsupported or when reduced motion is requested.

Official references:

- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using

React 19.3 made `<ViewTransition>` stable, but this repository is currently React 19.2.7. Do not perform a React upgrade only for this feature.

## Typography

Current portfolio fonts already present:

- Manrope Variable
- Newsreader Variable

Real-font matches prepared for the artboards:

- Inter — technical/body/UI labels
- Space Grotesk — Presaira display/technical identity
- Playfair Display — high-contrast editorial serif in OpportunityOS/Solar/Oil/Ghareeb/Makhbazy

Presaira's own current repository uses Inter, Space Grotesk and Playfair Display, so those choices are evidence-backed for Presaira. For the other generated references they are visual matches, not claims about an original source font.

Prefer `next/font/google` so fonts are self-hosted at build time. Do not add remote runtime Google Fonts CSS.

## Visual regression

Use Playwright's existing screenshot facilities after user approval of the coded reconstruction. The AI-generated full references should remain design references, not automated golden files, because their separately generated clean backgrounds make raw whole-image pixel equality an invalid acceptance criterion.

During implementation use the supplied `tools/reference-viewer.html` and an in-site `?cardDebug=` overlay mode to tune geometry.
