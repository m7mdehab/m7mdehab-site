# Writing Article System v1.4

**Status:** Kokoro dual-voice implementation / live review required  
**Scope:** individual Writing article pages, authoring governance, article discovery metadata

## Locked objective

Every article should feel like part of one publication system: calm, minimal, readable, attributable, source-aware and technically credible.

The shell is uniform. The rhetorical structure is not.

## Current reference fixtures

1. When should you trust a probabilistic forecast? — Deep dive
2. Why accuracy alone is not enough for oil-spill detection — Deep dive
3. What should an AI agent do when the evidence is missing? — Analysis

All three must render through the same shell.

## Page order

1. back to Writing + format
2. category/topics
3. title
4. deck
5. visible author byline
6. published/updated/read/listen metadata
7. browser text-to-speech narration bar
8. no default in-article cover; imagery is inserted only when it adds information
9. optional Key idea
10. optional evidence anchors
11. On this page
12. body
13. optional takeaways
14. Sources & further reading
15. related writing
16. project provenance/disclosure when relevant

## Reading geometry

Desktop:
- page frame <=1360px;
- main reading column expands to roughly 900–1160px on desktop rather than being trapped at 760px;
- hero/prose/narration/related/footer share one primary left edge;
- long-form prose is justified with the final line left-aligned;
- automatic hyphenation is disabled;
- secondary TOC rail remains about 200–220px;
- body line-height remains around 1.68;
- H1/H2/Key idea are deliberately restrained; no poster-scale article typography.

Mobile:
- one reading column;
- collapsed TOC before body;
- same source trail and content;
- no horizontal overflow.

## Audio

Narration is generated offline at publish/deploy time with Kokoro-82M v1.0 and served as normal static MP3 files. No recording, paid TTS API, visitor-side model download, or browser speech synthesis is used.

Locked voices:
- Female — Kokoro af_heart — first-visit default.
- Male — Kokoro am_michael.

Controls:
- play/pause;
- real ±15-second seek;
- continuous time-based progress scrubber;
- elapsed / total duration;
- speed from 0.75× through 2×;
- remember Female/Male choice locally;
- remember playback speed locally;
- no autoplay.

Generation contract:
- generate both voices for every published article;
- derive narration from the same canonical article data used to render the visible article;
- narrate title, deck, Key idea, headings, paragraphs, bullets, quotes/callouts, and takeaways;
- exclude source URLs, UI labels, metadata, and code;
- use text/model/voice hashes so unchanged narration can be reused from CI cache;
- encode final assets as 24 kHz mono 64 kbps MP3;
- run Kokoro q8 on Node CPU during staging/production deployment.

Because stable narration files exist, BlogPosting exposes both files as AudioObject entries.

## SEO / AI visibility

Article HTML remains the canonical source.

Implemented:
- visible author → /about;
- explicit /about ProfilePage;
- BlogPosting;
- BreadcrumbList;
- genre;
- abstract only when visible Key idea exists;
- articleSection;
- wordCount;
- isPartOf Writing Blog;
- citations;
- author sameAs;
- max-image-preview:large;
- accurate sitemap lastModified;
- related-writing internal links;
- format + wordCount in writing.json/discoverability.

Do not add:
- hidden AI summaries;
- AI-only duplicate routes;
- invented FAQ markup;
- fake updated dates;
- keyword-stuffed headings;
- schema that is not visible/supported by the article.

## Next discovery upgrades after article-shell acceptance

1. Create a real >=1200px representative raster/social image for every article. Forecast and AI-agent posts still need stable image assets; oil-spill already has a public image.
2. Add IndexNow to the publish/deploy workflow for prompt Bing/Copilot discovery.
3. Measure Google Search Console + Bing Webmaster AI Performance rather than guessing at “AI rankings.”

## Acceptance

For every current article:
- self-canonical;
- exactly one H1;
- visible byline;
- Key idea visible;
- no default giant article cover;
- narration bar spans the available article width;
- Natural/US/UK/System voice presets are present;
- TOC works at desktop and mobile;
- prose measure is readable;
- sources visible;
- two related articles appear;
- existing project link remains;
- Female/Male Kokoro narration bar visible and functional;
- Female is the first-visit default;
- voice choice and playback speed persist locally;
- all six current narration MP3 assets return HTTP 200 on review staging;
- BlogPosting and BreadcrumbList validate;
- no horizontal overflow at 390px;
- axe clean;
- no article claim/source text is altered by layout work.

## Concurrency rule

The Writing v1.3 card-grid work is a separate presentation branch. Before v1.4 is merged, rebase onto the accepted v1.3/main state and resolve only mechanical conflicts. Do not overwrite v1.3 Home/archive decisions.
