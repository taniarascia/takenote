// testCategoryHelperUtils.ts
// Utility functions for use in category tests

import { ResourceStringEnum } from '../../src/resources/resourceStrings'

import { TestIDEnum } from './testHelperEnums'
import { getTestID, wrapWithTestIDTag } from './testHelperUtils'

const addCategory = (categoryName: string) => {
  getTestID(TestIDEnum.ADD_CATEGORY_BUTTON)
    .should('contain', ResourceStringEnum.ADD_CATEGORY)
    .click()

  getTestID(TestIDEnum.NEW_CATEGORY_INPUT).type(categoryName)

  getTestID(TestIDEnum.NEW_CATEGORY_FORM).submit()

  cy.contains(categoryName)
}

const assertCategoryDoesNotExist = (categoryName: string) => {
  cy.findByText(categoryName).should('not.exist')
}

const assertCategoryExists = (categoryName: string) => {
  cy.contains(wrapWithTestIDTag(TestIDEnum.CATEGORY_LIST_DIV), categoryName).should('exist')
}

const defocusCategory = (categoryName: string) => {
  getTestID(TestIDEnum.CATEGORY_EDIT).blur()
}

const navigateToCategory = (categoryName: string) => {
  cy.get('.category-list')
    .contains(categoryName)
    .click()
}

const removeCategory = (categoryName: string) => {
  cy.contains(categoryName)
    .parent()
    .find(wrapWithTestIDTag(TestIDEnum.REMOVE_CATEGORY))
    .click()
}

const renameCategory = (oldCategoryName: string, newCategoryName: string) => {
  getTestID(TestIDEnum.CATEGORY_EDIT)
    .focus()
    .clear()
    .type(newCategoryName)
}

const selectMoveToCategoryOption = (categoryName: string) => {
  getTestID(TestIDEnum.MOVE_TO_CATEGORY).select(categoryName)
}

const startEditingCategory = (categoryName: string) => {
  cy.get('.category-list')
    .contains(wrapWithTestIDTag(TestIDEnum.CATEGORY_LIST_DIV), categoryName)
    .dblclick()
}

export {
  addCategory,
  assertCategoryExists,
  assertCategoryDoesNotExist,
  defocusCategory,
  navigateToCategory,
  removeCategory,
  renameCategory,
  selectMoveToCategoryOption,
  startEditingCategory,
}
