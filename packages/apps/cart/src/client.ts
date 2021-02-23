import { createApp } from './main'
import './style.css'

const { ID, app } = createApp()

app.$mount(`#${ID}`)
