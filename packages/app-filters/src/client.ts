import { createElement } from 'react'
import { render, hydrate } from 'react-dom'

import './index.css'

import { AppFilters } from './AppFilters'

const id = 'app-filters'
const element = document.getElementById(id)
const component = createElement(AppFilters)

if (element) {
  if (element.hasChildNodes()) {
      hydrate(component, element, () => console.log('hydrate: ', id))
  } else {
      render(component, element, () => console.log('render: ', id))
  }
}

