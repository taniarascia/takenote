// testHelperUtils.ts
// Utility functions for use in settings tests

import { TestID } from '@resources/TestID'

import { clickTestID, selectOptionTestID } from './testHelperUtils'

const clickSettingsTab = (name: string) => {
  cy.findByRole('button', { name: new RegExp(name, 'i') }).click()
}

const navigateToSettings = () => {
  cy.findByRole('button', { name: /settings/i }).click()
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

const getDownloadedBackup = () => {
  return cy.get('a[download]:last-child').then(
    (anchor) =>
      new Cypress.Promise((resolve) => {
        // Use XHR to get the blob that corresponds to the object URL.
        const xhr = new XMLHttpRequest()
        xhr.open('GET', anchor.prop('href'), true)
        xhr.responseType = 'blob'

        // Once loaded, use FileReader to get the string back from the blob.
        xhr.onload = () => {
          if (xhr.status === 200) {
            const blob = xhr.response
            const reader = new FileReader()
            reader.onload = () => {
              // Once we have a string, resolve the promise to let
              // the Cypress chain continue, e.g. to assert on the result.
              resolve(reader.result)
            }
            reader.readAsText(blob)
          }
        }
        xhr.send()
      })
  )
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
  clickSettingsTab,
  getDownloadedBackup,
}
