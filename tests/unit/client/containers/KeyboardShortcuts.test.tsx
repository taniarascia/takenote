import React from 'react'
import { mocked } from 'ts-jest/utils'
import { fireEvent, waitForElement } from '@testing-library/react'
import prettier from 'prettier/standalone'

import { renderWithRouter } from '../testHelpers'

import { getCategories, getSettings, getNotes } from '@/selectors'
import { Folder, NotesSortKey } from '@/utils/enums'
import { NoteEditor } from '@/containers/NoteEditor'

jest.mock('prettier/standalone')
jest.mock('@/selectors')
const mockedPrettier = mocked(prettier, true)
const mockedGetNotes = mocked(getNotes, true)
const mockedGetSettings = mocked(getSettings, true)
const mockedGetCategories = mocked(getCategories, true)

const wrap = () => renderWithRouter(<NoteEditor />)

describe('<KeyboardShortcuts />', () => {
  test('should create a new note using the keyboard shortcut', async () => {
    mockedPrettier.format.mockImplementation(() => 'ran prettier')
    mockedGetNotes.mockImplementation(() => {
      return {
        activeCategoryId: '',
        activeFolder: Folder.ALL,
        activeNoteId: '',
        selectedNotesIds: [],
        error: '',
        loading: false,
        notes: [],
        searchValue: '',
      }
    })
    mockedGetSettings.mockImplementation(() => {
      return {
        isOpen: false,
        loading: false,
        previewMarkdown: false,
        darkTheme: false,
        sidebarVisible: true,
        notesSortKey: NotesSortKey.LAST_UPDATED,
        codeMirrorOptions: {
          mode: 'gfm',
          theme: 'base16-light',
          lineNumbers: false,
          lineWrapping: true,
          styleActiveLine: { nonEmpty: true },
          viewportMargin: Infinity,
          keyMap: 'default',
          dragDrop: false,
        },
      }
    })
    mockedGetCategories.mockImplementation(() => {
      return {
        categories: [],
        error: '',
        loading: false,
        editingCategory: {
          id: '',
          tempName: '',
        },
      }
    })

    const component = wrap()
    await waitForElement(() => component.getByTestId('empty-editor'))

    fireEvent.keyDown(component.getByTestId('empty-editor'), {
      key: 'Control',
    })
    fireEvent.keyDown(component.getByTestId('empty-editor'), {
      key: 'Option',
    })
    fireEvent.keyDown(component.getByTestId('empty-editor'), {
      key: 'N',
    })

    await waitForElement(() => component.getByTestId('codemirror-editor'))
  })
})
