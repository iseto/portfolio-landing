/* Only public portfolio pages/assets belong here. No APIs, external apps or RSC. */
const PREFIX = 'seto-portfolio-';
const CACHE = `${PREFIX}v2`;
const MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const MAX_ENTRIES = 40;
const MAX_BYTES = 2 * 1024 * 1024;
const STAMP = 'x-portfolio-cached-at';
const FALLBACK = ['/offline.html', '/icon-192.png', '/icon-512.png'];
// Serialize writes/clears so concurrent fetches cannot bypass the entry limit.
let pending = Promise.resolve();
function exclusive(task) {
  const result = pending.then(task);
  pending = result.catch(() => {});
  return result;
}
function expired(response) {
  const stamp = Number(response.headers.get(STAMP));
  return !stamp || Date.now() - stamp >= MAX_AGE || stamp > Date.now();
}
async function prune(cache) {
  const keys = await cache.keys();
  for (const key of keys) {
    const response = await cache.match(key);
    if (!response || expired(response)) await cache.delete(key);
  }
  const remaining = await cache.keys();
  for (const key of remaining.slice(0, Math.max(0, remaining.length - MAX_ENTRIES))) {
    await cache.delete(key);
  }
}
async function store(cache, request, response) {
  if (!response.ok || response.type !== 'basic' || /no-store|private/i.test(response.headers.get('cache-control') || '')) return;
  const body = await response.clone().arrayBuffer();
  if (body.byteLength > MAX_BYTES) return;
  const headers = new Headers(response.headers);
  headers.set(STAMP, String(Date.now()));
  await cache.delete(request);
  await cache.put(request, new Response(body, { status: response.status, statusText: response.statusText, headers }));
  await prune(cache);
}
self.addEventListener('install', event => {
  event.waitUntil(exclusive(async () => {
    const cache = await caches.open(CACHE);
    for (const path of FALLBACK) {
      const request = new Request(new URL(path, self.location.origin));
      await store(cache, request, await fetch(request));
    }
  }));
});
self.addEventListener('activate', event => {
  event.waitUntil(exclusive(async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
    }
    await prune(await caches.open(CACHE));
    await self.clients.claim();
  }));
});
self.addEventListener('message', event => {
  if (event.data?.type !== 'CLEAR_OFFLINE_DATA' || !event.ports[0]) return;
  event.waitUntil(exclusive(async () => {
    try {
      for (const key of await caches.keys()) {
        if (key.startsWith(PREFIX)) await caches.delete(key);
      }
      event.ports[0].postMessage({ ok: true });
    } catch {
      event.ports[0].postMessage({ ok: false });
    }
  }));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || request.headers.has('RSC') || url.search) return;
  // Explicit page allowlist prevents future private routes being cached by default.
  const navigation = request.mode === 'navigate';
  const publicPage = navigation && /^\/(?:de\/?|id\/?)?(?:accessibility\/?|projects\/(?:template-editor|cineflix|weather)\/?)?$/.test(url.pathname);
  const asset = url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/screenshots/') || FALLBACK.includes(url.pathname);
  if (!navigation && !asset) return;
  const work = exclusive(async () => {
    let cache;
    try { cache = await caches.open(CACHE); await prune(cache); } catch { return fetch(request); }
    if (asset) { const cached = await cache.match(request); if (cached) return cached; }
    try {
      const response = await fetch(request);
      try {
        if (publicPage || asset) await store(cache, request, response);
        // Restore the fallback after clearing or expiry, on an online page visit.
        if (publicPage && response.ok) {
          for (const path of FALLBACK) {
            if (!await cache.match(path)) {
              const fallbackRequest = new Request(new URL(path, self.location.origin));
              await store(cache, fallbackRequest, await fetch(fallbackRequest));
            }
          }
        }
      } catch { /* Browsing survives quota/storage errors. */ }
      return response;
    } catch {
      return (await cache.match(request)) || (navigation ? await cache.match('/offline.html') : null) || Response.error();
    }
  });
  event.respondWith(work);
  event.waitUntil(work.then(() => {}, () => {}));
});
