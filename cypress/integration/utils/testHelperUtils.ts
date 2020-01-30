// testHelperUtils.ts
// Utility functions used by all test specs

import { entryPoint, TestIDEnum, TextEnum, wrapWithTestIDTag } from './testHelperEnums'

const clickDynamicTestID = (dynamicTestID: string) => {
  cy.get(wrapWithTestIDTag(dynamicTestID)).click()
}

const clickTestID = (testIDEnum: TestIDEnum) => {
  cy.get(wrapWithTestIDTag(testIDEnum)).click()
}

const defaultInit = () => {
  before(() => {
    cy.visit(entryPoint)
  })
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
  testIDShouldContain,
  testIDShouldExist,
  testIDShouldNotExist,
}
