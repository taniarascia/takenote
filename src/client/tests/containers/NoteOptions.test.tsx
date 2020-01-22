import React from 'react'

import NoteOptions, { NoteOptionsProps } from '@/containers/NoteOptions'
import { renderWithRouter } from '@/tests/helpers'

const wrap = (props: NoteOptionsProps) => renderWithRouter(<NoteOptions {...props} />)

describe('<NoteOptions />', () => {
  it('renders the NoteOptions', () => {
    const props: NoteOptionsProps = {
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
