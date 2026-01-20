# Orly Sitbon Patisserie — Static Website

This repository contains a **pure static website** for **Orly Sitbon Patisserie** built with **HTML + CSS + JavaScript** (no build tools, no frameworks).  
It is designed for hosting on **GitHub Pages**.

## Tech Stack

- **HTML**: page structure (`index.html`)
- **CSS**: styling + responsive design (`style.css`)
- **JavaScript (Vanilla)**: UI behavior + dynamic galleries + hero slider (`main.js`)

## Project Structure

Top-level files:

- `index.html` — main page markup (header, hero, galleries, about, footer)
- `style.css` — global styles, layout, responsive rules, components (header/hero/cards/about/footer)
- `main.js` — interactivity:
  - mobile menu open/close
  - burger animation (to X)
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

## Hero Slider: how it works

Implemented in `main.js` (`setupHeroSlider()`):

- **Desktop**: cycles through images in `Main Banner Desktop/` every **6 seconds** with a fade transition.
- **Mobile**: cycles through images in `Main Banner Mobile/` every **6 seconds** with a fade transition.
- **Accessibility**: if the user has `prefers-reduced-motion: reduce`, animation is disabled and a single image is shown.

## Social Links

Social icons are defined in `index.html` and link out to TikTok/Instagram/Facebook (open in a new tab).

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
- File names include Hebrew and spaces; the code uses URL encoding where needed so it works on GitHub Pages.

