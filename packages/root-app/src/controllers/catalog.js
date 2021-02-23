const fetch = require('node-fetch')

const RERENDR_HOST = 'http://localhost:3001'

const fetchApp = (name) => {
  return fetch(`${RERENDR_HOST}/render/${name}`)
    .then(res => res.json())
}

module.exports = async (req, res) => {
  const header = await fetchApp('header')
  const filters = await fetchApp('filters')
  const catalog = await fetchApp('catalog')
  const cart = await fetchApp('cart')
  const footer = await fetchApp('footer')
  const catalogFilters = await fetchApp(`catalog-filters`)
  res.render('catalog', {
    header,
    filters,
    catalog,
    cart,
    footer,
    catalogFilters,
  })
}
