# InfyCortex Solution

**Think. Build. Deliver.**

InfyCortex Solution builds professional websites, custom software, AI and machine-learning prototypes, IoT systems and college projects — for businesses and students across India.

This is the complete static website for InfyCortex Solution — pure HTML5, CSS3 and vanilla JavaScript, ready for GitHub Pages.

---

## Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Markup     | HTML5 (semantic, accessible)      |
| Styling    | CSS3 (Grid, Flexbox, animations)  |
| Scripting  | Vanilla JavaScript (no libraries) |
| Hosting    | GitHub Pages                      |

No frameworks, no build step, no backend, no database.

## The five services

The same order is used everywhere — main nav dropdown, footer, `services.html`, home cards, pricing, contact form, sitemap and structured data:

1. Website Development — `websites.html`
2. Software Development — `software-development.html`
3. AI and Machine Learning — `ai-ml.html`
4. IoT Solutions — `iot.html`
5. College Project Development — `college-projects.html`

## Project Structure

```text
infycortex-solution/
│
├── index.html                  # Home
├── why-us.html                 # Why InfyCortex
├── features.html               # Development capabilities
├── services.html               # Services overview + detail sections
├── websites.html               # Website development
├── software-development.html   # Software development
├── ai-ml.html                  # AI and machine learning
├── iot.html                    # IoT solutions
├── college-projects.html       # College project development
├── pricing.html                # How pricing works, per service
├── faq.html                    # Frequently asked questions
├── about.html                  # About, values and founder profile
├── contact.html                # Contact + enquiry form
├── privacy.html                # Privacy policy
├── terms.html                  # Terms of service
├── 404.html                    # Not-found page (noindex, excluded from sitemap)
├── demos.html                  # Redirect stub → services.html (noindex)
│
├── css/
│   └── style.css               # All styles (design tokens, layout, responsive)
│
├── js/
│   └── script.js               # Nav, scroll reveal, hero canvas, form, back-to-top
│
├── assets/
│   ├── logo/
│   │   ├── icon.svg            # Symbol mark — light backgrounds
│   │   ├── icon-light.svg      # Symbol mark — dark backgrounds
│   │   ├── favicon.svg         # Favicon — navy badge + light symbol
│   │   ├── favicon.ico         # Legacy favicon
│   │   ├── apple-touch-icon.png
│   │   ├── logo.svg            # Horizontal lockup (SVG, vector)
│   │   ├── logo-vertical.svg   # Vertical lockup (SVG, vector)
│   │   ├── icon.png / icon.jpg # 2000×2000 exports (white background)
│   │   ├── logo.png / logo.jpg # 2000px-wide horizontal exports (white background)
│   │   ├── logo-vertical.png   # Vertical PNG export
│   │   ├── logo-vertical.jpg   # Vertical JPG export
│   │   └── og-image.png        # 1200×630 social-share preview
│   ├── images/                 # (reserved for future photos)
│   └── icons/                  # (icons are inline SVG in markup)
│
├── robots.txt                  # Crawler policy + sitemap pointer
├── sitemap.xml                 # All 15 indexable pages (404 and redirect stub excluded)
├── .nojekyll                   # Bypass Jekyll processing on GitHub Pages
└── README.md
```

## Running Locally

The site is fully static — no install, no build.

**Option 1:** Open `index.html` directly in any browser.

**Option 2 (recommended):** Serve it with any static server so relative paths and SVG favicons behave exactly like production:

```bash
npx serve .
# or
python -m http.server 8000
```

Then visit the printed local URL.

## Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `infycortex-solution`).
2. Push this folder's contents to the repository root:

```bash
git init
git add .
git commit -m "InfyCortex Solution website"
git remote add origin https://github.com/<your-username>/infycortex-solution.git
git push -u origin main
```

3. On GitHub: **Settings → Pages → Source → Deploy from a branch → `main` / `(root)` → Save**.
4. Wait a minute, then the site is live at `https://<your-username>.github.io/<repo-name>/`.

Because every path is relative (`./css/style.css`, `./js/script.js`, `./assets/...`), the site works from any subpath without configuration.

## SEO

Every indexable page ships with:

- **Canonical URL** and matching `og:url` (the home page canonical is the bare base URL, `https://infycortex.github.io/`)
- **Open Graph** full set (`og:title`, `og:description`, `og:type`, `og:image` with 1200×630 dimensions, `og:locale`)
- **Twitter card** (`summary_large_image` with per-page title/description/image)
- `robots` (`index, follow`), `theme-color` (`#0B1F3A`), SVG + ICO + apple-touch favicons
- **JSON-LD:** `ProfessionalService` with a `founder` `Person` on the home page, `Service` on each of the five service pages, `Person` on `about.html`, `BreadcrumbList` on every inner page, and `FAQPage` on `faq.html` plus all five service pages (matching the visible questions and answers)
- **`robots.txt`** + **`sitemap.xml`** (15 indexable pages; `404.html` and the `demos.html` redirect stub are excluded) + **`.nojekyll`** for GitHub Pages

### Base URL

All absolute URLs (canonical, `og:url`, `og:image`, sitemap, robots.txt) use this base:

```text
https://infycortex.github.io/
```

If the site ever moves to a different domain or repository name, find-and-replace this base URL across all `*.html` heads, `robots.txt`, `sitemap.xml` and `README.md` — then push.

## Contact Form

The site stays backend-free. The enquiry form on `contact.html` validates in the browser, then posts to a static-form service (Formspree or similar) configured through `FORM_ENDPOINT` at the top of the form section in `js/script.js`.

`FORM_ENDPOINT` is currently empty. While it is empty, the form falls back to a **mailto:** flow — it opens the visitor's email app with the enquiry pre-filled and addressed to `infycortex@gmail.com`, so no enquiry is silently lost. Set the endpoint URL and the fetch path activates automatically; no markup changes are needed.

Service links use `?service=` slugs (`website`, `software`, `ai-ml`, `iot`, `college`) and the contact form preselects the matching option.

The form also carries a honeypot field and an inline status line (`role="status"` for progress/success, `role="alert"` for errors).

## Contact Channels & Social Links

Every page carries the same footer contact block.

| Channel   | Value                                                       |
| --------- | ----------------------------------------------------------- |
| Email     | `infycortex@gmail.com`                                      |
| Phone / WhatsApp | +91 90214 96257                                      |
| GitHub    | https://github.com/sushant-0611                             |
| LinkedIn  | https://www.linkedin.com/in/sushant-kakade                  |
| Instagram | [@infycortex](https://www.instagram.com/infycortex/)        |

WhatsApp is wired in four places: a fixed floating button on every page (above back-to-top), a contact method card on `contact.html`, an entry in the social link lists, and the footer contact row. Every WhatsApp link opens a chat with a pre-filled project-enquiry message.

All external links open in a new tab with `rel="noopener noreferrer"` and carry an `aria-label`.

## Brand

- **Name:** InfyCortex — *Infy* (infinite possibility) + *Cortex* (intelligence at work)
- **Logos:** original vector suite in `assets/logo/` — symbol mark (dark + light variants), horizontal and vertical lockups, plus 2000px PNG/JPG exports
- **Wordmark:** InfyCortex (Sora, with "Infy" in White/Navy and "Cortex" in blue) · SOLUTION (Sora, letters spread edge-to-edge)
- **Palette:** Primary Navy `#0B1F3A` · Infy Blue `#2563EB` · Cortex Cyan `#00B8D9` · Slate `#475569` · White `#FFFFFF` · Light `#F5F8FC` · Dark `#071426`
- **Concept:** an infinity loop woven with circuit traces — limitless ideas, engineered.

## Founder

`about.html#founder` contains the founder profile: name, title (Founder and Lead Developer), bio, focus areas and GitHub/LinkedIn/Instagram links. The home page carries a compact founder card just above the contact strip. The same `Person` data is published as JSON-LD.

The photo slot is intentionally rendered as an initials card until a founder photo is added. To use a photo, replace the `.founder-card` block in `about.html` with an `<img>` (square, at least 600×600 px, with descriptive `alt`) and keep the existing layout styles.

## Owner Actions Before Publishing

1. **Formspree endpoint** — set `FORM_ENDPOINT` in `js/script.js` to the project's Formspree URL so submissions arrive without opening an email app.
2. **Founder photo** — add a square photo (see Founder above).
3. **Founder bio review** — the bio, focus areas and title were drafted from the service list and owner inputs; confirm the wording.
4. **Legal review** — `privacy.html` and `terms.html` are plain-language drafts (last updated 14 November 2026) based on the stated business policies. Have both reviewed before relying on them as formal statements.
5. **No published prices by design** — pricing is quote-based; `pricing.html` explains what shapes each quote and links to the contact form.

## Accessibility & Performance Notes

- Semantic landmarks, one `h1` per page, labelled form fields, `aria-current="page"` on the active nav item, a skip link, and visible `:focus-visible` rings (blue on light surfaces, cyan on dark).
- The Services dropdown is keyboard-operable: focus or Enter/Space opens it, Escape closes it and returns focus to the trigger, Tab order follows the visual order, and `aria-expanded` tracks state.
- Body text meets WCAG AA contrast (4.5:1); links inside paragraphs are underlined so colour is not the only cue.
- Icon-only links (social, floating WhatsApp, back-to-top) have accessible names; all external links use `target="_blank"` with `rel="noopener noreferrer"`.
- Touch targets on icon buttons are at least 44×44 px.
- `prefers-reduced-motion` disables the hero network animation and reveal animations; a static frame is drawn instead.
- The hero visual is a lightweight `<canvas>` neural-network animation (nodes + links); if JavaScript is unavailable, a static logo fallback is shown.
- All icons and artwork are inline/file SVG.
- JavaScript is one small deferred file.

---

© 2026 InfyCortex Solution. All Rights Reserved.
