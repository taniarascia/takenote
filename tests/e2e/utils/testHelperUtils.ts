// testHelperUtils.ts
// Utility functions used by all test specs

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import { entryPoint } from './testHelperEnums'

const assertCurrentFolderOrCategory = (folderOrCategoryName: string) => {
  cy.get('.active').should('have.text', folderOrCategoryName)
}

// takes a built string instead of a TestID .. prefer clickTestID() when possible
const clickDynamicTestID = (dynamicTestID: string) => {
  cy.get(wrapWithTestIDTag(dynamicTestID)).click()
}

// optional second parameter to click at supported areas (e.g. 'right' 'left') default is 'center'
const clickTestID = (testIDEnum: TestID, clickOption: string = 'center') => {
  cy.get(wrapWithTestIDTag(testIDEnum)).click(clickOption)
}

const defaultInit = () => {
  before(() => {
    cy.visit(entryPoint)

    // wait for things to settle .. like waiting for Welcome Note to resolve
    // increasing due to occasional flaky starts
    cy.wait(200)
  })
}

const getDynamicTestID = (testID: string) => {
  return cy.get(wrapWithTestIDTag(testID))
}

const getTestID = (testIDEnum: TestID) => {
  return cy.get(wrapWithTestIDTag(testIDEnum))
}

// sets the specified alias for the current folder note count, must be accessed
// through 'this' asynchronously (for example, .then())
// note: test retrieving aliased variable must use regular 'function(){}' syntax for proper 'this' scope
const getNoteCount = (noteCountAlias: string) => {
  getTestID(TestID.NOTE_LIST)
    .children()
    .its('length')
    .as(noteCountAlias)
}

const navigateToAllNotes = () => {
  clickTestID(TestID.FOLDER_ALL_NOTES)
}

const navigateToFavorites = () => {
  clickTestID(TestID.FOLDER_FAVORITES)
}

const navigateToTrash = () => {
  clickTestID(TestID.FOLDER_TRASH)
}

const testIDShouldContain = (testIDEnum: TestID, textEnum: LabelText) => {
  cy.get(wrapWithTestIDTag(testIDEnum)).should('contain', textEnum)
}

const testIDShouldExist = (testIDEnum: TestID) => {
  cy.get(wrapWithTestIDTag(testIDEnum)).should('exist')
}

const testIDShouldNotExist = (testIDEnum: TestID) => {
  cy.get(wrapWithTestIDTag(testIDEnum)).should('not.exist')
}

const wrapWithTestIDTag = (testIDEnum: TestID | string) => {
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
  assertCurrentFolderOrCategory,
}
