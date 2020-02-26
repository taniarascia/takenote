import React from 'react'

import { renderWithRouter } from '../testHelpers'

import { ContextMenuOptions, ContextMenuOptionsProps } from '@/containers/ContextMenuOptions'
import { ContextMenuEnum } from '@/utils/enums'

const wrap = (props: ContextMenuOptionsProps) => renderWithRouter(<ContextMenuOptions {...props} />)

describe('<ContextMenuOptions />', () => {
  it('renders the ContextMenuOptions', () => {
    const props: ContextMenuOptionsProps = {
      clickedItem: {
        id: '1',
        text: 'text',
        created: '01/02/2019',
        lastUpdated: '01/02/2019',
      },
      type: ContextMenuEnum.NOTE,
    }

    const { getByTestId } = wrap(props)

    const nav = getByTestId('note-options-nav')

    expect(nav).toBeTruthy()
  })
})
