const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const React = require('react')
const ReactDOM = require('react-dom/server')

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())

const registerApp = (name, dist, entry) => {
  const manifest = require(`${dist}/manifest.json`)
  const component = require(`${dist}/${manifest[entry]}`)
  const publicManifest = registerStatic(name, dist, entry, manifest)
  app.use(`/render/${name}`, renderApp(name, publicManifest, component))
}

const registerStatic = (name, dist, entry, manifest) => {
  return Object.keys(manifest)
    .filter(key => key !== entry)
    .reduce((acum, key) => {
      const routeStatic = `/static/${name}/${manifest[key]}`
      const pathFile = path.resolve(__dirname, dist, manifest[key])
      app.use(routeStatic, express.static(pathFile))
      acum[key] = routeStatic
      return acum
    }, {})
}

const renderApp = (name, manifest, component) => async (req, res) => {
  const markup = ReactDOM.renderToString(React.createElement(component))
  res.json({ name, markup, manifest })
}

registerApp('catalog-filters', '../../../packages/catalog-filters/dist', 'server.js')

const PORT = process.env.SERVER_PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
