// testNotesHelperUtils.ts
// Utility functions for use in note tests

import { getDynamicTestID, getTestID, TestIDEnum, TextEnum } from './testHelperEnums'
import { clickDynamicTestID, clickTestID, testIDShouldExist } from './testHelperUtils'

const assertNewNoteCreated = () => {
  getDynamicTestID(TestIDEnum.NOTE_LIST_ITEM + '0').should('contain', TextEnum.NEW_NOTE)
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

const assertNoteOptionsOpened = () => {
  testIDShouldExist(TestIDEnum.NOTE_OPTIONS_NAV)
}

const clickCreateNewNote = () => {
  clickTestID(TestIDEnum.CREATE_NEW_NOTE_SIDEBAR_ACTION)
}

const clickEmptyTrash = () => {
  clickTestID(TestIDEnum.EMPTY_TRASH_BUTTON)
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

const typeNoteEditor = (contentToType: string) => {
  // force = true, cypress doesn't support typing in hidden elements
  cy.get('.CodeMirror textarea').type(contentToType, { force: true })
}

export {
  assertNewNoteCreated,
  assertNoteEditorCharacterCount,
  assertNoteEditorLineCount,
  assertNoteListLengthEquals,
  assertNoteListLengthGTE,
  assertNoteOptionsOpened,
  clickCreateNewNote,
  clickEmptyTrash,
  clickNoteOptionDeleteNotePermanently,
  clickNoteOptionFavorite,
  clickNoteOptionRestoreFromTrash,
  clickNoteOptionTrash,
  clickNoteOptions,
  typeNoteEditor,
}
