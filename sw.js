/*
 * Service worker: small and predictable.
 * - Pages: network first, then the cached copy, then /offline.html.
 * - CSS and JS: served from cache, refreshed in the background.
 * - Images and fonts: cache first.
 * Bump VERSION whenever you deploy changes to CSS or JS.
 */
const VERSION = 'v18-2026-09-22';
const STATIC_CACHE = `static-${VERSION}`;
const PAGE_CACHE = `pages-${VERSION}`;

const PRECACHE = [
  '/',
  '/projects/',
  '/offline.html',
  '/css/tokens.css',
  '/css/base.css',
  '/css/components.css',
  '/css/sections.css',
  '/js/theme.js',
  '/js/main.js',
  '/js/contact.js',
  '/js/pricing.js',
  '/js/reviews.js',
  '/js/illustrations.js',
  '/reviews/',
  '/data/reviews.json',
  '/assets/images/logo-mark.png',
  '/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => ![STATIC_CACHE, PAGE_CACHE].includes(key)).map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request))
      || (await caches.match(request))
      || caches.match('/offline.html');
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || refresh;
}

async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isFont = url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com';
  if (url.origin !== self.location.origin && !isFont) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
  } else if (url.pathname === '/data/reviews.json') {
    event.respondWith(networkFirst(request));
  } else if (isFont || ['image', 'font'].includes(request.destination)) {
    event.respondWith(cacheFirst(request));
  } else if (['style', 'script', 'manifest'].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
