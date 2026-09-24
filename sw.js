const VERSION = "v12";

const STATIC_CACHE = `static-${VERSION}`;
const PAGES_CACHE  = `pages-${VERSION}`;
const ASSETS_CACHE = `assets-${VERSION}`;

const CURRENT_CACHES = [STATIC_CACHE, PAGES_CACHE, ASSETS_CACHE];

const SHELL = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/offline.html",
  "/logo-header.webp",
  "/logo-dark-header.webp",
  "/manifest.webmanifest",
];

// ── Install: precache shell ──────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: prune old caches ───────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !CURRENT_CACHES.includes(k))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only intercept GET requests
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Leave cross-origin requests alone unless they are Google Fonts
  const isGoogleFonts =
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com";

  if (url.origin !== self.location.origin && !isGoogleFonts) return;

  // ── Navigations: network-first, fall back to cached page then offline.html
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(PAGES_CACHE).then((c) => c.put(request, copy)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(request).then(
            (hit) => hit || caches.match("/offline.html")
          )
        )
    );
    return;
  }

  // ── CSS and JS: stale-while-revalidate
  if (request.destination === "style" || request.destination === "script") {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const networkFetch = fetch(request)
            .then((res) => {
              cache.put(request, res.clone()).catch(() => {});
              return res;
            })
            .catch(() => cached);
          return cached || networkFetch;
        })
      )
    );
    return;
  }

  // ── Images, fonts, and Google Fonts: cache-first
  if (
    request.destination === "image" ||
    request.destination === "font" ||
    isGoogleFonts
  ) {
    event.respondWith(
      caches.open(ASSETS_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request)
            .then((res) => {
              cache.put(request, res.clone()).catch(() => {});
              return res;
            });
        })
      )
    );
    return;
  }

  // Everything else: no interception
});
