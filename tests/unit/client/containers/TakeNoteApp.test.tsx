import React from 'react'
import { mocked } from 'ts-jest/utils'
import { waitFor } from '@testing-library/react'
import { name, internet, lorem } from 'faker'

import { getAuth, getCategories, getSettings, getNotes, getSync } from '@/selectors'
import { Folder, NotesSortKey } from '@/utils/enums'
import { TakeNoteApp } from '@/containers/TakeNoteApp'

import { renderWithRouter } from '../testHelpers'

jest.mock('@/selectors')

const mockedGetNotes = mocked(getNotes, true)
const mockedGetSettings = mocked(getSettings, true)
const mockedGetCategories = mocked(getCategories, true)
const mockedGetSync = mocked(getSync, true)
const mockedGetAuth = mocked(getAuth, true)

const wrap = () => renderWithRouter(<TakeNoteApp />)

describe('<TakeNoteApp />', () => {
  test('should see empty editor if there are no active notes', async () => {
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
          scrollPastEnd: true,
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
    mockedGetSync.mockImplementation(() => {
      return {
        error: '',
        syncing: false,
        lastSynced: '',
        pendingSync: false,
      }
    })
    mockedGetAuth.mockImplementation(() => {
      return {
        loading: false,
        currentUser: {
          bio: lorem.words(),
          name: name.findName(),
          avatar_url: internet.url(),
        },
        isAuthenticated: true,
        error: '',
      }
    })

    const component = wrap()

    await waitFor(() => component.getByTestId('empty-editor'))
  })
})
