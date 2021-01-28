import { createElement } from 'react'
import { render } from 'react-dom'

import './index.css'

import { AppFilters } from './AppFilters'

render(
  createElement(AppFilters),
  document.getElementById('app-filters')
)
