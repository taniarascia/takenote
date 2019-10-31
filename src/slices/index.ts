import { combineReducers, Reducer } from 'redux'

import categoryReducer from 'slices/category'
import noteReducer from 'slices/note'
import settingsReducer from 'slices/settings'
import syncReducer from 'slices/sync'
import { RootState } from 'types'

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  categoryState: categoryReducer,
  noteState: noteReducer,
  settingsState: settingsReducer,
  syncState: syncReducer,
})

export default rootReducer
