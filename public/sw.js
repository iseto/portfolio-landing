/* Portfolio pages only: never cache external apps, errors, APIs or RSC payloads. */
const CACHE = 'seto-portfolio-v1';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(['/offline.html', '/icon-192.png', '/icon-512.png'])));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('seto-portfolio-') && key !== CACHE).map(key => caches.delete(key)))), self.clients.claim()]));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || request.headers.has('RSC') || url.searchParams.has('_rsc')) return;
  const navigation = request.mode === 'navigate';
  const asset = url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/screenshots/') || url.pathname.startsWith('/_next/image') || /^\/icon-\d+\.png$/.test(url.pathname);
  if (!navigation && !asset) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (asset) { const cached = await cache.match(request); if (cached) return cached; }
    try {
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') await cache.put(request, response.clone());
      return response;
    } catch {
      return (await cache.match(request)) || (navigation ? await cache.match('/offline.html') : Response.error());
    }
  })());
});
