import React from 'react'
import { render } from '@testing-library/react'

import NoteListButton, { NoteListButtonProps } from 'components/NoteListButton'

describe('<NoteListButton />', () => {
  const noteListButtonDataTestID = 'notelist-button'

  it('renders the NoteListButton component', () => {
    const enabledProps: NoteListButtonProps = {
      dataTestID: noteListButtonDataTestID,
      handler: jest.fn,
      label: 'Test',
    }

    const button = render(<NoteListButton {...enabledProps} />)
    expect(button).toBeTruthy()
  })

  it('renders the NoteListButton component as disabled', () => {
    const disabledProps: NoteListButtonProps = {
      dataTestID: noteListButtonDataTestID,
      handler: jest.fn,
      label: 'Test',
      disabled: true,
    }

    const { getByTestId } = render(<NoteListButton {...disabledProps} />)
    const button = getByTestId(noteListButtonDataTestID)
    expect(button).toHaveAttribute('disabled')
  })
})
