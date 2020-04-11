import React from 'react'
import { fireEvent } from '@testing-library/react'

import { TestID } from '@resources/TestID'

import { renderWithRouter } from '../testHelpers'

import { KeyboardShortcuts } from '@/containers/KeyboardShortcuts'

const wrap = () => renderWithRouter(<KeyboardShortcuts />)

describe('<KeyboardShortcuts />', () => {
  test('renders the ContextMenuOptions', () => {
    const component = wrap()

    // fireEvent.keyPress(component.getByTestId(''))
  })
})
