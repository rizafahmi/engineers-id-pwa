/* global self, caches, fetch */

const appShellCacheName = 'pwa'
const dataCacheName = 'pwa-data-v1'
const filesToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/styles/spinner.css',
  '/scripts/app.js',
  '/images/logo.svg'
]

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install')
  e.waitUntil(
    caches.open(appShellCacheName).then(cache => {
      console.log('[ServiceWorker] Caching the app shell')
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activated')
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== appShellCacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// On Network Response Strategy
self.addEventListener('fetch', e => {
  console.log('[ServiceWorker] Fetch', e.request.url)
  const dataUrl = 'http://localhost:3000/videos'
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(cache => {
        return cache.match(e.request).then(response => {
          return response ||
            fetch(e.request).then(response => {
              cache.put(e.request, response.clone())
              return response
            })
        })
      })
    )
  } else {
    e.respondWith(
      caches.match(e.request).then(response => {
        return response || fetch(e.request)
      })
    )
  }
})
