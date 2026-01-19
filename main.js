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
      "157A2649.jpg",
      "157A2675.jpg",
      "157A2693.jpg",
      "157A2705.jpg",
      "157A2728.jpg",
      "157A2744.jpg",
      "157A2773.jpg",
      "157A2794.jpg",
      "157A2807.jpg",
      "157A2836.jpg",
      "157A2874.jpg",
      "157A2885.jpg",
      "בראנץ בוקס.jpg",
    ],
  },
  hosting: {
    dir: "מגשי ארוח",
    items: [
      "מגש בורקס בעבודת יד.jpg",
      "מגש טארטלטים.jpg",
      "מגש טארטלטים(1).jpg",
      "מגש כריכוני בריוש.jpg",
      "מגש כריכוני קרואסון.jpg",
      "מגש מאפה טוסקנה.jpg",
      "מגש מאפי בוקר צרפתי.jpg",
      "מגש פטיפורים.jpg",
      "מגש פטיפורים(1).jpg",
      "סלט אנטיפסטי.jpg",
      "סלט טאבולה.jpg",
      "סלט עדשים ובטטה.jpg",
      "סלט פנצנלה.jpg",
      "פחזניות פטיסייר.jpg",
      "קיש בטטה פקאן.jpg",
      "קיש בצל וכרישה.jpg",
      "קיש חציל ובלסמי.jpg",
      "קיש שרי וברוקולי.jpg",
    ],
  },
};

function fileTitle(filename) {
  return filename.replace(/\.[^/.]+$/, "");
}

function joinPath(dir, filename) {
  // Encode for spaces/Hebrew characters (works for file:// and GitHub Pages).
  return encodeURI(`./${dir}/${filename}`);
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
    const card = el("article", { class: "card" }, [
      el("div", { class: "card__img" }, [
        el("img", {
          src: item.src,
          alt: item.title,
          loading: "lazy",
        }),
      ]),
      el("div", { class: "card__body" }, [
        el("h3", { class: "card__title" }, [item.title]),
      ]),
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

  const setOpen = (isOpen) => {
    if (isOpen) {
      lastActive = document.activeElement;
      updateOffset();
      menu.hidden = false;
      document.body.style.overflow = "hidden";
      openBtn.setAttribute("aria-expanded", "true");
      // Focus the first menu link if available.
      const firstLink = menu.querySelector("a, button, [tabindex]:not([tabindex=\"-1\"])");
      if (firstLink && typeof firstLink.focus === "function") firstLink.focus();
    } else {
      menu.hidden = true;
      document.body.style.overflow = "";
      openBtn.setAttribute("aria-expanded", "false");
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

  // Mobile: use the dedicated mobile background (no animation).
  if (window.matchMedia?.("(max-width: 520px)")?.matches) {
    setBg(layerA, "./herobackground1_mobile.png");
    layerA.style.opacity = "1";
    layerB.style.opacity = "0";
    return;
  }

  const images = ["./herobackground1.png", "./herobackground2.png", "./herobackground3.png"];
  let idx = 0;
  let showingA = true;

  setBg(layerA, images[0]);
  setBg(layerB, images[1]);

  if (prefersReducedMotion()) return;

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

  for (const [key, group] of Object.entries(GALLERY)) {
    const dir = group?.dir;
    const files = Array.isArray(group?.items) ? group.items : [];
    const items = files.map((filename) => ({
      title: fileTitle(filename),
      src: joinPath(dir, filename),
    }));
    renderGrid(key, items);
  }
}

document.addEventListener("DOMContentLoaded", main);

