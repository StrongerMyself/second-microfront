const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const React = require('react')
const ReactDOM = require('react-dom/server')

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())

const registerApp = (name, pathApp) => {
  const manifest = require(`${pathApp}/dist/manifest.json`)
  const component = require(`${pathApp}/dist/${manifest['server.js']}`)
  app.use(`/render/${name}`, renderApp(name, manifest, component))
  Object.keys(manifest)
    .filter(key => key.indexOf('server') !== 0)
    .map((key) => {
      const routeStatic = `/static/${name}/${manifest[key]}`
      const pathFile = path.resolve(pathApp, manifest[key])
      app.use(routeStatic, express.static(pathFile))
    })
}

const renderApp = (name, manifest, component) => async (req, res) => {
  const markup = ReactDOM.renderToString(React.createElement(component))
  res.json({ name, markup, manifest })
}

registerApp('catalog-filters', '../../../packages/catalog-filters')

const PORT = process.env.SERVER_PORT || 3001

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
