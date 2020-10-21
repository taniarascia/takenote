// note.test.ts
// Tests for managing notes (create, trash, favorite, etc)

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
import { dynamicTimeCategoryName } from '../utils/testHelperEnums'

describe('Manage notes test', () => {
  defaultInit()

  before(() => {
    // Delete welcome note
    clickNoteOptions()
    clickNoteOptionTrash()
  })

  beforeEach(() => {
    navigateToNotes()
    createXUniqueNotes(1)
    trashAllNotes()
    clearNoteSearch()
    createXUniqueNotes(1)
  })

  it('should try to create a few new notes', () => {
    clickCreateNewNote()
    assertNoteListLengthEquals(2)
    assertNewNoteCreated()

    clickCreateNewNote()
    assertNoteListLengthEquals(2)
    assertNewNoteCreated()

    clickCreateNewNote()
    assertNoteListLengthEquals(2)
    assertNewNoteCreated()
  })

  it('should update a note', () => {
    const sampleText = 'Sample note text.'

    clickCreateNewNote()
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

    // // clean up state
    // clickNoteOptions()
    // clickNoteOptionTrash()
    // clickCreateNewNote()
    // navigateToTrash()
    // clickEmptyTrash()
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
    navigateToNotes()
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
    navigateToNotes()
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
    navigateToNotes()
    clickNoteOptions()
    testIDShouldContain(TestID.NOTE_OPTION_TRASH, LabelText.MOVE_TO_TRASH)
    clickNoteOptionTrash()
    testIDShouldNotExist(TestID.NOTE_OPTION_TRASH)

    // make sure the new note is in the trash
    navigateToTrash()
    assertNoteListLengthEquals(1)
    clickEmptyTrash()
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
    navigateToNotes()
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

  it('should restore the active note in the trash', function () {
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
    navigateToNotes()
    cy.then(() => assertNoteListLengthEquals(this.allNoteStartCount))
  })

  it('should restore the active note in the trash through context menu', function () {
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
    navigateToNotes()
    cy.then(() => assertNoteListLengthEquals(this.allNoteStartCount))
  })

  // TODO: add manual sync back in
  it.skip('should sync some notes', function () {
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

    // create a few new notes
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

  it('should search some notes', function () {
    const noteOneTitle = 'note 1'
    const noteTwoTitle = 'same note title'
    const noteThreeTitle = 'same note title'
    const noteFourTitle = 'note 4'

    // start with a refresh so we know our current saved state
    cy.reload()
    getNoteCount('allNoteStartCount')

    // create a few new notes
    clickCreateNewNote()
    typeNoteEditor(noteOneTitle)
    clickCreateNewNote()
    typeNoteEditor(noteTwoTitle)
    clickCreateNewNote()
    typeNoteEditor(noteThreeTitle)
    clickCreateNewNote()
    typeNoteEditor(noteFourTitle)

    // make sure notes are filtered
    typeNoteSearch('note title')
    cy.then(() => assertNoteListLengthEquals(2))
  })

  it('should select multiple notes via ctrl/cmd + click', () => {
    createXUniqueNotes(2)

    // Select notes
    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')

    assertNotesSelected(2)
  })

  it('should send multiple selected notes to trash via context menu', () => {
    createXUniqueNotes(1)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')
    openNoteContextMenu()
    clickNoteOptionTrash()
    assertNoteListLengthEquals(0)

    navigateToTrash()
    assertNoteListLengthEquals(2)
  })

  it('should send multiple selected notes to favorites via context menu', () => {
    createXUniqueNotes(1)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')

    openNoteContextMenu()
    clickNoteOptionFavorite()
    assertNoteListLengthEquals(2)

    navigateToFavorites()
    assertNoteListLengthEquals(2)
  })

  it('should remove multiple selected notes from favorites via context menu', () => {
    createXUniqueNotes(1)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')

    openNoteContextMenu()
    clickNoteOptionFavorite()
    assertNoteListLengthEquals(2)

    navigateToFavorites()
    assertNoteListLengthEquals(2)

    holdKeyAndClickNoteAtIndex(1, 'meta')
    holdKeyAndClickNoteAtIndex(0, 'meta')

    openNoteContextMenu()
    clickNoteOptionFavorite()
    assertNoteListLengthEquals(0)

    navigateToNotes()
    assertNoteListLengthEquals(2)
  })

  it('should send multiple selected notes to favorites when clicking on an already favorited selected note via context menu', () => {})

  it('should remove multiple selected notes from favorites when clicking on a not yet favorited selected note via context menu', () => {})

  it('should send multiple selected notes to a category via context menu', () => {
    // add a category
    addCategory(dynamicTimeCategoryName)

    // navigate back to All Notes create a new note, and move it to that category
    navigateToNotes()
    createXUniqueNotes(1)
    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')
    openNoteContextMenu()
    selectMoveToCategoryOption(dynamicTimeCategoryName)
    assertNoteListLengthEquals(2)

    navigateToCategory(dynamicTimeCategoryName)
    assertNoteListLengthEquals(2)
  })

  it('should restore multiple selected notes from trash', () => {
    createXUniqueNotes(1)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')
    openNoteContextMenu()
    clickNoteOptionTrash()

    navigateToTrash()
    holdKeyAndClickNoteAtIndex(0, 'meta')
    openNoteContextMenu()
    clickNoteOptionRestoreFromTrash()
    assertNoteListLengthEquals(0)

    navigateToNotes()
    assertNoteListLengthEquals(2)
  })

  it('should permanently delete multiple selected notes from trash', () => {
    createXUniqueNotes(1)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')
    openNoteContextMenu()
    clickNoteOptionTrash()

    navigateToTrash()
    holdKeyAndClickNoteAtIndex(0, 'meta')
    openNoteContextMenu()
    clickNoteOptionDeleteNotePermanently()
    assertNoteListLengthEquals(0)

    navigateToNotes()
    assertNoteListLengthEquals(0)
  })

  it('should send a not selected note to favorites with drag & drop', () => {
    createXUniqueNotes(2)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')

    dragAndDrop('[data-testid=note-list-item-2]', '[data-testid=favorites]')

    cy.get('[data-testid=favorites]').click()
    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 1)
    })
  })

  it('should send a not selected note to trash with drag & drop', () => {
    createXUniqueNotes(2)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')

    dragAndDrop('[data-testid=note-list-item-2]', '[data-testid=trash]')

    cy.get('[data-testid=trash]').click()
    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 1)
    })
  })

  it('should send a not selected note to a category with drag & drop', () => {
    createXUniqueNotes(2)
    addCategory(dynamicTimeCategoryName)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')

    dragAndDrop('[data-testid=note-list-item-2]', '[data-testid=category-list-div]')

    cy.get('[data-testid=category-list-div]').click()
    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 1)
    })
  })

  it('should send multiple notes to favorites with drag & drop', () => {
    createXUniqueNotes(2)
    addCategory(dynamicTimeCategoryName)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')

    dragAndDrop('[data-testid=note-list-item-0]', '[data-testid=favorites]')

    cy.get('[data-testid=favorites]').click()
    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 2)
    })
  })

  it('should send multiple notes to favorites with drag & drop', () => {
    createXUniqueNotes(2)
    addCategory(dynamicTimeCategoryName)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')

    dragAndDrop('[data-testid=note-list-item-0]', '[data-testid=trash]')

    cy.get('[data-testid=trash]').click()
    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 2)
    })
  })

  it('should send multiple notes to a category with drag & drop', () => {
    createXUniqueNotes(2)
    addCategory(dynamicTimeCategoryName)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')

    dragAndDrop('[data-testid=note-list-item-0]', '[data-testid=category-list-div]')

    cy.get('[data-testid=category-list-div]').click()
    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 2)
    })
  })

  it('should send a not selected trashed note to notes with drag & drop', () => {
    createXUniqueNotes(2)

    holdKeyAndClickNoteAtIndex(0, 'meta')

    dragAndDrop('[data-testid=note-list-item-0]', '[data-testid=trash]')

    cy.get('[data-testid=trash]').click()
    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 1)
    })

    holdKeyAndClickNoteAtIndex(0, 'meta')

    dragAndDrop('[data-testid=note-list-item-0]', '[data-testid=notes]')

    cy.get('[data-testid=notes]').click()
    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 3)
    })
  })

  it('should send multiple not selected trashed notes to notes with drag & drop', () => {
    createXUniqueNotes(2)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')

    dragAndDrop('[data-testid=note-list-item-0]', '[data-testid=trash]')

    cy.get('[data-testid=trash]').click()
    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 2)
    })

    holdKeyAndClickNoteAtIndex(0, 'meta')

    dragAndDrop('[data-testid=note-list-item-0]', '[data-testid=notes]')

    cy.get('[data-testid=notes]').click()
    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 3)
    })
  })

  it('should not move a note that is already in Notes when dragged & dropped on Notes', () => {
    createXUniqueNotes(2)

    holdKeyAndClickNoteAtIndex(0, 'meta')

    dragAndDrop('[data-testid=note-list-item-0]', '[data-testid=notes]')

    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 3)
    })
  })

  it('should not move multiple notes that are already in Notes when dragged & dropped on Notes', () => {
    createXUniqueNotes(2)

    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(2, 'meta')

    dragAndDrop('[data-testid=note-list-item-0]', '[data-testid=notes]')

    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 3)
    })
  })

  it('should not create a new draft note if one already exists', () => {
    clickCreateNewNote()

    cy.get('[data-testid=trash]').click()

    clickCreateNewNote()

    cy.get('[data-testid=note-list]').within(() => {
      cy.get('.note-list-each').should('have.length', 2)
    })
  })
})
