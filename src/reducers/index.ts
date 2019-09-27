import { combineReducers } from 'redux'
import notes from 'reducers/noteReducer'
import active from 'reducers/activeReducer'

export default combineReducers({
  notes,
  active,
} as any)
