import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-extended'
import { Camera } from 'react-feather'

import { Tab, TabProps } from '@/components/Tabs/Tab'
import { TestID } from '@resources/TestID'

describe('<Tabs />', () => {
  it('it should Render Tab', () => {
    const enabledProps: TabProps = {
      label: 'string',
      activeTab: 'string',
      onClick: jest.fn,
      icon: Camera,
    }
    const component = render(<Tab {...enabledProps} />)

    expect(component).toBeTruthy()
  })
  it('it work correct', () => {
    const enabledProps: TabProps = {
      label: 'string',
      activeTab: 'string',
      onClick: jest.fn,
      icon: Camera,
    }
    const component = render(<Tab {...enabledProps} />)

    expect(component).toBeTruthy()

    const tab = component.queryByTestId(TestID.TAB)
    expect(tab).toBeTruthy()
  })
})
