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
      'https://gist.githubusercontent.com/taniarascia/d0283d793979f63c7169210215d7922d/raw/220917fa93284dbcd30654121a6ca498edc7d6bf/fakeNotes.json'
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
