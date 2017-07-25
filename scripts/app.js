const videoService = require('./videoService.js')
const swRegister = require('./swRegister.js')
window.pageEvents = {
  loadMore: () => {
    videoService.loadData()
  }
}
videoService.loadData()
