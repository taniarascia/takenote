import { combineReducers, Reducer } from 'redux'

import authReducer from '@/slices/auth'
import categoryReducer from '@/slices/category'
import noteReducer from '@/slices/note'
import settingsReducer from '@/slices/settings'
import syncReducer from '@/slices/sync'
import { RootState } from '@/types'

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
  categoryState: categoryReducer,
  noteState: noteReducer,
  settingsState: settingsReducer,
  syncState: syncReducer,
})

export default rootReducer
