# Writing System — Authoring Guide v1.1

Use this when adding a future article after the v1.1 rebuild.

## Required fields

- slug
- title
- description
- status
- publishedAt
- category
- topics
- readingMinutes
- cover
- origin
- sections

## Recommended browse fields

`cardDescription` is strongly recommended when the canonical description is too long for cards. Keep it under 140 characters and make it useful on its own.

`listenMinutes` is optional. Before narration exists it is an estimate; cards display it with `~`.

## Audio publication

Do not add an `audio` object until a real playable asset exists.

Shape:

    audio: {
      src: "/media/writing/<slug>.mp3",
      mimeType: "audio/mpeg",
      durationSeconds: 463,
    }

Once real audio exists, derive/update listenMinutes from the real duration. The UI removes the estimate marker automatically.

## Card browse contract

Home and archive deliberately show less than the article page:
1. 16:9 cover;
2. taxonomy/timing inside cover bottom;
3. title, maximum two visible lines;
4. cardDescription/description, maximum two visible lines.

Do not manually hard-break titles to make a card fit.

Do not duplicate taxonomy in the artwork.

## Independent writing

A post may have `origin: { kind: "independent" }` and omit thesis, evidence, takeaways and sources. Do not fabricate project relationships to fit the current technical inventory.

## Project-derived writing

Project-origin posts must remain within governed public evidence/publication boundaries. Project relation does not authorize private screenshots, data or stronger claims.

## Drafts

Drafts must stay out of Home, `/writing`, static params, sitemap, `/writing.json`, discovery records and llms.txt until status becomes published.

## Timing

Reading time: estimate consistently from article body length.

Listen time before audio: use a restrained narration estimate around 145–160 spoken words/minute.

Listen time after audio: use the actual media duration.

## Final authoring check

- title still scans when clamped to two lines;
- cardDescription is concise;
- cover has meaningful/public-safe provenance;
- listen estimate is reasonable if present;
- audio URL is genuine if present;
- sources/claims are supported where factual;
- no private material leaks through metadata or schema;
- mobile card remains compact.
