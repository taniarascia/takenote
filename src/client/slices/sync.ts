import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SyncState, SyncPayload } from '@/types'

export const initialState: SyncState = {
  pendingSync: false,
  lastSynced: '',
  error: '',
  syncing: false,
}

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    setPendingSync: (state) => {
      state.pendingSync = true
    },

    sync: (state, { payload }: PayloadAction<SyncPayload>) => {
      state.syncing = true
    },

    syncError: (state, { payload }: PayloadAction<string>) => {
      state.syncing = false
      state.error = payload
    },

    syncSuccess: (state, { payload }: PayloadAction<string>) => {
      state.syncing = false
      state.lastSynced = payload
      state.pendingSync = false
    },
  },
})

export const { sync, syncError, syncSuccess, setPendingSync } = syncSlice.actions

export default syncSlice.reducer
