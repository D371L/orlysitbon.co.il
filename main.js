const GALLERY = {
  pastry: {
    dir: "מאפים וקינוחים",
    items: [
      "BN Cheesecake.jpg",
      "אנגליקה פיסטוק.jpg",
      "אקלר פבלובה.jpg",
      "בריוש סינבון.jpg",
      "בריוש פיסטוק.jpg",
      "גבינה אפויה.jpg",
      "טארט אקסטרה שוקולד.jpg",
      "טארט לימון.jpg",
      "טארט פטיסייר ופירות.jpg",
      "טרימיסו.jpg",
      "לב פטיסייר פירות.jpg",
      "מאפים מתוקים.jpg",
      "מקרונים.jpg",
      "סטריפ.jpg",
      "סנט הונורה.jpg",
      "פאן סוויס.jpg",
      "פסים.jpg",
      "פרופיטרול פרלינה לוז.jpg",
      "פרז שאנטי.jpg",
      "קראפין לוז.jpg",
      "קרואסון פבלובה.jpg",
      "קרואסון פטיסייר פירות.jpg",
      "קרואסון שקדים שוקולד.jpg",
    ],
  },
  brunch: {
    dir: "בראנץ_ ומאפים מלוחים",
    items: [
      "אבוקדו.jpg",
      "אומלט אוסטרי.jpg",
      "ארטישוק וגבינת עיזים.jpg",
      "בורקס 3 גבינות.jpg",
      "בורקס גבינות ומנגולד.jpg",
      "בשמל בטטה ובולגרית.jpg",
      "בשמל ובצל מקורמל.jpg",
      "חלומי וביצת עין.jpg",
      "כרוב ושקדים וגבינת עיזים.jpg",
      "לאבנה זעתר ובולגרית.jpg",
      "מחמצת אבוקדו.jpg",
      "מקשושקשת פרמזן וכמהין.jpg",
      "סביח.jpg",
      "סקורדיליה עגבניות צרובות.jpg",
      "פולנטה פטריות.jpg",
      "פקורינו וגבינת בצל.jpg",
      "קיש בטטה פקאן.jpg",
      "קיש שרי ברוקולי.jpg",
    ],
  },
  boxes: {
    dir: "מארזים מושלמים",
    items: [
      "ביו פריז.jpg",
      "מארז לה וילט.jpg",
      "ג_אטם.jpg",
      "קולמאר.jpg",
      "מרסי.jpg",
      "מולין רוז.jpg",
      "מרסי בוקו.jpg",
      "בראנץ בוקס.jpg",
      "מארז 1.jpg",
      "מארז 2.jpg",
      "מארז 3.jpg",
      "מארז 4.jpg",
      "מארז 5.jpg",
      "מארז 6.jpg",
    ],
  },
  hosting: {
    dir: "מגשי ארוח",
    items: [
      "מגש טארטלטים.jpg",
      "מגש טארטלטים(1).jpg",
      "מגש מאפי בוקר צרפתי.jpg",
      "מגש פטיפורים.jpg",
      "מגש פטיפורים(1).jpg",
      "מארז מקרונים.jpg",
      "פחזניות פטיסייר.jpg",
      "מגש בורקס בעבודת יד.jpg",
      "מגש כריכוני בריוש.jpg",
      "מגש כריכוני קרואסון.jpg",
      "מגש מאפה טוסקנה.jpg",
      "סלט אנטיפסטי.jpg",
      "סלט טאבולה.jpg",
      "סלט עדשים ובטטה.jpg",
      "סלט פנצנלה.jpg",
      "קיש בטטה פקאן.jpg",
      "קיש בצל וכרישה.jpg",
      "קיש חציל ובלסמי.jpg",
      "קיש שרי וברוקולי.jpg",
    ],
  },
};

const TITLE_OVERRIDES = {
  "אנגליקה פיסטוק": "אנג'ליקה פיסטוק",
  "מקשושקשת פרמזן וכמהין": "מקושקשת פרמז'ן וכמהין",
  "ג_אטם": "ג'אטם",
  "בראנץ בוקס": "בראנץ' בוקס",
  "מארז 1": "",
  "מארז 2": "",
  "מארז 3": "",
  "מארז 4": "",
  "מארז 5": "",
  "מארז 6": "",
  "מגש טארטלטים(1)": "מגש טארטלטים",
  "מגש פטיפורים(1)": "מגש פטיפורים",
};

function fileTitle(filename) {
  const base = filename.replace(/\.[^/.]+$/, "");
  return TITLE_OVERRIDES[base] ?? base;
}

function joinPath(dir, filename) {
  // Encode for spaces/Hebrew characters (works for file:// and GitHub Pages).
  return encodeURI(`./${dir}/${filename}`);
}

function toWebpFilename(filename) {
  return filename.replace(/\.[^/.]+$/, ".webp");
}

const CARD_SRCSET_WIDTHS = [360, 640, 960];
const CARD_SIZES =
  "(max-width: 520px) 100vw, (max-width: 860px) 50vw, (max-width: 1100px) 33vw, 295px";

function toVariantFilename(filename, width, ext) {
  const base = filename.replace(/\.[^/.]+$/, "");
  return `${base}-${width}.${ext}`;
}

function buildSrcset(dir, filename, ext) {
  return CARD_SRCSET_WIDTHS.map((w) => `${joinPath(dir, toVariantFilename(filename, w, ext))} ${w}w`).join(
    ", ",
  );
}

function supportsWebP() {
  try {
    const c = document.createElement("canvas");
    if (!c.getContext) return false;
    return c.toDataURL("image/webp").startsWith("data:image/webp");
  } catch {
    return false;
  }
}

const HERO_VARIANT_WIDTHS = [640, 960, 1280, 1920];

function pickVariantPath(originalPath, ext, widths = HERO_VARIANT_WIDTHS) {
  // originalPath example: "./Main Banner Desktop/אבוקדו.jpg"
  const base = originalPath.replace(/\.[^/.]+$/, "");
  const vw = Math.max(1, window.innerWidth || 1);
  const dpr = Math.min(3, Math.max(1, window.devicePixelRatio || 1));
  const need = vw * dpr;
  const chosen = widths.find((w) => w >= need) ?? widths[widths.length - 1];
  return `${base}-${chosen}.${ext}`;
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "dataset") Object.assign(node.dataset, v);
    else if (k.startsWith("on") && typeof v === "function")
      node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const child of children) {
    if (child == null) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

function renderGrid(key, items) {
  const grid = document.querySelector(`[data-grid="${key}"]`);
  if (!grid) return;
  grid.innerHTML = "";

  for (const item of items) {
    const hasTitle = typeof item.title === "string" && item.title.trim().length > 0;
    const webpSrc = item.webpSrc;
    const jpgSrcset = item.jpgSrcset;
    const webpSrcset = item.webpSrcset;
    const fallbackSrc = item.fallbackSrc || item.src;
    const card = el("article", { class: "card" }, [
      el("div", { class: "card__img" }, [
        webpSrc
          ? el("picture", {}, [
              el("source", {
                type: "image/webp",
                srcset: webpSrcset || webpSrc,
                sizes: CARD_SIZES,
              }),
              el("img", {
                src: fallbackSrc,
                srcset: jpgSrcset || undefined,
                sizes: CARD_SIZES,
                alt: hasTitle ? item.title : "",
                loading: "lazy",
                decoding: "async",
                dataset: { originalSrc: item.src },
                onerror: (e) => {
                  const img = e.currentTarget;
                  const originalSrc = img?.dataset?.originalSrc;
                  if (!originalSrc || img.src === originalSrc) return;
                  img.removeAttribute("srcset");
                  img.src = originalSrc;
                },
              }),
            ])
          : el("img", {
              src: fallbackSrc,
              srcset: jpgSrcset || undefined,
              sizes: CARD_SIZES,
              alt: hasTitle ? item.title : "",
              loading: "lazy",
              decoding: "async",
              dataset: { originalSrc: item.src },
              onerror: (e) => {
                const img = e.currentTarget;
                const originalSrc = img?.dataset?.originalSrc;
                if (!originalSrc || img.src === originalSrc) return;
                img.removeAttribute("srcset");
                img.src = originalSrc;
              },
            }),
      ]),
      hasTitle
        ? el("div", { class: "card__body" }, [el("h3", { class: "card__title" }, [item.title])])
        : null,
    ]);
    grid.append(card);
  }
}

function setupMobileMenu() {
  const menu = document.querySelector("[data-menu]");
  const openBtn = document.querySelector("[data-menu-open]");
  const links = Array.from(document.querySelectorAll("[data-menu-link]"));
  if (!menu || !openBtn) return;

  let lastActive = null;

  const updateOffset = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const h = Math.round(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--mobile-header-h", `${h}px`);
  };

  const prefersReduce = () =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const setOpen = (isOpen) => {
    if (isOpen) {
      lastActive = document.activeElement;
      updateOffset();
      menu.hidden = false;
      document.body.style.overflow = "hidden";
      openBtn.setAttribute("aria-expanded", "true");
      // Animate in on next frame so transitions apply.
      window.requestAnimationFrame(() => menu.classList.add("is-open"));
      // Focus the first menu link if available.
      const firstLink = menu.querySelector("a, button, [tabindex]:not([tabindex=\"-1\"])");
      if (firstLink && typeof firstLink.focus === "function") firstLink.focus();
    } else {
      menu.classList.remove("is-open");
      document.body.style.overflow = "";
      openBtn.setAttribute("aria-expanded", "false");
      // Wait for animation to finish before hiding (otherwise no transition).
      if (prefersReduce()) {
        menu.hidden = true;
      } else {
        window.setTimeout(() => {
          // Only hide if still closed.
          if (openBtn.getAttribute("aria-expanded") !== "true") menu.hidden = true;
        }, 190);
      }
      if (lastActive && typeof lastActive.focus === "function") lastActive.focus();
    }
  };

  openBtn.addEventListener("click", () => {
    const isOpen = openBtn.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });
  menu.addEventListener("click", (e) => {
    if (e.target === menu) setOpen(false);
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) setOpen(false);
  });
  for (const l of links) l.addEventListener("click", () => setOpen(false));

  updateOffset();
  window.addEventListener("resize", updateOffset, { passive: true });
}

function setupSmoothAnchors() {
  document.addEventListener("click", (e) => {
    const a = e.target?.closest?.('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);

    // If the target section contains a gallery grid that hasn't been rendered yet,
    // render it immediately (so the user doesn't scroll into an empty grid).
    const grid = target.querySelector?.("[data-grid]");
    if (grid?.dataset?.grid) {
      window.__renderGalleryGrid?.(grid.dataset.grid);
    }
  });
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function setBg(el, url) {
  if (!el) return;
  el.style.backgroundImage = `url("${encodeURI(url)}")`;
}

function setupHeroSlider() {
  const layerA = document.querySelector('[data-hero-bg="a"]');
  const layerB = document.querySelector('[data-hero-bg="b"]');
  if (!layerA || !layerB) return;

  const isMobile = window.matchMedia?.("(max-width: 520px)")?.matches ?? false;

  const desktopImages = [
    "./Main Banner Desktop/אבוקדו.jpg",
    "./Main Banner Desktop/אנגליקה.jpg",
    "./Main Banner Desktop/דיימונד.jpg",
    "./Main Banner Desktop/מאפים.jpg",
    "./Main Banner Desktop/סנטה.jpg",
    "./Main Banner Desktop/פבלובה.jpg",
    "./Main Banner Desktop/פסים.jpg",
    "./Main Banner Desktop/שקשוקה.jpg",
  ];

  const mobileImages = [
    "./Main Banner Mobile/pavlova.jpg",
    "./Main Banner Mobile/מאפים.jpg",
    "./Main Banner Mobile/מארז 1.jpg",
    "./Main Banner Mobile/מקושקשת.jpg",
    "./Main Banner Mobile/סנטה.jpg",
    "./Main Banner Mobile/פקורינו.jpg",
    "./Main Banner Mobile/פרז.jpg",
    "./Main Banner Mobile/קשוקהש.jpg",
  ];

  const wantsWebp = supportsWebP();
  const baseImages = isMobile ? mobileImages : desktopImages;
  const images = baseImages.map((p) => pickVariantPath(p, wantsWebp ? "webp" : "jpg"));

  // If reduced motion is enabled, show a single still image (no animation).
  if (prefersReducedMotion()) {
    setBg(layerA, images[0]);
    layerA.style.opacity = "1";
    layerB.style.opacity = "0";
    return;
  }

  if (images.length < 2) {
    setBg(layerA, images[0]);
    layerA.style.opacity = "1";
    layerB.style.opacity = "0";
    return;
  }

  let idx = 0;
  let showingA = true;

  setBg(layerA, images[0]);
  setBg(layerB, images[1]);

  const tick = () => {
    const nextIdx = (idx + 1) % images.length;
    const incoming = showingA ? layerB : layerA;
    const outgoing = showingA ? layerA : layerB;

    setBg(incoming, images[nextIdx]);
    incoming.style.opacity = "1";
    outgoing.style.opacity = "0";

    showingA = !showingA;
    idx = nextIdx;
  };

  // Smooth fade every ~6s (per requirement).
  window.setInterval(tick, 6000);
}

function setupHeaderUnderline() {
  const headerInner = document.querySelector(".site-header .header-inner");
  const nav = document.querySelector(".site-header .nav");
  const firstNavLink = document.querySelector(".site-header .nav .nav-link");
  const cta = document.querySelector(".site-header .header-cta");

  if (!headerInner || !nav || !firstNavLink || !cta) return;

  const update = () => {
    const navDisplay = window.getComputedStyle(nav).display;
    if (navDisplay === "none") {
      headerInner.style.removeProperty("--header-underline-left");
      headerInner.style.removeProperty("--header-underline-right");
      return;
    }

    const headerRect = headerInner.getBoundingClientRect();
    const firstLinkRect = firstNavLink.getBoundingClientRect();
    const ctaRect = cta.getBoundingClientRect();

    // We draw the underline between two X coordinates:
    // - menuEdgeX: under the start of the menu (right edge of the first item in RTL)
    // - ctaEdgeX:  under the end of the CTA button (left edge in LTR coordinates)
    const menuEdgeX = firstLinkRect.right;
    const ctaEdgeX = ctaRect.left;

    // Convert to a left+right inset that always yields a positive width.
    const leftEdgeX = Math.min(menuEdgeX, ctaEdgeX);
    const rightEdgeX = Math.max(menuEdgeX, ctaEdgeX);

    const leftPx = Math.max(0, leftEdgeX - headerRect.left);
    const rightPx = Math.max(0, headerRect.right - rightEdgeX);

    headerInner.style.setProperty("--header-underline-left", `${leftPx}px`);
    headerInner.style.setProperty("--header-underline-right", `${rightPx}px`);
  };

  update();
  window.addEventListener("resize", update, { passive: true });
}

function setupToTopButton() {
  const btn = document.querySelector("[data-to-top]");
  const hero = document.querySelector(".hero");
  if (!btn || !hero) return;

  const update = () => {
    // Show only after the hero section is fully above the viewport
    const rect = hero.getBoundingClientRect();
    const shouldShow = rect.bottom <= 0;
    btn.hidden = !shouldShow;
  };

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
}

function main() {
  setupMobileMenu();
  setupSmoothAnchors();
  setupHeroSlider();
  setupHeaderUnderline();
  setupToTopButton();

  // Build the gallery items once, but render grids lazily as they approach the viewport.
  const wantsWebp = supportsWebP();
  const galleryItemsByKey = {};
  for (const [key, group] of Object.entries(GALLERY)) {
    const dir = group?.dir;
    const files = Array.isArray(group?.items) ? group.items : [];
    galleryItemsByKey[key] = files.map((filename) => ({
      title: fileTitle(filename),
      src: joinPath(dir, filename),
      webpSrc: wantsWebp ? joinPath(dir, toWebpFilename(filename)) : null,
      jpgSrcset: buildSrcset(dir, filename, "jpg"),
      webpSrcset: wantsWebp ? buildSrcset(dir, filename, "webp") : null,
      // Use a small variant as the base src so we never load the full original unless needed.
      fallbackSrc: joinPath(dir, toVariantFilename(filename, 360, "jpg")),
    }));
  }

  const rendered = new Set();
  const renderKey = (key) => {
    if (!key || rendered.has(key)) return;
    const items = galleryItemsByKey[key] || [];
    renderGrid(key, items);
    rendered.add(key);
  };

  // Expose a tiny hook for smooth-anchor navigation (no UI impact).
  window.__renderGalleryGrid = renderKey;

  const grids = Array.from(document.querySelectorAll("[data-grid]"));

  // Render immediately if page opened with a hash pointing to a section (e.g. #section-boxes).
  const hashTarget = window.location.hash ? document.querySelector(window.location.hash) : null;
  const hashGridKey = hashTarget?.querySelector?.("[data-grid]")?.dataset?.grid;
  if (hashGridKey) renderKey(hashGridKey);

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const key = entry.target?.dataset?.grid;
          if (key) renderKey(key);
          io.unobserve(entry.target);
        }
      },
      // Start rendering a bit before the section becomes visible
      { root: null, rootMargin: "350px 0px", threshold: 0.01 },
    );
    for (const grid of grids) io.observe(grid);
  } else {
    // Very old browsers: fall back to eager rendering
    for (const grid of grids) {
      const key = grid?.dataset?.grid;
      if (key) renderKey(key);
    }
  }
}

document.addEventListener("DOMContentLoaded", main);

