'use strict'
// new
const cacheName = 'videoCacheV1'
const videoCacheFiles = [
  'scripts/app.js',
  'scripts/videoService.js',
  'scripts/clientStorage.js',
  'scripts/swRegister.js',
  'scripts/template.js',
  './',
  'scripts/vendors/es6-promise/es6-promise.js',
  'scripts/vendors/fetch.js',
  'scripts/vendors/localforage/localforage.min.js',
  'scripts/vendors/localforage/localforage-getitems.js',
  'scripts/vendors/localforage/localforage-setitems.js',
  'scripts/vendors/systemjs/system.js'
]

self.addEventListener('install', event => {
  console.log('From SW: Install Event', event)
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        return cache.addAll(videoCacheFiles)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

self.addEventListener('activate', event => {
  console.log('From SW: Activate State', event)
  self.clients.claim()
  event.waitUntil(
    caches.keys().then(cacheKeys => {
      let deletePromises = []
      for (let i = 0; i < cacheKeys.length; i++) {
        if (cacheKeys[i] !== cacheName) {
          deletePromises.push(caches.delete(cacheKeys[i]))
        }
      }
      return Promise.all(deletePromises)
    })
  )
})

self.addEventListener('fetch', e => {
  // e.respondWith(new Response('hello'))
})
