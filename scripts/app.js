/* global fetch, caches */
function generateCard (video) {
  var template = document.querySelector('#card').innerHTML
  template = template.replace('{{title}}', video.title)
  template = template.replace('{{description}}', video.description)
  template = template.replace('{{image}}', video.thumbnail)
  template = template.replace('{{video}}', video.url)
  return template
}

function appendData (videos) {
  var videoHTML = ''
  document.querySelectorAll('.cards__item').forEach(function (item) {
    item.parentNode.removeChild(item)
  })
  for (var i = 0; i < videos.length; i++) {
    videoHTML += generateCard(videos[i])
  }
  document.querySelector('.cards').insertAdjacentHTML('beforeend', videoHTML)
  document.querySelector('.spinner').style.display = 'none'
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(function () {
    console.log('Service Worker Registered')
  })
}

// Caching strategy

var networkDataReceived = false

const url = 'http://localhost:3000/videos'

// Fetch the last data
const networkUpdate = fetch(url)
  .then(function (response) {
    return response.json()
  })
  .then(function (json) {
    networkDataReceived = true
    appendData(json)
  })

// Fetch cached data
if ('caches' in window) {
  caches
    .match(url)
    .then(function (response) {
      if (response) {
        return response.json()
      }
    })
    .then(function (json) {
      if (!networkDataReceived) {
        appendData(json)
      }
    })
    .catch(function () {
      return networkUpdate
    })
    .catch(function () {
      console.log('Bad connection')
    })
}
