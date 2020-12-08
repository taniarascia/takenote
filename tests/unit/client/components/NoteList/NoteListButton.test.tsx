import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-extended'

import { TestID } from '@resources/TestID'
import { NoteListButton, NoteListButtonProps } from '@/components/NoteList/NoteListButton'

describe('<NoteListButton />', () => {
  it('renders the NoteListButton component', () => {
    const enabledProps: NoteListButtonProps = {
      handler: jest.fn,
      label: 'Test',
      dataTestID: TestID.EMPTY_TRASH_BUTTON,
    }

    const component = render(<NoteListButton {...enabledProps} />)

    expect(component).toBeTruthy()
  })

  it('renders the NoteListButton component as disabled', () => {
    const disabledProps: NoteListButtonProps = {
      handler: jest.fn,
      label: 'Test',
      disabled: true,
      dataTestID: TestID.EMPTY_TRASH_BUTTON,
    }

    const component = render(<NoteListButton {...disabledProps} />)
    const button = component.queryByTestId(TestID.EMPTY_TRASH_BUTTON)

    expect(button).toBeDisabled()
  })
})
