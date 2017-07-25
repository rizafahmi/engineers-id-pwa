define([], () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js', { scope: '' })
      .then(swRegistration => {
        let serviceWorker

        if (swRegistration.installing) {
          console.log('Resolved at installing: ', swRegistration)
          serviceWorker = swRegistration.installing
        } else if (swRegistration.waiting) {
          console.log('Resolved at installed/waiting: ', swRegistration)
          serviceWorker = swRegistration.waiting
        } else if (swRegistration.active) {
          console.log('Resolved at activated: ', swRegistration)
          serviceWorker = swRegistration.active
        }

        if (serviceWorker) {
          serviceWorker.addEventListener('statechange', e => {
            console.log(e.target.state)
          })
        }
        swRegistration.addEventListener('updatefound', e => {
          swRegistration.installing.addEventListener('statechange', e => {
            console.log('New service worker state: ', e.target.state)
          })
          console.log('New service worker found!', swRegistration)
        })
        setInterval(
          () => {
            swRegistration.update()
          },
          5000
        )
      })
      .catch(e => {
        console.log(`Error occured: ${e}`)
      })
    navigator.serviceWorker.addEventListener('controllerchange', e => {
      console.log('Controller changed!')
    })
  }
})
