const CACHE = "v3lan-cache-v1";

const urls = [
    "./",
    "./index.html",
    "./garagens.js"
];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE).then(cache => {

            return cache.addAll(urls);

        })

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            return response || fetch(event.request);

        })

    );

});