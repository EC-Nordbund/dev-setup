/// <reference no-default-lib="true" />
/// <reference lib="webworker" />
/// <reference lib="esnext" />

const files = [/*sw-files*/]
const version = '/*sw-version*/'
const scope = '/*sw-scope*/'

const cachePrefix = 'sw-' + scope + '-'
const cacheName = cachePrefix + version

const ORIGIN_TO_FETCH = [
  "http://localhost:4000",
  "https://portal.ec-nordbund.de"
]

/**
 * @type {ServiceWorkerGlobalScope}
 */
const _self = self

_self.addEventListener('install', (ev) => {
  ev.waitUntil((async () => {
    const cache = await caches.open(cacheName)

    await cache.addAll(files)
  })())
})

_self.addEventListener('activate', (ev) => {
  ev.waitUntil((async () => {
    const cachingKeys = await caches.keys()

    await Promise.all(cachingKeys.map((key) => {
      if (key !== cacheName && key.startsWith(cachePrefix)) {
        return caches.delete(key)
      }
    }))
  })())
})

_self.addEventListener('fetch', (ev) => {
  const url = new URL(ev.request.url)
  
  // ignorieren in dev
  if(ORIGIN_TO_FETCH.includes(url.origin)) {
    ev.respondWith((async () => {
      const cacheResult = await caches.match(ev.request)

      if(!cacheResult) {
        return new Response('ERROR IN SW', {status: 500})
      }

      return cacheResult
    })())
  }
})