// testNotesHelperUtils.ts
// Utility functions for use in note tests

import { getTestID, TestIDEnum, TextEnum } from './testHelperEnums'
import { clickDynamicTestID, clickTestID, testIDShouldExist } from './testHelperUtils'

const assertActiveNoteIsNew = () => {
  getTestID(TestIDEnum.ACTIVE_NOTE).should('contain', TextEnum.NEW_NOTE)
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

const clickNoteOptions = (extraQualifier?: number | string) => {
  // if no option qualifier is supplied, click active note
  extraQualifier = extraQualifier ? extraQualifier : TestIDEnum.ACTIVE_NOTE

  // build a test id for the note based on index
  const noteOptionIndexTestID: string = extraQualifier
    ? TestIDEnum.NOTE_OPTIONS + '-' + extraQualifier
    : TestIDEnum.NOTE_OPTIONS

  clickDynamicTestID(noteOptionIndexTestID)
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
  assertActiveNoteIsNew,
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
