import React from 'react'
import { CatalogFilters } from './CatalogFilters'

const ID = 'catalog-filters'

export const createApp = () => {
  const app =  React.createElement(CatalogFilters)
  return { ID, app }
}
