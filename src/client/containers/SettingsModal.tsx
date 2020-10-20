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
  const toggleScrollPastEnd = () =>
    _updateCodeMirrorOption('scrollPastEnd', !codeMirrorOptions.scrollPastEnd)
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
        <div
          className="close-button"
          onClick={() => {
            if (isOpen) _toggleSettingsModal()
          }}
        >
          <X size={20} />
        </div>

        <section className="profile flex">
          <div>
            <img src={currentUser.avatar_url} alt="Profile" className="profile-picture" />
          </div>
          <div className="profile-details">
            <h3>{currentUser.name}</h3>
            <div className="subtitle">{currentUser.bio}</div>
            <button
              onClick={() => {
                _logout()
              }}
            >
              Log out
            </button>
          </div>
        </section>

        <div className="settings-label">Preferences</div>
        <section className="settings-section">
          <Option
            title="Active line highlight"
            description="Controls whether the editor should highlight the active line"
            toggle={toggleLineHighlight}
            checked={codeMirrorOptions.styleActiveLine}
          />
          <Option
            title="Scroll past end"
            description="Controls whether the editor will add blank space to the end of all files"
            toggle={toggleScrollPastEnd}
            checked={codeMirrorOptions.scrollPastEnd}
          />
          <Option
            title="Markdown preview"
            description="Controls whether markdown preview mode is enabled"
            toggle={togglePreviewMarkdownHandler}
            checked={previewMarkdown}
          />
          <Option
            title="Dark mode"
            description="Controls the theme of the application and editor"
            toggle={toggleDarkThemeHandler}
            checked={darkTheme}
          />
          <SelectOptions
            title="Sort By"
            description="Controls the sort strategy of the notes"
            onChange={updateNotesSortStrategyHandler}
            options={notesSortOptions}
            selectedValue={notesSortKey}
          />
          <SelectOptions
            title="Text direction"
            description="Controls the direction of the text"
            onChange={updateNotesDirectionHandler}
            options={directionTextOptions}
            selectedValue={codeMirrorOptions.direction}
          />
        </section>

        <div className="settings-label">Keyboard Shortcuts</div>
        <section className="settings-section">
          {shortcutMap.map((shortcut) => (
            <Shortcut action={shortcut.action} letter={shortcut.key} key={shortcut.key} />
          ))}
        </section>
      </div>
    </div>
  ) : null
}
