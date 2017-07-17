define(['./template.js'], template => {
  const apiUrlPath = 'http://localhost:3000/'
  const apiUrlVideosPath = apiUrlPath + 'videos'

  const loadData = () => {
    fetch(apiUrlVideosPath).then(res => res.json()).then(data => {
      template.appendData(data)
    })
  }

  return {
    loadData
  }
})
