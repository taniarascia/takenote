import { all, put, takeLatest, select } from 'redux-saga/effects'
import dayjs from 'dayjs'
import axios from 'axios'

import { loadCategories, loadCategoriesError, loadCategoriesSuccess } from '@/slices/category'
import { loadNotes, loadNotesError, loadNotesSuccess } from '@/slices/note'
import { sync, syncError, syncSuccess } from '@/slices/sync'
import { login, loginSuccess, loginError, logout, logoutSuccess } from '@/slices/auth'
import { loadSettingsSuccess, loadSettingsError, loadSettings } from '@/slices/settings'
import { SyncAction } from '@/types'
import { getSettings, getNotes, getCategories } from '@/selectors'

// Hit the Express endpoint to get the current GitHub user from the cookie
function* loginUser() {
  try {
    const { data } = yield axios('/api/auth/login')

    yield put(loginSuccess(data))
  } catch (error) {
    yield put(loginError(error.message))
  }
}

// Remove the access token cookie from Express
function* logoutUser() {
  try {
    yield axios('/api/auth/logout')

    yield put(logoutSuccess())
  } catch (error) {
    yield put(logoutSuccess())
  }
}

// Get notes from API
function* fetchNotes() {
  try {
    const { data } = yield axios('/api/sync/notes')

    yield put(loadNotesSuccess(data))
  } catch (error) {
    yield put(loadNotesError(error.message))
  }
}

// Get categories from API
function* fetchCategories() {
  try {
    const { data } = yield axios('/api/sync/categories')

    yield put(loadCategoriesSuccess(data))
  } catch (error) {
    yield put(loadCategoriesError(error.message))
  }
}

// Get settings from API
function* fetchSettings() {
  try {
    const { data } = yield axios('/api/sync/settings')

    yield put(loadSettingsSuccess(data))
  } catch (error) {
    yield put(loadSettingsError())
  }
}

function* syncData({ payload }: SyncAction) {
  const { notes } = yield select(getNotes)
  const { categories } = yield select(getCategories)
  const settings = yield select(getSettings)

  const body = { notes, categories, settings }

  try {
    yield axios.post('/api/sync', body)
    yield put(syncSuccess(dayjs().format()))
  } catch (error) {
    yield put(syncError(error.message))
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
    takeLatest(sync.type, syncData),
  ])
}

export default rootSaga
