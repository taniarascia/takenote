import { combineReducers } from 'redux'
import notes from './noteReducer'
import active from './activeReducer'

export default combineReducers({
  notes,
  active,
} as any)
