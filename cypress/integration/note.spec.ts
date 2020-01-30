// note.spec.ts
// Tests for managing notes (create, trash, favorite, etc)

import { TestIDEnum, TextEnum } from './utils/testHelperEnums'
import {
  clickTestID,
  defaultInit,
  testIDShouldContain,
  testIDShouldNotExist,
} from './utils/testHelperUtils'
import {
  assertActiveNoteIsNew,
  assertNoteListLengthEquals,
  assertNoteListLengthGTE,
  assertNoteOptionsOpened,
  clickCreateNewNote,
  clickNoteOptionDeleteNotePermanently,
  clickNoteOptionFavorite,
  clickNoteOptionRestoreFromTrash,
  clickNoteOptionTrash,
  clickNoteOptions,
} from './utils/testNotesHelperUtils'

describe('Manage notes test', () => {
  defaultInit()

  beforeEach(() => {
    clickCreateNewNote()
    assertNoteListLengthEquals(1)
  })

  it('should try to create a few new notes', () => {
    clickCreateNewNote()
    assertNoteListLengthEquals(1)
    assertActiveNoteIsNew()

    clickCreateNewNote()
    assertNoteListLengthEquals(1)
    assertActiveNoteIsNew()

    clickCreateNewNote()
    assertNoteListLengthEquals(1)
    assertActiveNoteIsNew()
  })

  it('should open options', () => {
    clickNoteOptions()
    assertNoteOptionsOpened()
  })

  it('should add a note to favorites', () => {
    // make sure favorites is empty
    clickTestID(TestIDEnum.FAVORITES)
    assertNoteListLengthEquals(0)

    // favorite the note in All Notes
    clickTestID(TestIDEnum.ALL_NOTES)
    clickNoteOptions()
    testIDShouldContain(TestIDEnum.NOTE_OPTION_FAVORITE, TextEnum.MARK_AS_FAVORITE)
    clickNoteOptionFavorite()

    // assert there is 1 favorited note
    clickTestID(TestIDEnum.FAVORITES)
    assertNoteListLengthEquals(1)

    // assert button now says 'Remove'
    clickNoteOptions()
    testIDShouldContain(TestIDEnum.NOTE_OPTION_FAVORITE, TextEnum.REMOVE_FAVORITE)
    clickNoteOptionFavorite()

    // assert favorites is empty
    clickTestID(TestIDEnum.FAVORITES)
    assertNoteListLengthEquals(0)
  })

  it('should send a note to trash', () => {
    // make sure trash is currently empty
    clickTestID(TestIDEnum.NOTE_TRASH)
    assertNoteListLengthEquals(0)

    // navigate back to All Notes and move the note to trash
    clickTestID(TestIDEnum.ALL_NOTES)
    clickNoteOptions()
    testIDShouldContain(TestIDEnum.NOTE_OPTION_TRASH, TextEnum.MOVE_TO_TRASH)
    clickNoteOptionTrash()
    testIDShouldNotExist(TestIDEnum.NOTE_OPTION_TRASH)

    // make sure the new note is in the trash
    clickTestID(TestIDEnum.NOTE_TRASH)
    assertNoteListLengthEquals(1)
    assertActiveNoteIsNew()
  })

  it('should empty notes in trash', () => {
    // move note to trash
    clickNoteOptions()
    clickNoteOptionTrash()

    // make sure there is a note in the trash and empty it
    clickTestID(TestIDEnum.NOTE_TRASH)
    assertNoteListLengthGTE(1)
    clickTestID(TestIDEnum.EMPTY_TRASH_BUTTON)
    assertNoteListLengthEquals(0)

    // assert the empty trash button is gone
    testIDShouldNotExist(TestIDEnum.EMPTY_TRASH_BUTTON)
  })

  it('should delete the active note in the trash permanently', () => {
    // move note to trash
    clickNoteOptions()
    clickNoteOptionTrash()

    // navigate to trash and delete the active note permanently
    clickTestID(TestIDEnum.NOTE_TRASH)
    clickNoteOptions()
    testIDShouldContain(TestIDEnum.NOTE_OPTION_DELETE_PERMANENTLY, TextEnum.DELETE_PERMANENTLY)
    clickNoteOptionDeleteNotePermanently()
    assertNoteListLengthEquals(0)

    // assert the empty trash button is gone
    testIDShouldNotExist(TestIDEnum.EMPTY_TRASH_BUTTON)
  })

  it('should restore the active note in the trash', () => {
    // move note to trash and make sure All Notes is empty
    clickNoteOptions()
    clickNoteOptionTrash()
    assertNoteListLengthEquals(0)

    // navigate to trash and restore the active note
    clickTestID(TestIDEnum.NOTE_TRASH)
    clickNoteOptions()
    testIDShouldContain(TestIDEnum.NOTE_OPTION_RESTORE_FROM_TRASH, TextEnum.RESTORE_FROM_TRASH)
    clickNoteOptionRestoreFromTrash()
    assertNoteListLengthEquals(0)

    // assert the empty trash button is gone
    testIDShouldNotExist(TestIDEnum.EMPTY_TRASH_BUTTON)

    // make sure the note is back in All Notes
    clickTestID(TestIDEnum.ALL_NOTES)
    assertNoteListLengthEquals(1)
  })
})
