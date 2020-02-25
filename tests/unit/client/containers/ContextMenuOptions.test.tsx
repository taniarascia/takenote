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

    const component = wrap(props)
    const nav = component.getByTestId('note-options-nav')

    expect(nav).toBeTruthy()
  })

  it('displays correct default options', () => {
    const props: ContextMenuOptionsProps = {
      clickedNote: {
        id: '1',
        text: 'text',
        created: '01/02/2019',
        lastUpdated: '01/02/2019',
      },
    }

    const component = wrap(props)
    const addToFavorites = component.queryByTestId('note-option-favorite')
    const removeCategory = component.queryByTestId('note-option-remove-category')
    const download = component.queryByTestId('note-options-download')
    const deletePermanently = component.queryByTestId('note-option-delete-permanently')
    const restoreFromTrash = component.queryByTestId('note-option-restore-from-trash')

    expect(addToFavorites).toBeTruthy()
    expect(download).toBeTruthy()
    expect(removeCategory).toBeFalsy()
    expect(deletePermanently).toBeFalsy()
    expect(restoreFromTrash).toBeFalsy()
  })

  it('displays correct trash options', () => {
    const props: ContextMenuOptionsProps = {
      clickedNote: {
        id: '1',
        text: 'text',
        created: '01/02/2019',
        lastUpdated: '01/02/2019',
        trash: true,
      },
    }

    const component = wrap(props)
    const addToFavorites = component.queryByTestId('note-option-favorite')
    const deletePermanently = component.queryByTestId('note-option-delete-permanently')
    const restoreFromTrash = component.queryByTestId('note-option-restore-from-trash')
    const removeCategory = component.queryByTestId('note-option-remove-category')
    const download = component.queryByTestId('note-options-download')

    expect(addToFavorites).toBeFalsy()
    expect(deletePermanently).toBeTruthy()
    expect(restoreFromTrash).toBeTruthy()
    expect(removeCategory).toBeFalsy()
    expect(download).toBeTruthy()
  })

  it('displays correct category options', () => {
    const props: ContextMenuOptionsProps = {
      clickedNote: {
        id: '1',
        text: 'text',
        created: '01/02/2019',
        lastUpdated: '01/02/2019',
        category: '2',
      },
    }

    const component = wrap(props)
    const addToFavorites = component.queryByTestId('note-option-favorite')
    const deletePermanently = component.queryByTestId('note-option-delete-permanently')
    const restoreFromTrash = component.queryByTestId('note-option-restore-from-trash')
    const removeCategory = component.queryByTestId('note-option-remove-category')
    const download = component.queryByTestId('note-options-download')

    expect(addToFavorites).toBeTruthy()
    expect(deletePermanently).toBeFalsy()
    expect(restoreFromTrash).toBeFalsy()
    expect(removeCategory).toBeTruthy()
    expect(download).toBeTruthy()
  })
})
