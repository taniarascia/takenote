// testNotesHelperUtils.ts
// Utility functions for use in note tests

import { TextEnum, TestIDEnum, wrapWithTestIDTag } from './testHelperEnums'
import { clickDynamicTestID, clickTestID, testIDShouldExist } from './testHelperUtils'

const assertActiveNoteIsNew = () => {
  cy.get(wrapWithTestIDTag(TestIDEnum.ACTIVE_NOTE)).should('contain', TextEnum.NEW_NOTE)
}

const assertNoteListLengthEquals = (expectedLength: number) => {
  cy.get(wrapWithTestIDTag(TestIDEnum.NOTE_LIST))
    .children()
    .should('have.length', expectedLength)
}

const assertNoteListLengthGTE = (expectedLength: number) => {
  cy.get(wrapWithTestIDTag(TestIDEnum.NOTE_LIST))
    .children()
    .should('have.length.gte', expectedLength)
}

const assertNoteOptionsOpened = () => {
  testIDShouldExist(TestIDEnum.NOTE_OPTIONS_NAV)
}

const clickCreateNewNote = () => {
  clickTestID(TestIDEnum.CREATE_NEW_NOTE_SIDEBAR_ACTION)
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

const clickFavoriteNoteOption = () => {
  clickTestID(TestIDEnum.NOTE_OPTION_FAVORITE)
}

const clickTrashNoteOption = () => {
  clickTestID(TestIDEnum.NOTE_OPTION_TRASH)
}

export {
  assertActiveNoteIsNew,
  assertNoteListLengthEquals,
  assertNoteListLengthGTE,
  assertNoteOptionsOpened,
  clickCreateNewNote,
  clickFavoriteNoteOption,
  clickNoteOptions,
  clickTrashNoteOption,
}
