# Content & Authority Strategy — 2026-09-11

## Objective

Turn the existing project evidence into durable first-hand technical authority without creating a generic SEO blog, inventing publication history or widening any project's public boundary.

The authority chain is:

`Mohammed Ehab ElNomany → inspectable project evidence → first-hand technical reasoning → relevant capability → opportunity`

Writing is useful only when it adds reasoning that the case-study proof can support. A title inventory is not authority.

## Research baseline

A September 2026 search/content-gap review produced three useful patterns.

### Probabilistic forecasting

The public forecasting landscape already contains many explanations of Brier score, calibration and reliability diagrams. ECMWF's current Forecast User Guide provides a strong authoritative explanation of proper probabilistic verification and reliability. Sports-specific material also increasingly reports Brier/calibration.

The differentiated first-hand opportunity is therefore not another definition of Brier score. Presaira can show the *operational trust stack around the metric*: temporal leakage protection, complete 104/104 outcome coverage, explicit omitted-case handling, fixed-seed/versioned simulation, rejected calibration methods, sparse-bin caution and a committed failed convergence target.

Article: **When should you trust a probabilistic forecast?**

Primary evidence:
- Presaira public model card and tournament postmortem.
- Public repository test/evaluation artifacts.

Context reference:
- ECMWF Forecast User Guide, probabilistic verification / reliability / Brier score.

### Imbalanced computer vision / oil-spill segmentation

Current 2026 oil-spill segmentation research continues to emphasize SAR noise, look-alike phenomena, class imbalance, boundary ambiguity and IoU-oriented evaluation. Published papers frequently present very high overall accuracy alongside more informative overlap metrics.

The differentiated first-hand opportunity is a practical explanation of *why the headline metric changes the engineering story*: oil occupies roughly 1% of the project's pixels, the selected model has 0.967 pixel accuracy but oil IoU 0.566 and oil recall 0.764, look-alikes are modeled explicitly, and full-scene deployment introduces a real preprocessing/domain gap.

Article: **Why accuracy alone is not enough for oil-spill detection**

Primary evidence:
- `m7mdehab/oil-spill-detection` README, committed results, metric rationale and Wakashio case study.

Context reference:
- 2026 Scientific Reports work on noisy SAR oil-spill segmentation/domain adaptation.

### Governed AI agents

The current AI-agent discussion is increasingly about action oversight, provenance, authority and verifiable evidence rather than only model output quality. NIST's AI Risk Management Framework and Generative AI Profile provide a durable risk-management reference; newer research/specification work is moving further toward action/evidence provenance.

The differentiated first-hand opportunity is OpportunityOS's concrete product architecture: `UNKNOWN != FALSE`, `ABSENT != INELIGIBLE`, material claims tied to `EvidenceClaim`, hard rejection requiring explicit conflict, and external side effects separated into `DRY_RUN`, `ASSISTED` and `CONTROLLED_SUBMIT`.

Article: **What should an AI agent do when the evidence is missing?**

Primary evidence:
- Allowlisted `m7mdehab/opportunityos-docs` product constitution, architecture and authority index.

Context reference:
- NIST AI RMF and NIST AI RMF Generative AI Profile.

## Editorial standard

A production article must:

1. start from first-hand project work or a demonstrably owned technical decision;
2. contain a real argument, not a keyword-expanded project summary;
3. link material project claims to public evidence;
4. distinguish first-hand evidence from external context/reference material;
5. state meaningful limits or counterexamples where the evidence requires them;
6. avoid invented commercial outcomes, adoption claims or private work detail;
7. link back to the underlying case study so the reader can inspect the proof;
8. have an intentional Arabic counterpart while the bilingual site is maintained;
9. remain useful without JavaScript and pass the same accessibility/mobile contract as project pages;
10. avoid publishing solely to satisfy a cadence.

No empty blog categories, thin glossary pages, mass-generated long-tail pages or artificial freshness dates.

## Initial editorial set

| Essay | First-hand anchor | Capability association | Primary authority signal |
|---|---|---|---|
| When should you trust a probabilistic forecast? | Presaira | Data Science & ML | evaluation discipline, calibration, leakage, reproducibility |
| Why accuracy alone is not enough for oil-spill detection | Oil Spill Detection | Data Science & ML / AI product development | metric selection, imbalance, domain-aware validation |
| What should an AI agent do when the evidence is missing? | OpportunityOS public architecture | AI Engineering | provenance, open-world semantics, controlled action authority |

These three bodies are sufficient to justify a real `/writing` hub. Future topics remain candidates until a substantive body and evidence trail exist.

## Search / AI discoverability architecture

The writing system should be visible through:

- semantic HTML article bodies;
- self-canonical `/writing/<slug>` URLs;
- reciprocal English/Arabic alternates;
- `TechArticle` structured data with `dateCreated`, author identity and source citations;
- the canonical sitemap;
- `/writing.json` as a machine-readable editorial projection;
- `/llms.txt` writing entries;
- homepage and primary-navigation links;
- article → case-study proof links.

`/writing.json` and structured data are projections, not new truth authorities.

## External authority preparation

### Available / already strong

- Public project repositories already establish inspectable technical proof.
- Presaira's `CITATION.cff` uses the canonical `ElNomany` family spelling and the product footer links to Mohammed's LinkedIn profile.
- Oil Spill Detection has strong public README/results/citation evidence.
- OpportunityOS has an intentionally bounded public documentation mirror.

### Known consistency issue to batch, not justify a dedicated CI spend

Presaira's visible footer currently renders `Mohammed Ehab Elnomany` while the governed canonical identity is `Mohammed Ehab ElNomany`. This should be corrected during the next substantive Presaira development/content checkpoint rather than creating an otherwise unnecessary full repository CI cycle solely for capitalization.

### Tool/account boundary

The connected GitHub interface exposes the account profile but not a safe profile-edit action. The current GitHub display name is `Mohammed Ehab`; a future profile update should use the canonical `Mohammed Ehab ElNomany` spelling when direct profile editing is available.

The canonical website field should **not** be pointed at `m7mdehab.com` until the domain is actually live and has passed the production-origin gate.

Likewise, LinkedIn and public project repositories should not be mass-edited to point at a non-resolving canonical domain. Cross-property canonical associations belong in the production-launch authority pass.

## Distribution after production launch

After `m7mdehab.com` is live and verified:

1. update GitHub profile website/name where account access permits;
2. add the canonical site to LinkedIn profile/contact surfaces;
3. add relevant article/case-study links to public project READMEs only where they improve the repository rather than acting as reciprocal-link decoration;
4. submit the sitemap through Search Console/Bing;
5. monitor which article/project/entity associations search and AI systems actually retrieve;
6. write follow-up content only from observed information gaps or new first-hand work.

## Authority exclusions

Do not use authority building as permission to publish:

- Network International customer/bank names, counts, platforms, schemas, mappings, cutover/reconciliation artifacts or proprietary workflows;
- private OpportunityOS founder data, opportunity/application records, hidden UI or private code;
- internal Ghareeb Oglu or Makhbazy assets without explicit publication rights;
- fake Power BI screenshots or project claims;
- fabricated clients, revenue, adoption, traffic or conversion metrics;
- backlink schemes, mass directory submissions or synthetic guest-post networks.

Authority must be an output of useful public work, not a link-volume target.
