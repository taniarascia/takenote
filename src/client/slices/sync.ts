import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SyncState, SyncStatePayload } from '@/types'

const initialState: SyncState = {
  syncing: false,
  pendingSync: false,
  lastSynced: '',
  error: '',
}

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    setPendingSync: (state) => {
      state.pendingSync = true
    },
    syncState: (state, { payload }: PayloadAction<SyncStatePayload>) => {
      state.syncing = true
    },
    syncStateError: (state, { payload }: PayloadAction<string>) => {
      state.syncing = false
      state.error = payload
    },
    syncStateSuccess: (state, { payload }: PayloadAction<string>) => {
      state.syncing = false
      state.lastSynced = payload
      state.pendingSync = false
    },
  },
})

export const { syncState, syncStateError, syncStateSuccess, setPendingSync } = syncSlice.actions

export default syncSlice.reducer
