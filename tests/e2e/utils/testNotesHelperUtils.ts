// testNotesHelperUtils.ts
// Utility functions for use in note tests

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import {
  clickDynamicTestID,
  clickTestID,
  getDynamicTestID,
  getTestID,
  testIDShouldExist,
  navigateToTrash,
} from './testHelperUtils'

const assertNewNoteCreated = () => {
  getDynamicTestID(TestID.NOTE_LIST_ITEM + '0').should('contain', LabelText.NEW_NOTE)
}

const assertNoteEditorCharacterCount = (expectedCharacterCount: number) => {
  // all lines in the code editor should be descendants of the CodeMirror-code class
  cy.get('.CodeMirror-code').each((element) => {
    expect(element.text().length).to.equal(expectedCharacterCount)
  })
}

const assertNoteEditorLineCount = (expectedLineCount: number) => {
  cy.get('.CodeMirror-code').children().should('have.length', expectedLineCount)
}

const assertNoteListLengthEquals = (expectedLength: number) => {
  getTestID(TestID.NOTE_LIST).children().should('have.length', expectedLength)
}

const assertNoteListLengthGTE = (expectedLength: number) => {
  getTestID(TestID.NOTE_LIST).children().should('have.length.gte', expectedLength)
}

const assertNoteListTitleAtIndex = (noteIndex: number, expectedTitle: string) => {
  getDynamicTestID(TestID.NOTE_TITLE + noteIndex)
    .children()
    .contains(expectedTitle)
}

const assertNoteOptionsOpened = () => {
  testIDShouldExist(TestID.NOTE_OPTIONS_NAV)
}

const assertNotesSelected = (expectedSelectedNotesCount: number) => {
  cy.get('.selected').should('have.length', expectedSelectedNotesCount)
}

const trashAllNotes = () => {
  getTestID(TestID.NOTE_LIST)
    .children()
    .each((el, noteIndex) => {
      if (el.hasClass('selected')) return
      cy.get('body').type(`{meta}`, { release: false })
      getDynamicTestID(TestID.NOTE_LIST_ITEM + noteIndex).click()
    })
  openNoteContextMenu()
  clickNoteOptionTrash()

  navigateToTrash()
  clickEmptyTrash()
}

const createXUniqueNotes = (numberOfUniqueNotes: number) => {
  for (let i = 0; i < numberOfUniqueNotes; i++) {
    clickCreateNewNote()
    typeNoteEditor(`note ${i}`)
  }
}

const clickCreateNewNote = () => {
  clickTestID(TestID.SIDEBAR_ACTION_CREATE_NEW_NOTE)
}

const clickEmptyTrash = () => {
  clickTestID(TestID.EMPTY_TRASH_BUTTON)
}

const clickNoteAtIndex = (noteIndex: number) => {
  getDynamicTestID(TestID.NOTE_LIST_ITEM + noteIndex).click()
}

const holdKeyAndClickNoteAtIndex = (
  noteIndex: number,
  key: 'alt' | 'ctrl' | 'meta' | 'shift' | null = null
) => {
  key && cy.get('body').type(`{${key}}`, { release: false })
  getDynamicTestID(TestID.NOTE_LIST_ITEM + noteIndex).click()
}

// click a note with the specified index
const clickNoteOptions = (noteIndex: number = 0) => {
  clickDynamicTestID(TestID.NOTE_OPTIONS_DIV + noteIndex)
}

const openNoteContextMenu = (noteIndex: number = 0) => {
  cy.get('.note-list > div').eq(noteIndex).rightclick()
}

const clickNoteOptionDeleteNotePermanently = () => {
  clickTestID(TestID.NOTE_OPTION_DELETE_PERMANENTLY)
}

const clickNoteOptionFavorite = () => {
  clickTestID(TestID.NOTE_OPTION_FAVORITE)
}

const clickNoteOptionRestoreFromTrash = () => {
  clickTestID(TestID.NOTE_OPTION_RESTORE_FROM_TRASH)
}

const clickNoteOptionTrash = () => {
  clickTestID(TestID.NOTE_OPTION_TRASH)
}

const clickSyncNotes = () => {
  clickTestID(TestID.TOPBAR_ACTION_SYNC_NOTES)
}

const typeNoteEditor = (contentToType: string) => {
  // force = true, cypress doesn't support typing in hidden elements
  cy.get('.CodeMirror textarea').type(contentToType, { force: true })
}

const typeNoteSearch = (contentToType: string) => {
  getTestID(TestID.NOTE_SEARCH).type(contentToType, { force: true })
}

const clearNoteSearch = () => {
  getTestID(TestID.NOTE_SEARCH).clear()
}

const dragAndDrop = (subject: string, element: string) => {
  const dt = new DataTransfer()

  cy.get(subject).trigger('dragstart', { dataTransfer: dt })
  cy.get(element).trigger('drop', { dataTransfer: dt })
}

export {
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
  clickNoteAtIndex,
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
}
