import {setCacheNameDetails} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching';

setCacheNameDetails({prefix: "rpg2 pwa"});

// put all important files in cache, as soon as the worker is ready
precacheAndRoute(self.__WB_MANIFEST);

const CURRENT_CACHE = 'apidemo-cache';

// create a cache for api data
self.addEventListener('install', evt =>
    evt.waitUntil(
        caches.open(CURRENT_CACHE).then(() => {
            console.log("cache created");
        })
    )
);

// on activation we clean up the previously registered service workers
self.addEventListener('activate', evt => {
        console.log('sw activate');
        self.clients.claim()
        return evt.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName === CURRENT_CACHE) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        )
    }
);



// helper : a fetch with a timer to abort
async function fetchWithTimeout(request, timeout = 8000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(request, {
        signal: controller.signal
    });
    clearTimeout(id);
    console.log('get response in time:',response)
    return response;
}

// fetch the resource from the network
const fromNetwork = async (request) => {
    console.log('trying to fetch from network:', request.url)
    try {
        const response = await fetchWithTimeout(request)
        console.log('response is:',response)
        const cache = await caches.open(CURRENT_CACHE)
        cache.put(request, response.clone())
        return response
    }
    catch(err) {
        if (err.name === 'AbortError') {
            console.log('request in timeout')
        }
        else {
            console.log('request failed: ',err.message)
        }
        // return undefined so that it is possible to detect got nothing
        return undefined
    }
}

// fetch the resource from the browser cache
const fromCache = async (request) => {
    console.log('trying to fetch from cache:', request.url)
    try {
        const cache = await caches.open(CURRENT_CACHE)
        const matching = await cache.match(request)
        console.log('result from cache: ',matching)

        if (!matching) return Response.error()
        return matching
    }
    catch(err) {
        console.log('cannot get from cache either: ',err.message)
        return Response.error()
    }
}

const networkFirst = async (request) => {
    const response = await fromNetwork(request)
    if (response) return response
    // if network is timeout or not reachable, tyr cache
    return await fromCache(request)
}

self.addEventListener('fetch', evt => {
    // in case of it goes top the api, then get a response from network first then cache
    if (evt.request.url.startsWith(('https://apidemo.iut-bm.univ-fcomte.fr/rpg'))) {
        return evt.respondWith(networkFirst(evt.request))
    }
    // if not, do the job as normal, using the default fetch handling (see FetchEvent.respondWith )
});
