import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-extended'
import { Camera } from 'react-feather'

import { TestID } from '@resources/TestID'
import { ActionButton, ActionButtonProps } from '@/components/AppSidebar/ActionButton'

test('Sample test', () => {
  expect(true).toBeTruthy()
})

describe('<ActionButton />', () => {
  it('renders the ActionButton component', () => {
    const enabledProps: ActionButtonProps = {
      handler: jest.fn,
      label: 'Test',
      dataTestID: TestID.ACTION_BUTTON,
      text: 'text',
      icon: Camera,
    }

    const component = render(<ActionButton {...enabledProps} />)

    expect(component).toBeTruthy()
  })
})
