import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-extended'
import { Camera } from 'react-feather'

import { TestID } from '@resources/TestID'
import { IconButton, IconButtonProps } from '@/components/SettingsModal/IconButton'

describe('<IconButton />', () => {
  it('renders the IconButton component', () => {
    const enabledProps: IconButtonProps = {
      handler: jest.fn,
      dataTestID: TestID.ICON_BUTTON,
      icon: Camera,
      text: 'takeNote',
    }

    const component = render(<IconButton {...enabledProps} />)

    expect(component).toBeTruthy()
  })

  it('renders the IconButton component as disabled', () => {
    const disabledProps: IconButtonProps = {
      handler: jest.fn,
      dataTestID: TestID.ICON_BUTTON,
      disabled: true,
      icon: Camera,
      text: 'takeNote',
    }

    const component = render(<IconButton {...disabledProps} />)
    const button = component.queryByTestId(TestID.ICON_BUTTON)

    expect(button).toBeDisabled()
  })
})
