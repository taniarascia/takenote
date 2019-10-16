import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleSettingsModal, updateCodeMirrorOption } from 'slices/settings'
import { toggleDarkTheme } from 'slices/theme'
import { RootState } from 'types'

const SettingsModal: React.FC = () => {
  const { codeMirrorOptions, isOpen } = useSelector((state: RootState) => state.settingsState)
  const { dark } = useSelector((state: RootState) => state.themeState)

  const dispatch = useDispatch()

  const _toggleSettingsModal = () => dispatch(toggleSettingsModal())
  const _toggleDarkTheme = () => dispatch(toggleDarkTheme())
  const _updateCodeMirrorOption = (key: string, value: string) =>
    dispatch(updateCodeMirrorOption({ key, value }))

  const node = useRef<HTMLDivElement>(null)

  const handleDomClick = (
    event: MouseEvent | React.MouseEvent<HTMLDivElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.stopPropagation()

    if (node.current && node.current.contains(event.target as HTMLDivElement)) return

    if (isOpen) {
      _toggleSettingsModal()
    }
  }

  const toggleDarkThemeHandler = () => {
    _toggleDarkTheme()
    _updateCodeMirrorOption('theme', dark ? 'base16-light' : 'zenburn')
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleDomClick)
    return () => {
      document.removeEventListener('mousedown', handleDomClick)
    }
  })

  return isOpen ? (
    <div className="dimmer">
      <div ref={node} className="settings-modal">
        <h2>Settings</h2>

        <div className="settings-options v-between">
          <div className="settings-label">Dark Mode</div>
          <label className="switch">
            <input type="checkbox" onChange={toggleDarkThemeHandler} checked={dark} />
            <span className="slider" />
          </label>
        </div>

        <div className="settings-options v-between">
          <div className="settings-label">Vim Mode</div>
          <label className="switch">
            <input
              type="checkbox"
              onChange={() => {
                _updateCodeMirrorOption(
                  'keyMap',
                  codeMirrorOptions.keyMap === 'vim' ? 'default' : 'vim'
                )
              }}
              checked={codeMirrorOptions.keyMap === 'vim'}
            />
            <span className="slider" />
          </label>
        </div>
      </div>
    </div>
  ) : null
}

export default SettingsModal
