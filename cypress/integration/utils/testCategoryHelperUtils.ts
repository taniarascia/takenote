// testCategoryHelperUtils.ts
// Utility functions for use in category tests

import { TextEnum } from './testHelperEnums'

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

const removeCategory = (categoryName: string) => {
  cy.findByText(categoryName)
    .parent()
    .within(() => {
      cy.queryByLabelText(TextEnum.REMOVE_CATEGORY)
        .trigger('mouseover')
        .click()
    })
}

export { addCategory, assertCategoryDoesNotExist, removeCategory }
