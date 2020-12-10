import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-extended'

import { ScratchpadOption, ScratchpadOptionProps } from '@/components/AppSidebar/ScratchpadOption'

describe('<ScratchpadOption />', () => {
  it('renders the ScratchpadOption component', () => {
    const enabledProps: ScratchpadOptionProps = {
      swapFolder: jest.fn,
      active: true,
    }

    const component = render(<ScratchpadOption {...enabledProps} />)

    expect(component).toBeTruthy()
  })
})
