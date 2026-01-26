# Orly Sitbon Patisserie — Static Website

This repository contains a **pure static website** for **Orly Sitbon Patisserie** built with **HTML + CSS + JavaScript** (no build tools, no frameworks).  
It is designed for hosting on **GitHub Pages** (or any static host).

## Credits

Developed by **HellSec** — `https://github.com/hellsecdev`  
Developer: **D371L** — `https://github.com/D371L`

## Tech Stack

- **HTML**: page structure (`index.html`)
- **CSS**: styling + responsive design (`style.css`)
- **JavaScript (Vanilla)**: UI behavior + dynamic galleries + hero slider (`main.js`)

## Design & Behavior (High-level)

- **Direction**: RTL (`<html dir="rtl">`) for Hebrew content.
- **Responsive**: mobile-first adjustments via media queries (main breakpoints: `860px` and `520px`).
- **No build step**: no bundlers, no npm, no frameworks.
- **GitHub Pages-ready**: `.nojekyll`, relative paths, URL-encoding for Hebrew/spaces in file names.
- **Performance**:
  - Galleries use **`<picture>` + `webp` + `srcset/sizes`** to serve smaller images on mobile.
  - Gallery sections render lazily with `IntersectionObserver` as they approach the viewport.
  - Hero slider uses **responsive variants** (picked by viewport width × DPR) and preloads the first frame.
  - CSS/JS use cache-busting query strings in `index.html` (e.g. `style.css?v=...`).
- **SEO**:
  - `meta description`, `canonical`, OpenGraph/Twitter cards, `robots.txt`, `sitemap.xml`
  - Local SEO schema (`application/ld+json`) for address/phone/hours/social links.

## Project Structure

Top-level files:

- `index.html` — main page markup (header, hero, galleries, about, footer)
- `style.css` — global styles, layout, responsive rules, components (header/hero/cards/about/footer)
- `main.js` — interactivity:
  - mobile menu open/close
  - burger animation (to X)
  - mobile menu appears **under the header** (offset is measured in JS)
  - mobile menu open animation (fade + slight slide)
  - smooth scroll for internal anchors
  - hero background slider (desktop + mobile) with `prefers-reduced-motion`
    - chooses the best image variant by viewport width × DPR
  - gallery rendering (cards) from a JS manifest
    - uses `<picture>` + `webp` + `srcset/sizes` for responsive images
- `.nojekyll` — tells GitHub Pages to **not** run Jekyll processing
- `robots.txt` — allows indexing + points to `sitemap.xml`
- `sitemap.xml` — sitemap for the root page
- `site.webmanifest` + favicons — icons for browser tabs and devices
- `og-image-1200x630.png` — social preview image (OpenGraph/Twitter)

Assets (root images):

- `logo_notext.svg` — header/hero logo (no text)
- `header_logo.png` — legacy header logo (not used in current header)
- `footer_logo.png` — logo in the About section under the photo
- `orlysitbontext.png` — hero title image
- `aboutme.png` — About photo

Hero slider folders:

- `Main Banner Desktop/` — hero slides for desktop (auto slider)
- `Main Banner Mobile/` — hero slides for mobile (auto slider)

Gallery folders (used by `main.js`):

- `מאפים וקינוחים/`
- `בראנץ_ ומאפים מלוחים/`
- `מארזים מושלמים/`
- `מגשי ארוח/`

## Galleries: how it works

GitHub Pages cannot list directory contents dynamically, so gallery images are defined in **a JS manifest** inside `main.js`.

- The constant `GALLERY` lists:
  - the folder name (`dir`)
  - an ordered list of image file names (`items`)
- On load, `main.js` renders the gallery grids into the sections in `index.html`.

If you add/remove images in a folder, update the relevant list in `GALLERY` inside `main.js`.

### Updating gallery images (step-by-step)

1. Put new images into the correct folder (e.g. `מארזים מושלמים/`).
2. Update the matching section inside `GALLERY` in `main.js`:
   - `pastry` → `מאפים וקינוחים/`
   - `brunch` → `בראנץ_ ומאפים מלוחים/`
   - `boxes` → `מארזים מושלמים/`
   - `hosting` → `מגשי ארוח/`
3. Commit and push.

### Image variants (important)

For performance the site uses pre-generated variants next to each original image:

- **Gallery cards**: `*-360.{jpg,webp}`, `*-640.{jpg,webp}`, `*-960.{jpg,webp}`
- **Hero slider**: `*-640.{jpg,webp}`, `*-960.{jpg,webp}`, `*-1280.{jpg,webp}`, `*-1920.{jpg,webp}`

If you add a new `.jpg`, generate its variants too (otherwise the site will still work, but it will fall back to the original `.jpg` and may be heavier).

Example (ImageMagick):

```bash
convert "image.jpg" -auto-orient -strip -resize 960x\> -quality 82 "image-960.webp"
```

Example (ffmpeg, if ImageMagick fails to encode WebP):

```bash
ffmpeg -i "image.jpg" -vf "scale=960:-1" -c:v libwebp -q:v 82 "image-960.webp"
```

## Hero Slider: how it works

Implemented in `main.js` (`setupHeroSlider()`):

- **Desktop**: cycles through images in `Main Banner Desktop/` every **6 seconds** with a fade transition.
- **Mobile**: cycles through images in `Main Banner Mobile/` every **6 seconds** with a fade transition.
- **Accessibility**: if the user has `prefers-reduced-motion: reduce`, animation is disabled and a single image is shown.
- **Performance**: the slider chooses the best pre-generated variant (by viewport × DPR) and the first frame is preloaded in `index.html`.

### Updating hero slides

Hero slides are stored in:

- `Main Banner Desktop/` — desktop slider images
- `Main Banner Mobile/` — mobile slider images

The slider uses an explicit image list inside `setupHeroSlider()` in `main.js` (paths are hardcoded in order).  
If you add/remove slides, update those arrays.

Then generate hero variants for the new images (`-640/-960/-1280/-1920` in `.webp` and `.jpg`).

## Social Links

Social icons are defined in `index.html` and link out to TikTok/Instagram/Facebook (open in a new tab).

## Buttons & External Links

All external buttons open in a new tab (`target="_blank" rel="noopener noreferrer"`):

- **Orders** (`הזמנות ומשלוחים`) — hero + header
- **Join club** (`הצטרפות למועדון`)
- **Gift card** (`גיפט קארד`)

WhatsApp floating button:

- Configured in `index.html` (`.float-whatsapp`).

## Floating Actions (Bottom-right)

There are two floating buttons:

- **Scroll to top** (`↑`): shows after scrolling past the hero section.
- **WhatsApp**: always visible.

Both are defined in `index.html` and styled in `style.css`.

## Header & Mobile Menu

- **Desktop header**: full-width layout with a thin border-bottom line.
- **Mobile header**: single-row layout:
  - burger + כשר on the left
  - social icons + address + logo on the right (logo sits to the right of the address)
- **Mobile menu**:
  - Opens/closes via burger **toggle**
  - Burger animates into **X**
  - Menu animates with **fade + slight slide**
  - Menu is positioned **below the header** (JS measures header height and sets `--mobile-header-h`)

## Development (Local)

Because this is a static site, you can open `index.html` directly.  
For the closest match to GitHub Pages behavior, you can run a simple static server:

```bash
cd /path/to/repo
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deploy

This is a static site: push to your host (GitHub Pages, Netlify, etc).

## Notes

- The site is **RTL** (`dir="rtl"`) because the content is Hebrew.
- File names include Hebrew and spaces; `main.js` uses `encodeURI()` for image URLs, so it works on GitHub Pages.

### File naming recommendations (important)

To avoid Git/GitHub Pages issues:

- Avoid trailing spaces in folder/file names
- Prefer consistent extensions (e.g. `.jpg` images should be `.jpg`, `.png` should be `.png`)
- If you must keep Hebrew names and spaces, this repo supports it (via URL encoding)

### Troubleshooting (common issues)

- **Images don’t load on GitHub Pages**:
  - Check that the file extension matches the real file type (e.g. JPEG file named `.png` can break on Pages due to MIME type).
  - Ensure paths are relative (no `/absolute/path` URLs).
- **Menu covers the header on mobile**:
  - The menu uses `--mobile-header-h`. Make sure `main.js` is loaded and no JS errors occur.
- **Social previews don’t update**:
  - Social platforms cache OG tags. Use their debuggers to force refresh after deploy:
    - Facebook Sharing Debugger
    - Twitter Card Validator (or X equivalent)

