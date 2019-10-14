import { all, put, takeLatest } from 'redux-saga/effects'

import {
  loadCategoriesError,
  loadCategoriesSuccess,
  loadNotesError,
  loadNotesSuccess,
  syncStateError,
  syncStateSuccess,
} from '../actions'
import { requestCategories, requestNotes, saveState } from '../api'
import { Actions } from '../constants/enums'
import { SyncStateAction } from '../types'

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
    takeLatest(Actions.LOAD_NOTES, fetchNotes),
    takeLatest(Actions.LOAD_CATEGORIES, fetchCategories),
    takeLatest(Actions.SYNC_STATE, postState),
  ])
}

export default allSagas
