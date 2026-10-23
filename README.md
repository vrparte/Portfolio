# Varad Parte · Applied AI Engineer

Personal portfolio at **https://varadparte.com**, owned and hosted in `vrparte/Portfolio` on GitHub Pages. The new site is an independent implementation based on Varad's current professional profile, without platform advertising or sponsorship.

## The current website

The Experience, Projects, and Skills sections reproduce the supplied temporary portfolio: dates alongside jobs, a two-column project grid, and grouped skill pills. The original hero remains in place. Project descriptions are fully visible without expanding panels.

The production website is in **`docs/`**. It is static HTML, CSS, and a small optional JavaScript file. No npm packages, API keys, server, subscriptions, or build framework are needed to serve it. Content is present in the initial HTML for search engines, accessibility, and visitors with JavaScript disabled. Fonts are self-hosted and their OFL licenses are included under `docs/assets/`.

```sh
python3 -m http.server 4173 --directory docs
```

Open http://localhost:4173.

## Headshot

The landing page uses responsive WebP copies of the supplied professional photo in `docs/assets/varad-parte-headshot-480.webp` and `docs/assets/varad-parte-headshot-960.webp`. The original image is not published. The photo appears beside the introduction on desktop and beside the name on mobile; it is omitted from the printable résumé.

## Update your profile

1. Edit `docs/content.json` (experience, projects, skills, education, contact links).
2. Run `node scripts/render-portfolio.mjs` to regenerate `docs/index.html`.
3. Run `node scripts/check-portfolio.mjs`.
4. Commit and push both the content and generated HTML to `main`.

Page structure is in `scripts/render-portfolio.mjs`. Hero, education, and footer styles are in `docs/assets/style.css`; palette and type tokens are in `docs/assets/tokens.css`. The three copied sections have their own scoped stylesheet, `docs/assets/reference-sections.css`, and self-hosted Inter and Geist Mono fonts. The résumé button opens the browser's print dialog; choose Save as PDF to export. It does not use the outdated PDF from the previous site.

## Hosting and domain

GitHub Pages should publish from **`main` → `/docs`**. Keep `docs/CNAME` set to `varadparte.com`. The existing apex DNS already points to GitHub Pages, and `www` points to `vrparte.github.io`; no hosting migration or new DNS provider is required.

The prior Pages setting was `gh-pages` → `/` at commit `a3a5698d136d24297869e152fcb4d56bc2492fcd`. The old React code remains intact in `src/` and `public/` as a historical reference. Its npm scripts and dependencies are for the old site and are not used by the new portfolio. Do not run the legacy `npm run deploy`, which publishes that old version.

To roll back, change Pages back to **`gh-pages` → `/`** in repository Settings → Pages. Do not delete the domain configuration.

## Content provenance

Professional content was carried over from the user-supplied temporary profile at https://tsenta.com/u/varad-parte. GitHub, LinkedIn, and email were verified against the existing portfolio. Project repository URLs retained in the content data were checked against `vrparte/SentimentAnalysis` and `vrparte/CleverCollab`. No unverified source link is displayed for the hackathon project. Experience and education dates and supplied impact figures are retained from the temporary profile; edit the content file when they change.
