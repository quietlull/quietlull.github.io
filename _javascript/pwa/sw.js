importScripts('./assets/js/data/swconf.js');

const purge = swconf.purge;
const interceptor = swconf.interceptor;

function verifyUrl(url) {
  const requestUrl = new URL(url);
  const requestPath = requestUrl.pathname;

  if (!requestUrl.protocol.startsWith('http')) {
    return false;
  }

  for (const prefix of interceptor.urlPrefixes) {
    if (requestUrl.href.startsWith(prefix)) {
      return false;
    }
  }

  for (const path of interceptor.paths) {
    if (requestPath.startsWith(path)) {
      return false;
    }
  }
  return true;
}

self.addEventListener('install', (event) => {
  if (purge) {
    return;
  }

  event.waitUntil(
    caches.open(swconf.cacheName).then((cache) => {
      return cache.addAll(swconf.resources.map((url) => new Request(url, { cache: 'reload' })));
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (purge) {
            return caches.delete(key);
          } else {
            if (key !== swconf.cacheName) {
              return caches.delete(key);
            }
          }
        })
      );
    })
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((pages) => pages.forEach((page) => page.navigate(page.url)))
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

function store(request, response) {
  if (purge || request.method !== 'GET' || !verifyUrl(request.url)) {
    return;
  }
  caches.open(swconf.cacheName).then((cache) => cache.put(request, response));
}

function networkFirst(request) {
  return fetch(request, { cache: 'no-cache' })
    .then((response) => {
      store(request, response.clone());
      return response;
    })
    .catch(() => caches.match(request));
}

function cacheFirst(request) {
  return caches.match(request).then((cached) => cached || fetch(request).then((response) => {
    store(request, response.clone());
    return response;
  }));
}

function changesWithEachDeploy(request) {
  return request.mode === 'navigate' || ['script', 'style', 'manifest'].includes(request.destination);
}

self.addEventListener('fetch', (event) => {
  if (event.request.headers.has('range')) {
    return;
  }

  event.respondWith(changesWithEachDeploy(event.request) ? networkFirst(event.request) : cacheFirst(event.request));
});
