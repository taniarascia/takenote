const addCategory = (categoryName: string) => {
  cy.findByLabelText('Add category')
    .should('exist')
    .click()

  cy.findByPlaceholderText('New category...')
    .type(`${categoryName}`)
    .parent()
    .submit()

  return cy
    .findByText(categoryName)
    .should('exist')
    .click()
}

describe('Category tests', () => {
  before(() => {
    cy.visit('/')
  })

  it('creates a new category', () => {
    const categoryName = `Cy${Date.now()}`
    addCategory(categoryName)
  })

  it('should delete a category', () => {
    const categoryName = `Cy${Date.now()}`

    addCategory(categoryName)

    cy.findByText(categoryName)
      .parent()
      .within(() => {
        cy.queryByLabelText('Remove category')
          .trigger('mouseover')
          .click()
      })

    cy.findByText(categoryName).should('not.exist')
  })
})
