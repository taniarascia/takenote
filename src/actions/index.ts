//==============================================================================
// Settings
//==============================================================================

export const toggleSettingsModal = () => ({
  type: 'TOGGLE_SETTINGS_MODAL',
})

export const updateCodeMirrorOption = (key: string, value: string) => ({
  type: 'UPDATE_CODE_MIRROR_OPTION',
  payload: { key, value },
})
