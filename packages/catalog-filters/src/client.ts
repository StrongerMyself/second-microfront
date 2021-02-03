import { createElement } from 'react'
import { render, hydrate } from 'react-dom'

import './index.css'

import { CatalogFilters } from './CatalogFilters'

const id = 'catalog-filters'
const element = document.getElementById(id)
const component = createElement(CatalogFilters)

if (element) {
  if (element.hasChildNodes()) {
      hydrate(component, element, () => console.log('hydrate: ', id))
  } else {
      render(component, element, () => console.log('render: ', id))
  }
}

