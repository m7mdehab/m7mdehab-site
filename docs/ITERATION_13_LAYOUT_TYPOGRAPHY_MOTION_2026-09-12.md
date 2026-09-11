# Iteration 13 — Layout, Typography & Motion Refinement

Date: 2026-09-12

## Why this iteration exists

The site was technically launch-ready after Iteration 12, but a full-page desktop review exposed a second class of defects: visual density, hierarchy and scroll rhythm. The underlying information architecture, evidence model and publication boundaries remain correct; this iteration refines how that system is experienced before production-domain activation.

## Scope

Iteration 13 changes shared English/Arabic layout primitives only. It does **not** rewrite Arabic copy, change public claims, add evidence, alter service proof, or change the production-domain contract.

Primary goals:

1. reduce excessive vertical travel without collapsing the editorial character;
2. prevent the floating navigation from repeatedly sitting over active content;
3. reduce the gap between oversized display typography and tiny supporting text;
4. make project cards more content-driven and less slide-like;
5. remove the false button affordance from non-interactive skill tags;
6. compact credentials, additional experience and service cards around their real content;
7. preserve the evidence-first project treatments while improving information density;
8. introduce sparse italic/cursive editorial emphasis and contrasting bold emphasis where a phrase genuinely deserves hierarchy;
9. add restrained motion to words, numbers and section elements without animation-owned visibility;
10. preserve no-JavaScript readability, reduced-motion behavior, mobile overflow guarantees and strict accessibility.

## Typography refinement

The existing Manrope + Newsreader pairing remains canonical.

- Newsreader italic is the sparse script/cursive gesture; no third decorative font is introduced.
- Cursive/italic emphasis is used only on selected phrases, never as a body-copy style.
- Strong emphasis may switch a key phrase back into the sans face at heavier weight to create contrast inside editorial serif display copy.
- Long project names have lower display ceilings than short section statements.
- Supporting metadata is allowed to become slightly more legible while display headlines become modestly smaller.

Arabic wording is intentionally untouched in this iteration. Shared spacing/navigation/card behavior applies to Arabic, while the later Arabic editorial pass will decide language-specific emphasis rather than importing English italic conventions mechanically.

## Motion refinement

Motion remains progressive enhancement.

- Hero copy settles over a short distance on load while remaining visible throughout.
- Section intros, project copy, evidence panels, rows and key numeric markers receive short-distance scroll/view state changes where supported.
- Emphasized words receive only a subtle position settle; there is no continuous ambient motion.
- The floating navigation yields during downward scrolling and returns on upward intent or keyboard focus.
- Reduced-motion mode removes these animations and keeps navigation permanently present.
- Semantic content remains visible without JavaScript.

## Layout changes

- Hero height is capped below a full large-desktop viewport instead of forcing `100svh`.
- Generic section spacing is reduced from the previous 90–170px scale to a tighter major/tight spacing system.
- Project-card minimum heights are reduced; copy is no longer pushed deep into the card solely by `margin-top: auto`.
- Skills are compact outlined informational tags rather than dark control-like chips.
- Timeline rows, credentials, additional experience and service cards are content-driven rather than minimum-height-driven.
- The About statement remains expressive but loses unnecessary monumentality.
- Writing rows remain fully clickable and keep their existing hover affordance.
- Contact remains the intentionally largest closing statement, but the section no longer consumes an unnecessary extra viewport.

## Navigation changes

A small client island now owns only navigation state:

- downward scroll after the opening area hides the floating pill;
- upward scroll restores it;
- focus and pointer entry restore it;
- current homepage section / writing route receives a subtle active state;
- anchor targets have explicit top offset;
- reduced-motion mode keeps the nav visible.

No core content is moved into the client boundary.

## Acceptance

Iteration 13 must preserve all existing 41 rendered/browser assertions and adds dedicated checks for:

- a materially denser desktop hero;
- non-button skill semantics/treatment;
- presence of selective editorial emphasis;
- nav hide/restore behavior;
- reduced-motion navigation and emphasis readability.

The permanent `workers.dev` staging origin remains `noindex`. Production-domain purchase remains deferred until the visual review cycle is complete.
