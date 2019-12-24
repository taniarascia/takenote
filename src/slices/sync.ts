import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SyncState, SyncStatePayload } from 'types'

const initialState: SyncState = {
  error: '',
  syncing: false,
  lastSynced: '',
}

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    syncState: (state, { payload }: PayloadAction<SyncStatePayload>) => ({
      ...state,
      syncing: true,
    }),
    syncStateError: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      error: payload,
      syncing: false,
    }),
    syncStateSuccess: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      lastSynced: payload,
      syncing: false,
    }),
  },
})

export const { syncState, syncStateError, syncStateSuccess } = syncSlice.actions

export default syncSlice.reducer
