import { combineReducers, Reducer } from 'redux'

import categoryReducer from 'slices/category'
import noteReducer from 'slices/note'
import settingsReducer from 'slices/settings'
import syncReducer from 'slices/sync'
import themeReducer from 'slices/theme'
import { ApplicationState } from 'types'

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  categoryState: categoryReducer,
  noteState: noteReducer,
  settingsState: settingsReducer,
  syncState: syncReducer,
  themeState: themeReducer,
})

export default rootReducer
