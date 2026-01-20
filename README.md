# Orly Sitbon Patisserie — Static Website

This repository contains a **pure static website** for **Orly Sitbon Patisserie** built with **HTML + CSS + JavaScript** (no build tools, no frameworks).  
It is designed for hosting on **GitHub Pages**.

## Tech Stack

- **HTML**: page structure (`index.html`)
- **CSS**: styling + responsive design (`style.css`)
- **JavaScript (Vanilla)**: UI behavior + dynamic galleries + hero slider (`main.js`)

## Design & Behavior (High-level)

- **Direction**: RTL (`<html dir="rtl">`) for Hebrew content.
- **Responsive**: mobile-first adjustments via media queries (main breakpoints: `860px` and `520px`).
- **No build step**: no bundlers, no npm, no frameworks.
- **GitHub Pages-ready**: `.nojekyll`, relative paths, URL-encoding for Hebrew/spaces in file names.

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
  - gallery rendering (cards) from a JS manifest
- `.nojekyll` — tells GitHub Pages to **not** run Jekyll processing

Assets (root images):

- `header_logo.png` — header logo
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

## Hero Slider: how it works

Implemented in `main.js` (`setupHeroSlider()`):

- **Desktop**: cycles through images in `Main Banner Desktop/` every **6 seconds** with a fade transition.
- **Mobile**: cycles through images in `Main Banner Mobile/` every **6 seconds** with a fade transition.
- **Accessibility**: if the user has `prefers-reduced-motion: reduce`, animation is disabled and a single image is shown.

### Updating hero slides

Hero slides are stored in:

- `Main Banner Desktop/` — desktop slider images
- `Main Banner Mobile/` — mobile slider images

The slider uses an explicit image list inside `setupHeroSlider()` in `main.js` (paths are hardcoded in order).  
If you add/remove slides, update those arrays.

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

- **Desktop header**: full-width layout with underline.
- **Mobile header**: grid layout (burger + כשר on the left, logo on the right; address centered).
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

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In GitHub: **Settings → Pages**
3. Select:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Save — GitHub Pages will publish the site.

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

