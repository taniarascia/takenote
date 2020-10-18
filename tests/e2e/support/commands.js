import '@testing-library/cypress/add-commands'

Cypress.Commands.add('dragAndDrop', { prevSubject: 'element' }, (subject, target) => {
  Cypress.log({
    name: 'DRAGNDROP',
    message: `Dragging element ${subject} to ${target}`,
    consoleProps: () => {
      return {
        subject: subject,
        target: target,
      }
    },
  })
  const BUTTON_INDEX = 0
  const SLOPPY_CLICK_THRESHOLD = 10
  cy.contains(target).then(($target) => {
    const coordsDrop = $target[0].getBoundingClientRect()
    cy.get(subject)
      .first()
      .then((subject) => {
        const coordsDrag = subject[0].getBoundingClientRect()
        cy.wrap(subject)
          .trigger('mousedown', {
            button: BUTTON_INDEX,
            clientX: coordsDrag.x,
            clientY: coordsDrag.y,
            force: true,
          })
          .trigger('mousemove', {
            button: BUTTON_INDEX,
            clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
            clientY: coordsDrag.y,
            force: true,
          })

        cy.get('body')
          .trigger('mousemove', {
            button: BUTTON_INDEX,
            clientX: coordsDrag.x,
            clientY: coordsDrop.y,
            force: true,
          })
          .wait(0.2 * 1000)
          .trigger('mouseup')
      })
  })
})
