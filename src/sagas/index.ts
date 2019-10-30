// eslint-disable-next-line import/named
import { all, put, takeLatest, select } from 'redux-saga/effects'
import moment from 'moment'

import { requestCategories, requestNotes, saveState, saveSettings, requestSettings } from 'api'
import { loadCategories, loadCategoriesError, loadCategoriesSuccess } from 'slices/category'
import { loadNotes, loadNotesError, loadNotesSuccess } from 'slices/note'
import { syncState, syncStateError, syncStateSuccess } from 'slices/sync'
import {
  updateCodeMirrorOption,
  updateVimStateMode,
  loadSettingsSuccess,
  loadSettingsError,
  loadSettings,
  toggleDarkTheme,
  togglePreviewMarkdown,
  toggleSettingsModal,
} from 'slices/settings'
import { SyncStateAction } from 'types'
import { getSettings } from 'selectors'

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
    const settings = yield select(getSettings)
    yield saveSettings(settings)
  } catch {}
}

function* fetchSettings() {
  try {
    const settings = yield requestSettings()
    yield put(loadSettingsSuccess(settings))
  } catch {
    yield put(loadSettingsError())
  }
}

function* rootSaga() {
  yield all([
    takeLatest(loadNotes.type, fetchNotes),
    takeLatest(loadCategories.type, fetchCategories),
    takeLatest(loadSettings.type, fetchSettings),
    takeLatest(syncState.type, postState),
    takeLatest(
      [
        toggleDarkTheme.type,
        togglePreviewMarkdown.type,
        updateCodeMirrorOption.type,
        updateVimStateMode.type,
        toggleSettingsModal.type,
      ],
      syncSettings
    ),
  ])
}

export default rootSaga
