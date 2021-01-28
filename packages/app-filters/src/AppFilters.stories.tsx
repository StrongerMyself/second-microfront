import React from 'react'
import { Story, Meta } from '@storybook/react'

import { AppFilters } from './AppFilters'

export default {
  title: 'AppFilters',
  component: AppFilters,
} as Meta

const Template: Story = (args) => <AppFilters {...args} />

export const Default = Template.bind({})
