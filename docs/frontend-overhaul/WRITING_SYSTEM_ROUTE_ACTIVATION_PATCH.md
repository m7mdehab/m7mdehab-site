# Writing System — Route / Discovery Activation Patch

Purpose: remove route-level invention from the Codex/Luna execution pass.

This document assumes the canonical data migration is complete and the prepared components import from @/data/writing.

## 1. Home route

Target order:

SystemHero → CredibilityRail → SelectedWorkGallery → SolveThinkBridge → HomeWritingSection → HomeClosing

Required changes in app/(en)/page.tsx:
- import HomeWritingSection from components/home-writing-section;
- use publishedWritingArticles from data/writing;
- render HomeWritingSection immediately after SolveThinkBridge;
- render HomeClosing with no article prop;
- remove the old raw writingArticles Home dependency.

## 2. HomeClosing extraction

Delete from components/home-closing.tsx:
- the parent "use client" directive if no direct client API remains;
- useEffect / useRef;
- useTimedCarousel;
- projectVisuals;
- WritingArticle import;
- calibration constants;
- ForecastNoteVisual;
- OilNoteVisual;
- noteVisual;
- articles prop;
- both Writing effects;
- the entire section id="writing" carousel;
- article dots.

Keep Opportunity, OpportunityPaths and Footer unchanged unless a newer explicit user decision supersedes them.

Target signature: HomeClosing takes no props.

A server component may render the nested client OpportunityPaths component. Do not keep the whole closing system client-side only because that child is interactive.

## 3. Writing archive route

app/(en)/writing/page.tsx must:
- import WritingSystemIndex;
- use publishedWritingArticles only;
- use title "Writing";
- use a broad description covering AI, technology, data, career, projects, products and ideas;
- self-canonicalize to /writing;
- retain CollectionPage JSON-LD;
- change hasPart article type from TechArticle to BlogPosting;
- render WritingSystemIndex with publishedWritingArticles.

Do not preserve the old project-only description.

## 4. Related-project resolver

Create one canonical resolver in a data/discovery layer that:
- returns [] for independent articles;
- resolves every configured project slug against data/public.ts;
- returns slug, canonical project title and /work/<slug> URL;
- throws/fails validation if a configured project slug is unknown.

Do not store duplicate projectTitle in article data.

Avoid circular imports when choosing the helper location.

## 5. Article route

app/(en)/writing/[slug]/page.tsx must use:
- publishedWritingArticles for generateStaticParams;
- published-only getWritingArticle;
- WritingSystemArticleView;
- buildWritingSystemBlogPostingSchema;
- the canonical related-project resolver.

Drafts must never create static params.

Metadata contract:
- title and description from article;
- self-canonical URL;
- Open Graph type article;
- published time from publishedAt when supported by installed Next.js 16 Metadata types;
- modified time only when updatedAt exists;
- image only when writingStableImage returns a real stable source;
- Twitter summary_large_image only when such image exists, otherwise summary;
- do not cast around Metadata type errors; follow local Next.js 16 docs.

Page contract:
- notFound for unknown/unpublished slug;
- resolve related projects;
- build BlogPosting schema with profile Person ID;
- render WritingSystemArticleView with article + relatedProjects.

## 6. /writing.json

Use publishedWritingArticles only.

Each record must contain:
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
- optional coverImage only when stable;
- relatedProjects array with slug/title/caseStudyUrl;
- sourceLinks array.

Remove:
- alternateLanguageUrl;
- createdAt;
- mandatory singular project;
- project-only assumptions.

Do not duplicate full article bodies or evidence arrays into this index unless a future explicit discovery requirement needs them.

## 7. data/discoverability.ts

writingRecords must use publishedWritingArticles and expose:
- slug;
- title;
- description;
- category;
- topics;
- series;
- publishedAt;
- updatedAt;
- readingMinutes;
- canonical article URL;
- relatedProjects[].

Remove:
- alternateLanguageUrl;
- derivedFromProject;
- universal evidenceAnchors if no longer consumed.

profileRecord.writing remains a compact public projection.

## 8. llms.txt

Replace the current universal "Derived from: <project>" record.

Each Writing line should communicate:
- title;
- description;
- topics;
- canonical article link;
- optional related project names only when present.

Replace the global interpretation note with the semantic equivalent of:

"Writing is authored editorial analysis. Project-derived essays remain bounded by their public project evidence and publication limits; independent writing does not create new authority for biographical or project claims."

Do not state that every article is project-derived.

## 9. Sitemap

Change article generation to the published-only projection.

No draft route.
No category/series routes in this phase.
No JSON routes.

## 10. profile.json

Verify after the discovery refactor:
- all three current published articles remain;
- drafts are absent;
- no /ar Writing URL exists;
- no mandatory project object remains.

## 11. No-JS/static-export guarantee

Do not introduce a client wrapper for:
- Home Writing;
- archive;
- card;
- cover;
- article page.

The required visual behavior is CSS hover/focus only.

## 12. Legacy adapter retirement

After activation run:

rg "WritingIndex|WritingArticleView|WritingPreview|writing-authority"

If components/writing-authority.tsx and its module CSS have no consumer that must compile, delete them.

If dormant Arabic source still imports the old component, do not let dormant compatibility force the English public architecture back into the legacy model. Keep or isolate only the minimum dormant compatibility required to compile, without publishing Arabic routes.
