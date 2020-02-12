import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'react-feather'

import {
  toggleSettingsModal,
  updateCodeMirrorOption,
  togglePreviewMarkdown,
  toggleDarkTheme,
} from '@/slices/settings'
import { ReactMouseEvent, RootState } from '@/types'
import { Option } from '@/components/Settings/Option'
import { Shortcut } from '@/components/Settings/Shortcut'

const SettingsModal: React.FC = () => {
  const dispatch = useDispatch()
  const { codeMirrorOptions, isOpen, previewMarkdown, darkTheme } = useSelector(
    (state: RootState) => state.settingsState
  )
  const node = useRef<HTMLDivElement>(null)

  const _toggleSettingsModal = () => dispatch(toggleSettingsModal())
  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown())
  const _toggleDarkTheme = () => dispatch(toggleDarkTheme())
  const _updateCodeMirrorOption = (key: string, value: any) =>
    dispatch(updateCodeMirrorOption({ key, value }))

  const handleDomClick = (event: ReactMouseEvent) => {
    event.stopPropagation()

    if (node.current && node.current.contains(event.target as HTMLDivElement)) return

    if (isOpen) {
      _toggleSettingsModal()
    }
  }

  const togglePreviewMarkdownHandler = () => _togglePreviewMarkdown()
  const toggleDarkThemeHandler = () => {
    _toggleDarkTheme()
    _updateCodeMirrorOption('theme', darkTheme ? 'base16-light' : 'new-moon')
  }
  const toggleLineHighlight = () =>
    _updateCodeMirrorOption('styleActiveLine', !codeMirrorOptions.styleActiveLine)

  const handleEscPress = (event: KeyboardEvent) => {
    event.stopPropagation()
    if (event.key === 'Escape' && isOpen) {
      _toggleSettingsModal()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleDomClick)
    document.addEventListener('keydown', handleEscPress)
    return () => {
      document.removeEventListener('mousedown', handleDomClick)
      document.removeEventListener('keydown', handleEscPress)
    }
  })

  return isOpen ? (
    <div className="dimmer">
      <div ref={node} className="settings-modal">
        <header className="settings-header mb-1">
          <h2>Settings</h2>
          <div
            className="action-button"
            onClick={() => {
              if (isOpen) _toggleSettingsModal()
            }}
          >
            <X size={20} />
          </div>
        </header>

        <section className="settings-section">
          <div className="settings-label mb-1">Options</div>
          <Option
            title="Active line highlight"
            toggle={toggleLineHighlight}
            checked={codeMirrorOptions.styleActiveLine}
          />
          <Option
            title="Markdown preview"
            toggle={togglePreviewMarkdownHandler}
            checked={previewMarkdown}
          />
          <Option title="Dark mode" toggle={toggleDarkThemeHandler} checked={darkTheme} />
        </section>

        <section className="settings-section">
          <div className="settings-label mb-1">Keyboard Shortcuts</div>
          <Shortcut action="New note" letter="N" />
          <Shortcut action="Delete note" letter="U" />
          <Shortcut action="Create category" letter="C" />
          <Shortcut action="Download note" letter="O" />
          <Shortcut action="Sync notes" letter="L" />
          <Shortcut action="Markdown preview" letter="P" />
          <Shortcut action="Toggle theme" letter="K" />
          <Shortcut action="Search" letter="F" />
        </section>
      </div>
    </div>
  ) : null
}

export default SettingsModal
