import { combineReducers, Reducer } from 'redux'

import noteReducer from 'reducers/noteReducer'
import categoryReducer from 'reducers/categoryReducer'
import syncReducer from 'reducers/syncReducer'
import themeReducer from 'reducers/themeReducer'
import settingsReducer from 'reducers/settingsReducer'
import { ApplicationState } from 'types'

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  noteState: noteReducer,
  categoryState: categoryReducer,
  syncState: syncReducer,
  themeState: themeReducer,
  settingsState: settingsReducer,
})

export default rootReducer
