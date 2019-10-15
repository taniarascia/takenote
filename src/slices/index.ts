import { combineReducers, Reducer } from 'redux'

import noteReducer from 'slices/noteSlice'
import categoryReducer from 'slices/categorySlice'
import syncReducer from 'slices/syncSlice'
import themeReducer from 'slices/themeSlice'
import { ApplicationState } from 'types'

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  noteState: noteReducer,
  categoryState: categoryReducer,
  syncState: syncReducer,
  themeState: themeReducer,
})

export default rootReducer
