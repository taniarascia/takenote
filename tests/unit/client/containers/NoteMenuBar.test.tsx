import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { TestID } from '@resources/TestID'
import { NoteMenuBar } from '@/containers/NoteMenuBar'

import { renderWithRouter } from '../testHelpers'

const wrap = () => renderWithRouter(<NoteMenuBar />)

describe('<NoteMenuBar />', () => {
  it('renders the NoteMenuBar', () => {
    const component = wrap()

    expect(component).toBeTruthy()
  })
  it('toggle dark mode on and off', () => {
    const component = wrap()
    fireEvent.click(component.getByTestId(TestID.DARK_MODE_TOGGLE))
    fireEvent.click(component.getByTestId(TestID.DARK_MODE_TOGGLE))
  })
})
