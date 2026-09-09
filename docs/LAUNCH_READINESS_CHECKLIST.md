# Launch Readiness Checklist

This checklist separates repository-controlled launch readiness from external account/platform state. A green repository does not mean the public site is deployed, indexed or measured.

## A. Repository-controlled gates

Before any public launch candidate is promoted:

- [ ] `main` is the intended release commit and its Application CI is green.
- [ ] Rendered Browser QA is green on the same source state or the final PR merge candidate.
- [ ] `npm ci`, typecheck, lint and `next build` succeed on Node 22.
- [ ] Homepage and all six `/work/<slug>` routes return HTTP 200.
- [ ] `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/profile.json`, `/projects.json` and `/services.json` return HTTP 200.
- [ ] Every indexable HTML route self-canonicalizes to its own production URL.
- [ ] Every project page publishes an `og:url` that matches its canonical URL.
- [ ] Sitemap contains only canonical indexable HTML URLs. Machine-readable support routes are not sitemap entries.
- [ ] Sitemap `lastmod` is omitted unless a trustworthy content-change timestamp exists for that URL.
- [ ] Structured data contains only governed public facts and does not widen ownership, employment, client, KPI or publication claims.
- [ ] Profile/project/service JSON and `/llms.txt` are projections of governed public data, not independent truth sources.
- [ ] Important content remains readable without JavaScript and under reduced motion.
- [ ] No horizontal overflow is present at the tested 390px mobile viewport.
- [ ] Strict axe gate remains clean on homepage + all six case studies.
- [ ] Production dependency audit contains no known production vulnerabilities.
- [ ] No secrets, private source data or confidential work detail appears in generated HTML, JSON, metadata, source maps or static assets.
- [ ] External evidence links resolve to the intended public repositories/sites and do not expose internal asset locations.

## B. Deployment/runtime gates — external state required

These cannot be inferred from repository readiness and must be checked against the actual hosting environment:

- [ ] Production deployment is reachable at `https://m7mdehab.com`.
- [ ] TLS certificate is valid and renews automatically.
- [ ] One canonical host is chosen (`m7mdehab.com` or `www.m7mdehab.com`) and the alternate host permanently redirects to it.
- [ ] HTTP permanently redirects to HTTPS.
- [ ] Preview/staging deployments are protected or `noindex` and are not discoverable as duplicate production pages.
- [ ] Production response headers do not accidentally block search/AI crawlers, assets or embedded public evidence.
- [ ] CDN/WAF permits legitimate search crawlers used for the launch strategy; robots permission alone is not sufficient if edge rules block requests.
- [ ] Public raw evidence image URLs used by the site load reliably from the deployed runtime.
- [ ] Production 404 and redirect behavior is verified.

## C. Search-engine launch operations — account ownership required

- [ ] Google Search Console property is verified for the canonical production host/domain.
- [ ] `https://m7mdehab.com/sitemap.xml` is submitted in Search Console.
- [ ] Homepage and representative project pages pass URL Inspection after deployment.
- [ ] Bing Webmaster Tools property is verified.
- [ ] Sitemap is submitted to Bing Webmaster Tools.
- [ ] Search-engine crawl/indexing errors are reviewed after launch rather than inferred from local builds.

## D. AI/search crawler readiness

- [ ] `robots.txt` allows the intended search crawler policy.
- [ ] OpenAI search visibility policy is reviewed separately from model-training crawler policy; do not treat OAI-SearchBot and GPTBot as the same decision.
- [ ] If ChatGPT search visibility is desired, OAI-SearchBot is not blocked by robots, CDN, firewall or WAF controls.
- [ ] `/llms.txt` remains auxiliary machine-readable context and is not treated as a substitute for crawlable semantic HTML, metadata or structured data.
- [ ] Public identity spelling remains `Mohammed Ehab ElNomany`; `M7mdehab` remains a secondary handle.

## E. Analytics / conversion measurement — authorization required

- [ ] A production analytics provider/property is explicitly authorized before any provider script is added.
- [ ] The provider binding preserves the stable `data-conversion` / `data-service-id` contract.
- [ ] Measurement does not collect email body content, private CV/source facts, confidential work details, hidden client identifiers or other unnecessary personal data.
- [ ] Cookie/consent requirements for the chosen provider and deployment jurisdictions are reviewed before launch.
- [ ] Service/contact events are tested in production without breaking mailto, no-JS or accessibility behavior.
- [ ] ChatGPT referral traffic can be recognized from normal referral/UTM data when present; no special invasive instrumentation is required merely to identify the channel.

## F. Post-launch verification

Within the first launch cycle:

- [ ] Re-run browser/a11y QA against the deployed origin.
- [ ] Re-run Lighthouse against deployed homepage + Presaira and interpret lab scores alongside runner conditions and field behavior.
- [ ] Verify all canonical, Open Graph and structured-data URLs resolve to production.
- [ ] Check sitemap fetch status in webmaster tools.
- [ ] Check first indexing/search visibility without fabricating expectations about ranking speed.
- [ ] Review real conversion/referral data before adding forms, audience switches, new service pages or heavier tracking.

## External blocker rule

If DNS, hosting, webmaster ownership or analytics-property access is unavailable, record it as an external/setup-dependent blocker. Do not compensate by inventing account state, deployment success, indexed pages or conversion data in repository documentation.
