// testCategoryHelperUtils.ts
// Utility functions for use in category tests

import { StringEnum } from '@resources/StringEnum'
import { TestIDEnum } from '@resources/TestIDEnum'

import { getTestID, wrapWithTestIDTag } from './testHelperUtils'

const addCategory = (categoryName: string) => {
  getTestID(TestIDEnum.ADD_CATEGORY_BUTTON)
    .should('contain', StringEnum.ADD_CATEGORY)
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

const assertCategoryOrder = (categoryName: string, position: number) => {
  cy.get('.category-list > div')
    .eq(position)
    .contains(categoryName)
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

const moveCategory = (categoryName: string, targetName: string) => {
  cy.contains(categoryName)
    .parent()
    .find(wrapWithTestIDTag(TestIDEnum.MOVE_CATEGORY))
    // @ts-ignore
    .dragAndDrop(targetName)
    .wait(1 * 1000)
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
  assertCategoryOrder,
  defocusCategory,
  navigateToCategory,
  removeCategory,
  moveCategory,
  renameCategory,
  selectMoveToCategoryOption,
  startEditingCategory,
}
