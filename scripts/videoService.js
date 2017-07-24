/* global fetch define */
define(['./template.js', './clientStorage.js'], (template, clientStorage) => {
  const apiUrlPath = 'http://localhost:3000/'
  const apiUrlVideosPath = apiUrlPath + 'videos'

  const loadData = () => {
    fetchPromise().then(status => {
      document.getElementById('connection-status').innerHTML = status
      loadMore()
    })
  }

  const fetchPromise = () => {
    return new Promise((resolve, reject) => {
      const lastVideoId = clientStorage.getLastVideoId()
      let url
      if (lastVideoId === null) {
        url = apiUrlVideosPath + `?_sort=key&_order=desc&_limit=4`
      } else {
        url = apiUrlVideosPath +
          `?_sort=key&_order=desc&key_lte=${lastVideoId + 1}&_limit=4`
      }
      fetch(url)
        .then(res => res.json())
        .then(data => {
          clientStorage.addVideos(data).then(() => {
            resolve('The connection is OK, showing latest results')
          })
        })
        .catch(e => {
          resolve('No connection, showing offline results')
        })
      setTimeout(
        () => {
          resolve('The connection is hanging, showing offline results')
        },
        3000
      )
    })
  }

  const loadMore = () => {
    clientStorage.getVideos().then(videos => {
      template.appendData(videos)
    })
  }

  return {
    loadData
  }
})
