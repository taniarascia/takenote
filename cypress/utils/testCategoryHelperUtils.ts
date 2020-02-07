// testCategoryHelperUtils.ts
// Utility functions for use in category tests

import { TestIDEnum, TextEnum } from './testHelperEnums'
import { getTestID, wrapWithTestIDTag } from './testHelperUtils'

const addCategory = (categoryName: string) => {
  getTestID(TestIDEnum.ADD_CATEGORY_BUTTON)
    .should('contain', TextEnum.ADD_CATEGORY)
    .click()

  getTestID(TestIDEnum.NEW_CATEGORY_INPUT).type(categoryName)

  getTestID(TestIDEnum.NEW_CATEGORY_FORM).submit()

  cy.contains(categoryName)
}

const assertCategoryDoesNotExist = (categoryName: string) => {
  cy.findByText(categoryName).should('not.exist')
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

const selectMoveToCategoryOption = (categoryName: string) => {
  getTestID(TestIDEnum.MOVE_TO_CATEGORY).select(categoryName)
}

export {
  addCategory,
  assertCategoryDoesNotExist,
  navigateToCategory,
  removeCategory,
  selectMoveToCategoryOption,
}
