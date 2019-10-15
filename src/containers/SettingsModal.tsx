import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { toggleSettingsModal, toggleDarkTheme } from 'actions'
import { ApplicationState } from 'types'

export interface SettingsModalProps {
  isOpen: boolean
  dark: boolean
  toggleSettingsModal: () => {}
  toggleDarkTheme: () => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  dark,
  toggleSettingsModal,
  toggleDarkTheme,
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
        <button onClick={toggleDarkThemeHandler}>Toggle Dark Theme</button>
      </div>
    </div>
  ) : null
}

const mapStateToProps = (state: ApplicationState) => ({
  isOpen: state.settingsState.isOpen,
  dark: state.themeState.dark,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleSettingsModal: () => dispatch(toggleSettingsModal()),
  toggleDarkTheme: () => dispatch(toggleDarkTheme()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsModal)
