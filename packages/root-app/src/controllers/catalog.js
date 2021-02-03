const fetch = require('node-fetch')

const RERENDR_HOST = 'http://localhost:3001'

const fetchApp = (name) => {
  return fetch(`${RERENDR_HOST}/render/${name}`)
    .then(res => res.json())
}

module.exports = async (req, res) => {
  const catalogFilters = await fetchApp(`catalog-filters`)
  res.render('catalog', {
    catalogFilters
  })
}
