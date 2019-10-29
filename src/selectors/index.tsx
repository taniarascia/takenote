import { RootState } from 'types'

export const getTheme = (state: RootState) => state.themeState
export const getCodeMirrorOption = (state: RootState) => state.settingsState.codeMirrorOptions
export const getpreviewMarkdown = (state: RootState) => state.previewMarkdown.previewMarkdown
