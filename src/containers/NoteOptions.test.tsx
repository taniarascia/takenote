import React from 'react'

import { renderWithRouter } from '../../tests/helpers'
import NoteOptions, { NoteOptionsProps } from './NoteOptions'

const wrap = (props: NoteOptionsProps) => renderWithRouter(<NoteOptions {...props} />)

describe('<NoteOptions />', () => {
  it('renders the NoteOptions', () => {
    const props: NoteOptionsProps = {
      sendNoteToTrash: jest.fn(),
      toggleFavoriteNote: jest.fn(),
      clickedNote: {
        id: '1',
        text: 'text',
        created: '01/02/2019',
        lastUpdated: '01/02/2019',
      },
    }

    const { getByTestId } = wrap(props)

    const nav = getByTestId('note-options-nav')

    expect(nav).toBeTruthy()
  })
})
