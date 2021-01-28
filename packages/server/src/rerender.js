const React = require('react')
const ReactDOM = require('react-dom/server')

module.exports = (name, manifest, component) => async (req, res) => {
  const markup = ReactDOM.renderToString(React.createElement(component))
  const template = `<div id="${name}">${markup}</div>`
  res.send(template)
}
