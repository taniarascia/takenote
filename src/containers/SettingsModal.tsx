import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { toggleSettingsModal, toggleDarkTheme, updateCodeMirrorOption } from 'actions'
import { ApplicationState } from 'types'

export interface SettingsModalProps {
  isOpen: boolean
  dark: boolean
  codeMirrorOptions: { [key: string]: any }
  toggleSettingsModal: () => {}
  toggleDarkTheme: () => void
  updateCodeMirrorOption: (key: string, value: string) => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  dark,
  codeMirrorOptions,
  toggleSettingsModal,
  toggleDarkTheme,
  updateCodeMirrorOption,
}) => {
  const node = useRef<HTMLDivElement>(null)

  const handleDomClick = (
    event: MouseEvent | React.MouseEvent<HTMLDivElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.stopPropagation()

    if (node.current && node.current.contains(event.target as HTMLDivElement)) return

    if (isOpen) {
      toggleSettingsModal()
    }
  }

  const toggleDarkThemeHandler = () => {
    toggleDarkTheme()

    if (!dark) {
      updateCodeMirrorOption('theme', 'zenburn')
    } else {
      updateCodeMirrorOption('theme', 'base16-light')
    }
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

        <div className="settings-options vbetween">
          <div className="settings-label">Dark Mode</div>
          <label className="switch">
            <input type="checkbox" onChange={toggleDarkThemeHandler} checked={dark} />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="settings-options vbetween">
          <div className="settings-label">Vim Mode</div>
          <label className="switch">
            <input
              type="checkbox"
              onChange={() => {
                if (codeMirrorOptions.keyMap === 'vim') {
                  updateCodeMirrorOption('keyMap', 'default')
                } else {
                  updateCodeMirrorOption('keyMap', 'vim')
                }
              }}
              checked={codeMirrorOptions.keyMap === 'vim'}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  ) : null
}

const mapStateToProps = (state: ApplicationState) => ({
  isOpen: state.settingsState.isOpen,
  dark: state.themeState.dark,
  codeMirrorOptions: state.settingsState.codeMirrorOptions,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleSettingsModal: () => dispatch(toggleSettingsModal()),
  toggleDarkTheme: () => dispatch(toggleDarkTheme()),
  updateCodeMirrorOption: (key: string, value: string) =>
    dispatch(updateCodeMirrorOption(key, value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsModal)
