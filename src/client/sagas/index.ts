import { all, put, takeLatest, select } from 'redux-saga/effects'
import dayjs from 'dayjs'
import axios from 'axios'
import { saveAs } from 'file-saver'

import { LabelText } from '@resources/LabelText'
import { requestCategories, requestNotes, requestSettings, saveState, saveSettings } from '@/api'
import { loadCategories, loadCategoriesError, loadCategoriesSuccess } from '@/slices/category'
import { loadNotes, loadNotesError, loadNotesSuccess, downloadPDFNotes } from '@/slices/note'
import { sync, syncError, syncSuccess } from '@/slices/sync'
import { login, loginSuccess, loginError, logout, logoutSuccess } from '@/slices/auth'
import {
  updateCodeMirrorOption,
  loadSettingsSuccess,
  loadSettingsError,
  loadSettings,
  toggleDarkTheme,
  togglePreviewMarkdown,
  toggleSettingsModal,
  updateNotesSortStrategy,
} from '@/slices/settings'
import { SyncAction, DownloadPDFAction, NoteItem, CategoryItem } from '@/types'
import { getSettings } from '@/selectors'

const isDemo = process.env.DEMO

// Hit the Express endpoint to get the current GitHub user from the cookie
function* loginUser() {
  try {
    if (isDemo) {
      yield put(loginSuccess({ name: 'Demo User' }))
    } else {
      const { data } = yield axios('/api/auth/login')

      yield put(loginSuccess(data))
    }
  } catch (error) {
    yield put(loginError(error.message))
  }
}

// Remove the access token cookie from Express
function* logoutUser() {
  try {
    if (isDemo) {
      yield put(logoutSuccess())
    } else {
      yield axios('/api/auth/logout')
    }

    yield put(logoutSuccess())
  } catch (error) {
    yield put(logoutSuccess())
  }
}

// Get notes from API
function* fetchNotes() {
  let data
  try {
    if (isDemo) {
      data = yield requestNotes()
    } else {
      data = (yield axios('/api/sync/notes')).data
    }
    const { notesSortKey } = yield select(getSettings)

    yield put(loadNotesSuccess({ notes: data, sortOrderKey: notesSortKey }))
  } catch (error) {
    yield put(loadNotesError(error.message))
  }
}

// Get categories from API
function* fetchCategories() {
  let data
  try {
    if (isDemo) {
      data = yield requestCategories()
    } else {
      data = (yield axios('/api/sync/categories')).data
    }

    yield put(loadCategoriesSuccess(data))
  } catch (error) {
    yield put(loadCategoriesError(error.message))
  }
}

// Get settings from API
function* fetchSettings() {
  let data
  try {
    data = yield requestSettings()

    yield put(loadSettingsSuccess(data))
  } catch (error) {
    yield put(loadSettingsError())
  }
}

function* syncData({ payload }: SyncAction) {
  try {
    if (isDemo) {
      yield saveState(payload)
    } else {
      yield axios.post('/api/sync', payload)
    }
    yield put(syncSuccess(dayjs().format()))
  } catch (error) {
    yield put(syncError(error.message))
  }
}

function* syncSettings() {
  try {
    const settings = yield select(getSettings)

    yield saveSettings(settings)
  } catch (error) {}
}

export const getNoteTitle = (text: string): string => {
  // Remove whitespace from both ends
  // Get the first n characters
  // Remove # from the title in the case of using markdown headers in your title
  const noteText = text.trim().match(/[^#]{1,45}/)

  // Get the first line of text after any newlines
  // In the future, this should break on a full word
  return noteText ? noteText[0].trim().split(/\r?\n/)[0] : LabelText.NEW_NOTE
}

export const noteWithFrontmatter = (note: NoteItem, category?: CategoryItem): string =>
  `---
title: ${getNoteTitle(note.text)}
created: ${note.created}
lastUpdated: ${note.lastUpdated}
category: ${category?.name ?? ''}
---

${note.text}`

function* downloadAsPDF({ payload }: DownloadPDFAction) {
  try {
    const { notes } = payload
    const headers = {
      'Content-Type': 'application/pdf',
    }

    yield axios({
      method: 'POST',
      url: '/api/note/download',
      data: payload,
      responseType: 'blob',
    }).then((res) => {
      const file = new Blob([res.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      const fileURL = URL.createObjectURL(file)
      link.href = fileURL
      link.setAttribute('download', `${getNoteTitle(notes[0].text)}.pdf`)
      document.body.appendChild(link)
      if (document.createEvent) {
        const event = document.createEvent('MouseEvents')
        event.initEvent('click', true, true)
        link.dispatchEvent(event)
      } else {
        link.click()
      }
    })
  } catch (error) {
    yield put(loadCategoriesError(error.message))
  }
}

// If any of these functions are dispatched, invoke the appropriate saga
function* rootSaga() {
  yield all([
    takeLatest(login.type, loginUser),
    takeLatest(logout.type, logoutUser),
    takeLatest(loadNotes.type, fetchNotes),
    takeLatest(downloadPDFNotes.type, downloadAsPDF),
    takeLatest(loadCategories.type, fetchCategories),
    takeLatest(loadSettings.type, fetchSettings),
    takeLatest(sync.type, syncData),
    takeLatest(
      [
        toggleDarkTheme.type,
        togglePreviewMarkdown.type,
        updateCodeMirrorOption.type,
        toggleSettingsModal.type,
        updateNotesSortStrategy.type,
      ],
      syncSettings
    ),
  ])
}

export default rootSaga
