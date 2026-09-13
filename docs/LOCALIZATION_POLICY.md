# Localization Policy

The public website is currently **English-only**. Arabic localization was fully authored and validated during the frontend overhaul, but it is intentionally dormant until there is demonstrated product need after sustained real-world use of the English site.

## Current public contract

- English is the only published language.
- Public HTML lives at `/`, `/about`, `/work`, `/work/<slug>`, `/services`, `/writing` and `/writing/<slug>`.
- `/ar` and all `/ar/*` routes must remain unpublished and return `404`.
- Public navigation must not expose an Arabic/locale switch.
- English pages must not emit Arabic `hreflang`, Arabic Open Graph locale alternates, or other machine-facing Arabic route references.
- The sitemap contains only the 14 canonical English HTML URLs.

## Dormant Arabic capability

The authored Arabic components, data projections and RTL styling remain in source control so the work can be revived later without rebuilding localization from scratch. Dormant source is not a public surface and must not be wired into routing, metadata, sitemap, navigation, discovery endpoints, staging acceptance or production acceptance unless Mohammed explicitly re-enables Arabic.

Reactivation is a product decision, not a maintenance task. Before publishing Arabic again, reassess actual audience demand and then re-run the full localization, accessibility, responsive, canonical, sitemap, staging and production acceptance gates.

## Identity and truth

- Canonical public identity remains **Mohammed Ehab ElNomany**.
- Any future Arabic projection remains subordinate to the governed public truth and evidence boundaries.
- Translation must never widen publication permission, ownership wording, evidence strength or confidentiality boundaries.

## Deployment guardrail

CI, staging and production acceptance must explicitly verify that representative `/ar*` routes are absent while the English-only policy is active. This protects against accidental re-publication from retained dormant source.
