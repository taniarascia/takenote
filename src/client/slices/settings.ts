import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SettingsState, ShortcutItem } from '@/types'
import { NotesSortKey, DirectionText } from '@/utils/enums'
import { shortcutMap } from '@/utils/constants'

export const initialState: SettingsState = {
  previewMarkdown: false,
  darkTheme: false,
  sidebarVisible: true,
  notesSortKey: NotesSortKey.LAST_UPDATED,
  shortcuts: shortcutMap,
  codeMirrorOptions: {
    mode: 'gfm',
    theme: 'base16-light',
    lineNumbers: false,
    lineWrapping: true,
    styleActiveLine: { nonEmpty: true },
    viewportMargin: Infinity,
    keyMap: 'default',
    dragDrop: false,
    direction: DirectionText.LEFT_TO_RIGHT,
    scrollPastEnd: false,
  },
  isOpen: false,
  loading: false,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSettingsModal: (state) => {
      state.isOpen = !state.isOpen
    },

    updateCodeMirrorOption: (state, { payload }: PayloadAction<{ key: string; value: string }>) => {
      state.codeMirrorOptions[payload.key] = payload.value
    },

    togglePreviewMarkdown: (state) => {
      state.previewMarkdown = !state.previewMarkdown
    },

    toggleDarkTheme: (state) => {
      state.darkTheme = !state.darkTheme
    },

    updateNotesSortStrategy: (state, { payload }: PayloadAction<NotesSortKey>) => {
      state.notesSortKey = payload
    },

    loadSettings: (state) => {
      state.loading = true
    },

    loadSettingsError: (state) => {
      state.loading = false
    },

    loadSettingsSuccess: (state, { payload }: PayloadAction<SettingsState>) => {
      return { ...payload, loading: false }
    },
    updateShortcut: (
      state,
      {
        payload,
      }: PayloadAction<
        ShortcutItem & {
          newShortcut: string
        }
      >
    ) => {
      if (!state.shortcuts) {
        state.shortcuts = shortcutMap
      }

      const updatedShortcuts = state.shortcuts.map((shortcut) => {
        if (shortcut.key === payload.key) {
          return {
            ...shortcut,
            key: payload.newShortcut.toLowerCase(),
          }
        }

        return shortcut
      })

      return {
        ...state,
        shortcuts: updatedShortcuts,
      }
    },
  },
})

export const {
  toggleSettingsModal,
  updateCodeMirrorOption,
  toggleDarkTheme,
  togglePreviewMarkdown,
  updateNotesSortStrategy,
  loadSettings,
  loadSettingsError,
  loadSettingsSuccess,
  updateShortcut,
} = settingsSlice.actions

export default settingsSlice.reducer
