import { createSlice, PayloadAction, Slice } from 'redux-starter-kit'

import { SettingsState } from 'types'

const initialState: SettingsState = {
  isOpen: false,
  codeMirrorOptions: {
    mode: 'gfm',
    theme: 'base16-light',
    lineNumbers: false,
    lineWrapping: true,
    styleActiveLine: { nonEmpty: true },
    viewportMargin: Infinity,
    keyMap: 'default',
  },
}

const settingsSlice: Slice<SettingsState> = createSlice({
  slice: 'settings',
  initialState,
  reducers: {
    toggleSettingsModal: state => ({
      ...state,
      isOpen: !state.isOpen,
    }),
    updateCodeMirrorOption: (
      state,
      { payload }: PayloadAction<{ key: string; value: string }>
    ) => ({
      ...state,
      codeMirrorOptions: {
        ...state.codeMirrorOptions,
        [payload.key]: payload.value,
      },
    }),
  },
})

export const { toggleSettingsModal, updateCodeMirrorOption } = settingsSlice.actions

export default settingsSlice.reducer
