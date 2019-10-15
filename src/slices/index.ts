import { combineReducers, Reducer } from 'redux'

import categoryReducer from 'slices/categorySlice'
import noteReducer from 'slices/noteSlice'
import settingsReducer from 'slices/settingsSlice'
import syncReducer from 'slices/syncSlice'
import themeReducer from 'slices/themeSlice'
import { ApplicationState } from 'types'

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  noteState: noteReducer,
  categoryState: categoryReducer,
  syncState: syncReducer,
  themeState: themeReducer,
  settingsState: settingsReducer,
})

export default rootReducer
