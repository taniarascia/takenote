import React from 'react'
import { render } from '@testing-library/react'

import NoteListButton, { NoteListButtonProps } from 'components/NoteListButton'

describe('<NoteListButton />', () => {
  it('renders the NoteListButton component', () => {
    const enabledProps: NoteListButtonProps = {
      handler: jest.fn,
      label: 'Test',
    }

    const button = render(<NoteListButton {...enabledProps} />)
    expect(button).toBeTruthy()
  })

  it('renders the NoteListButton component as disabled', () => {
    const disabledProps: NoteListButtonProps = {
      handler: jest.fn,
      label: 'Test',
      disabled: true,
    }

    const { container } = render(<NoteListButton {...disabledProps} />)
    const button = container.querySelector('[data-cy="Test"]')
    expect(button).toHaveAttribute('disabled')
  })
})
