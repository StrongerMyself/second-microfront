import { mount } from '@vue/test-utils'
import renderApp from './server'
import Header from './components/Header.vue'

describe('server', () => {
  test('markup is string', async () => {
    const { markup } = await renderApp()
    expect(typeof markup).toBe('string')
  });
  test('markup is like a wrapper', async () => {
    const { markup } = await renderApp()
    const wrapper = mount(Header)
    const cleanMarkup = markup.replace(' data-server-rendered="true"', '')
    expect(cleanMarkup).toBe(wrapper.html())
  });
});

