import { combineReducers, Reducer } from 'redux'

import { ApplicationState } from '../types'
import categoryReducer from './categoryReducer'
import noteReducer from './noteReducer'
import syncReducer from './syncReducer'

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  noteState: noteReducer,
  categoryState: categoryReducer,
  syncState: syncReducer,
})

export default rootReducer
