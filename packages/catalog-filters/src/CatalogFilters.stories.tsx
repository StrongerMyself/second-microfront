import React from 'react'
import { Story, Meta } from '@storybook/react'

import { CatalogFilters } from './CatalogFilters'

export default {
  title: 'CatalogFilters',
  component: CatalogFilters,
} as Meta

const Template: Story = (args) => <CatalogFilters {...args} />

export const Default = Template.bind({})
