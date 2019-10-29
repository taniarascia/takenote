// eslint-disable-next-line import/named
import { all, put, takeLatest, select } from 'redux-saga/effects'
import moment from 'moment'

import {
  requestCategories,
  requestNotes,
  saveState,
  saveSettings,
  requestCodeMirrorOption,
  requestPreviewMarkdown,
  requestTheme,
} from 'api'
import { loadCategories, loadCategoriesError, loadCategoriesSuccess } from 'slices/category'
import { loadNotes, loadNotesError, loadNotesSuccess } from 'slices/note'
import { syncState, syncStateError, syncStateSuccess } from 'slices/sync'
import { toggleDarkTheme, loadThemeSuccess, loadThemeError, loadTheme } from 'slices/theme'
import {
  updateCodeMirrorOption,
  updateVimStateMode,
  loadCodeMirrorOptionSuccess,
  loadCodeMirrorOptionError,
  loadCodeMirrorOption,
} from 'slices/settings'
import {
  togglePreviewMarkdown,
  loadPreviewMarkdownSuccess,
  loadPreviewMarkdownError,
  loadPreviewMarkdown,
} from 'slices/previewMarkdown'
import { SyncStateAction } from 'types'
import { getCodeMirrorOption, getTheme, getpreviewMarkdown } from 'selectors'

function* fetchNotes() {
  try {
    const notes = yield requestNotes()
    yield put(loadNotesSuccess(notes))
  } catch (error) {
    yield put(loadNotesError(error.message))
  }
}

function* fetchCategories() {
  try {
    const categories = yield requestCategories()
    yield put(loadCategoriesSuccess(categories))
  } catch (error) {
    yield put(loadCategoriesError(error.message))
  }
}

function* postState({ payload }: SyncStateAction) {
  try {
    yield saveState(payload)
    yield put(syncStateSuccess(moment().format()))
  } catch (error) {
    yield put(syncStateError(error.message))
  }
}

function* syncSettings() {
  try {
    const previewMarkdown = yield select(getpreviewMarkdown)
    const codeMirrorOption = yield select(getCodeMirrorOption)
    const theme = yield select(getTheme)
    yield saveSettings({ previewMarkdown, codeMirrorOption, theme })
  } catch {}
}

function* fetchCodeMirrorOption() {
  try {
    const codeMirrorOption = yield requestCodeMirrorOption()
    yield put(loadCodeMirrorOptionSuccess(codeMirrorOption))
  } catch {
    yield put(loadCodeMirrorOptionError())
  }
}

function* fetchPreviewMarkdown() {
  try {
    const previewMarkdown = yield requestPreviewMarkdown()
    yield put(loadPreviewMarkdownSuccess(previewMarkdown))
  } catch {
    yield put(loadPreviewMarkdownError())
  }
}

function* fetchTheme() {
  try {
    const theme = yield requestTheme()
    yield put(loadThemeSuccess(theme))
  } catch {
    yield put(loadThemeError())
  }
}

function* rootSaga() {
  yield all([
    takeLatest(loadNotes.type, fetchNotes),
    takeLatest(loadCategories.type, fetchCategories),
    takeLatest(loadCodeMirrorOption.type, fetchCodeMirrorOption),
    takeLatest(loadPreviewMarkdown.type, fetchPreviewMarkdown),
    takeLatest(loadTheme.type, fetchTheme),
    takeLatest(syncState.type, postState),
    takeLatest(
      [
        toggleDarkTheme.type,
        togglePreviewMarkdown.type,
        updateCodeMirrorOption.type,
        updateVimStateMode.type,
      ],
      syncSettings
    ),
  ])
}

export default rootSaga
