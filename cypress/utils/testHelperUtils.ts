// testHelperUtils.ts
// Utility functions used by all test specs

import { ResourceStringEnum } from '../../src/resources/resourceStrings'

import { entryPoint, TestIDEnum } from './testHelperEnums'

// takes a built string instead of a TestIDEnum .. prefer clickTestID() when possible
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
    // increasing due to occassional flaky starts
    cy.wait(200)
  })
}

const getDynamicTestID = (testID: string) => {
  return cy.get(wrapWithTestIDTag(testID))
}

const getTestID = (testIDEnum: TestIDEnum) => {
  return cy.get(wrapWithTestIDTag(testIDEnum))
}

// sets the specified alias for the current folder note count, must be accessed
// through 'this' asynchronously (for example, .then())
// note: test retrieving aliased variable must use regular 'function(){}' syntax for proper 'this' scope
const getNoteCount = (noteCountAlias: string) => {
  getTestID(TestIDEnum.NOTE_LIST)
    .children()
    .its('length')
    .as(noteCountAlias)
}

const navigateToAllNotes = () => {
  clickTestID(TestIDEnum.FOLDER_ALL_NOTES)
}

const navigateToFavorites = () => {
  clickTestID(TestIDEnum.FOLDER_FAVORITES)
}

const navigateToTrash = () => {
  clickTestID(TestIDEnum.FOLDER_TRASH)
}

const testIDShouldContain = (testIDEnum: TestIDEnum, textEnum: ResourceStringEnum) => {
  cy.get(wrapWithTestIDTag(testIDEnum)).should('contain', textEnum)
}

const testIDShouldExist = (testIDEnum: TestIDEnum) => {
  cy.get(wrapWithTestIDTag(testIDEnum)).should('exist')
}

const testIDShouldNotExist = (testIDEnum: TestIDEnum) => {
  cy.get(wrapWithTestIDTag(testIDEnum)).should('not.exist')
}

const wrapWithTestIDTag = (testIDEnum: TestIDEnum | string) => {
  return '[data-testid="' + testIDEnum + '"]'
}

export {
  clickDynamicTestID,
  clickTestID,
  getDynamicTestID,
  getNoteCount,
  getTestID,
  defaultInit,
  navigateToAllNotes,
  navigateToFavorites,
  navigateToTrash,
  testIDShouldContain,
  testIDShouldExist,
  testIDShouldNotExist,
  wrapWithTestIDTag,
}
