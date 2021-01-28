const path = require('path')
const express = require('express')
const rerender = require('./rerender')

module.exports = (app) => (name, _pathPackage) => {
  const pathPackage = path.resolve(__dirname, _pathPackage) 
  const pathManifest = path.resolve(pathPackage, 'manifest.json') 
  const manifest = require(pathManifest)
  const pathComponent = path.resolve(pathPackage, manifest['server.js'])
  const component = require(pathComponent)
  app.use(`/render/${name}`, rerender(name, manifest, component))
  Object.keys(manifest).map(keyFile => {
    app.use(`/static/${name}/${manifest[keyFile]}`, express.static(path.resolve(pathPackage, manifest[keyFile])))
  })
}
