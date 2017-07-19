/* global fetch define */
define(['./template.js', './clientStorage.js'], (template, clientStorage) => {
  const apiUrlPath = 'http://localhost:3000/'
  const apiUrlVideosPath = apiUrlPath + 'videos'

  const loadData = () => {
    fetch(apiUrlVideosPath).then(res => res.json()).then(data => {
      clientStorage.addVideos(data).then(() => {
        loadMore()
      })
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
