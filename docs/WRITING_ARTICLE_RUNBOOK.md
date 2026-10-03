# Writing Article Runbook

**Purpose:** govern how Mohammed’s articles are researched, written, structured, rendered, published and maintained.

The interface is standardized. The thinking is not.

## 1. Editorial territory

Primary territory: AI and agentic systems; data, ML and software engineering; emerging computing technologies; new products and technical ventures; biotechnology, medicine and scientific progress; human intelligence and technological progress; career observations; and project lessons.

A topic belongs in Writing when Mohammed has a real reason to think about it, not because a keyword tool says it has traffic.

## 2. Article formats

Choose one before outlining.

- **Note:** short observation. Context → observation → implication. Usually no table of contents.
- **Analysis:** argument about a technology, system or trend. Question → evidence → interpretation → implications → conclusion.
- **Deep dive:** research-heavy technical/scientific explanation. Problem → mechanics → evidence → limitations → implications.
- **Project reflection:** what real work taught Mohammed. Problem → decision → evidence → failure modes → reusable lesson.

The visual shell remains the same for every format.

## 3. Pre-writing brief

Before drafting, answer five questions:

1. What exact question is this article trying to answer?
2. Why is this worth writing now?
3. Who should care?
4. What can Mohammed add that a generic summary cannot?
5. What primary sources, first-hand work or data can support it?

If the original value is weak, do not publish yet.

## 4. Research hierarchy

Prefer: original paper/standard/official documentation/regulator → first-hand project artifacts or original datasets → official company/research-lab material → high-quality reporting → community sources for reactions only.

For medicine, biotechnology and other high-stakes topics:
- distinguish consensus from early evidence;
- identify study type and material limitations;
- avoid turning preliminary research into personal medical advice;
- use current primary or authoritative health sources for consequential claims.

## 5. Drafting rules

The first 100–150 words should establish what the subject is, why it matters, and Mohammed’s current angle.

Paragraphs should carry one main idea, usually in 2–5 sentences. Put the topic sentence early. Explain jargon when the intended reader may not know it.

H2s should explain the section, not merely label it. Prefer “A clean metric is worthless if future information leaked into the past” over “Metrics.”

First person is allowed when it adds perspective. Keep fact, interpretation and speculation distinguishable. Avoid fake certainty and performative contrarianism.

## 6. Standard article shell

Every article renders through one shell:

1. Back to Writing
2. Format + category/topics
3. H1
4. Deck/description
5. Byline linked to /about
6. Published/updated date + read/listen time
7. Browser text-to-speech narration bar
8. Representative cover
9. Optional Key idea
10. Optional evidence anchors
11. On-this-page navigation for long articles
12. Body
13. Optional takeaways
14. Sources & further reading
15. Related writing
16. Related project links/disclosure when applicable
17. All Writing return path

## 7. Reading-layout rules

- prose target: about 65–72 characters per line;
- body text: roughly 17–19px desktop-equivalent;
- line-height: roughly 1.65–1.75;
- body/deck/key-idea prose is justified, with the final line left-aligned;
- hero copy, narration bar, body, related-writing section and footer share one primary left edge;
- H2s strong but not theatrical;
- generous paragraph spacing;
- figures/code/tables may break wider than prose;
- no decorative motion is required for reading;
- mobile retains the same content and source trail.

## 8. Content blocks

Allowed primitives: paragraph, bullets, quote, figure + caption, code block, callout.

Callouts should be rare and limited to **Key idea**, **Note**, or **Caveat**. Do not build a page out of boxes.

## 9. Table of contents

Show “On this page” when an article has about four or more meaningful H2s, or enough length that navigation materially helps.

Desktop: subtle sticky rail. Mobile/tablet: compact disclosure control before the body. Headings require stable anchors.

## 10. Audio

Narration is generated in the browser from the same visible article text. Mohammed does not need to record narration or upload an audio file.

Player requirements:
- the narration bar is always present near the top of an article;
- play/pause;
- previous/next passage navigation;
- passage progress scrubber;
- 0.75×, 1×, 1.25×, 1.5×, 1.75×, 2×;
- remember speed locally;
- never autoplay;
- keyboard accessible;
- use an available English system/browser voice;
- fail gracefully when browser speech synthesis is unavailable.

Because this is client-side speech synthesis rather than a hosted recording, do not emit AudioObject schema unless a real audio asset is added later.

## 11. SEO + AI-search contract

Optimize for discovery without writing for robots.

Every article needs one descriptive H1, a permanent slug, unique title/description, self-canonical URL, visible byline linked to /about, real publication/update dates, semantic headings, useful internal links, visible sources, BlogPosting JSON-LD matching visible content, BreadcrumbList JSON-LD, sitemap lastModified, representative imagery where available, and max-image-preview:large.

For Google AI features, do not create separate AI-SEO prose, hidden answer blocks or invented AI schema. Strong SEO fundamentals plus unique, useful, crawlable content remain the foundation.

For AI search, make important claims easy to attribute, use self-contained explanatory paragraphs, link primary sources, and keep /writing.json and /llms.txt synchronized as auxiliary surfaces.

## 12. Images

Every serious article should eventually have a crawlable representative image. Target a 16:9 image at least 1200px wide, with optional 4:3 and 1:1 variants later. Use descriptive alt text. Prefer subject-relevant imagery over generic branding and avoid text-heavy social cards.

## 13. Internal linking

Every article should naturally link to relevant earlier Writing, a relevant project case study where applicable, and /about through the byline. The page also suggests related Writing automatically.

## 14. AI-assisted writing

AI may assist research organization, source discovery, outlining, copy editing, code/diagram drafts and adversarial review. Mohammed remains the editorial author. Never publish an AI-generated factual claim without source verification.

Consider disclosure when automation materially produced content a reasonable reader would expect to be human-created.

## 15. Publish gate

Editorial: answer the question; show original value; avoid clickbait; make every section advance the argument.

Evidence: verify consequential claims; prefer primary sources; date current facts; label speculation; hold high-stakes claims to a higher accuracy bar.

UX: validate hierarchy, reading measure, mobile, figures, TOC, audio, sources and related links.

Search/discovery: validate title/description/canonical, author/byline, BlogPosting + BreadcrumbList, sitemap lastmod, image metadata, /writing.json, /llms.txt, HTTP 200 and crawler access.

## 16. Update policy

Change updatedAt only after substantive revision: changed facts, evolved technology, stronger evidence, or repaired obsolete sources. Do not change it for typo-only edits.

## 17. Measurement

Review Google Search Console, Discover/generative/multimodal reporting when available, Bing Webmaster Tools and AI Performance, AI citations, referral traffic, intended crawler logs, and topic clusters earning impressions/citations.

Do not chase every query with a thin page. Deepen a topic only when there is a genuinely new angle, new evidence or first-hand perspective.

## 18. Current reference articles

- **When should you trust a probabilistic forecast?** → Deep dive
- **Why accuracy alone is not enough for oil-spill detection** → Deep dive
- **What should an AI agent do when the evidence is missing?** → Analysis

These three are the reference fixtures for the article shell.
