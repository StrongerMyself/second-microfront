import { createRenderer } from 'vue-server-renderer'
import { createApp } from './main'
 
const renderer = createRenderer()

export default async () => {
  const { ID, app } = createApp()
  const markup = await renderer.renderToString(app)
  return { markup, ID }
}
