// settings.test.ts
// Tests for functionality available in the settings menu

import { defaultInit, assertNoteContainsText } from '../utils/testHelperUtils'
import {
  clickCreateNewNote,
  createXUniqueNotes,
  clickNoteOptionFavorite,
  typeNoteEditor,
  openNoteContextMenu,
  holdKeyAndClickNoteAtIndex,
} from '../utils/testNotesHelperUtils'
import {
  navigateToSettings,
  assertSettingsMenuIsOpen,
  assertSettingsMenuIsClosed,
  closeSettingsByClickingX,
  closeSettingsByClickingOutsideWindow,
  toggleDarkMode,
  toggleMarkdownPreview,
  toggleLineNumbers,
  toggleLineHighlight,
  assertDarkModeActive,
  assertDarkModeInactive,
  assertMarkdownPreviewActive,
  assertMarkdownPreviewInactive,
  assertLineNumbersActive,
  assertLineNumbersInactive,
  selectOptionInSortByDropdown,
  assertLineHighlightActive,
  assertLineHighlightInactive,
} from '../utils/testSettingsUtils'

describe('Settings', () => {
  defaultInit()

  before(() => {})

  beforeEach(() => {
    navigateToSettings()
  })

  afterEach(() => {
    closeSettingsByClickingOutsideWindow()
  })

  const generateAndConfigureSomeNotes = () => {
    const noteTitle = 'note 10'
    const noteTitleAbc = 'B'

    createXUniqueNotes(5)
    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')
    openNoteContextMenu()
    clickNoteOptionFavorite()

    clickCreateNewNote()
    typeNoteEditor(noteTitleAbc)

    clickCreateNewNote()
    typeNoteEditor(noteTitle)
  }

  it('should open settings menu', () => {
    assertSettingsMenuIsOpen()
  })

  it('should close settings menu on clicking X', () => {
    closeSettingsByClickingX()
    assertSettingsMenuIsClosed()
    navigateToSettings()
  })

  it('should close settings menu on clicking outside of window', () => {
    closeSettingsByClickingOutsideWindow()
    assertSettingsMenuIsClosed()
    navigateToSettings()
  })

  it('should toggle preferences: active line highlight [off]', () => {
    toggleLineHighlight()
    closeSettingsByClickingOutsideWindow()
    assertLineHighlightInactive()
    navigateToSettings()
  })

  it('should toggle preferences: active line highlight [on]', () => {
    toggleLineHighlight()
    closeSettingsByClickingOutsideWindow()
    assertLineHighlightActive()
    navigateToSettings()
  })

  it('should toggle preferences: dark mode [on]', () => {
    toggleDarkMode()
    assertDarkModeActive()
  })

  it('should toggle preferences: dark mode [off]', () => {
    toggleDarkMode()
    assertDarkModeInactive()
  })

  it('should toggle preferences: markdown preview [on]', () => {
    toggleMarkdownPreview()
    assertMarkdownPreviewActive()
  })

  it('should toggle preferences: markdown preview [off]', () => {
    toggleMarkdownPreview()
    assertMarkdownPreviewInactive()
  })

  it('should toggle preferences: line numbers [on]', () => {
    toggleLineNumbers()
    assertLineNumbersActive()
  })

  it('should toggle preferences: line numbers [off]', () => {
    toggleLineNumbers()
    assertLineNumbersInactive()
    closeSettingsByClickingX()
    generateAndConfigureSomeNotes()
    navigateToSettings()
  })

  it('should change sort order: last updated', () => {
    selectOptionInSortByDropdown('Last Updated')
    closeSettingsByClickingX()
    assertNoteContainsText('note-list-item-2', 'note 10')
    navigateToSettings()
  })

  it('should change sort order: title (alphabetical)', () => {
    selectOptionInSortByDropdown('Title')
    closeSettingsByClickingX()
    assertNoteContainsText('note-list-item-2', 'B')
    navigateToSettings()
  })

  it('should change sort order: date created', () => {
    selectOptionInSortByDropdown('Date Created')
    closeSettingsByClickingX()
    assertNoteContainsText('note-list-item-2', 'note 10')
    navigateToSettings()
  })
})
