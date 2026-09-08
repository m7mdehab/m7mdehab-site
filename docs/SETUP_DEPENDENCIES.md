# Setup Dependencies

Only external state that cannot be created in the current environment belongs here.

| Dependency | Why required | Blocks | User action | Status |
|---|---|---|---|---|
| GitHub repository | Production source control and CI history | Nothing — repository is now available | None | RESOLVED — `m7mdehab/m7mdehab-site` |
| `m7mdehab.com` ownership | Custom production identity | Custom-domain production launch | Purchase domain if available | OPEN |
| Cloudflare account/project + DNS access | Production Workers deployment, CDN, HTTPS and DNS | Production deployment | Connect/provide account access after repo/domain exist | OPEN |
| Google Search Console + Bing Webmaster ownership | Submission/indexing diagnostics | Search-engine operations, not code completion | Verify domain after DNS is active | OPEN |
| Production analytics property/access | Live conversion/RUM measurement | Live measurement only | Connect selected analytics account/property | OPEN |
| Anonymous third-party LLM benchmark execution | Neutral T0/T1/T2/T3 comparison where direct invocation is unavailable | Full AI visibility benchmark only | Supply exports/screenshots or connected session | OPEN |
| LinkedIn write access | Optional profile updates/launch announcement | External profile update only | Connect writable session if direct edits are desired | OPTIONAL |
| Portrait | Optional trust/composition enhancement | Nothing | Supply only if a strong portrait is intentionally desired | OPTIONAL |
| WhatsApp username | Optional public channel | Nothing | Supply username only if WhatsApp is intentionally enabled | OPTIONAL |
