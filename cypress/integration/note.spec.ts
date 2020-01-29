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
  clickFavoriteNoteOption,
  clickNoteOptions,
  clickTrashNoteOption,
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
    clickFavoriteNoteOption()

    // assert there is 1 favorited note
    clickTestID(TestIDEnum.FAVORITES)
    assertNoteListLengthEquals(1)

    // assert button now says 'Remove'
    clickNoteOptions()
    testIDShouldContain(TestIDEnum.NOTE_OPTION_FAVORITE, TextEnum.REMOVE_FAVORITE)
    clickFavoriteNoteOption()

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
    clickTrashNoteOption()
    testIDShouldNotExist(TestIDEnum.NOTE_OPTION_TRASH)

    // make sure the new note is in the trash
    clickTestID(TestIDEnum.NOTE_TRASH)
    assertNoteListLengthEquals(1)
    assertActiveNoteIsNew()
  })

  it('should empty notes in trash', () => {
    // move note to trash
    clickNoteOptions()
    clickTrashNoteOption()

    // make sure there is a note in the trash and empty it
    clickTestID(TestIDEnum.NOTE_TRASH)
    assertNoteListLengthGTE(1)
    clickTestID(TestIDEnum.EMPTY_TRASH_BUTTON)
    assertNoteListLengthEquals(0)

    // assert the empty trash button is gone
    testIDShouldNotExist(TestIDEnum.EMPTY_TRASH_BUTTON)
  })
})
