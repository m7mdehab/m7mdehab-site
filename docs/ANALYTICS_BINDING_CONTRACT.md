# Analytics Binding Contract

Status: provider-neutral pre-account contract.

The website already exposes semantic conversion attributes. This document defines how a future authorized analytics provider may bind to them without changing visitor behavior, truth boundaries or privacy posture.

## Stable event semantics

The following `data-conversion` values are the durable event vocabulary:

| Conversion type | Meaning | `service_id` |
|---|---|---|
| `capability-to-service` | Visitor moves from a capability statement to the relevant service context | Required when present |
| `service-to-project` | Visitor opens project evidence from a service | Required |
| `service-to-contact` | Visitor initiates service-specific contact | Required |
| `project-to-service` | Visitor moves from a case study to a directly supported service | Required |
| `project-service-to-contact` | Visitor initiates contact from a project/service bridge | Required |
| `contact-email` | Visitor opens the general email contact intent | Not required |
| `contact-linkedin` | Visitor opens LinkedIn contact/profile | Not required |
| `contact-github` | Visitor opens GitHub profile | Not required |

Do not rename these merely to match a provider's preferred naming convention. Map provider events to this internal vocabulary instead.

## Recommended event envelope

A provider adapter may derive:

- `conversion_type` — from `data-conversion`;
- `service_id` — from `data-service-id` when present;
- `source_path` — current first-party path only;
- `destination_type` — e.g. `service_anchor`, `case_study`, `email`, `linkedin`, `github`;
- `destination_path` — first-party relative path where applicable;
- `outbound_host` — hostname only for intentional outbound links;
- standard referrer/campaign parameters already provided by the browser/provider.

Avoid transmitting full URLs when they may contain unnecessary query strings. Service mailto subjects may stay client-side and do not need to be sent as analytics properties.

## Data that must not be collected by this contract

Do not send:

- email body content or typed message content;
- raw email addresses beyond what the chosen provider inherently sees in page content;
- phone numbers or unpublished contact details;
- private CV/source-document content;
- compensation, immigration, legal-capacity or transient availability information;
- Network International client/bank identities, counts, system names, mappings, schemas, migration outputs or other confidential implementation detail;
- OpportunityOS private founder/application/opportunity data;
- hidden internal Ghareeb/Makhbazy artifacts;
- fingerprints or custom identity joins that are unnecessary for aggregate conversion measurement.

## Provider requirements

Before adding a provider:

1. The production property/account must be explicitly authorized.
2. The chosen collection mode must be reviewed for cookie/consent implications in the actual launch jurisdictions.
3. The provider must not make the website's core content or contact actions depend on JavaScript.
4. Tracking failure must never prevent navigation, mailto, external links or service anchors.
5. No provider should require widening the site's truth/publication boundaries.
6. Preview/staging traffic should be excluded or clearly separated from production.
7. The implementation must be tested against the existing browser, no-JS, reduced-motion and accessibility gates.

## Referral/source measurement

Normal browser referrer and campaign parameters are sufficient for source attribution when available. Preserve standard referral data rather than adding invasive source-specific tracking. For example, ChatGPT search referrals may arrive with normal referral/UTM context; the site does not need a separate OpenAI-specific tracker to recognize that traffic.

## Future contact-form rule

A first-party form is not part of the current launch architecture. Add one only if real post-launch evidence shows that mailto creates material friction and the benefit justifies spam controls, data retention, backend security and privacy obligations.
