const CACHE_NAME = 'my-web-app-cache';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/images/cat.jpg',
  '/images/turtle.png',
  '/images/ducks.jpg',
];

self.addEventListener('install', function(event) {
  // event.waitUntil takes a promise to know how
  // long the installation takes, and whether it 
  // succeeded or not.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', async (event) => {
  event.respondWith(
    // This method looks at the request and
    // finds any cached results from any of the
    // caches that the Service Worker has created.
    caches.match(event.request)
      .then(function(response) {
        // If a cache is hit, we can return thre response.
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  )
})