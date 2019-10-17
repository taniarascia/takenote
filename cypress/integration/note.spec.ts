describe('Create note test', () => {
  before(() => {
    cy.visit('/')
  })

  it('creates a new note', () => {
    cy.get('.note-list')
      .children()
      .should('have.length', 0)

    cy.get('[data-cy="Create new note"]').click()

    cy.get('.note-list')
      .children()
      .should('have.length', 1)

    cy.get('.note-list-each.active').should('contain', 'New Note')
  })

  it('should add a note to favorites', () => {
    cy.get('.note-list-each.active .note-options').click()
    cy.get('[data-cy="note-option-favorite-button"]').click()
    cy.get('[data-cy="note-option-favorite-button"]').should('contain', 'Remove Favorite')
    cy.get('[data-cy="favorites"').click()
    cy.get('.note-list')
      .children()
      .should('have.length', 1)
  })

  it('shoukld send a note to trash', () => {
    cy.get('.note-list-each.active .note-options').click()
    cy.get('[data-cy="note-option-trash-button"]').click()
    cy.get('.note-list')
      .children()
      .should('have.length', 0)
    cy.get('[data-cy="trash"').click()
    cy.get('.note-list')
      .children()
      .should('have.length', 1)
    cy.get('.note-list-each.active').should('contain', 'New Note')
  })
})
