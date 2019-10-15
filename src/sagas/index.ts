// eslint-disable-next-line import/named
import { all, put, takeLatest } from 'redux-saga/effects'

import { requestCategories, requestNotes, saveState } from 'api'
import { loadCategories, loadCategoriesError, loadCategoriesSuccess } from 'slices/category'
import { loadNotes, loadNotesError, loadNotesSuccess } from 'slices/note'
import { syncState, syncStateError, syncStateSuccess } from 'slices/sync'
import { SyncStateAction } from 'types'

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

function* postState({ payload: { notes, categories } }: SyncStateAction) {
  try {
    yield saveState(notes, categories)
    yield put(syncStateSuccess())
  } catch (error) {
    yield put(syncStateError(error.message))
  }
}

export function* allSagas() {
  yield all([
    takeLatest(loadNotes.type, fetchNotes),
    takeLatest(loadCategories.type, fetchCategories),
    takeLatest(syncState.type, postState),
  ])
}

export default allSagas
