import { ActionType } from 'constants/enums'

const initialState = {
  syncing: false,
  error: '',
}

const syncReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SYNC_STATE:
      return {
        ...state,
        syncing: true,
      }
    case ActionType.SYNC_STATE_SUCCESS:
      return {
        ...state,
        syncing: false,
      }
    case ActionType.SYNC_STATE_ERROR:
      return {
        syncing: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default syncReducer
