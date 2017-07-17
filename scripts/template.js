define([], () => {
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
    for (let i = 0; i < videos.length; i++) {
      videoHTML += generateCard(videos[i])
    }
    document.querySelector('.cards').insertAdjacentHTML('beforeend', videoHTML)
    document.querySelector('.spinner').style.display = 'none';
    ('none')
  }

  return {
    appendData
  }
})
