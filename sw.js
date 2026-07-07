const CACHE_NAME = 'mglf-v1';
const ASSETS = [
  'mglf_batch_app.html',
  'manifest.json'
];

// インストール時にHTMLをスマホに強制保存
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// オフライン時は、ネットではなくスマホ内のキャッシュから画面を出す
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
