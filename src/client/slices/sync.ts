import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SyncState, SyncStatePayload } from '@/types'

const initialState: SyncState = {
  error: '',
  syncing: false,
  lastSynced: '',
  pendingSync: false,
}

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    setPendingSync: state => ({
      ...state,
      pendingSync: true,
    }),
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
      pendingSync: false,
    }),
  },
})

export const { syncState, syncStateError, syncStateSuccess, setPendingSync } = syncSlice.actions

export default syncSlice.reducer
