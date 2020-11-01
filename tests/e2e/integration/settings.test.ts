// settings.test.ts
// Tests for functionality available in the settings menu

import { TestID } from '@resources/TestID'
import { getNoteTitle } from '@/utils/helpers'
import { NoteItem, CategoryItem } from '@/types'

import {
  addCategory,
  assertCategoryExists,
  clickCategoryOptionDelete,
  openCategoryContextMenu,
} from '../utils/testCategoryHelperUtils'
import { defaultInit, assertNoteContainsText } from '../utils/testHelperUtils'
import {
  clickCreateNewNote,
  createXUniqueNotes,
  clickNoteOptionFavorite,
  typeNoteEditor,
  openNoteContextMenu,
  holdKeyAndClickNoteAtIndex,
  trashAllNotes,
  assertNoteListLengthEquals,
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
  clickSettingsTab,
  getDownloadedBackup,
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

  describe('Preferences', () => {
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

  describe('Data Management', () => {
    before(() => {
      trashAllNotes()
    })

    beforeEach(() => {
      clickSettingsTab('data management')
    })

    it('should download backup', () => {
      cy.findByRole('button', { name: /export backup/i }).click()

      getDownloadedBackup().then((result) => {
        const data = JSON.parse(result as string)

        expect(data.notes).to.have.length(1)
        expect(data.notes[0].text).to.include('Scratchpad')
      })
    })

    it('should import backup', () => {
      const categories = ['test_category_1', 'test_category_2']

      closeSettingsByClickingOutsideWindow()
      createXUniqueNotes(2)
      categories.forEach((category) => {
        addCategory(category)
      })
      navigateToSettings()
      clickSettingsTab('data management')
      cy.findByRole('button', { name: /export backup/i }).click()

      getDownloadedBackup().then((result) => {
        closeSettingsByClickingOutsideWindow()
        trashAllNotes()
        categories.forEach((category) => {
          openCategoryContextMenu(category)
          clickCategoryOptionDelete()
        })
        navigateToSettings()
        clickSettingsTab('data management')

        cy.findByTestId(TestID.UPLOAD_SETTINGS_BACKUP).attachFile({
          fileContent: result as Blob,
          filePath: '',
          fileName: 'backup',
          mimeType: 'application/json',
          encoding: 'utf-8',
        })

        const backupData = JSON.parse(result as string) as {
          categories: CategoryItem[]
          notes: NoteItem[]
        }

        clickSettingsTab('preferences')
        selectOptionInSortByDropdown('Title')
        clickSettingsTab('data management')
        closeSettingsByClickingX()

        backupData.categories.forEach(({ name }) => {
          assertCategoryExists(name)
        })

        assertNoteListLengthEquals(2)
        backupData.notes.slice(1).forEach(({ text }, index) => {
          assertNoteContainsText(TestID.NOTE_LIST_ITEM + index, getNoteTitle(text))
        })

        navigateToSettings()
      })
    })
  })
})
