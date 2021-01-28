const React = require('react')
const ReactDOM = require('react-dom/server')

module.exports = (name, manifestStatic, component) => async (req, res) => {
  const markup = ReactDOM.renderToString(React.createElement(component))
  const template = [
    `<link rel="stylesheet" href="${manifestStatic['client.css']}"/>`,
    `<div id="${name}">${markup}</div>`,
    `<script src="${manifestStatic['client.js']}"></script>`,
  ].join('')
  res.send(template)
}
