import { put, takeEvery } from 'redux-saga/effects'
import { ActionType } from 'constants/enums'

async function fetchAsync(endpoint) {
  const response = await fetch(endpoint)

  if (response.ok) {
    return await response.json()
  }

  throw new Error('Unexpected error!!!')
}

function* fetchNotes() {
  try {
    const data = yield fetchAsync(
      'https://gist.githubusercontent.com/taniarascia/d0283d793979f63c7169210215d7922d/raw/5ca89530e7abe29a9eb7d8f2f915b5edf450f4c5/fakeNotes.json'
    )
    yield put({ type: ActionType.LOAD_NOTES_SUCCESS, payload: data })
  } catch (error) {
    yield put({ type: ActionType.LOAD_NOTES_ERROR, payload: error.message })
  }
}

export function* notesSaga() {
  yield takeEvery(ActionType.LOAD_NOTES, fetchNotes)
}

export default notesSaga
