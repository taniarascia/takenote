import { createSlice, PayloadAction, Slice } from 'redux-starter-kit'

import { SettingsState, VimModes } from 'types'

const initialState: SettingsState = {
  isOpen: false,
  loading: false,
  previewMarkdown: false,
  darkTheme: false,
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
    togglePreviewMarkdown: state => ({
      ...state,
      previewMarkdown: !state.previewMarkdown,
    }),
    toggleDarkTheme: state => ({
      ...state,
      darkTheme: !state.darkTheme,
    }),
    loadSettings: state => ({
      ...state,
      loading: true,
    }),
    loadSettingsError: state => ({
      ...state,
      loading: false,
    }),
    loadSettingsSuccess: (_, { payload }: PayloadAction<SettingsState>) => ({
      ...payload,
      loading: false,
    }),
  },
})

export const {
  toggleSettingsModal,
  toggleVimInsertMode,
  updateVimStateMode,
  updateCodeMirrorOption,
  toggleDarkTheme,
  togglePreviewMarkdown,
  loadSettings,
  loadSettingsError,
  loadSettingsSuccess,
} = settingsSlice.actions

export default settingsSlice.reducer
