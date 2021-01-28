const path = require('path')
const express = require('express')
const rerender = require('./rerender')

module.exports = (app) => (name, _pathPackage) => {
  const pathPackage = path.resolve(__dirname, _pathPackage) 
  const pathManifest = path.resolve(pathPackage, 'manifest.json') 
  const manifest = require(pathManifest)
  const pathComponent = path.resolve(pathPackage, manifest['server.js'])
  const component = require(pathComponent)
  const manifestStatic = Object.keys(manifest).map(keyFile => {
    const pathStatic = `/static/${name}/${manifest[keyFile]}`
    const pathFile = path.resolve(pathPackage, manifest[keyFile])
    app.use(pathStatic, express.static(pathFile))
    return [keyFile, pathStatic]
  }).reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {})
  app.use(`/render/${name}`, rerender(name, manifestStatic, component))
}
