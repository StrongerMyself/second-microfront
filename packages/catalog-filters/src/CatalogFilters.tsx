import React, { useEffect, useState } from 'react'

interface Props {}

export const CatalogFilters: React.FC<Props> = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => setData(json))
  }, [])

  return (
    <div>
      <p>CatalogFilters</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

CatalogFilters.displayName = 'CatalogFilters'
