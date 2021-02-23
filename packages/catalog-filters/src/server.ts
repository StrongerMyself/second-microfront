import ReactDOM from 'react-dom/server'
import { createApp } from './main'
 
export default async () => {
  const { ID, app } = createApp()
  const markup = ReactDOM.renderToString(app)
  return { ID, markup }
}
