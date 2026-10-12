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
├── college-projects.html       # College project development detail
├── demos.html                  # Project demos
├── about.html                  # About the company
├── contact.html                # Contact + enquiry form
├── 404.html                    # Not-found page
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
│   │   ├── logo.svg            # Horizontal lockup (SVG, vector)
│   │   ├── logo-vertical.svg   # Vertical lockup (SVG, vector)
│   │   ├── icon.png            # 2000×2000 PNG (white background)
│   │   ├── logo.png            # 2000px-wide horizontal PNG (white background)
│   │   ├── logo.jpg            # 2000px-wide horizontal JPG (white background)
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
├── sitemap.xml                 # All 9 indexable pages
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

- **Canonical URL** and matching `og:url`
- **Open Graph** full set (`og:title`, `og:description`, `og:type`, `og:image` with 1200×630 dimensions, `og:locale`)
- **Twitter card** (`summary_large_image` with per-page title/description/image)
- `robots` (`index, follow`), `theme-color` (`#0B1F3A`), SVG + PNG + apple-touch favicons
- **JSON-LD** `Organization` schema on `index.html` (name, url, logo, email, sameAs social profiles, contactPoint)
- **`robots.txt`** + **`sitemap.xml`** (all 9 pages) + **`.nojekyll`** for GitHub Pages

### Base URL

All absolute URLs (canonical, `og:url`, `og:image`, sitemap, robots.txt) use this base:

```text
https://sushant-0611.github.io/infycortex/
```

If your repository name is different (e.g. `infycortex-solution`), find-and-replace the base URL `sushant-0611.github.io/infycortex/` across all `*.html` heads, `robots.txt` and `sitemap.xml` after creating the repo — then push.

## Contact Form

The site is backend-free, so the enquiry form on `contact.html` uses a **mailto:** flow: after client-side validation it opens the visitor's email app with a pre-filled message addressed to `infycortex@gmail.com`. To collect submissions without a mail client, point the form at a static-form service (e.g. Formspree) later by swapping the `action`/`fetch` in `js/script.js` — no markup changes needed.

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

- Semantic landmarks, single `h1` per page, labelled form fields, `aria-current` navigation state, visible focus styles.
- `prefers-reduced-motion` disables the hero network animation and reveal animations; a static frame is drawn instead.
- The hero visual is a lightweight `<canvas>` neural-network animation (nodes + links); if JavaScript is unavailable, a static logo fallback is shown.
- All icons and artwork are inline/file SVG — zero image-weight, zero icon-library dependencies.
- No console errors; JavaScript is one small deferred file.

---

© 2026 InfyCortex Solution. All Rights Reserved.
