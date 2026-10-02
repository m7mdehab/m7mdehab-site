# QA and acceptance gates

## Static parity gate

Before adding carousel/motion, each card must pass a static reconstruction review.

Desktop review sizes:

- 1440×900
- 1920×1080

For each card:

- background plate is the prepared clean source;
- supplied logos are real assets;
- all live text is sharp HTML/SVG, not raster text;
- title/tagline/major nodes align with the coordinate manifest and approved reference;
- no accidental clipping at rounded corners;
- no text overflow;
- no unsupported claim is reproduced;
- no foreground element relies on a CSS filter that distorts a supplied logo;
- no project shares a generic repeated template appearance.

Use the reference overlay mode. A mismatch in hierarchy, relative scale, group alignment or visual density is a failure even if the page is technically responsive.

## Interaction gate

After static parity:

- mouse hover pauses autoplay;
- focus within the carousel pauses autoplay;
- pointer drag/touch swipe works;
- manual dot selection works;
- after interaction/hover/focus ends, autoplay resumes from the current slide rather than snapping backward;
- no blank seam/gap appears during carousel navigation;
- active timer dot represents the real autoplay remaining time;
- page visibility and off-screen state pause work where appropriate;
- reduced motion disables autoplay and decorative path animation or converts them to static states.

## Motion gate

Project-specific motion must:

- reinforce the diagram already present;
- not move text layout;
- not block interaction;
- not run continuously at high intensity;
- be disabled under `prefers-reduced-motion: reduce`;
- avoid excessive GPU/compositing cost on mobile.

## Navigation transition gate

Card → case-study transition:

- normal link navigation remains valid without View Transition API;
- supporting browsers receive a shared-artwork transition;
- focus/URL/history behavior remains correct;
- reduced motion receives a direct navigation or minimal fade;
- back navigation does not leave stale `view-transition-name` collisions.

## Existing repository gates

All existing gates must remain green:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run test:browser`
- existing GitHub rendered/staging/deployment-readiness workflows

Add focused tests for the selected-work implementation; do not replace the existing suite.

## Browser/viewports

At minimum verify:

- Chromium: 320, 360, 390, 430, 480, 768, 1440, 1920 widths
- WebKit iPhone emulation at 390 CSS px width and representative safe-area height
- one Android mobile profile
- reduced-motion context

## Performance

- source PNG references must not be served to production clients merely for visual matching;
- production backgrounds use prepared WebP variants or equal/better optimized assets;
- lazy-load non-active slides where practical without breaking a transition into the next slide;
- no layout shift from late font/image sizing;
- no large animation library imported into the whole app if it can remain scoped to the selected-work client boundary.
