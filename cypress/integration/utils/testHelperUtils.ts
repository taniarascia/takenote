// testHelperUtils.ts
// Utility functions used by all test specs

import { entryPoint, TestIDEnum, TextEnum, wrapWithTestIDTag } from './testHelperEnums'

const clickDynamicTestID = (dynamicTestID: string) => {
  cy.get(wrapWithTestIDTag(dynamicTestID)).click()
}

// optional second parameter to click at supported areas (e.g. 'right' 'left') default is 'center'
const clickTestID = (testIDEnum: TestIDEnum, clickOption: string = 'center') => {
  cy.get(wrapWithTestIDTag(testIDEnum)).click(clickOption)
}

const defaultInit = () => {
  before(() => {
    cy.visit(entryPoint)

    // wait for things to settle .. like waiting for Welcome Note to resolve
    cy.wait(100)
  })
}

const navigateToAllNotes = () => {
  clickTestID(TestIDEnum.ALL_NOTES)
}

const navigateToFavorites = () => {
  clickTestID(TestIDEnum.FAVORITES)
}

const navigateToTrash = () => {
  clickTestID(TestIDEnum.NOTE_TRASH)
}

const testIDShouldContain = (testIDEnum: TestIDEnum, textEnum: TextEnum) => {
  cy.get(wrapWithTestIDTag(testIDEnum)).should('contain', textEnum)
}

const testIDShouldExist = (testIDEnum: TestIDEnum) => {
  cy.get(wrapWithTestIDTag(testIDEnum)).should('exist')
}

const testIDShouldNotExist = (testIDEnum: TestIDEnum) => {
  cy.get(wrapWithTestIDTag(testIDEnum)).should('not.exist')
}

export {
  clickDynamicTestID,
  clickTestID,
  defaultInit,
  navigateToAllNotes,
  navigateToFavorites,
  navigateToTrash,
  testIDShouldContain,
  testIDShouldExist,
  testIDShouldNotExist,
}
