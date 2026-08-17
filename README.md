# JENECONK Parent Website

Static GitHub Pages website for the JENECONK education, business, procurement, training, tools, and resource ecosystem.

## Main customer journeys

- `education.html` -> Edu Suite 2.0, JEMS, Maths Gateway, school tools, and education resources
- `business.html` -> Business Suite, Smart Procurement, business resources, and operational solutions
- `training.html` -> JENECONK Digital Academy, professional training, and assignment submission
- `products.html` -> verified product overview pages before visitors enter each application
- `resources.html` -> reviewed long-form guides and practical downloads
- `tools.html` -> free calculators and browser-based utilities
- `about.html` and `contact.html` -> company identity, evidence, and enquiries

## Official application destinations

- Edu Suite 2.0: `https://edu.jeneconk.com`
- Business Suite: `https://business.jeneconk.com`
- JEMS English Mastery: `https://english.jeneconk.com`
- JENECONK Digital Academy: `https://academy.jeneconk.com`
- Maths Gateway: `https://maths.jeneconk.com/`
- Smart Procurement: `https://procurement-staging.jeneconk.com/` until its production domain is provisioned

## Trust and publishing standards

The footer exposes the privacy, terms, cookie, editorial, and content-transparency pages. Early generated article drafts are deliberately excluded from indexing and ad delivery until each receives a substantive human-reviewed rewrite.

## Local preview

Run a static server from the repository root:

```powershell
python -m http.server 8765
```

Then open `http://127.0.0.1:8765/`.

## Validation

Run before every commit:

```powershell
node scripts/validate-site.cjs
node scripts/validate-global-guides.cjs
```

The validation checks local links, social metadata, policy discovery, sitemap conflicts, retired-page ad rules, homepage image weight, and prohibited stale copy. GitHub Actions runs the same checks on pushes and pull requests.

## Content maintenance

- `scripts/normalize-navigation.cjs` keeps shared navigation and footer links consistent.
- `scripts/generate-policy-pages.cjs` regenerates the policy pages.
- `scripts/retire-thin-articles.cjs` keeps early low-value drafts out of search and ad delivery.
- `scripts/optimize-site-images.py` creates the WebP assets used on high-traffic pages.
- `scripts/use-optimized-images.cjs` updates HTML and CSS references to optimized media.
- `scripts/refresh-sitemap-lastmod.cjs` should only be used when file modification dates represent meaningful page changes.

## Deployment

The production parent site is published from `main` through GitHub Pages. `CNAME` must remain `jeneconk.com`, and `ads.txt`, `robots.txt`, and `sitemap.xml` must stay at the repository root.
