import { Story, Meta } from '@storybook/vue'

import App from './App.vue'

export default {
  title: 'App',
  component: App,
} as Meta

const Template: Story = () => '<App v-bind="$props" />';

export const Default = Template.bind({})
