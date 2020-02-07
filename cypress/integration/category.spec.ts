// category.spec.ts
// Tests for manipulating note categories

import {
  addCategory,
  assertCategoryDoesNotExist,
  navigateToCategory,
  removeCategory,
  selectMoveToCategoryOption,
} from '../utils/testCategoryHelperUtils'
import { dynamicTimeCategoryName } from '../utils/testHelperEnums'
import { defaultInit, navigateToAllNotes } from '../utils/testHelperUtils'
import {
  assertNoteListLengthEquals,
  clickCreateNewNote,
  clickNoteOptions,
} from '../utils/testNotesHelperUtils'

describe('Category tests', () => {
  defaultInit()

  it('creates a new category with the current time', () => {
    addCategory(dynamicTimeCategoryName)
  })

  it('should delete a category just created with the current time', () => {
    addCategory(dynamicTimeCategoryName)

    removeCategory(dynamicTimeCategoryName)

    assertCategoryDoesNotExist(dynamicTimeCategoryName)
  })

  it('should add a note to new category', () => {
    // add a category
    addCategory(dynamicTimeCategoryName)

    // navigate back to All Notes create a new note, and move it to that category
    navigateToAllNotes()
    clickCreateNewNote()
    clickNoteOptions()
    selectMoveToCategoryOption(dynamicTimeCategoryName)

    // make sure it ended up in the category
    navigateToCategory(dynamicTimeCategoryName)
    assertNoteListLengthEquals(1)
  })
})
