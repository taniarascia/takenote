import { createSlice, PayloadAction, Slice } from 'redux-starter-kit'

import { SyncState } from 'types'

const initialState: SyncState = {
  error: '',
  syncing: false,
}

const syncSlice: Slice<SyncState> = createSlice({
  slice: 'sync',
  initialState,
  reducers: {
    syncState: state => ({
      ...state,
      syncing: true,
    }),
    syncStateError: (state, { payload }: PayloadAction<string>) => ({
      error: payload,
      syncing: false,
    }),
    syncStateSuccess: state => ({
      ...state,
      syncing: false,
    }),
  },
})

export const { syncState, syncStateError, syncStateSuccess } = syncSlice.actions

export default syncSlice.reducer
