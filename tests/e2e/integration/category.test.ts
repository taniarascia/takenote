// category.spec.ts
// Tests for manipulating note categories

import {
  addCategory,
  assertCategoryDoesNotExist,
  assertCategoryExists,
  assertCategoryOptionsOpened,
  assertCategoryOrder,
  navigateToCategory,
  selectMoveToCategoryOption,
  startEditingCategory,
  renameCategory,
  defocusCategory,
  moveCategory,
  openCategoryContextMenu,
  clickCategoryOptionRename,
  clickCategoryOptionDelete,
} from '../utils/testCategoryHelperUtils'
import { dynamicTimeCategoryName } from '../utils/testHelperEnums'
import {
  defaultInit,
  navigateToNotes,
  assertCurrentFolderOrCategory,
} from '../utils/testHelperUtils'
import {
  assertNoteListLengthEquals,
  clickCreateNewNote,
  clickNoteOptions,
} from '../utils/testNotesHelperUtils'

describe('Categories', () => {
  defaultInit()

  it('creates a new category with the current time', () => {
    // Skipping for now due to
    addCategory(dynamicTimeCategoryName)
  })

  it('should add a note to new category', () => {
    // add a category
    addCategory(dynamicTimeCategoryName)

    // navigate back to All Notes create a new note, and move it to that category
    navigateToNotes()
    clickCreateNewNote()
    clickNoteOptions()
    selectMoveToCategoryOption(dynamicTimeCategoryName)

    // make sure it ended up in the category
    navigateToCategory(dynamicTimeCategoryName)
    assertNoteListLengthEquals(1)
  })

  it('should rename existing category after defocusing edit state', () => {
    const originalCategoryName = 'Category'
    const newCategoryName = 'Renamed Category'

    addCategory(originalCategoryName)
    startEditingCategory(originalCategoryName)
    renameCategory(originalCategoryName, newCategoryName)
    defocusCategory(newCategoryName)

    assertCategoryExists(newCategoryName)
  })

  it('should change category order', () => {
    const firstCategory = 'Source Category'
    const secondCategory = 'Destination Category'

    addCategory(firstCategory)
    addCategory(secondCategory)
    moveCategory(firstCategory, secondCategory)
    assertCategoryOrder(firstCategory, 3)
    moveCategory(secondCategory, firstCategory)
    assertCategoryOrder(secondCategory, 3)
  })

  it('should open context menu with right click', () => {
    const categoryName = 'Context Menu'

    addCategory(categoryName)
    openCategoryContextMenu(categoryName)
    assertCategoryOptionsOpened()
  })

  it('should allow category rename through context menu', () => {
    const originalCategoryName = 'Category CM'
    const newCategoryName = 'Renamed Category CM'

    addCategory(originalCategoryName)
    openCategoryContextMenu(originalCategoryName)
    clickCategoryOptionRename()
    renameCategory(originalCategoryName, newCategoryName)
    defocusCategory(newCategoryName)

    assertCategoryExists(newCategoryName)
  })

  it('should allow category permanent delete through context menu', () => {
    addCategory(dynamicTimeCategoryName)

    openCategoryContextMenu(dynamicTimeCategoryName)
    clickCategoryOptionDelete()

    assertCategoryDoesNotExist(dynamicTimeCategoryName)
  })

  it('should redirect to notes after deleting the category you are in', () => {
    addCategory(dynamicTimeCategoryName)

    navigateToCategory(dynamicTimeCategoryName)
    openCategoryContextMenu(dynamicTimeCategoryName)
    clickCategoryOptionDelete()

    assertCurrentFolderOrCategory('Notes')
  })
})
