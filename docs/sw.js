const VERSION = "1.0.0";

const CACHE = "v3lan-" + VERSION;

const FILES = [

    "./",

    "./index.html",

    "./manifest.json"

];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE)

        .then(cache => cache.addAll(FILES))

    );

    self.skipWaiting();

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

        .then(keys =>

            Promise.all(

                keys

                .filter(key => key !== CACHE)

                .map(key => caches.delete(key))

            )

        )

    );

    self.clients.claim();

});

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    event.respondWith(

        fetch(event.request)

        .catch(() => caches.match(event.request))

    );

});