import { put, takeEvery } from 'redux-saga/effects'
import { ActionType } from 'constants/enums'
import { requestNotes } from 'api'

async function fetchAsync(endpoint) {
  const response = await fetch(endpoint)

  if (response.ok) {
    return await response.json()
  }

  throw new Error('Unexpected error')
}

function* fetchNotes() {
  try {
    const data = yield fetchAsync(requestNotes)

    yield put({ type: ActionType.LOAD_NOTES_SUCCESS, payload: data })
  } catch (error) {
    yield put({ type: ActionType.LOAD_NOTES_ERROR, payload: error.message })
  }
}

export function* notesSaga() {
  yield takeEvery(ActionType.LOAD_NOTES, fetchNotes)
}

export default notesSaga
