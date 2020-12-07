import React from 'react'

import { TestID } from '@resources/TestID'
import { ContextMenuOptions, ContextMenuOptionsProps } from '@/containers/ContextMenuOptions'
import { ContextMenuEnum } from '@/utils/enums'

import { renderWithRouter } from '../testHelpers'

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

    const component = wrap(props)
    const nav = component.getByTestId('note-options-nav')

    expect(nav).toBeTruthy()
  })

  it('displays correct default options', () => {
    const props: ContextMenuOptionsProps = {
      clickedItem: {
        id: '1',
        text: 'text',
        created: '01/02/2019',
        lastUpdated: '01/02/2019',
      },
      type: ContextMenuEnum.NOTE,
    }

    const component = wrap(props)
    const addToFavorites = component.queryByTestId(TestID.NOTE_OPTION_FAVORITE)
    const removeCategory = component.queryByTestId(TestID.NOTE_OPTION_REMOVE_CATEGORY)
    const download = component.queryByTestId(TestID.NOTE_OPTION_DOWNLOAD)
    const deletePermanently = component.queryByTestId(TestID.NOTE_OPTION_DELETE_PERMANENTLY)
    const restoreFromTrash = component.queryByTestId(TestID.NOTE_OPTION_RESTORE_FROM_TRASH)

    expect(addToFavorites).toBeTruthy()
    expect(download).toBeTruthy()
    expect(removeCategory).toBeFalsy()
    expect(deletePermanently).toBeFalsy()
    expect(restoreFromTrash).toBeFalsy()
  })

  it('displays correct trash options', () => {
    const props: ContextMenuOptionsProps = {
      clickedItem: {
        id: '1',
        text: 'text',
        created: '01/02/2019',
        lastUpdated: '01/02/2019',
        trash: true,
      },
      type: ContextMenuEnum.NOTE,
    }

    const component = wrap(props)
    const addToFavorites = component.queryByTestId(TestID.NOTE_OPTION_FAVORITE)
    const removeCategory = component.queryByTestId(TestID.NOTE_OPTION_REMOVE_CATEGORY)
    const download = component.queryByTestId(TestID.NOTE_OPTION_DOWNLOAD)
    const deletePermanently = component.queryByTestId(TestID.NOTE_OPTION_DELETE_PERMANENTLY)
    const restoreFromTrash = component.queryByTestId(TestID.NOTE_OPTION_RESTORE_FROM_TRASH)

    expect(addToFavorites).toBeFalsy()
    expect(deletePermanently).toBeTruthy()
    expect(restoreFromTrash).toBeTruthy()
    expect(removeCategory).toBeFalsy()
    expect(download).toBeTruthy()
  })

  it('displays correct category options', () => {
    const props: ContextMenuOptionsProps = {
      clickedItem: {
        id: '1',
        text: 'text',
        created: '01/02/2019',
        lastUpdated: '01/02/2019',
        category: '2',
      },
      type: ContextMenuEnum.NOTE,
    }

    const component = wrap(props)
    const addToFavorites = component.queryByTestId(TestID.NOTE_OPTION_FAVORITE)
    const removeCategory = component.queryByTestId(TestID.NOTE_OPTION_REMOVE_CATEGORY)
    const download = component.queryByTestId(TestID.NOTE_OPTION_DOWNLOAD)
    const deletePermanently = component.queryByTestId(TestID.NOTE_OPTION_DELETE_PERMANENTLY)
    const restoreFromTrash = component.queryByTestId(TestID.NOTE_OPTION_RESTORE_FROM_TRASH)

    expect(addToFavorites).toBeTruthy()
    expect(deletePermanently).toBeFalsy()
    expect(restoreFromTrash).toBeFalsy()
    expect(removeCategory).toBeTruthy()
    expect(download).toBeTruthy()
  })
})
