# Mobile adaptation rules

There is no approved mobile golden reference for the new six artboards. Desktop has a 1683×935 reference; mobile therefore must be an explicit art-directed adaptation rather than a false claim of pixel parity.

## Non-negotiable mobile outcomes

- Cards stay landscape-biased. Width must remain greater than height.
- Do not return to tall stacked cards.
- No black rail/background container behind the cards.
- The current iPhone bottom safe-area/dock behavior must remain correct.
- One active card dominates, with a restrained next-card peek if it still improves discoverability.
- Text cannot be scaled below practical readability simply to preserve every desktop micro-label.
- No horizontal page overflow outside the intended carousel scroller.

## Recommended geometry

At 320–430 px viewport widths:

- visible card width: approximately 88–92vw;
- target card aspect ratio: 1.45–1.6 depending on project;
- next-card peek: about 5–8%;
- minimum high-value body/label size: 10 CSS px;
- title/display size is project-specific but must remain visually dominant;
- card radius: 24–30 px;
- dots/timer live inside or immediately under the card, not in a detached empty band.

## Simplification principle

Keep identity + one evidence story + one reason it is impressive. Hide or condense low-priority microcopy before shrinking it into illegibility.

Per-card priorities are already encoded in `manifest/artboards.json` under each project's `mobile.keep` and `mobile.simplify` arrays.

## Safe area

For the fixed bottom site navigation, maintain padding using `env(safe-area-inset-bottom)` and test at iPhone WebKit emulation. The carousel/dots must never be obscured by the fixed nav or Safari bottom UI.
