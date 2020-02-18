// eslint-disable-next-line import/named
import { all, put, takeLatest, select } from 'redux-saga/effects'
import moment from 'moment'
import axios from 'axios'

import { requestCategories, requestNotes, saveState, saveSettings, requestSettings } from '@/api'
import { loadCategories, loadCategoriesError, loadCategoriesSuccess } from '@/slices/category'
import { loadNotes, loadNotesError, loadNotesSuccess } from '@/slices/note'
import { syncState, syncStateError, syncStateSuccess } from '@/slices/sync'
import { login, loginSuccess, loginError, logout, logoutSuccess } from '@/slices/auth'
import {
  updateCodeMirrorOption,
  loadSettingsSuccess,
  loadSettingsError,
  loadSettings,
  toggleDarkTheme,
  togglePreviewMarkdown,
  toggleSettingsModal,
} from '@/slices/settings'
import { SyncStateAction } from '@/types'
import { getSettings } from '@/selectors'

/**
 * Log in user
 *
 * Hit the Express endpoint to get the current GitHub user from the cookie
 */
function* loginUser() {
  try {
    const { data } = yield axios('/api/auth/login')

    yield put(loginSuccess(data))
  } catch (error) {
    yield put(loginError(error.message))
  }
}

/**
 * Log out user
 *
 * Remove the access token cookie from Express
 */
function* logoutUser() {
  try {
    yield axios('/api/auth/logout')

    yield put(logoutSuccess())
  } catch (error) {
    yield put(logoutSuccess())
  }
}

/**
 * Get notes from API
 */
function* fetchNotes() {
  try {
    // requestNotes is a temporary mock API
    const notes = yield requestNotes()

    yield put(loadNotesSuccess(notes))
  } catch (error) {
    yield put(loadNotesError(error.message))
  }
}

/**
 * Get categories from API
 */
function* fetchCategories() {
  try {
    // requestCategories is a temporary mock API
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

// If any of these functions are dispatched, invoke the appropriate saga
function* rootSaga() {
  yield all([
    takeLatest(login.type, loginUser),
    takeLatest(logout.type, logoutUser),
    takeLatest(loadNotes.type, fetchNotes),
    takeLatest(loadCategories.type, fetchCategories),
    takeLatest(loadSettings.type, fetchSettings),
    takeLatest(syncState.type, postState),
    takeLatest(
      [
        toggleDarkTheme.type,
        togglePreviewMarkdown.type,
        updateCodeMirrorOption.type,
        toggleSettingsModal.type,
      ],
      syncSettings
    ),
  ])
}

export default rootSaga
