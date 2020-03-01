// note.test.ts
// Tests for managing notes (create, trash, favorite, etc)

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import {
  defaultInit,
  getNoteCount,
  navigateToAllNotes,
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
  clickCreateNewNote,
  clickEmptyTrash,
  clickNoteOptionDeleteNotePermanently,
  clickNoteOptionFavorite,
  clickNoteOptionRestoreFromTrash,
  clickNoteOptionTrash,
  clickNoteOptions,
  clickSyncNotes,
  typeNoteEditor,
  typeNoteSearch,
  openNoteContextMenu,
} from '../utils/testNotesHelperUtils'

describe('Manage notes test', () => {
  defaultInit()

  before(() => {
    // Delete welcome note
    clickNoteOptions()
    clickNoteOptionTrash()
  })

  beforeEach(() => {
    navigateToAllNotes()
    clickCreateNewNote()
  })

  it('should try to create a few new notes', () => {
    clickCreateNewNote()
    assertNoteListLengthEquals(1)
    assertNewNoteCreated()

    clickCreateNewNote()
    assertNoteListLengthEquals(1)
    assertNewNoteCreated()

    clickCreateNewNote()
    assertNoteListLengthEquals(1)
    assertNewNoteCreated()
  })

  it('should update a note', () => {
    const sampleText = 'Sample note text.'

    // add some text to the editor
    typeNoteEditor(sampleText)
    assertNoteEditorLineCount(1)
    assertNoteEditorCharacterCount(sampleText.length)

    typeNoteEditor('{enter}123')
    assertNoteEditorLineCount(2)
    assertNoteEditorCharacterCount(sampleText.length + 3)

    typeNoteEditor('{backspace}{backspace}{backspace}{backspace}')
    assertNoteEditorLineCount(1)
    assertNoteEditorCharacterCount(sampleText.length)

    // clean up state
    clickNoteOptions()
    clickNoteOptionTrash()
    clickCreateNewNote()
    navigateToTrash()
    clickEmptyTrash()
  })

  it('should open options', () => {
    clickNoteOptions()
    assertNoteOptionsOpened()
  })

  it('should open context menu through right click', () => {
    openNoteContextMenu()
    assertNoteOptionsOpened()
  })

  it('should add a note to favorites', () => {
    // make sure favorites is empty
    navigateToFavorites()
    assertNoteListLengthEquals(0)

    // favorite the note in All Notes
    navigateToAllNotes()
    clickNoteOptions()
    testIDShouldContain(TestID.NOTE_OPTION_FAVORITE, LabelText.MARK_AS_FAVORITE)
    clickNoteOptionFavorite()

    // assert there is 1 favorited note
    navigateToFavorites()
    assertNoteListLengthEquals(1)

    // assert button now says 'Remove'
    clickNoteOptions()
    testIDShouldContain(TestID.NOTE_OPTION_FAVORITE, LabelText.REMOVE_FAVORITE)
    clickNoteOptionFavorite()

    // assert favorites is empty
    assertNoteListLengthEquals(0)
  })

  it('should add a note to favorites through context menu', () => {
    // make sure favorites is empty
    navigateToFavorites()
    assertNoteListLengthEquals(0)

    // favorite the note in All Notes
    navigateToAllNotes()
    openNoteContextMenu()
    testIDShouldContain(TestID.NOTE_OPTION_FAVORITE, LabelText.MARK_AS_FAVORITE)
    clickNoteOptionFavorite()

    // assert there is 1 favorited note
    navigateToFavorites()
    assertNoteListLengthEquals(1)

    // assert button now says 'Remove'
    openNoteContextMenu()
    testIDShouldContain(TestID.NOTE_OPTION_FAVORITE, LabelText.REMOVE_FAVORITE)
    clickNoteOptionFavorite()

    // assert favorites is empty
    assertNoteListLengthEquals(0)
  })

  it('should send a note to trash', () => {
    // make sure trash is currently empty
    navigateToTrash()
    assertNoteListLengthEquals(0)

    // navigate back to All Notes and move the note to trash
    navigateToAllNotes()
    clickNoteOptions()
    testIDShouldContain(TestID.NOTE_OPTION_TRASH, LabelText.MOVE_TO_TRASH)
    clickNoteOptionTrash()
    testIDShouldNotExist(TestID.NOTE_OPTION_TRASH)

    // make sure the new note is in the trash
    navigateToTrash()
    assertNoteListLengthEquals(1)
  })

  it('should empty notes in trash', () => {
    // move note to trash
    clickNoteOptions()
    clickNoteOptionTrash()

    // make sure there is a note in the trash and empty it
    navigateToTrash()
    assertNoteListLengthGTE(1)
    clickEmptyTrash()
    assertNoteListLengthEquals(0)

    // assert the empty trash button is gone
    testIDShouldNotExist(TestID.EMPTY_TRASH_BUTTON)
  })

  it('should send a note to trash through context menu', () => {
    // make sure trash is currently empty
    navigateToTrash()
    assertNoteListLengthEquals(0)

    // navigate back to All Notes and move the note to trash
    navigateToAllNotes()
    openNoteContextMenu()
    testIDShouldContain(TestID.NOTE_OPTION_TRASH, LabelText.MOVE_TO_TRASH)
    clickNoteOptionTrash()
    testIDShouldNotExist(TestID.NOTE_OPTION_TRASH)

    // make sure there is a note in the trash and empty it
    navigateToTrash()
    assertNoteListLengthEquals(1)
    clickEmptyTrash()
    assertNoteListLengthEquals(0)
  })

  it('should delete the active note in the trash permanently', () => {
    // move note to trash
    clickNoteOptions()
    clickNoteOptionTrash()

    // navigate to trash and delete the active note permanently
    navigateToTrash()
    clickNoteOptions()
    testIDShouldContain(TestID.NOTE_OPTION_DELETE_PERMANENTLY, LabelText.DELETE_PERMANENTLY)
    clickNoteOptionDeleteNotePermanently()
    assertNoteListLengthEquals(0)

    // assert the empty trash button is gone
    testIDShouldNotExist(TestID.EMPTY_TRASH_BUTTON)
  })

  it('should delete the active note in the trash permanently through context menu', () => {
    // move note to trash
    openNoteContextMenu()
    clickNoteOptionTrash()

    // navigate to trash and delete the active note permanently
    navigateToTrash()
    openNoteContextMenu()
    testIDShouldContain(TestID.NOTE_OPTION_DELETE_PERMANENTLY, LabelText.DELETE_PERMANENTLY)
    clickNoteOptionDeleteNotePermanently()
    assertNoteListLengthEquals(0)

    // assert the empty trash button is gone
    testIDShouldNotExist(TestID.EMPTY_TRASH_BUTTON)
  })

  it('should restore the active note in the trash', function() {
    getNoteCount('allNoteStartCount')

    // move note to trash
    clickNoteOptions()
    clickNoteOptionTrash()
    cy.then(() => assertNoteListLengthEquals(this.allNoteStartCount - 1))

    // navigate to trash and restore the active note
    navigateToTrash()
    getNoteCount('trashStartCount')
    clickNoteOptions()
    testIDShouldContain(TestID.NOTE_OPTION_RESTORE_FROM_TRASH, LabelText.RESTORE_FROM_TRASH)
    clickNoteOptionRestoreFromTrash()
    cy.then(() => assertNoteListLengthEquals(this.trashStartCount - 1))

    // assert the empty trash button is gone
    testIDShouldNotExist(TestID.EMPTY_TRASH_BUTTON)

    // make sure the note is back in All Notes
    navigateToAllNotes()
    cy.then(() => assertNoteListLengthEquals(this.allNoteStartCount))
  })

  it('should restore the active note in the trash through context menu', function() {
    getNoteCount('allNoteStartCount')

    // move note to trash
    openNoteContextMenu()
    clickNoteOptionTrash()
    cy.then(() => assertNoteListLengthEquals(this.allNoteStartCount - 1))

    // navigate to trash and restore the active note
    navigateToTrash()
    getNoteCount('trashStartCount')
    openNoteContextMenu()
    testIDShouldContain(TestID.NOTE_OPTION_RESTORE_FROM_TRASH, LabelText.RESTORE_FROM_TRASH)
    clickNoteOptionRestoreFromTrash()
    cy.then(() => assertNoteListLengthEquals(this.trashStartCount - 1))

    // assert the empty trash button is gone
    testIDShouldNotExist(TestID.EMPTY_TRASH_BUTTON)

    // make sure the note is back in All Notes
    navigateToAllNotes()
    cy.then(() => assertNoteListLengthEquals(this.allNoteStartCount))
  })

  it('should sync some notes', function() {
    const noteOneTitle = 'note 1'
    const noteTwoTitle = 'same note title'
    const noteThreeTitle = 'same note title'
    const noteFourTitle = 'note 4'

    Cypress.on('window:before:unload', (event: BeforeUnloadEvent) =>
      expect(event.returnValue).to.equal('')
    )

    // start with a refresh so we know our current saved state
    cy.reload()
    getNoteCount('allNoteStartCount')

    // create a new note and refresh without syncing
    clickCreateNewNote()
    typeNoteEditor(noteOneTitle)
    cy.reload()
    cy.then(() => assertNoteListLengthEquals(this.allNoteStartCount))

    // create a few new notes and sync them
    clickCreateNewNote()
    typeNoteEditor(noteOneTitle)
    clickCreateNewNote()
    typeNoteEditor(noteTwoTitle)
    clickCreateNewNote()
    typeNoteEditor(noteThreeTitle)
    clickCreateNewNote()
    typeNoteEditor(noteFourTitle)
    clickSyncNotes()

    // make sure notes persisted
    cy.reload()
    cy.then(() => assertNoteListLengthEquals(this.allNoteStartCount + 4))

    // make sure order is correct
    assertNoteListTitleAtIndex(3, noteOneTitle)
    assertNoteListTitleAtIndex(2, noteTwoTitle)
    assertNoteListTitleAtIndex(1, noteThreeTitle)
    assertNoteListTitleAtIndex(0, noteFourTitle)
  })

  it('should search some notes', function() {
    const noteOneTitle = 'note 1'
    const noteTwoTitle = 'same note title'
    const noteThreeTitle = 'same note title'
    const noteFourTitle = 'note 4'

    // start with a refresh so we know our current saved state
    cy.reload()
    getNoteCount('allNoteStartCount')

    // create a few new notes and sync them
    clickCreateNewNote()
    typeNoteEditor(noteOneTitle)
    clickCreateNewNote()
    typeNoteEditor(noteTwoTitle)
    clickCreateNewNote()
    typeNoteEditor(noteThreeTitle)
    clickCreateNewNote()
    typeNoteEditor(noteFourTitle)
    clickSyncNotes()

    // make sure notes persisted
    cy.reload()
    cy.then(() => assertNoteListLengthEquals(this.allNoteStartCount + 4))

    // make sure notes are filtered
    typeNoteSearch('note title')
    cy.then(() => assertNoteListLengthEquals(2))
  })
})
