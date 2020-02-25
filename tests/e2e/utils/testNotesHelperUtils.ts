// testNotesHelperUtils.ts
// Utility functions for use in note tests

import { StringEnum } from '@resources/StringEnum'
import { TestIDEnum } from '@resources/TestIDEnum'

import {
  clickDynamicTestID,
  clickTestID,
  getDynamicTestID,
  getTestID,
  testIDShouldExist,
} from './testHelperUtils'

const assertNewNoteCreated = () => {
  getDynamicTestID(TestIDEnum.NOTE_LIST_ITEM + '0').should('contain', StringEnum.NEW_NOTE)
}

const assertNoteEditorCharacterCount = (expectedCharacterCount: number) => {
  // all lines in the code editor should be descendants of the CodeMirror-code class
  cy.get('.CodeMirror-code').each(element => {
    expect(element.text().length).to.equal(expectedCharacterCount)
  })
}

const assertNoteEditorLineCount = (expectedLineCount: number) => {
  cy.get('.CodeMirror-code')
    .children()
    .should('have.length', expectedLineCount)
}

const assertNoteListLengthEquals = (expectedLength: number) => {
  getTestID(TestIDEnum.NOTE_LIST)
    .children()
    .should('have.length', expectedLength)
}

const assertNoteListLengthGTE = (expectedLength: number) => {
  getTestID(TestIDEnum.NOTE_LIST)
    .children()
    .should('have.length.gte', expectedLength)
}

const assertNoteListTitleAtIndex = (noteIndex: number, expectedTitle: string) => {
  getDynamicTestID(TestIDEnum.NOTE_TITLE + noteIndex)
    .children()
    .contains(expectedTitle)
}

const assertNoteOptionsOpened = () => {
  testIDShouldExist(TestIDEnum.NOTE_OPTIONS_NAV)
}

const clickCreateNewNote = () => {
  clickTestID(TestIDEnum.SIDEBAR_ACTION_CREATE_NEW_NOTE)
}

const clickEmptyTrash = () => {
  clickTestID(TestIDEnum.EMPTY_TRASH_BUTTON)
}

const clickNoteAtIndex = (noteIndex: number) => {
  getDynamicTestID(TestIDEnum.NOTE_LIST_ITEM + noteIndex).click()
}

// click a note with the specified index
const clickNoteOptions = (noteIndex: number = 0) => {
  clickDynamicTestID(TestIDEnum.NOTE_OPTIONS_DIV + noteIndex)
}

const clickNoteOptionDeleteNotePermanently = () => {
  clickTestID(TestIDEnum.NOTE_OPTION_DELETE_PERMANENTLY)
}

const clickNoteOptionFavorite = () => {
  clickTestID(TestIDEnum.NOTE_OPTION_FAVORITE)
}

const clickNoteOptionRestoreFromTrash = () => {
  clickTestID(TestIDEnum.NOTE_OPTION_RESTORE_FROM_TRASH)
}

const clickNoteOptionTrash = () => {
  clickTestID(TestIDEnum.NOTE_OPTION_TRASH)
}

const clickSyncNotes = () => {
  clickTestID(TestIDEnum.SIDEBAR_ACTION_SYNC_NOTES)
}

const typeNoteEditor = (contentToType: string) => {
  // force = true, cypress doesn't support typing in hidden elements
  cy.get('.CodeMirror textarea').type(contentToType, { force: true })
}

const typeNoteSearch = (contentToType: string) => {
  getTestID(TestIDEnum.NOTE_SEARCH).type(contentToType, { force: true })
}

export {
  assertNewNoteCreated,
  assertNoteEditorCharacterCount,
  assertNoteEditorLineCount,
  assertNoteListLengthEquals,
  assertNoteListLengthGTE,
  assertNoteListTitleAtIndex,
  assertNoteOptionsOpened,
  clickCreateNewNote,
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
}
