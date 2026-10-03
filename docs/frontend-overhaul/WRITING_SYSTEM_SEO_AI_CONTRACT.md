# Writing System — SEO / AI / Discovery Contract

## 1. Structured-data decision

Default article type: `BlogPosting`.

The first three essays are technical, but the route is now a personal publishing system. Do not keep universal `TechArticle` semantics solely because of the initial inventory.

## 2. Per-article JSON-LD

For each published article include:

- `@context`;
- `@type: BlogPosting`;
- stable `@id`;
- canonical `url`;
- `headline`;
- `description`;
- `datePublished`;
- optional `dateModified`;
- `inLanguage: en`;
- author with canonical Person identity;
- `mainEntityOfPage`;
- `keywords` from topics.

Only when applicable:

- `image`;
- `citation`;
- project relationships in `about`;
- real narration in `audio` as an `AudioObject` only when an actual public audio asset exists.

Do not emit empty properties merely to preserve a template.

## 3. Dates

Replace public `dateCreated` usage with `datePublished`.

Use ISO 8601.

When `updatedAt` exists, use it as `dateModified`.

Never set modified dates from build/deploy time.

## 4. Images

Do not fabricate social images.

Use article `socialImage` only when a stable public image URL actually exists.

For raster HTML covers:

- reserve dimensions/aspect ratio;
- lazy-load below-fold imagery;
- do not lazy-load the route's true LCP image.

A future asset pipeline may add representative 16:9 / 4:3 / 1:1 article images. That is not required for this rebuild.

## 5. Open Graph / Twitter

Per article:

- type `article`;
- title;
- description;
- canonical URL;
- publication/modification time when supported by the current local Next.js Metadata API;
- image only when valid.

Use `summary_large_image` only with a valid representative image.

## 6. Archive schema

Keep `/writing` as `CollectionPage`.

`hasPart` contains published `BlogPosting` nodes only.

Drafts never appear.

## 7. `/writing.json`

Must contain published public projections only:

- slug;
- title;
- description;
- category;
- topics;
- series or null;
- publishedAt;
- updatedAt or null;
- readingMinutes;
- canonical URL;
- relatedProjects[];
- sourceLinks[];
- optional stable cover image;
- required listenMinutes;
- real audio metadata only when a playable public asset exists.

Must not contain:

- drafts;
- active `/ar` URLs while English-only policy is in force;
- mandatory project object;
- private project details;
- fake social image URLs.

## 8. `llms.txt`

Describe authored editorial content neutrally.

Do not state that every article is derived from a project.

Recommended record shape:

`- **Title**: Description · Topics: A, B · [Article](URL)`

Optionally append related project when present.

Interpretation boundary:

- project-derived essays remain bounded by public project evidence;
- independent writing may contain personal analysis/opinion and external references;
- editorial writing is not a new authority for biographical facts.

## 9. Internal linking

- Home → article;
- Home → `/writing`;
- archive → article;
- project-derived article → relevant case study;
- article → archive.

Independent posts do not receive fake project backlinks.

## 10. AI/search extractability

Keep:

- semantic headings;
- direct ledes;
- paragraph-first writing;
- visible source lists where relevant;
- author identity;
- publication/update dates;
- machine-readable archive.

Do not add hidden SEO paragraphs, AI-only duplicate content, keyword stuffing, or generic FAQ blocks.


## 11. Standards references

The implementation decisions above were checked against current primary documentation:

- Google Search Central — Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- Google Search Central — General structured data guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- W3C WAI-ARIA Authoring Practices — Link pattern: https://www.w3.org/WAI/ARIA/apg/patterns/link/
- W3C WAI — Designing for Web Accessibility: https://www.w3.org/WAI/tips/designing/
- MDN — HTML `img`: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img
- MDN — Image performance guidance: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/Multimedia

These references reinforce the chosen `BlogPosting` model, meaningful crawlable images when supplied, stable publication/modification dates, native links, visible focus, reserved image dimensions/aspect ratio, and lazy loading for non-critical imagery.

## 12. Audio narration contract

Do not create structured audio merely because the card has an estimated listen time.

When `audio` exists, BlogPosting may expose:
- `audio.@type = AudioObject`;
- `contentUrl` as a stable crawlable public URL;
- `encodingFormat` from the real MIME type;
- `duration` in ISO 8601 duration form;
- a short caption such as `Audio narration of this article`.

When no real asset exists:
- no AudioObject;
- no fake contentUrl;
- no player;
- listenMinutes may remain an estimated browse/display field.

The article text remains present on the same page. This makes narration an alternate representation of the existing textual work rather than a separate information source.

## 13. Card copy vs metadata description

`cardDescription` is a browse-only editorial projection. It may be hidden on mobile without changing canonical article metadata.

SEO/Open Graph/JSON-LD should continue to use canonical `description`, not the shortened cardDescription.
