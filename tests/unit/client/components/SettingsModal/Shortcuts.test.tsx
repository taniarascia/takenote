import React from 'react'

import '@testing-library/jest-dom'
import 'jest-extended'

import { TestID } from '@resources/TestID'
import { TempStateProvider } from '@/contexts/TempStateContext'
import { SettingsModal } from '@/containers/SettingsModal'

import '@/styles/index.scss'
import { renderWithRouter } from '../../testHelpers'

const wrap = (props: any) =>
  renderWithRouter(
    <TempStateProvider>
      <SettingsModal {...props} />
    </TempStateProvider>
  )

describe('<SettingsModal />', () => {
  it('renders the SettingsModal component', () => {
    const component = wrap({
      showModal: true,
    })
    expect(component).toBeTruthy()
  })

  it('renders the Shortcuts Tab content and its texts', () => {
    const component = wrap({})
    expect(component.getByTestId(TestID.SETTINGS_MODAL_SHORTCUT_TAB)).toBeTruthy()
  })
})
