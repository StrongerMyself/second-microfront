import Vue from 'vue'
import App from './App.vue'

const ID = 'Cart'

export const createApp = () => {
  const app = new Vue({
    template: `<App id="${ID}"/>`,
    components: { 
      App,
    }
  })
  return { ID, app }
}
