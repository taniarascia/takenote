describe('Create note test', () => {
  before(() => {
    cy.visit('/app')
  })

  it('should have an welcomeNote', () => {
    cy.get('.note-list')
      .children()
      .should('have.length', 1)

    cy.get('.note-list-each.active').should('contain', 'Welcome to Takenote!')
  })

  it('should delete the welcomeNote', () => {
    cy.get('.note-list-each.active .note-options').click()
    cy.get('[data-testid="note-option-trash-button"]').click()
    cy.get('.note-list')
      .children()
      .should('have.length', 0)
    cy.get('[data-testid="trash"').click()
    cy.get('.note-list')
      .children()
      .should('have.length', 1)
    cy.get('.note-list-each.active .note-options').click()
    cy.get('[data-testid="note-option-delete-permanently-button"]').click()

    cy.get('[data-testid="all"').click()
  })

  it('creates a new note', () => {
    cy.get('.note-list')
      .children()
      .should('have.length', 0)

    cy.get('[data-testid="Create new note"]').click()

    cy.get('.note-list')
      .children()
      .should('have.length', 1)

    cy.get('.note-list-each.active').should('contain', 'New Note')
  })

  it('should add a note to favorites', () => {
    cy.get('.note-list-each.active .note-options').click()
    cy.get('[data-testid="note-option-favorite-button"]').click()
    cy.get('[data-testid="note-option-favorite-button"]').should('contain', 'Remove favorite')
    cy.get('[data-testid="favorites"').click()
    cy.get('.note-list')
      .children()
      .should('have.length', 1)
  })

  it('should send a note to trash', () => {
    cy.get('.note-list-each.active .note-options').click()
    cy.get('[data-testid="note-option-trash-button"]').click()
    cy.get('.note-list')
      .children()
      .should('have.length', 0)
    cy.get('[data-testid="trash"').click()
    cy.get('.note-list')
      .children()
      .should('have.length', 1)
    cy.get('.note-list-each.active').should('contain', 'New Note')
  })

  it('should empty notes in trash', () => {
    cy.get('.note-list')
      .children()
      .should('have.length', 1)
    cy.get('[data-testid="Empty Trash"]').click()
    cy.get('.note-list')
      .children()
      .should('have.length', 0)
  })
})
