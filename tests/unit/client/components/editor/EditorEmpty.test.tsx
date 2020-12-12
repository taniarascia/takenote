import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-extended'

import { TestID } from '@resources/TestID'
import { EmptyEditor } from '@/components/Editor/EmptyEditor'

describe('<EmptyEditor />', () => {
  it('renders the EmptyEditor component', () => {
    const component = render(<EmptyEditor />)

    expect(component).toBeTruthy()
  })

  it('renders the EmptyEditor component and its texts', () => {
    const component = render(<EmptyEditor />)

    const createNoteText = component.queryByTestId(TestID.EMPTY_EDITOR)

    expect(createNoteText).toBeValid()
    expect(component.getByText('Create a note')).toBeInstanceOf(Node)
    expect(component.getByText('CTRL')).toBeInstanceOf(Node)
    expect(component.getByText('ALT')).toBeInstanceOf(Node)
    expect(component.getByText('N')).toBeInstanceOf(Node)
  })
})
