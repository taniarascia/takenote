import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-extended'

import { TestID } from '@resources/TestID'
import { CollapseCategoryListButton } from '@/components/AppSidebar/CollapseCategoryButton'

describe('<CollapseCategoryButton />', () => {
  it('renders the CollapseCategoryButton component', () => {
    const enabledProps: CollapseCategoryListButton = {
      handler: jest.fn,
      label: 'Test',
      dataTestID: TestID.CATEGORY_COLLAPSE_BUTTON,
      isCategoryListOpen: true,
      showIcon: true,
    }

    const component = render(<CollapseCategoryListButton {...enabledProps} />)

    expect(component).toBeTruthy()
  })
})
