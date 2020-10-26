// settings.test.ts
// Tests for functionality available in the settings menu

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import {
  defaultInit,
  getNoteCount,
  navigateToNotes,
  navigateToFavorites,
  navigateToTrash,
  testIDShouldContain,
  testIDShouldNotExist,
} from '../utils/testHelperUtils'
import {
  assertNewNoteCreated,
  assertNoteEditorCharacterCount,
  assertNoteEditorLineCount,
  assertNoteListLengthEquals,
  assertNoteListLengthGTE,
  assertNoteListTitleAtIndex,
  assertNoteOptionsOpened,
  assertNotesSelected,
  clickCreateNewNote,
  createXUniqueNotes,
  clickEmptyTrash,
  clickNoteOptionDeleteNotePermanently,
  clickNoteOptionFavorite,
  clickNoteOptionRestoreFromTrash,
  clickNoteOptionTrash,
  clickNoteOptions,
  clickSyncNotes,
  typeNoteEditor,
  typeNoteSearch,
  clearNoteSearch,
  openNoteContextMenu,
  holdKeyAndClickNoteAtIndex,
  trashAllNotes,
  dragAndDrop,
} from '../utils/testNotesHelperUtils'
import {
  addCategory,
  selectMoveToCategoryOption,
  navigateToCategory,
} from '../utils/testCategoryHelperUtils'
import {
  navigateToSettings,
  assertSettingsMenuIsOpen,
  assertSettingsMenuIsClosed,
  closeSettingsByClickingX,
  closeSettingsByClickingOutsideWindow,
  toggleDarkMode,
  assertDarkModeActive,
  assertDarkModeInactive,
} from '../utils/testSettingsUtils'
import { dynamicTimeCategoryName } from '../utils/testHelperEnums'

describe('Settings', () => {
  defaultInit()

  before(() => {})

  beforeEach(() => {
    navigateToSettings()
  })

  afterEach(() => {
    closeSettingsByClickingOutsideWindow()
  })

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

  it.skip('should toggle preferences: active line height', () => {})

  it('should toggle preferences: dark mode ON', () => {
    toggleDarkMode()
    assertDarkModeActive()
  })

  it('should toggle preferences: dark mode OFF', () => {
    toggleDarkMode()
    assertDarkModeInactive()
  })
  it.skip('should toggle preferences: markdown preview', () => {})
  it.skip('should change sort order: last updated', () => {})
  it.skip('should change sort order: favorites', () => {})
  it.skip('should change sort order: title (alphabetical)', () => {})
  it.skip('should change sort order: date created', () => {})
})
