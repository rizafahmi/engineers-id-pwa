/* global fetch, caches */
'use strict'

const generateCard = video => {
  let template = document.querySelector('#card').innerHTML
  template = template.replace('{{title}}', video.title)
  template = template.replace('{{description}}', video.description)
  template = template.replace('{{image}}', video.thumbnail)
  template = template.replace('{{video}}', video.url)
  return template
}

const appendData = videos => {
  let videoHTML = ''
  document.querySelectorAll('.cards__item').forEach(item => {
    item.parentNode.removeChild(item)
  })
  for (let i = 0; i < videos.length; i++) {
    videoHTML += generateCard(videos[i])
  }
  document.querySelector('.cards').insertAdjacentHTML('beforeend', videoHTML)
  document.querySelector('.spinner').style.display = 'none'
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(() => {
    console.log('Service Worker Registered')
  })
}

const url = 'http://localhost:3000/videos'
if ('caches' in window) {
  caches.match(url).then(response => {
    if (response) {
      response.json().then(json => {
        return appendData(json)
      })
    }
  })
}

// Fetch the last data
fetch(url).then(response => response.json()).then(json => {
  return appendData(json)
})
