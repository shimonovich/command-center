const CACHE_NAME = 'cc-pwa-v4-2';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(['./', './index.html', './manifest.json', './icon.svg'])));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || e.request.url.includes('script.google.com')) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
