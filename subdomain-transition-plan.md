# Subdomain transition plan

The parent site is the public canonical surface for CBT Setup and KPAKAM until the subdomains are ready.

## CBT

Current public page:

- `https://jeneconk.com/cbt-portal.html`

Recommended external action:

- Redirect `https://cbt.jeneconk.com/` to `https://jeneconk.com/cbt-portal.html`, or replace its homepage copy with CBT-specific institutional assessment messaging.
- Do not describe CBT as a recurring public subscription portal on the parent site.
- Use "CBT Setup" for navigation and product naming.

## KPAKAM

Current public page:

- `https://jeneconk.com/kpakam.html`

Recommended external action:

- Keep `https://food.jeneconk.com/` private until it has launch-ready public copy, crawlable metadata, and a clear robots policy.
- Use `kpakam.html` as the public teaser and interest-capture page for now.
- When the food domain is ready, add it back to homepage structured data and the KPAKAM CTA.

## Verification

- `robots.txt` on `jeneconk.com` should allow crawling and expose the sitemap.
- `sitemap.xml` should include only public-ready pages.
- Google Search Console should request indexing for the parent pages first.
