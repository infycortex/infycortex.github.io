# InfyCortex Solution

**Think. Build. Deliver.**

InfyCortex Solution delivers modern software solutions, professional websites and guided college project development with a focus on quality, usability and technology.

This is the complete static website for InfyCortex Solution — built with pure HTML5, CSS3 and vanilla JavaScript, ready for GitHub Pages.

---

## Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Markup     | HTML5 (semantic, accessible)      |
| Styling    | CSS3 (Grid, Flexbox, animations)  |
| Scripting  | Vanilla JavaScript (no libraries) |
| Hosting    | GitHub Pages                      |

No frameworks, no build step, no backend, no database.

## Project Structure

```text
infycortex-solution/
│
├── index.html                  # Home
├── why-us.html                 # Why InfyCortex
├── features.html               # Development capabilities
├── services.html               # Main services overview
├── websites.html               # Website development detail
├── software-development.html   # Software development detail
├── ai-ml.html                  # AI & machine learning detail
├── iot.html                    # IoT & embedded projects detail
├── college-projects.html       # College project development detail
├── pricing.html                # Pricing & packages
├── demos.html                  # Project demos
├── faq.html                    # Frequently asked questions
├── about.html                  # About the company
├── contact.html                # Contact + enquiry form
├── privacy.html                # Privacy policy
├── terms.html                  # Terms of service
├── 404.html                    # Not-found page (noindex, excluded from sitemap)
│
├── css/
│   └── style.css               # All styles (design tokens, layout, responsive)
│
├── js/
│   └── script.js               # Nav, scroll reveal, hero canvas, form, back-to-top
│
├── assets/
│   ├── logo/
│   │   ├── icon.svg            # Symbol mark — black infinity + blue glow (light backgrounds)
│   │   ├── icon-light.svg      # Symbol mark — light variant (navy/dark backgrounds)
│   │   ├── favicon.svg         # Favicon — navy badge + light symbol
│   │   ├── favicon.ico         # Legacy favicon
│   │   ├── apple-touch-icon.png
│   │   ├── logo.svg            # Horizontal lockup (SVG, vector)
│   │   ├── logo-vertical.svg   # Vertical lockup (SVG, vector)
│   │   ├── icon.png / icon.jpg # 2000×2000 exports (white background)
│   │   ├── logo.png / logo.jpg # 2000px-wide horizontal exports (white background)
│   │   ├── logo-vertical.png   # Vertical PNG export
│   │   ├── logo-vertical.jpg   # Vertical JPG export
│   │   └── og-image.png        # 1200×630 social-share preview (generated from logo.png)
│   ├── images/                 # (reserved for future photos)
│   ├── icons/                  # (icons are inline SVG in markup)
│   └── projects/
│       ├── complaint-management.svg
│       ├── safehaven-iot.svg
│       ├── careq.svg
│       └── hydroponics.svg
│
├── robots.txt                  # Crawler policy + sitemap pointer
├── sitemap.xml                 # All 16 indexable pages (404 excluded)
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
- **JSON-LD:** `ProfessionalService` on the home page and each service detail page, `Service` on the six service pages, `BreadcrumbList` on every inner page, `FAQPage` on `faq.html`
- **`robots.txt`** + **`sitemap.xml`** (16 indexable pages; `404.html` is `noindex` and excluded) + **`.nojekyll`** for GitHub Pages

### Base URL

All absolute URLs (canonical, `og:url`, `og:image`, sitemap, robots.txt) use this base:

```text
https://infycortex.github.io/
```

If the site ever moves to a different domain or repository name, find-and-replace this base URL across all `*.html` heads, `robots.txt`, `sitemap.xml` and `README.md` — then push.

## Contact Form

The site stays backend-free. The enquiry form on `contact.html` validates in the browser, then posts to a static-form service (Formspree or similar) configured through `FORM_ENDPOINT` at the top of the form section in `js/script.js`.

The endpoint currently holds a placeholder (`[[OWNER TO PROVIDE: FORMSPREE FORM ID]]`). While it is unset, the form falls back to a **mailto:** flow — it opens the visitor's email app with the enquiry pre-filled and addressed to `infycortex@gmail.com`, so no enquiry is silently lost. Replace the placeholder with your form endpoint and the fetch path activates automatically; no markup changes are needed.

The form also carries a honeypot field and an inline status line (`role="status"` for progress/success, `role="alert"` for errors).

## Contact Channels & Social Links

Every page carries the same footer contact block.

| Channel   | Value                                                       |
| --------- | ----------------------------------------------------------- |
| Email     | `infycortex@gmail.com`                                      |
| WhatsApp  | [+91 90214 96257](https://wa.me/919021496257)               |
| GitHub    | https://github.com/sushant-0611                             |
| LinkedIn  | https://www.linkedin.com/in/sushant-kakade                  |
| Instagram | [@infycortex](https://www.instagram.com/infycortex/)        |

WhatsApp is wired in four places: a fixed floating button on every page (above back-to-top), a contact method card on `contact.html`, an entry in both social link lists, and the footer contact row. Every WhatsApp link opens a chat with a pre-filled project-enquiry message.

All external links open in a new tab with `rel="noopener noreferrer"` and carry an `aria-label`.

## Brand

- **Name:** InfyCortex — *Infy* (infinite possibility) + *Cortex* (intelligence at work)
- **Logos:** original vector suite in `assets/logo/` — symbol mark (dark + light variants), horizontal and vertical lockups, plus 2000px PNG/JPG exports (white background; `favicon.svg` and `og-image.png` are derived from them, originals untouched)
- **Wordmark:** InfyCortex (Sora, with "Infy" in White/Navy and "Cortex" in blue) · SOLUTION (Sora, letters spread edge-to-edge to match the wordmark width exactly)
- **Palette:** Primary Navy `#0B1F3A` · Infy Blue `#2563EB` · Cortex Cyan `#00B8D9` · Slate `#475569` · White `#FFFFFF` · Light `#F5F8FC` · Dark `#071426`
- **Concept:** an infinity loop woven with circuit traces — limitless ideas, engineered.

## Accessibility & Performance Notes

- Semantic landmarks, one `h1` per page, labelled form fields, `aria-current="page"` on the active nav item, a skip link, and visible `:focus-visible` rings (blue on light surfaces, cyan on dark).
- The Services dropdown is keyboard-operable: focus or Enter/Space opens it, Escape closes it and returns focus to the trigger, Tab order follows the visual order, and `aria-expanded` tracks state.
- Body text meets WCAG AA contrast (4.5:1); links inside paragraphs are underlined so colour is not the only cue.
- Icon-only links (social, floating WhatsApp, back-to-top) have accessible names; all external links use `target="_blank"` with `rel="noopener noreferrer"`.
- Touch targets on icon buttons are at least 44×44 px; layouts were checked from 320 px to 1440 px with no horizontal scroll.
- `prefers-reduced-motion` disables the hero network animation and reveal animations; a static frame is drawn instead.
- The hero visual is a lightweight `<canvas>` neural-network animation (nodes + links); if JavaScript is unavailable, a static logo fallback is shown.
- All icons and artwork are inline/file SVG — zero image-weight, zero icon-library dependencies.
- No console errors; JavaScript is one small deferred file.

## Content Placeholders

Some business-specific details are intentionally not invented. They appear as `[[OWNER TO PROVIDE: description]]` in the markup and in `js/script.js`, and must be replaced with real information before publishing. Affected pages: `about.html`, `pricing.html`, `faq.html`, `iot.html`, `privacy.html`, `terms.html` and the contact-form endpoint. Search the project for `[[OWNER TO PROVIDE` to find every one.

---

© 2026 InfyCortex Solution. All Rights Reserved.
