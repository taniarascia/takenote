import React from 'react'

import { renderWithRouter } from '../testHelpers'

import { ContextMenuOptions, ContextMenuOptionsProps } from '@/containers/ContextMenuOptions'

const wrap = (props: ContextMenuOptionsProps) => renderWithRouter(<ContextMenuOptions {...props} />)

describe('<ContextMenuOptions />', () => {
  it('renders the ContextMenuOptions', () => {
    const props: ContextMenuOptionsProps = {
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
