// App shell is the assets that are necessary to run your website

// caching app shell
// dynamic cache

// install
// activate
// fetch

const appShellCache = "EXMS3-PWA-v1.4";
const dynamicCache = "EXMS3-PWA-dynamic-v1";

const assets = [
  "/",
  "index.html",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
  "css/style.css",
  "js/main.js",
  "manifest.json"
];

// cache => (cash)

// Self calling function

// whenever this file is changed, service worker is installed
self.addEventListener("install", evt => {
  evt.waitUntil(
    (async function() {
      const cache = await caches.open(appShellCache);
      cache.addAll(assets);
    })()
  );

  // evt.waitUntil(
  //   caches.open(appShellCache).then(cache => {
  //     cache.addAll(assets);
  //   })
  // );
});

// when a new service worker is installed
// and user close your application and open again
//
self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches.keys().then(cacheKeys => {
      // const promises = [];

      // cacheKeys.forEach(cache => {
      //   if (cache !== appShellCache) {
      //     promises.push(caches.delete(cache));
      //   }
      // });

      // return Promise.all(promises);
      return Promise.all(
        cacheKeys
          .filter(cache => cache !== appShellCache)
          .map(cache => caches.delete(cache))
      );
    })
  );
});

self.addEventListener("fetch", evt => {
  // evt.respondWith(
  //   caches.match(evt.request).then(cacheResponse => {
  //     return cacheResponse || fetch(evt.request);
  //   })
  // );

  evt.respondWith(
    (async function() {
      const cacheResponse = await caches.match(evt.request);
      // if resource found in cache
      if (cacheResponse) return cacheResponse;

      // this block will only run if 
      // resource is not found in cache
      const fetchResponse = await fetch(evt.request);
      const cache = await caches.open(dynamicCache);
      await cache.put(evt.request, fetchResponse.clone());
      return fetchResponse;
    })()
  );
});


// Network falling back to cache

// self.addEventListener("fetch", evt => {
//   evt.respondWith(
//     fetch(evt.request)
//       .then(response => response)
//       .catch(err => {
//         return caches.match(evt.request)
//       })
//   )
// })


// Generic fallback

// self.addEventListener("fetch", evt => {
//   evt.respondWith(
//     caches.match(evt.request)
//       .then(response => {
//         return response || fetch(evt.request)
//           .then(response => response)
//           .catch(err => caches.match("/fallback.html"))
//       })
//   )
// })