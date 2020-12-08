import React from 'react'
import { render } from '@testing-library/react'
import { Edit2 } from 'react-feather'

import { ContextMenuOption, ContextMenuOptionProps } from '@/components/NoteList/ContextMenuOption'
import { TestID } from '@resources/TestID'
import { LabelText } from '@resources/LabelText'

describe('<ContextMenuOption />', () => {
  it('Renders the ContextMenuOption component', () => {
    const enableProps: ContextMenuOptionProps = {
      dataTestID: TestID.CATEGORY_OPTION_RENAME,
      handler: jest.fn,
      icon: Edit2,
      text: LabelText.RENAME,
      optionType: 'delete',
    }
    const Component = render(<ContextMenuOption {...enableProps} />)
    expect(Component).toBeTruthy()
  })
})
