import { combineReducers } from 'redux'
import noteReducer from 'reducers/noteReducer'

const rootReducer = combineReducers({
  noteState: noteReducer,
} as any)

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
