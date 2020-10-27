// testHelperUtils.ts
// Utility functions used by all test specs

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import { entryPoint } from './testHelperEnums'

const assertCurrentFolderOrCategory = (folderOrCategoryName: string) => {
  cy.get('.active').should('have.text', folderOrCategoryName)
}

const assertNoteContainsText = (testID: string, text: string) => {
  cy.get(wrapWithTestIDTag(testID)).click().should('contain.text', text)
}

// takes a built string instead of a TestID .. prefer clickTestID() when possible
const clickDynamicTestID = (dynamicTestID: string) => {
  cy.get(wrapWithTestIDTag(dynamicTestID)).click()
}

// optional second parameter to click at supported areas (e.g. 'right' 'left') default is 'center'
const clickTestID = (testIDEnum: TestID) => {
  cy.get(wrapWithTestIDTag(testIDEnum)).click()
}

const selectOptionTestID = (testIDEnum: TestID, text: string) => {
  cy.get(wrapWithTestIDTag(testIDEnum)).select(text)
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
  getTestID(TestID.NOTE_LIST).children().its('length').as(noteCountAlias)
}

const navigateToNotes = () => {
  clickTestID(TestID.FOLDER_NOTES)
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
  navigateToNotes,
  navigateToFavorites,
  navigateToTrash,
  testIDShouldContain,
  testIDShouldExist,
  testIDShouldNotExist,
  wrapWithTestIDTag,
  assertCurrentFolderOrCategory,
  selectOptionTestID,
  assertNoteContainsText,
}
