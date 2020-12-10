import React, { createRef } from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-extended'

import { TestID } from '@resources/TestID'
import { SearchBar, SearchBarProps } from '@/components/NoteList/SearchBar'

describe('<SearchBar />', () => {
  it('renders the SearchBar component', () => {
    const enabledProps: SearchBarProps = {
      searchRef: createRef() as React.MutableRefObject<HTMLInputElement>,
      searchNotes: jest.fn,
    }

    const component = render(<SearchBar {...enabledProps} />)

    expect(component).toBeTruthy()
  })

  it('renders the SearchBar and searches for text', () => {
    const enabledProps: SearchBarProps = {
      searchRef: createRef() as React.MutableRefObject<HTMLInputElement>,
      searchNotes: jest.fn,
    }

    const component = render(<SearchBar {...enabledProps} />)
    expect(component).toBeTruthy()

    const { getByTestId } = component

    fireEvent.change(getByTestId(TestID.NOTE_SEARCH), {
      target: { value: 'welcome' },
    })
  })
})
