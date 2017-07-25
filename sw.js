'use strict'

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

this.addEventListener('install', event => {
  console.log('From SW: Install Event', event)
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      debugger
      return cache.addAll(videoCacheFiles)
    })
  )
})

this.addEventListener('active', event => {
  console.log('From SW: Activate State', event)
})
