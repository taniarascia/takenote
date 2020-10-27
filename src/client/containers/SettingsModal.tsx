import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X, Command, Settings, Archive, Layers, Download } from 'react-feather'

import {
  toggleSettingsModal,
  updateCodeMirrorOption,
  togglePreviewMarkdown,
  toggleDarkTheme,
  updateNotesSortStrategy,
} from '@/slices/settings'
import { logout } from '@/slices/auth'
import { shortcutMap, notesSortOptions, directionTextOptions, iconColor } from '@/utils/constants'
import { ReactMouseEvent } from '@/types'
import { getSettings, getAuth, getNotes, getCategories } from '@/selectors'
import { Option } from '@/components/SettingsModal/Option'
import { Shortcut } from '@/components/SettingsModal/Shortcut'
import { SelectOptions } from '@/components/SettingsModal/SelectOptions'
import { IconButton } from '@/components/SettingsModal/IconButton'
import { NotesSortKey } from '@/utils/enums'
import { downloadNotes } from '@/utils/helpers'
import { Tabs } from '@/components/Tabs/Tabs'
import { TabPanel } from '@/components/Tabs/TabPanel'
import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

export const SettingsModal: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { codeMirrorOptions, isOpen, previewMarkdown, darkTheme, notesSortKey } = useSelector(
    getSettings
  )
  const { currentUser } = useSelector(getAuth)
  const { notes } = useSelector(getNotes)
  const { categories } = useSelector(getCategories)

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
  const toggleLineNumbersHandler = () =>
    _updateCodeMirrorOption('lineNumbers', !codeMirrorOptions.lineNumbers)
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
  const downloadNotesHandler = () => downloadNotes(notes, categories)
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
      <aside ref={node} className="settings-modal">
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
            {currentUser.avatar_url && (
              <img src={currentUser.avatar_url} alt="Profile" className="profile-picture" />
            )}
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

        <section className="settings-section">
          <Tabs>
            <TabPanel label="Preferences" icon={Settings}>
              <Option
                title="Active line highlight"
                description="Controls whether the editor should highlight the active line"
                toggle={toggleLineHighlight}
                checked={codeMirrorOptions.styleActiveLine}
                testId={TestID.ACTIVE_LINE_HIGHLIGHT_TOGGLE}
              />
              <Option
                title="Display line numbers"
                description="Controls whether the editor should display line numbers"
                toggle={toggleLineNumbersHandler}
                checked={codeMirrorOptions.lineNumbers}
                testId={TestID.DISPLAY_LINE_NUMS_TOGGLE}
              />
              <Option
                title="Scroll past end"
                description="Controls whether the editor will add blank space to the end of all files"
                toggle={toggleScrollPastEnd}
                checked={codeMirrorOptions.scrollPastEnd}
                testId={TestID.SCROLL_PAST_END_TOGGLE}
              />
              <Option
                title="Markdown preview"
                description="Controls whether markdown preview mode is enabled"
                toggle={togglePreviewMarkdownHandler}
                checked={previewMarkdown}
                testId={TestID.MARKDOWN_PREVIEW_TOGGLE}
              />
              <Option
                title="Dark mode"
                description="Controls the theme of the application and editor"
                toggle={toggleDarkThemeHandler}
                checked={darkTheme}
                testId={TestID.DARK_MODE_TOGGLE}
              />
              <SelectOptions
                title="Sort By"
                description="Controls the sort strategy of the notes"
                onChange={updateNotesSortStrategyHandler}
                options={notesSortOptions}
                selectedValue={notesSortKey}
                testId={TestID.SORT_BY_DROPDOWN}
              />
              <SelectOptions
                title="Text direction"
                description="Controls the direction of the text"
                onChange={updateNotesDirectionHandler}
                options={directionTextOptions}
                selectedValue={codeMirrorOptions.direction}
                testId={TestID.TEXT_DIRECTION_DROPDOWN}
              />
            </TabPanel>
            <TabPanel label="Keyboard shortcuts" icon={Command}>
              {shortcutMap.map((shortcut) => (
                <Shortcut action={shortcut.action} letter={shortcut.key} key={shortcut.key} />
              ))}
            </TabPanel>
            <TabPanel label="Data management" icon={Archive}>
              <IconButton
                dataTestID={TestID.SETTINGS_MODAL_DOWNLOAD_NOTES}
                handler={downloadNotesHandler}
                icon={Download}
                text={LabelText.DOWNLOAD_ALL_NOTES}
              />
            </TabPanel>
            <TabPanel label="About TakeNote" icon={Layers}>
              <p>
                TakeNote is a minimalist note-taking app for developers. Write in plain text and
                have your notes accessible from the web.
              </p>
              <p>
                This app has no tracking or analytics and does not retain any user data. Notes are
                persisted in local storage and can be downloaded as markdown files from the data
                management tab.
              </p>
              <p>
                TakeNote was created by{' '}
                <a href="https://www.taniarascia.com" target="_blank" rel="noreferrer">
                  Tania Rascia
                </a>{' '}
                with the help of{' '}
                <a
                  href="https://github.com/taniarascia/takenote/graphs/contributors"
                  target="_blank"
                  rel="noreferrer"
                >
                  the open-source community
                </a>
                .
              </p>
              <p>
                <a
                  className="button"
                  href="https://github.com/taniarascia/takenote"
                  target="_blank"
                  rel="noreferrer"
                >
                  View source
                </a>
              </p>
            </TabPanel>
          </Tabs>
        </section>
      </aside>
    </div>
  ) : null
}
