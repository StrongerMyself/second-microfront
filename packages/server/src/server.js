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
  const serverComponent = require(`${dist}/${manifest[entry]}`)
  const pathDist = path.resolve(__dirname, dist)
  app.use(`/static/${name}`, express.static(pathDist))
  app.use(`/render/${name}`, renderApp(name, manifest, serverComponent))
}

const getPublicStatic = (name, manifest) => {
  return Object.keys(manifest)
    .reduce((acum, key) => {
      acum[key] = `/static/${name}/${manifest[key]}`
      return acum
    }, {})
}

const renderApp = (name, manifest, serverComponent) => async (req, res) => {
  const publicManifest = getPublicStatic(name, manifest)
  const markup = ReactDOM.renderToString(React.createElement(serverComponent))
  res.json({ name, markup, manifest: publicManifest })
}

registerApp('catalog-filters', '../../../packages/catalog-filters/dist', 'server.js')

const PORT = process.env.SERVER_PORT || 3001
app.listen(PORT, () => {
  console.log(`BFF listen on port ${PORT}...`)
})
