// testHelperUtils.ts
// Utility functions for use in settings tests

import { TestID } from '@resources/TestID'

import { clickTestID, selectOptionTestID } from './testHelperUtils'

const navigateToSettings = () => {
  clickTestID(TestID.SETTINGS_MENU)
}

const assertSettingsMenuIsOpen = () => {
  cy.get('.settings-modal').should('exist')
}

const assertSettingsMenuIsClosed = () => {
  cy.get('.settings-modal').should('not.exist')
}

const closeSettingsByClickingX = () => {
  cy.get('.close-button').click()
}

const closeSettingsByClickingOutsideWindow = () => {
  cy.get('.dimmer').click('topLeft')
}

const toggleDarkMode = () => {
  clickTestID(TestID.DARK_MODE_TOGGLE)
}

const toggleMarkdownPreview = () => {
  clickTestID(TestID.MARKDOWN_PREVIEW_TOGGLE)
}

const toggleLineNumbers = () => {
  clickTestID(TestID.DISPLAY_LINE_NUMS_TOGGLE)
}

const toggleLineHighlight = () => {
  clickTestID(TestID.ACTIVE_LINE_HIGHLIGHT_TOGGLE)
}

const selectOptionInSortByDropdown = (text: string) => {
  selectOptionTestID(TestID.SORT_BY_DROPDOWN, text)
}

const assertDarkModeActive = () => {
  cy.get('.settings-modal').should('have.css', 'background-color', 'rgb(51, 51, 51)')
}

const assertDarkModeInactive = () => {
  cy.get('.settings-modal').should('have.css', 'background-color', 'rgb(255, 255, 255)')
}

const assertMarkdownPreviewActive = () => {
  cy.get('h1').should('exist')
}

const assertMarkdownPreviewInactive = () => {
  cy.get('h1').should('not.exist')
}

const assertLineNumbersActive = () => {
  cy.get('.CodeMirror-activeline > .CodeMirror-gutter-wrapper > .CodeMirror-linenumber').should(
    'exist'
  )
}

const assertLineNumbersInactive = () => {
  cy.get('.CodeMirror-activeline > .CodeMirror-gutter-wrapper > .CodeMirror-linenumber').should(
    'not.exist'
  )
}

const assertLineHighlightActive = () => {
  cy.get('div.CodeMirror-activeline').should('exist')
}

const assertLineHighlightInactive = () => {
  cy.get('div.CodeMirror-activeline').should('not.exist')
}

export {
  navigateToSettings,
  assertSettingsMenuIsOpen,
  assertSettingsMenuIsClosed,
  closeSettingsByClickingX,
  closeSettingsByClickingOutsideWindow,
  toggleDarkMode,
  toggleMarkdownPreview,
  toggleLineNumbers,
  toggleLineHighlight,
  assertDarkModeActive,
  assertDarkModeInactive,
  assertMarkdownPreviewActive,
  assertMarkdownPreviewInactive,
  assertLineNumbersActive,
  assertLineNumbersInactive,
  selectOptionInSortByDropdown,
  assertLineHighlightActive,
  assertLineHighlightInactive,
}
