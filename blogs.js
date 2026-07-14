// ═══════════════════════════════════════════════════════════════════
//  BLOGS PAGE — blogs.js
// ═══════════════════════════════════════════════════════════════════

// ── Year in footer ─────────────────────────────────────────────────
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Scroll-driven background (mirrors index.html inline script) ────
(function () {
  const darkR = 10, darkG = 14, darkB = 26;
  const lightR = 186, lightG = 224, lightB = 255;

  function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
  function lerpF(a, b, t) { return +(a + (b - a) * t).toFixed(3); }
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  function bgLuminance(t) {
    const r = lerp(darkR, lightR, t) / 255;
    const g = lerp(darkG, lightG, t) / 255;
    const b = lerp(darkB, lightB, t) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function updateBg() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const raw = total > 0 ? Math.min(scrolled / total, 1) : 0;
    const t = ease(raw);

    const root = document.documentElement;
    const bR = lerp(darkR, lightR, t);
    const bG = lerp(darkG, lightG, t);
    const bB = lerp(darkB, lightB, t);

    const mist = lerpF(0, 0.35, t);
    document.body.style.background = `
      radial-gradient(ellipse 60% 45% at 15% 25%, rgba(147,210,255,${mist}) 0%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 82% 60%, rgba(220,242,255,${mist * 0.7}) 0%, transparent 65%),
      radial-gradient(ellipse 45% 35% at 45% 90%, rgba(168,218,255,${mist * 0.5}) 0%, transparent 70%),
      rgb(${bR},${bG},${bB})
    `.trim();
    root.style.setProperty("--bg", `rgb(${bR},${bG},${bB})`);

    const whiteLift = Math.sin(t * Math.PI);
    const panelR = Math.min(255, lerp(21, 210, t) + Math.round(whiteLift * 60));
    const panelG = Math.min(255, lerp(28, 235, t) + Math.round(whiteLift * 55));
    const panelB = Math.min(255, lerp(44, 255, t) + Math.round(whiteLift * 40));

    root.style.setProperty("--panel",       `rgb(${panelR},${panelG},${panelB})`);
    root.style.setProperty("--panel-strong", `rgb(${Math.min(255,panelR-6)},${Math.min(255,panelG-7)},${Math.min(255,panelB-3)})`);
    root.style.setProperty("--secondary-bg", `rgb(${lerp(15,195,t)},${lerp(21,220,t)},${lerp(32,248,t)})`);
    root.style.setProperty("--line",         `rgb(${lerp(46,100,t)},${lerp(58,155,t)},${lerp(78,210,t)})`);

    // Drive text from background luminance — not card/panel luminance.
    // This ensures text always contrasts the actual page background.
    const lum = bgLuminance(t);
    const textT = clamp((lum - 0.16) / 0.04, 0, 1);
    root.style.setProperty("--text",  `rgb(${lerp(248,15,textT)},${lerp(250,23,textT)},${lerp(252,42,textT)})`);
    root.style.setProperty("--muted", `rgb(${lerp(226,30,textT)},${lerp(232,41,textT)},${lerp(240,59,textT)})`);
    root.style.setProperty("--quiet", `rgb(${lerp(203,51,textT)},${lerp(213,65,textT)},${lerp(225,85,textT)})`);

    const shadowAlpha = lerpF(0.45, 0.08, t);
    root.style.setProperty("--shadow", `0 10px 30px rgba(10,14,26,${shadowAlpha})`);

    // navbar background is handled by CSS glassmorphism — do not override

    root.style.setProperty("--accent",        `rgb(${lerp(59,30,t)},${lerp(130,64,t)},${lerp(246,175,t)})`);
    root.style.setProperty("--accent-strong", `rgb(${lerp(96,20,t)},${lerp(165,80,t)},${lerp(250,200,t)})`);
  }

  window.addEventListener("scroll", updateBg, { passive: true });
  updateBg();
})();

// ── Scroll progress bar ────────────────────────────────────────────
const scrollProgressBar = document.querySelector(".scroll-progress");

function updateScroll() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  if (scrollProgressBar) {
    scrollProgressBar.style.transform = `scaleX(${Math.min(progress, 1)})`;
  }

  // Dynamic island shrink
  const header = document.querySelector(".site-header");
  if (header) header.classList.toggle("scrolled", window.scrollY > 60);
}

window.addEventListener("scroll", updateScroll, { passive: true });
window.addEventListener("resize", updateScroll);
updateScroll();

// ── Mobile hamburger ───────────────────────────────────────────────
const hamburger  = document.querySelector(".hamburger");
const primaryNav = document.querySelector("#primary-nav");

if (hamburger && primaryNav) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = primaryNav.classList.contains("nav-open");
    primaryNav.classList.toggle("nav-open", !isOpen);
    hamburger.setAttribute("aria-expanded", String(!isOpen));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("nav-open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) {
      primaryNav.classList.remove("nav-open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      primaryNav.classList.remove("nav-open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

// ── Inject revolving glow into blog cards ─────────────────────────
document.querySelectorAll(".blog-card").forEach((card) => {
  const glow = document.createElement("span");
  glow.className = "blog-card-glow";
  glow.setAttribute("aria-hidden", "true");
  card.prepend(glow);
});

// ── Blog filtering & search ────────────────────────────────────────
const catBtns    = document.querySelectorAll(".blog-cat-btn");
const blogCards  = document.querySelectorAll(".blog-card[data-category]");
const searchEl   = document.getElementById("blog-search");
const countEl    = document.getElementById("blog-count");
const emptyState = document.getElementById("blog-empty");

let activeCategory = "all";
let searchQuery    = "";

function normalize(str) {
  return str.toLowerCase().trim();
}

function filterBlogs() {
  let visible = 0;

  blogCards.forEach((card) => {
    const category  = card.dataset.category || "";
    const titleEl   = card.querySelector("h3");
    const excerptEl = card.querySelector(".blog-card-excerpt");
    const tagsEl    = card.querySelectorAll(".blog-card-tag");

    const titleText   = titleEl   ? normalize(titleEl.textContent)   : "";
    const excerptText = excerptEl ? normalize(excerptEl.textContent) : "";
    const tagsText    = [...tagsEl].map(t => normalize(t.textContent)).join(" ");

    const matchesCat    = activeCategory === "all" || category.includes(activeCategory);
    const matchesSearch = !searchQuery ||
      titleText.includes(searchQuery)   ||
      excerptText.includes(searchQuery) ||
      tagsText.includes(searchQuery)    ||
      category.includes(searchQuery);

    const show = matchesCat && matchesSearch;
    card.hidden = !show;
    if (show) visible++;
  });

  // Update counter
  if (countEl) {
    countEl.textContent = visible === 1 ? "1 article" : `${visible} articles`;
  }

  // Empty state
  if (emptyState) {
    emptyState.classList.toggle("visible", visible === 0);
  }
}

catBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    catBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    filterBlogs();
  });
});

if (searchEl) {
  searchEl.addEventListener("input", () => {
    searchQuery = normalize(searchEl.value);
    filterBlogs();
  });
}

// Run once on load
filterBlogs();

// ── Subscribe form ─────────────────────────────────────────────────
const subscribeForm = document.getElementById("subscribe-form");
if (subscribeForm) {
  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = subscribeForm.querySelector("input[type='email']");
    const btn = subscribeForm.querySelector("button[type='submit']");

    if (!emailInput || !emailInput.value.trim()) return;

    // Visual feedback — no backend needed for a static site
    const original = btn.textContent;
    btn.textContent = "✓ Subscribed!";
    btn.disabled = true;
    btn.style.background = "#10b981";
    emailInput.value = "";

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.background = "";
    }, 3200);
  });
}

// ── Page Transition ───────────────────────────────────────────────────
(function () {
  function isSameSite(href) {
    try {
      const url = new URL(href, location.href);
      return url.origin === location.origin;
    } catch { return false; }
  }

  document.addEventListener("click", function (e) {
    const link = e.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href");
    if (
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      !isSameSite(href)
    ) return;
    e.preventDefault();
    document.body.classList.add("page-leaving");
    setTimeout(() => { window.location.href = href; }, 270);
  });
})();
// ── /Page Transition ──────────────────────────────────────────────────
