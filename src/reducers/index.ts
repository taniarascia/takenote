import { combineReducers, Reducer } from 'redux'
import noteReducer from 'reducers/noteReducer'
import categoryReducer from 'reducers/categoryReducer'
import syncReducer from 'reducers/syncReducer'
import { ApplicationState } from 'types'

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  noteState: noteReducer,
  categoryState: categoryReducer,
  syncState: syncReducer,
})

export default rootReducer
