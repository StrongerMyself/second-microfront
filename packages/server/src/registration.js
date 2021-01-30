const path = require('path')
const express = require('express')
const rerender = require('./rerender')

module.exports = (app) => (name, _pathApp) => {
  const pathApp = path.resolve(__dirname, _pathApp) 
  const manifest = require(path.resolve(pathApp, 'manifest.json'))
  const component = require(path.resolve(pathApp, manifest['server.js']))
  const manifestStatic = Object.keys(manifest).reduce((acum, key) => {
    const pathStatic = `/static/${name}/${manifest[key]}`
    const pathFile = path.resolve(pathApp, manifest[key])
    app.use(pathStatic, express.static(pathFile))
    acum[key] = pathStatic
    return acum  
  }, {})
  app.use(`/render/${name}`, rerender(name, manifestStatic, component))
}
