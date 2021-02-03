const fetch = require('node-fetch')

const RERENDR_HOST = 'http://localhost:3001/render'

module.exports = async (req, res) => {
  const catalogFilters = await fetch(`${RERENDR_HOST}/catalog-filters`)
    .then(res => res.text())
  res.render('catalog', {
    catalogFilters
  })
}
