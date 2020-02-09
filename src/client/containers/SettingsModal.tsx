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
import Switch from '@/components/Switch'

const SettingsModal: React.FC = () => {
  const { codeMirrorOptions, isOpen, previewMarkdown, darkTheme } = useSelector(
    (state: RootState) => state.settingsState
  )

  const dispatch = useDispatch()

  const _toggleSettingsModal = () => dispatch(toggleSettingsModal())
  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown())
  const _toggleDarkTheme = () => dispatch(toggleDarkTheme())
  const _updateCodeMirrorOption = (key: string, value: any) =>
    dispatch(updateCodeMirrorOption({ key, value }))

  const node = useRef<HTMLDivElement>(null)

  const handleDomClick = (event: ReactMouseEvent) => {
    event.stopPropagation()

    if (node.current && node.current.contains(event.target as HTMLDivElement)) return

    if (isOpen) {
      _toggleSettingsModal()
    }
  }

  const togglePreviewMarkdownHandler = () => {
    _togglePreviewMarkdown()
  }

  const toggleDarkThemeHandler = () => {
    _toggleDarkTheme()
    _updateCodeMirrorOption('theme', darkTheme ? 'base16-light' : 'new-moon')
  }

  const toggleLineHighlight = () => {
    _updateCodeMirrorOption('styleActiveLine', !codeMirrorOptions.styleActiveLine)
  }

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
        <div className="settings-header mb-1">
          <h2>Settings</h2>
          <div
            className="action-button"
            onClick={() => {
              if (isOpen) {
                _toggleSettingsModal()
              }
            }}
          >
            <X size={20} />
          </div>
        </div>

        <div className="settings-label mb-1">Options</div>

        <div className="settings-options">
          <div>Active line highlight</div>
          <Switch toggle={toggleLineHighlight} checked={codeMirrorOptions.styleActiveLine} />
        </div>

        <div className="settings-options">
          <div>Markdown preview</div>
          <Switch toggle={togglePreviewMarkdownHandler} checked={previewMarkdown} />
        </div>

        <div className="settings-options">
          <div>Dark mode</div>
          <Switch toggle={toggleDarkThemeHandler} checked={darkTheme} />
        </div>

        <section className="settings-section">
          <div className="settings-label mb-1">Keyboard Shortcuts</div>
          <div className="settings-shortcut">
            <div>Create note</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>N</kbd>
            </div>
          </div>
          <div className="settings-shortcut">
            <div>Delete note</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>U</kbd>
            </div>
          </div>
          <div className="settings-shortcut">
            <div>Create category</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>C</kbd>
            </div>
          </div>
          <div className="settings-shortcut">
            <div>Download note</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>O</kbd>
            </div>
          </div>
          <div className="settings-shortcut">
            <div>Sync notes</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>L</kbd>
            </div>
          </div>
          <div className="settings-shortcut">
            <div>Markdown preview</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>P</kbd>
            </div>
          </div>
          <div className="settings-shortcut">
            <div>Toggle theme</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>K</kbd>
            </div>
          </div>
          <div className="settings-shortcut">
            <div>Focus search</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>F</kbd>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : null
}

export default SettingsModal
