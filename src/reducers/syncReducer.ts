import { Actions } from 'constants/enums'
import { SyncState, SyncStateActionTypes } from 'types'

const initialState: SyncState = {
  syncing: false,
  error: '',
}

const syncReducer = (state = initialState, action: SyncStateActionTypes): SyncState => {
  switch (action.type) {
    case Actions.SYNC_STATE:
      return {
        ...state,
        syncing: true,
      }
    case Actions.SYNC_STATE_SUCCESS:
      return {
        ...state,
        syncing: false,
      }
    case Actions.SYNC_STATE_ERROR:
      return {
        syncing: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default syncReducer
