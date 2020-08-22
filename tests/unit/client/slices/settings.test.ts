import { PayloadAction } from '@reduxjs/toolkit'

import reducer, {
  initialState,
  toggleSettingsModal,
  togglePreviewMarkdown,
  updateCodeMirrorOption,
  toggleDarkTheme,
  toggleSidebarVisibility,
  updateNotesSortStrategy,
} from '@/slices/settings'
import { NotesSortKey } from '@/utils/enums'

describe('settings slice', () => {
  it('should return the initial state on first run', () => {
    const nextState = initialState
    const action = {} as PayloadAction
    const result = reducer(undefined, action)

    expect(result).toEqual(nextState)
  })

  it('should toggle open state', () => {
    const nextState = { ...initialState, isOpen: true }
    const result = reducer(initialState, toggleSettingsModal())

    expect(result).toEqual(nextState)
  })

  it('should update code mirror option', () => {
    const payload = { key: 'key123', value: 'mirror' }
    const state = {
      ...initialState,
      codeMirrorOptions: {
        ...initialState.codeMirrorOptions,
        [payload.key]: payload.value,
      },
    }
    const result = reducer(initialState, updateCodeMirrorOption(payload))

    expect(result).toEqual(state)
  })

  it('should toggle preview markdown state', () => {
    const nextState = { ...initialState, previewMarkdown: !initialState.previewMarkdown }
    const result = reducer(initialState, togglePreviewMarkdown())

    expect(result).toEqual(nextState)
  })

  it('should toggle dark theme state', () => {
    const nextState = { ...initialState, darkTheme: !initialState.darkTheme }
    const result = reducer(initialState, toggleDarkTheme())

    expect(result).toEqual(nextState)
  })

  it('should toggle sidebar visibility state', () => {
    const nextState = { ...initialState, sidebarVisible: !initialState.sidebarVisible }
    const result = reducer(initialState, toggleSidebarVisibility())

    expect(result).toEqual(nextState)
  })
})
