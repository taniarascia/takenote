import { createSlice, PayloadAction, Slice } from 'redux-starter-kit'

import { SettingsState, VimModes } from 'types'

const initialState: SettingsState = {
  isOpen: false,
  vimState: {
    mode: VimModes.default,
  },
  codeMirrorOptions: {
    mode: 'gfm',
    theme: 'base16-light',
    lineNumbers: false,
    lineWrapping: true,
    styleActiveLine: { nonEmpty: true },
    viewportMargin: Infinity,
    keyMap: 'default',
    dragDrop: false,
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
    updateVimStateMode: (state, { payload }: PayloadAction<VimModes>) => ({
      ...state,
      vimState: {
        mode: payload,
      },
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

export const {
  toggleSettingsModal,
  toggleVimInsertMode,
  updateVimStateMode,
  updateCodeMirrorOption,
} = settingsSlice.actions

export default settingsSlice.reducer
