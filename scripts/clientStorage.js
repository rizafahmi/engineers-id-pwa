/* global define localforage */
define([], () => {
  const videosInstance = localforage.createInstance({
    name: 'videos'
  })

  const addVideos = newVideos => {
    return new Promise((resolve, reject) => {
      videosInstance.setItems(newVideos).then(() => resolve())
    })
  }
  const getVideos = () => {
    return new Promise((resolve, reject) => {
      videosInstance.keys().then(keys => {
        videosInstance.getItems().then(results => {
          const returnArr = Object.keys(results).map(k => results[k]).reverse()
          resolve(returnArr)
        })
      })
    })
  }

  return {
    addVideos,
    getVideos
  }
})
