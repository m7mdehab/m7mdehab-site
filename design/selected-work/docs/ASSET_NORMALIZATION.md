# Asset normalization and source-of-truth policy

## Canonical source set

The supplied ZIP contained duplicate JPG and PNG exports. The preparation pack removes that ambiguity.

Use only these canonical sources:

- `reference/full/*.png` — six approved finished-card references. Development/reference only. Never ship these as the production card.
- `source/backgrounds/*.png` — six clean background plates, 1683×935. Canonical background sources.
- `source/logos/*.png|jpg` — supplied official/working logo sources.
- `runtime/backgrounds/*.webp` — pre-generated 960/1280/1683 WebP derivatives for production.
- `runtime/logos/*` — normalized production logo assets.

Do not use the duplicate JPG card/background exports from the original ZIP.

## Runtime backgrounds

All six clean background PNGs were normalized into responsive WebP derivatives at 960, 1280 and 1683 px width using deterministic ImageMagick settings (`method=6`, quality 82, metadata stripped). Keep the PNG as the canonical source; ship the WebP derivatives.

Recommended markup is an absolutely positioned `<picture>` or responsive `<img>` behind live HTML/SVG foreground layers. Do not use the approved full-card reference image as the production background.

## Ghareeb Oglu logo

The supplied usable brand variants were raster images with white/green backgrounds. A transparent white/gold production derivative has already been prepared:

`runtime/logos/ghareeb-oglu-white-gold-transparent.png`

It is derived from the supplied white/gold-on-green source; it is not redrawn. Use it on the dark-green card. Do not reintroduce a white tile/background behind the logo.

## Makhbazy logo

The supplied Makhbazy light/dark PNGs are 3000×3000 with alpha. Runtime copies are downscaled to 1200 px maximum dimension while preserving alpha. Use the light version on the terracotta card unless overlay testing proves the dark variant is required in a subregion.

## Presaira sport logos

The supplied World Cup, Champions League, Formula 1 and NBA assets are transparent PNGs. Use them faithfully. Do not redraw, recolor, apply filters or replace them with emoji/text approximations.

## Integrity

`manifest/all-checksums.sha256` records the preparation pack bytes. If a source asset is modified intentionally, update the checksum file and document why.
