import React from 'react'
import { render } from '@testing-library/react'

import '@testing-library/jest-dom'
import 'jest-extended'
import { PreviewEditor, PreviewEditorProps } from '@/components/Editor/PreviewEditor'
import NoteLink, { NoteLinkProps } from '@/components/Editor/NoteLink'
import { NoteItem } from '@/types'
import { Errors } from '@/utils/enums'
import { TestID } from '@resources/TestID'
import { TempStateProvider } from '@/contexts/TempStateContext'

import { renderWithRouter } from '../../testHelpers'

const wrap = (props: PreviewEditorProps) => renderWithRouter(<PreviewEditor {...props} />)

describe('<PreviewEditor />', () => {
  it('renders the PreviewEditor component', () => {
    const props: PreviewEditorProps = {
      noteText: 'texts for testing',
      directionText: 'testing',
      notes: [],
    }
    const component = wrap(props)

    expect(component).toBeTruthy()
  })

  it('test', () => {
    const noteItemProps: NoteItem = {
      id: 'test-note',
      text: 'Test note',
      created: Date(),
      lastUpdated: Date(),
    }

    const props: NoteLinkProps = {
      uuid: '{{test-note}}',
      notes: [noteItemProps],
      handleNoteLinkClick: jest.fn,
    }

    const component = render(
      <TempStateProvider>
        <NoteLink {...props} />
      </TempStateProvider>
    )
    expect(component).toBeTruthy()

    const { getByTestId } = component

    expect(getByTestId(TestID.NOTE_LINK_SUCCESS).innerHTML).toMatch(noteItemProps.text)
  })

  it('test2', () => {
    const noteItemProps: NoteItem = {
      id: '2',
      text: 'Test note',
      created: Date(),
      lastUpdated: Date(),
    }

    const props: NoteLinkProps = {
      uuid: 'test-note',
      notes: [noteItemProps],
      handleNoteLinkClick: jest.fn,
    }

    const component = render(
      <TempStateProvider>
        <NoteLink {...props} />
      </TempStateProvider>
    )
    expect(component).toBeTruthy()

    const { getByTestId } = component

    expect(getByTestId(TestID.NOTE_LINK_ERROR).innerHTML).toMatch(
      '&lt;invalid note id provided&gt;'
    )
  })
})
