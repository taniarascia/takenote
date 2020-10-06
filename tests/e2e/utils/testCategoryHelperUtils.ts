// testCategoryHelperUtils.ts
// Utility functions for use in category tests

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import { getTestID, wrapWithTestIDTag, testIDShouldExist, clickTestID } from './testHelperUtils'

const addCategory = (categoryName: string) => {
  getTestID(TestID.ADD_CATEGORY_BUTTON).should('contain', LabelText.ADD_CATEGORY).click()
  getTestID(TestID.NEW_CATEGORY_INPUT).type(categoryName)
  getTestID(TestID.NEW_CATEGORY_FORM).submit()

  cy.contains(categoryName)
}

const assertCategoryDoesNotExist = (categoryName: string) => {
  cy.findByText(categoryName).should('not.exist')
}

const assertCategoryExists = (categoryName: string) => {
  cy.contains(wrapWithTestIDTag(TestID.CATEGORY_LIST_DIV), categoryName).should('exist')
}

const assertCategoryOrder = (categoryName: string, position: number) => {
  cy.get('.category-list > div').eq(position).contains(categoryName)
}

const assertCategoryOptionsOpened = () => {
  testIDShouldExist(TestID.CATEGORY_OPTIONS_NAV)
}

const defocusCategory = (categoryName: string) => {
  getTestID(TestID.CATEGORY_EDIT).blur()
}

const navigateToCategory = (categoryName: string) => {
  cy.get('.category-list').contains(categoryName).click()
}

const moveCategory = (categoryName: string, targetName: string) => {
  cy.contains(categoryName)
    .parent()
    .find(wrapWithTestIDTag(TestID.MOVE_CATEGORY))
    // @ts-ignore
    .dragAndDrop(targetName)
    .wait(1 * 1000)
}

const renameCategory = (oldCategoryName: string, newCategoryName: string) => {
  getTestID(TestID.CATEGORY_EDIT).focus().clear().type(newCategoryName)
}

const openCategoryContextMenu = (categoryName: string) => {
  cy.contains(categoryName).parent().rightclick()
}

const selectMoveToCategoryOption = (categoryName: string) => {
  getTestID(TestID.MOVE_TO_CATEGORY).select(categoryName)
}

const startEditingCategory = (categoryName: string) => {
  cy.get('.category-list')
    .contains(wrapWithTestIDTag(TestID.CATEGORY_LIST_DIV), categoryName)
    .dblclick()
}

const clickCategoryOptionRename = () => {
  clickTestID(TestID.CATEGORY_OPTION_RENAME)
}

const clickCategoryOptionDelete = () => {
  clickTestID(TestID.CATEGORY_OPTION_DELETE_PERMANENTLY)
}

export {
  addCategory,
  assertCategoryExists,
  assertCategoryDoesNotExist,
  assertCategoryOrder,
  assertCategoryOptionsOpened,
  defocusCategory,
  navigateToCategory,
  moveCategory,
  renameCategory,
  selectMoveToCategoryOption,
  startEditingCategory,
  openCategoryContextMenu,
  clickCategoryOptionRename,
  clickCategoryOptionDelete,
}
