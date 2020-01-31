// testCategoryHelperUtils.ts
// Utility functions for use in category tests

import { getTestID, TestIDEnum, TextEnum } from './testHelperEnums'

const addCategory = (categoryName: string) => {
  cy.findByLabelText(TextEnum.ADD_CATEGORY)
    .should('exist')
    .click()

  cy.findByPlaceholderText(TextEnum.NEW_CATEGORY)
    .type(`${categoryName}`)
    .parent()
    .submit()

  return cy
    .findByText(categoryName)
    .should('exist')
    .click()
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
  cy.findByText(categoryName)
    .parent()
    .within(() => {
      cy.queryByLabelText(TextEnum.REMOVE_CATEGORY)
        .trigger('mouseover')
        .click()
    })
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
