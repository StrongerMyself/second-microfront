import { render, hydrate } from 'react-dom'
import { createApp } from './main'
import './style.css'

const { ID, app } = createApp()
const element = document.getElementById(ID)

if (element) {
  if (element.hasChildNodes()) {
      hydrate(app, element, () => console.log('hydrate: ', ID))
  } else {
      render(app, element, () => console.log('render: ', ID))
  }
}
