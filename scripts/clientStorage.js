/* global define localforage */
define([], () => {
  const limit = 4
  let lastItemId = null
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
        let index = keys.indexOf(lastItemId)
        if (index === -1) {
          index = keys.length
        }
        if (index === 0) {
          return resolve([])
        }
        const keySplice = keys.splice(index - limit, limit)
        videosInstance.getItems(keySplice).then(results => {
          const returnArr = Object.keys(results).map(k => results[k]).reverse()
          lastItemId = returnArr[returnArr.length - 1].id
          resolve(returnArr)
        })
      })
    })
  }
  const getLastVideoId = () => {
    return lastItemId
  }

  return {
    addVideos,
    getVideos,
    getLastVideoId
  }
})
