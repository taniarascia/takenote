import { combineReducers } from 'redux'
import noteReducer from 'reducers/noteReducer'
import categoryReducer from 'reducers/categoryReducer'
import syncReducer from 'reducers/syncReducer'

const rootReducer = combineReducers({
  noteState: noteReducer,
  categoryState: categoryReducer,
  syncState: syncReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
