import React from 'react'
import ReactDOM from 'react-dom/server'
import { CatalogFilters } from './CatalogFilters'
 
export default async () => {
  const markup = ReactDOM.renderToString(
    React.createElement(CatalogFilters)
  )
  return markup
}
