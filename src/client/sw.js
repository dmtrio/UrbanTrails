
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('UrbanTrails').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/manifest.json',
       '/dist/build.js',
       '/css/styles.css',
       '/css/vuetify.min.css',
     ]).then(function() {
      // `skipWaiting()` forces the waiting ServiceWorker to become the
      // active ServiceWorker, triggering the `onactivate` event.
      // Together with `Clients.claim()` this allows a worker to take effect
      // immediately in the client(s).
      return self.skipWaiting();
    })
   })
 );
});

self.addEventListener('activate', function(event) {
	// `claim()` sets this worker as the active worker for all clients that
	// match the workers scope and triggers an `oncontrollerchange` event for
	// the clients.
  var cacheWhitelist = ['v2'];
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
	return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // console.log('hi');
  // console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// self.addEventListener('activate', function(event) {
//   var cacheWhitelist = ['v2'];
//   event.waitUntil(
//     caches.keys().then(function(keyList) {
//       return Promise.all(keyList.map(function(key) {
//         if (cacheWhitelist.indexOf(key) === -1) {
//           return caches.delete(key);
//         }
//       }));
//     })
//   );
// });
