const videoService = require('./videoService.js')
window.pageEvents = {
  loadMore: () => {
    videoService.loadData()
  }
}
videoService.loadData()
