// testHelperUtils.ts
// Utility functions for use in settings tests

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import { clickTestID } from './testHelperUtils'
import { entryPoint } from './testHelperEnums'

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

const assertDarkModeActive = () => {
  cy.get('.settings-modal').should('have.css', 'background-color', 'rgb(51, 51, 51)')
}

const assertDarkModeInactive = () => {
  cy.get('.settings-modal').should('have.css', 'background-color', 'rgb(255, 255, 255)')
}

export {
  navigateToSettings,
  assertSettingsMenuIsOpen,
  assertSettingsMenuIsClosed,
  closeSettingsByClickingX,
  closeSettingsByClickingOutsideWindow,
  toggleDarkMode,
  assertDarkModeActive,
  assertDarkModeInactive,
}
