/* global self, caches, fetch */

const appShellCacheName = 'pwa'
const dataCacheName = 'pwa-data-v1'
const staticCacheName = 'pwa-static-v1'
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
          if (
            key !== appShellCacheName &&
            key !== dataCacheName &&
            key === staticCacheName
          ) {
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
  const dataUrl = 'https://engineers-id-backend-ybbwzovhnl.now.sh/api/videos'
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(cache => {
        return fetch(e.request, { mode: 'cors' })
          .then(networkResponse => {
            cache.put(e.request, networkResponse.clone())
            return networkResponse
          })
          .catch(() => {
            return caches.match(e.request)
          })
      })
    )
  } else if (e.request.url.indexOf('https://i3.ytimg.com') > -1) {
    e.respondWith(
      caches.open(staticCacheName).then(cache => {
        return cache.match(e.request).then(response => {
          return response ||
            fetch(e.request, { mode: 'cors' }).then(response => {
              cache.put(e.request, response.clone())
              return response
            })
        })
      })
    )
  } else {
    e.respondWith(
      caches.match(e.request).then(response => {
        return response || fetch(e.request, { mode: 'cors' })
      })
    )
  }
})
