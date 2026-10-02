# ProjectArtboard implementation contract

Build one reusable artboard primitive rather than six unrelated absolute-position pages.

Recommended structure:

```tsx
<article className="project-artboard" data-project="presaira">
  <picture className="project-artboard__background">...</picture>
  <svg className="project-artboard__vector" viewBox="0 0 1683 935" aria-hidden="true">...</svg>
  <div className="project-artboard__content">...</div>
  <Link className="project-artboard__hit-target" ... />
</article>
```

Rules:

1. Wrapper uses `position: relative`, `aspect-ratio: 1683 / 935`, `overflow: clip`, and project-specific rounded corners.
2. Background fills the wrapper with `object-fit: cover`; the prepared source already matches the artboard ratio, so no crop is expected at desktop.
3. SVG overlay uses the canonical 1683×935 viewBox. This is the correct home for lines, nodes, calibration curves, connectors, legends and simple icons that need exact source-space geometry.
4. HTML overlay uses absolute boxes derived from the same source coordinate system. Do not mix arbitrary viewport units with source-pixel placement.
5. Expose a helper that converts `x/y/w/h` into percentages or CSS custom properties.
6. Foreground groups must have stable `data-artboard-node` identifiers so tests and the debug overlay can measure them.
7. A project component may use an official logo image, but brand wordmarks must never be retyped when the supplied logo already contains the official lettering.
8. Keep the entire card a semantic link, but do not nest interactive child controls inside that link. Carousel dots/controls live outside the link.
9. The development reference overlay must be excluded from production output and ignored by accessibility tree.
10. Responsive/mobile overrides should change the internal composition at a defined container breakpoint rather than shrinking every source coordinate until it is unreadable.

Suggested CSS scaling pattern:

```css
.project-artboard {
  --aw: 1683;
  --ah: 935;
  position: relative;
  aspect-ratio: 1683 / 935;
  overflow: clip;
}
.project-artboard__node {
  position: absolute;
  left: calc(var(--x) / var(--aw) * 100%);
  top: calc(var(--y) / var(--ah) * 100%);
  width: calc(var(--w) / var(--aw) * 100%);
  height: calc(var(--h) / var(--ah) * 100%);
}
```

For typography, source-pixel `font-size` values can be expressed as container query width units after calibrating one time against 1683 px. Example: 83 / 1683 × 100 = ~4.93cqw. Prefer a source-to-container helper or project-level CSS custom property rather than scattering magic viewport values.
