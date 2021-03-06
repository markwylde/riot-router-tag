var riot = require('riot')

riot.tag('router',
  '<yield/>',
  function (opts) {

    const refreshRoutes = () => {
      this.tags.route.map(route => route.update())
    }

    const renderRoutes = e => {
      e = e ||  window.event
      var element = e.target || e.srcElement

      if (element.tagName == 'A') {
        if (element.href.startsWith(document.baseURI)) {
          window.history.pushState({},"", element.href)
          refreshRoutes()
          e.preventDefault()
        }
      }
    }

    this.on('mount', function() {
      document.addEventListener('click', renderRoutes)
      window.addEventListener('popstate', refreshRoutes)

      const rootPaths = document.baseURI.split('/').slice(3).length
      const paths = window.location.pathname.split('/').slice(rootPaths)

      window.location.__defineSetter__('route', newValue => {
        if (!newValue) return;
        window.history.pushState({},"", newValue)
        refreshRoutes()
      })

    })

    this.on('unmount', function() {
      document.removeEventListener('click', renderRoutes)
      window.removeEventListener('popstate', refreshRoutes)

      window.location.route = undefined
    })
})


riot.tag('route',
  '<div if={isActivePath}><yield /></div>',
  function (opts) {

    const render = () => {
      const rootPaths = document.baseURI.split('/').slice(3).length
      let paths = window.location.pathname.split('/').slice(rootPaths)
      if (paths[paths.length - 1] === '' && paths.length > 1) paths.pop()
      const routes = opts.path.split('/').slice(1)

      let routeOpts = {}
      let isActivePath = false
      if (paths.length === routes.length) {
        isActivePath = paths.reduce((acc, path, idx) => {
          if (path === routes[idx]) {
            return acc
          } else {
            if (routes[idx] && routes[idx].startsWith(':')) {
              routeOpts[routes[idx].substr(1)] = path
              return acc
            } else {
              return false
            }
          }
        }, true)
      }

      this.isActivePath = isActivePath
      this.route = routeOpts
    }

    this.on('update', render)
    this.on('mount', render)
  })
