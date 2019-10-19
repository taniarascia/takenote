import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleSettingsModal, updateCodeMirrorOption } from 'slices/settings'
import { togglePreviewMarkdown } from 'slices/previewMarkdown'
import { toggleDarkTheme } from 'slices/theme'
import { ReactMouseEvent, RootState } from 'types'
import Switch from 'components/Switch'

const SettingsModal: React.FC = () => {
  const { codeMirrorOptions, isOpen } = useSelector((state: RootState) => state.settingsState)
  const { previewMarkdown } = useSelector((state: RootState) => state.previewMarkdown)
  const { dark } = useSelector((state: RootState) => state.themeState)

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
    _updateCodeMirrorOption('theme', dark ? 'base16-light' : 'new-moon')
  }

  const toggleLineHighlight = () => {
    _updateCodeMirrorOption('styleActiveLine', !codeMirrorOptions.styleActiveLine)
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

        <div className="settings-options">
          <div>Active line highlight</div>
          <Switch toggle={toggleLineHighlight} checked={codeMirrorOptions.styleActiveLine} />
        </div>

        <div className="settings-options">
          <div>Preview note</div>
          <Switch toggle={togglePreviewMarkdownHandler} checked={previewMarkdown} />
        </div>

        <div className="settings-options">
          <div>Dark Mode</div>
          <Switch toggle={toggleDarkThemeHandler} checked={dark} />
        </div>

        <section className="settings-section">
          <div className="settings-label mb-1">Keyboard Shortcuts</div>
          <div className="settings-shortcut">
            <div>Create note</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>O</kbd>
            </div>
          </div>
          <div className="settings-shortcut">
            <div>Delete note</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>W</kbd>
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
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>D</kbd>
            </div>
          </div>
          <div className="settings-shortcut">
            <div>Sync note</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>L</kbd>
            </div>
          </div>
          <div className="settings-shortcut">
            <div>Preview note</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>J</kbd>
            </div>
          </div>
          <div className="settings-shortcut">
            <div>Dark mode</div>
            <div>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>K</kbd>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : null
}

export default SettingsModal
