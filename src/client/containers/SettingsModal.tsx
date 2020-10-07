import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'react-feather'

import {
  toggleSettingsModal,
  updateCodeMirrorOption,
  togglePreviewMarkdown,
  toggleDarkTheme,
  updateNotesSortStrategy,
} from '@/slices/settings'
import { logout } from '@/slices/auth'
import { shortcutMap, notesSortOptions, directionTextOptions } from '@/utils/constants'
import { ReactMouseEvent } from '@/types'
import { getSettings, getAuth } from '@/selectors'
import { Option } from '@/components/SettingsModal/Option'
import { Shortcut } from '@/components/SettingsModal/Shortcut'
import { NotesSortKey } from '@/utils/enums'
import { SelectOptions } from '@/components/SettingsModal/SelectOptions'

export const SettingsModal: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { codeMirrorOptions, isOpen, previewMarkdown, darkTheme, notesSortKey } = useSelector(
    getSettings
  )
  const { currentUser } = useSelector(getAuth)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _logout = () => dispatch(logout())
  const _toggleSettingsModal = () => dispatch(toggleSettingsModal())
  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown())
  const _toggleDarkTheme = () => dispatch(toggleDarkTheme())
  const _updateNotesSortStrategy = (sortBy: NotesSortKey) =>
    dispatch(updateNotesSortStrategy(sortBy))
  const _updateCodeMirrorOption = (key: string, value: any) =>
    dispatch(updateCodeMirrorOption({ key, value }))

  // ===========================================================================
  // Refs
  // ===========================================================================

  const node = useRef<HTMLDivElement>(null)

  // ===========================================================================
  // Handlers
  // ===========================================================================

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
  const updateNotesSortStrategyHandler = (selectedOption: any) => {
    _updateNotesSortStrategy(selectedOption.value)
  }
  const updateNotesDirectionHandler = (selectedOption: any) => {
    _updateCodeMirrorOption('direction', selectedOption.value)
  }
  // ===========================================================================
  // Hooks
  // ===========================================================================

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

        <section className="profile flex">
          <div>
            <img src={currentUser.avatar_url} alt="Profile" className="profile-picture" />
          </div>
          <div className="profile-details">
            <h3>{currentUser.name}</h3>
            <div className="subtitle">{currentUser.email}</div>
            <button
              onClick={() => {
                _logout()
              }}
            >
              Log out
            </button>
          </div>
        </section>

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
          <SelectOptions
            title="Sort By"
            onChange={updateNotesSortStrategyHandler}
            options={notesSortOptions}
            selectedValue={notesSortKey}
          />
          <SelectOptions
            title="Direction text"
            onChange={updateNotesDirectionHandler}
            options={directionTextOptions}
            selectedValue={codeMirrorOptions.direction}
          />
        </section>

        <section className="settings-section">
          <div className="settings-label mb-1">Keyboard Shortcuts</div>
          {shortcutMap.map((shortcut) => (
            <Shortcut action={shortcut.action} letter={shortcut.key} key={shortcut.key} />
          ))}
        </section>
      </div>
    </div>
  ) : null
}
